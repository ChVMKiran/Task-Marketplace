const express = require('express');
const User = require('../models/User');
const { auth, authorize } = require('../middlewares/auth');
const router = express.Router();

router.get('/profile', auth, async (req, res) => {
  res.json({ success: true, user: req.user });
});

router.put('/profile', auth, async (req, res) => {
  try {
    const updates = ['name', 'department', 'year', 'college', 'skills', 'bio', 'portfolioLinks'];
    const data = {};
    updates.forEach(field => { if (req.body[field] !== undefined) data[field] = req.body[field]; });
    const user = await User.findByIdAndUpdate(req.user._id, data, { new: true }).select('-password');
    res.json({ success: true, user });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.get('/', auth, authorize('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password -verificationToken -resetPasswordToken');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
