import mongoose from 'mongoose';

const progressSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  lessonsCompleted: {
    type: Number,
    default: 0,
  },
  totalLessons: {
    type: Number,
    required: true,
  },
  progressPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  currentLesson: {
    type: String,
    default: '',
  },
  nextLesson: {
    type: String,
    default: '',
  },
  lastAccessed: {
    type: Date,
    default: Date.now,
  },
  timeSpent: {
    type: Number, // in minutes
    default: 0,
  },
}, {
  timestamps: true,
});

// Calculate progress percentage before saving
progressSchema.pre('save', function(next) {
  if (this.totalLessons > 0) {
    this.progressPercentage = Math.round((this.lessonsCompleted / this.totalLessons) * 100);
  }
  next();
});

// Compound index for efficient queries
progressSchema.index({ student: 1, course: 1 }, { unique: true });

const Progress = mongoose.model('Progress', progressSchema);

export default Progress;
