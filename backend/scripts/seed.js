import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Assignment from '../models/Assignment.js';
import Grade from '../models/Grade.js';
import CalendarEvent from '../models/CalendarEvent.js';
import Progress from '../models/Progress.js';
import Conversation from '../models/Conversation.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/lms_portal');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Course.deleteMany({});
    await Assignment.deleteMany({});
    await Grade.deleteMany({});
    await CalendarEvent.deleteMany({});
    await Progress.deleteMany({});
    await Conversation.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const student = await User.create({
      name: 'John Doe',
      email: 'student@lms.com',
      password: 'password123',
      role: 'student',
      avatar: '👤',
      bio: 'Passionate about supply chain optimization and logistics management. Focused on leveraging data analytics to drive business efficiency.',
    });

    const teacher1 = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah@lms.com',
      password: 'password123',
      role: 'teacher',
      avatar: '👩‍🏫',
      bio: 'Supply chain expert with 15 years in logistics operations and management.',
    });

    const teacher2 = await User.create({
      name: 'Michael Chen',
      email: 'michael@lms.com',
      password: 'password123',
      role: 'teacher',
      avatar: '👨‍🏫',
      bio: 'Business analytics specialist focused on data-driven decision making.',
    });

    const teacher3 = await User.create({
      name: 'Emma Wilson',
      email: 'emma@lms.com',
      password: 'password123',
      role: 'teacher',
      avatar: '👩‍🎨',
      bio: 'Transportation and logistics operations expert with global experience.',
    });

    // Create courses
    console.log('📚 Creating courses...');
    const course1 = await Course.create({
      title: 'Supply Chain Management Fundamentals',
      description: 'Master the core principles of supply chain management, logistics, and operations optimization.',
      instructor: teacher1._id,
      instructorName: teacher1.name,
      thumbnail: '📦',
      duration: '12 hours',
      totalLessons: 12,
      status: 'Active',
      enrolledStudents: [student._id],
      revenue: 12400,
      completionRate: 78,
    });

    const course2 = await Course.create({
      title: 'Business Analytics & Data-Driven Decisions',
      description: 'Learn to leverage data analytics for strategic business decisions and forecasting.',
      instructor: teacher2._id,
      instructorName: teacher2.name,
      thumbnail: '📊',
      duration: '18 hours',
      totalLessons: 18,
      status: 'Active',
      enrolledStudents: [student._id],
      revenue: 9800,
      completionRate: 65,
    });

    const course3 = await Course.create({
      title: 'Logistics Operations & Transportation',
      description: 'Comprehensive guide to transportation management, route optimization, and logistics excellence.',
      instructor: teacher3._id,
      instructorName: teacher3.name,
      thumbnail: '🚚',
      duration: '10 hours',
      totalLessons: 10,
      status: 'Active',
      enrolledStudents: [student._id],
      revenue: 7200,
      completionRate: 92,
    });

    // Update student enrolled courses
    student.enrolledCourses = [course1._id, course2._id, course3._id];
    await student.save();

    // Create progress
    console.log('📊 Creating progress records...');
    await Progress.create({
      student: student._id,
      course: course1._id,
      lessonsCompleted: 9,
      totalLessons: 12,
      currentLesson: 'Supply Chain Network Design',
      nextLesson: 'Demand Forecasting Methods',
      progressPercentage: 75,
    });

    await Progress.create({
      student: student._id,
      course: course2._id,
      lessonsCompleted: 8,
      totalLessons: 18,
      currentLesson: 'Predictive Analytics in Supply Chain',
      nextLesson: 'Data Visualization Techniques',
      progressPercentage: 45,
    });

    await Progress.create({
      student: student._id,
      course: course3._id,
      lessonsCompleted: 9,
      totalLessons: 10,
      currentLesson: 'Route Optimization Strategies',
      nextLesson: 'Final Project: Transportation Plan',
      progressPercentage: 90,
    });

    // Create assignments
    console.log('📝 Creating assignments...');
    const assignment1 = await Assignment.create({
      title: 'Supply Chain Network Design Case Study',
      description: 'Analyze and design an optimized supply chain network for a global logistics company',
      course: course1._id,
      instructor: teacher1._id,
      dueDate: new Date('2026-02-20'),
      maxPoints: 100,
      weight: 15,
      status: 'Active',
    });

    const assignment2 = await Assignment.create({
      title: 'Bullwhip Effect Analysis',
      description: 'Identify and propose solutions to minimize the bullwhip effect in supply chains',
      course: course1._id,
      instructor: teacher1._id,
      dueDate: new Date('2026-02-15'),
      maxPoints: 100,
      weight: 20,
      status: 'Active',
      submissions: [{
        student: student._id,
        content: 'My analysis of bullwhip effect mitigation strategies',
        status: 'Graded',
        grade: 95,
        feedback: 'Excellent analysis of demand variance!',
      }],
    });

    const assignment3 = await Assignment.create({
      title: 'Demand Forecasting Analysis',
      description: 'Use statistical methods to forecast product demand',
      course: course2._id,
      instructor: teacher2._id,
      dueDate: new Date('2026-02-22'),
      maxPoints: 50,
      weight: 25,
      status: 'Active',
    });

    // Create grades
    console.log('🎓 Creating grades...');
    await Grade.create({
      student: student._id,
      course: course1._id,
      assignment: assignment2._id,
      points: 95,
      maxPoints: 100,
      feedback: 'Excellent understanding of supply chain dynamics!',
      gradedBy: teacher1._id,
    });

    await Grade.create({
      student: student._id,
      course: course3._id,
      assignment: assignment3._id,
      points: 92,
      maxPoints: 100,
      feedback: 'Outstanding route optimization work!',
      gradedBy: teacher3._id,
    });

    // Create calendar events
    console.log('📅 Creating calendar events...');
    await CalendarEvent.create({
      title: 'Supply Chain Case Study Due',
      course: course1._id,
      type: 'assignment',
      date: new Date('2026-02-20'),
      time: '11:59 PM',
      createdBy: teacher1._id,
      participants: [student._id],
    });

    await CalendarEvent.create({
      title: 'Live Business Analytics Workshop',
      course: course2._id,
      type: 'class',
      date: new Date('2026-02-19'),
      time: '2:00 PM',
      createdBy: teacher2._id,
      participants: [student._id],
    });

    await CalendarEvent.create({
      title: 'Procurement Strategy Quiz',
      course: course2._id,
      type: 'quiz',
      date: new Date('2026-02-21'),
      time: '10:00 AM',
      createdBy: teacher2._id,
      participants: [student._id],
    });

    // Create conversations
    console.log('💬 Creating conversations...');
    const conversation1 = await Conversation.create({
      participants: [student._id, teacher1._id],
      messages: [
        {
          text: 'Hi! I reviewed your Supply Chain Network Design assignment.',
          sender: teacher1._id,
        },
        {
          text: 'Your analysis of logistics optimization was excellent!',
          sender: teacher1._id,
        },
        {
          text: 'Thank you so much! I spent a lot of time researching best practices.',
          sender: student._id,
        },
      ],
      lastMessage: 'Thank you so much! I spent a lot of time researching best practices.',
    });

    console.log('✅ Database seeded successfully!');
    console.log('\n📧 Test Credentials:');
    console.log('Student: student@lms.com / password123');
    console.log('Teacher: sarah@lms.com / password123');
    console.log('Teacher: michael@lms.com / password123');
    console.log('Teacher: emma@lms.com / password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
