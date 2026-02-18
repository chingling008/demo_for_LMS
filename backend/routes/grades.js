import express from 'express';
import Grade from '../models/Grade.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/grades
// @desc    Get all grades for current student
// @access  Private (Student only)
router.get('/', protect, authorize('student'), async (req, res) => {
  try {
    const grades = await Grade.find({ student: req.user._id })
      .populate('course', 'title')
      .populate('assignment', 'title')
      .sort('-gradedAt');

    // Calculate GPA and statistics
    const totalGrades = grades.length;
    const sumPercentages = grades.reduce((sum, grade) => sum + grade.percentage, 0);
    const average = totalGrades > 0 ? (sumPercentages / totalGrades).toFixed(1) : 0;
    
    const percentages = grades.map(g => g.percentage).sort((a, b) => b - a);
    const highest = percentages.length > 0 ? percentages[0] : 0;
    const lowest = percentages.length > 0 ? percentages[percentages.length - 1] : 0;
    
    // Calculate GPA (simplified: A=4.0, B=3.0, C=2.0, D=1.0, F=0.0)
    const gpaSum = grades.reduce((sum, grade) => {
      if (grade.letterGrade === 'A') return sum + 4.0;
      if (grade.letterGrade === 'B') return sum + 3.0;
      if (grade.letterGrade === 'C') return sum + 2.0;
      if (grade.letterGrade === 'D') return sum + 1.0;
      return sum;
    }, 0);
    const gpa = totalGrades > 0 ? (gpaSum / totalGrades).toFixed(1) : 0;

    res.json({
      grades,
      stats: {
        gpa,
        average,
        highest,
        lowest,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/grades/course/:courseId
// @desc    Get grades for a specific course
// @access  Private
router.get('/course/:courseId', protect, async (req, res) => {
  try {
    const { role } = req.user;
    let grades;

    if (role === 'student') {
      grades = await Grade.find({
        student: req.user._id,
        course: req.params.courseId,
      })
        .populate('assignment', 'title')
        .sort('-gradedAt');
    } else {
      grades = await Grade.find({ course: req.params.courseId })
        .populate('student', 'name email avatar')
        .populate('assignment', 'title')
        .sort('-gradedAt');
    }

    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/grades
// @desc    Create a new grade
// @access  Private (Teacher only)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { student, course, assignment, points, maxPoints, feedback } = req.body;

    const grade = await Grade.create({
      student,
      course,
      assignment,
      points,
      maxPoints,
      feedback,
      gradedBy: req.user._id,
    });

    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
