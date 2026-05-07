const express = require('express');
const { Submission } = require('../models');
const Task = require('../models/Task');
const { auth } = require('../middlewares/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const filter = req.user.role === 'contributor' ? { contributor: req.user._id } : {};
    if (req.query.taskId) filter.task = req.query.taskId;
    const submissions = await Submission.find(filter).populate('task', 'title budget deadline').populate('contributor', 'name avatar').sort({ createdAt: -1 });
    res.json({ success: true, submissions });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const { taskId, files, comment } = req.body;
    const task = await Task.findById(taskId);
    if (!task || task.status === 'completed') return res.status(400).json({ success: false, message: 'Task not available' });
    const existing = await Submission.findOne({ task: taskId, contributor: req.user._id });
    const version = existing ? existing.version + 1 : 1;
    if (existing) { existing.files = files; existing.comment = comment; existing.version = version; await existing.save(); return res.json({ success: true, submission: existing }); }
    const submission = await Submission.create({ task: taskId, contributor: req.user._id, files, comment, version });
    await Task.findByIdAndUpdate(taskId, { $inc: { submissionCount: 1 } });
    res.status(201).json({ success: true, submission });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status, feedback } = req.body;
    const submission = await Submission.findByIdAndUpdate(req.params.id, { status, feedback }, { new: true });
    res.json({ success: true, submission });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
