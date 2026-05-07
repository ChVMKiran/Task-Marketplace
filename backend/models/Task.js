const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  requirements: { type: String, required: true },
  category: { type: String, required: true, enum: ['graphic-design', 'web-development', 'video-editing', 'content-writing', 'ui-ux-design', 'photography', 'social-media', 'data-analytics', 'presentation', 'other'] },
  tags: [String],
  budget: { type: Number, required: true, min: 0 },
  deadline: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high', 'urgent'], default: 'medium' },
  status: { type: String, enum: ['draft', 'open', 'in-progress', 'review', 'completed', 'cancelled'], default: 'draft' },
  visibility: { type: String, enum: ['public', 'college-only', 'department-only'], default: 'public' },
  submissionType: String,
  maxWinners: { type: Number, default: 1, min: 1 },
  attachments: [{ name: String, url: String, type: String, size: Number }],
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  submissionCount: { type: Number, default: 0 },
}, { timestamps: true });

taskSchema.index({ category: 1, status: 1 });
taskSchema.index({ client: 1 });
taskSchema.index({ tags: 1 });
taskSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Task', taskSchema);
