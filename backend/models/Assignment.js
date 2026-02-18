import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide an assignment title'],
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dueDate: {
    type: Date,
    required: [true, 'Please provide a due date'],
  },
  maxPoints: {
    type: Number,
    default: 100,
  },
  weight: {
    type: Number,
    default: 10,
    min: 0,
    max: 100,
  },
  status: {
    type: String,
    enum: ['Active', 'Closed', 'Draft'],
    default: 'Active',
  },
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
    content: String,
    fileUrl: String,
    grade: Number,
    feedback: String,
    status: {
      type: String,
      enum: ['Pending', 'Submitted', 'Graded', 'Late', 'Overdue'],
      default: 'Submitted',
    },
  }],
}, {
  timestamps: true,
});

// Virtual for submission count
assignmentSchema.virtual('submissionCount').get(function() {
  return this.submissions.length;
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

export default Assignment;
