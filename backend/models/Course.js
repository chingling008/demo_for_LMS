import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a course title'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: '📚',
  },
  duration: {
    type: String,
    default: '0 hours',
  },
  totalLessons: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ['Draft', 'Active', 'Archived'],
    default: 'Draft',
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  revenue: {
    type: Number,
    default: 0,
  },
  completionRate: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

// Virtual for student count
courseSchema.virtual('studentCount').get(function() {
  return this.enrolledStudents.length;
});

const Course = mongoose.model('Course', courseSchema);

export default Course;
