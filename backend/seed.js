const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');
const { Submission, Notification, Conversation, Message } = require('./models');

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Task-Marketplace';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB for seeding');

    // Clear existing data
    await User.deleteMany({});
    await Task.deleteMany({});
    await Submission.deleteMany({});
    await Notification.deleteMany({});
    await Conversation.deleteMany({});
    await Message.deleteMany({});

    console.log('🧹 Cleared existing database');

    // Create Admin/Client
    const client = await User.create({
      name: 'Priya Sharma',
      email: 'priya@Task-Marketplace.io',
      password: 'password123',
      role: 'client',
      department: 'Marketing',
      year: '4th Year',
      college: 'IIT Delhi',
      rating: 4.9,
      isVerified: true
    });

    // Create Contributor
    const contributor = await User.create({
      name: 'Arjun Mehta',
      email: 'arjun@Task-Marketplace.io',
      password: 'password123',
      role: 'contributor',
      department: 'Computer Science',
      year: '3rd Year',
      college: 'IIT Delhi',
      rating: 4.8,
      isVerified: true,
      skills: ['UI/UX Design', 'React', 'Figma']
    });

    console.log('👥 Created users');

    // Create Tasks
    const task1 = await Task.create({
      title: 'Design a Modern Event Poster for TechFest 2026',
      description: 'We need a stunning, eye-catching poster for our annual technical festival. The design should be futuristic, vibrant, and appeal to college students.',
      requirements: '- A4 size (300 DPI)\n- Include event logo\n- Futuristic theme with tech elements\n- Color scheme: Dark with neon accents',
      category: 'graphic-design',
      tags: ['poster', 'event', 'techfest'],
      budget: 5000,
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
      priority: 'high',
      status: 'open',
      client: client._id,
      submissionCount: 1
    });

    const task2 = await Task.create({
      title: 'Build a Portfolio Website Landing Page',
      description: 'Looking for a creative developer to build a responsive, animated portfolio landing page. Should be modern, minimal, and impressive. Think Stripe/Linear quality.',
      requirements: '- React or Next.js\n- Fully responsive\n- Smooth animations\n- Dark theme',
      category: 'web-development',
      tags: ['website', 'react', 'frontend'],
      budget: 8000,
      deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      priority: 'medium',
      status: 'open',
      client: client._id,
      submissionCount: 0
    });

    const task3 = await Task.create({
      title: 'Design Mobile App UI for Campus Food Delivery',
      description: 'Complete UI/UX design for a food delivery app targeting college campuses. Need all major screens — onboarding, home, menu, cart, checkout, tracking, profile.',
      requirements: '- Figma file required\n- Minimum 15 screens\n- Dark + Light variants',
      category: 'ui-ux-design',
      tags: ['ui', 'mobile', 'figma'],
      budget: 12000,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      priority: 'urgent',
      status: 'open',
      client: client._id,
      submissionCount: 0
    });

    console.log('📝 Created tasks');

    // Create a Submission
    await Submission.create({
      task: task1._id,
      contributor: contributor._id,
      comment: 'Here is my initial draft for the poster. Went for a cyberpunk vibe!',
      status: 'pending'
    });

    console.log('📎 Created submissions');

    // Create Notifications
    await Notification.create([
      {
        user: contributor._id,
        type: 'system',
        title: 'Welcome to Task-Marketplace!',
        message: 'Your account has been successfully verified. Start browsing tasks today.',
        read: false
      },
      {
        user: contributor._id,
        type: 'task',
        title: 'New Matching Task',
        message: 'A new UI/UX Design task matching your skills was just posted!',
        read: false,
        actionUrl: `/tasks/${task3._id}`
      }
    ]);

    console.log('🔔 Created notifications');

    // Create a Conversation
    const conversation = await Conversation.create({
      participants: [contributor._id, client._id],
      task: task1._id,
      unreadCount: new Map([[contributor._id.toString(), 1], [client._id.toString(), 0]])
    });

    const msg1 = await Message.create({
      conversation: conversation._id,
      sender: client._id,
      content: 'Hi Arjun! We saw your profile and would love to see what you can do for the TechFest poster.',
      read: false
    });

    conversation.lastMessage = msg1._id;
    await conversation.save();

    console.log('💬 Created messages');

    console.log('🎉 Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
