const express = require('express');
const { Payment } = require('../models');
const { auth, authorize } = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { user: req.user._id };
    const payments = await Payment.find(filter).populate('task', 'title').sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.get('/wallet', auth, async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id });
    const balance = payments.reduce((acc, p) => {
      if (p.status !== 'completed') return acc;
      if (p.type === 'deposit' || p.type === 'payout' || p.type === 'refund') return acc + p.amount;
      if (p.type === 'withdrawal') return acc - p.amount;
      return acc;
    }, 0);
    const pending = payments.filter(p => p.status === 'pending').reduce((acc, p) => acc + p.amount, 0);
    const totalEarnings = payments.filter(p => p.type === 'payout' && p.status === 'completed').reduce((acc, p) => acc + p.amount, 0);
    const totalWithdrawals = payments.filter(p => p.type === 'withdrawal' && p.status === 'completed').reduce((acc, p) => acc + p.amount, 0);
    res.json({ success: true, wallet: { balance, pendingAmount: pending, totalEarnings, totalWithdrawals, transactions: payments } });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.post('/deposit', auth, async (req, res) => {
  try {
    const payment = await Payment.create({ user: req.user._id, type: 'deposit', amount: req.body.amount, description: req.body.description || 'Wallet top-up', status: 'completed' });
    res.status(201).json({ success: true, payment });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.put('/:id/approve', auth, authorize('admin'), async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true });
    res.json({ success: true, payment });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
