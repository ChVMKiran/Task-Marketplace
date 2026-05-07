const express = require('express');
const { Message, Conversation } = require('../models');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get('/conversations', auth, async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate('participants', 'name avatar')
      .populate('task', 'title')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });
    res.json({ success: true, conversations });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.get('/:conversationId', auth, async (req, res) => {
  try {
    const messages = await Message.find({ conversation: req.params.conversationId })
      .populate('sender', 'name avatar')
      .sort({ createdAt: 1 });
    await Message.updateMany({ conversation: req.params.conversationId, sender: { $ne: req.user._id }, read: false }, { read: true });
    res.json({ success: true, messages });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.post('/:conversationId', auth, async (req, res) => {
  try {
    const message = await Message.create({ conversation: req.params.conversationId, sender: req.user._id, content: req.body.content });
    await Conversation.findByIdAndUpdate(req.params.conversationId, { lastMessage: message._id, updatedAt: new Date() });
    res.status(201).json({ success: true, message });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
