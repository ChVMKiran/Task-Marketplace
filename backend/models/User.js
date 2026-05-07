const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 8 },
  role: { type: String, enum: ['client', 'contributor', 'admin'], default: 'contributor' },
  avatar: String,
  department: String,
  year: String,
  college: String,
  skills: [String],
  bio: { type: String, maxlength: 500 },
  portfolioLinks: [String],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalTasks: { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },
  totalWins: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
