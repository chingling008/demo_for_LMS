import mongoose from 'mongoose';

const gradeSchema = new mongoose.Schema({
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
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true,
  },
  points: {
    type: Number,
    required: true,
    min: 0,
  },
  maxPoints: {
    type: Number,
    required: true,
  },
  percentage: {
    type: Number,
    min: 0,
    max: 100,
  },
  letterGrade: {
    type: String,
    enum: ['A', 'B', 'C', 'D', 'F'],
  },
  feedback: {
    type: String,
    default: '',
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  gradedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Calculate percentage and letter grade before saving
gradeSchema.pre('save', function(next) {
  this.percentage = Math.round((this.points / this.maxPoints) * 100);
  
  if (this.percentage >= 90) this.letterGrade = 'A';
  else if (this.percentage >= 80) this.letterGrade = 'B';
  else if (this.percentage >= 70) this.letterGrade = 'C';
  else if (this.percentage >= 60) this.letterGrade = 'D';
  else this.letterGrade = 'F';
  
  next();
});

const Grade = mongoose.model('Grade', gradeSchema);

export default Grade;
