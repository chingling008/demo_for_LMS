import express from 'express';
import Course from '../models/Course.js';
import Assignment from '../models/Assignment.js';
import Grade from '../models/Grade.js';
import Progress from '../models/Progress.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/analytics
// @desc    Get analytics data for teacher
// @access  Private (Teacher only)
router.get('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const teacherCourses = await Course.find({ instructor: req.user._id });
    const courseIds = teacherCourses.map(c => c._id);

    // Get all students enrolled in teacher's courses
    const totalStudents = new Set();
    teacherCourses.forEach(course => {
      course.enrolledStudents.forEach(studentId => {
        totalStudents.add(studentId.toString());
      });
    });

    // Get average engagement
    const progressData = await Progress.find({ course: { $in: courseIds } });
    const totalProgress = progressData.reduce((sum, p) => sum + p.progressPercentage, 0);
    const avgEngagement = progressData.length > 0 ? 
      Math.round(totalProgress / progressData.length) : 0;

    // Get completion rate
    const completedCount = progressData.filter(p => p.progressPercentage === 100).length;
    const completionRate = progressData.length > 0 ? 
      Math.round((completedCount / progressData.length) * 100) : 0;

    // Get average rating (simplified - would come from reviews in real app)
    const avgRating = '4.7/5';

    // Get engagement data per course
    const engagementData = await Promise.all(
      teacherCourses.map(async (course) => {
        const courseProgress = await Progress.find({ course: course._id });
        const courseGrades = await Grade.find({ course: course._id });
        
        const avgScore = courseGrades.length > 0 ?
          Math.round(courseGrades.reduce((sum, g) => sum + g.percentage, 0) / courseGrades.length) : 0;
        
        const engagement = courseProgress.length > 0 ?
          Math.round(courseProgress.reduce((sum, p) => sum + p.progressPercentage, 0) / courseProgress.length) : 0;
        
        const completion = courseProgress.length > 0 ?
          Math.round((courseProgress.filter(p => p.progressPercentage === 100).length / courseProgress.length) * 100) : 0;

        return {
          id: course._id,
          name: course.title,
          engagement,
          enrolled: course.enrolledStudents.length,
          avgScore,
          completion,
          satisfaction: 4.5, // Would come from reviews
        };
      })
    );

    // Get top performers
    const allGrades = await Grade.find({ course: { $in: courseIds } })
      .populate('student', 'name avatar')
      .populate('course', 'title');

    const studentScores = {};
    allGrades.forEach(grade => {
      const studentId = grade.student._id.toString();
      if (!studentScores[studentId]) {
        studentScores[studentId] = {
          student: grade.student,
          scores: [],
          assignments: 0,
        };
      }
      studentScores[studentId].scores.push(grade.percentage);
      studentScores[studentId].assignments++;
    });

    const topPerformers = Object.values(studentScores)
      .map(data => ({
        id: data.student._id,
        name: data.student.name,
        avatar: data.student.avatar,
        course: 'Multiple Courses',
        score: Math.round(data.scores.reduce((sum, s) => sum + s, 0) / data.scores.length),
        assignments: data.assignments,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    res.json({
      overview: {
        avgEngagement: `${avgEngagement}%`,
        completionRate: `${completionRate}%`,
        activeStudents: totalStudents.size.toString(),
        avgRating,
      },
      engagementData,
      topPerformers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/analytics/course/:courseId
// @desc    Get analytics for specific course
// @access  Private (Teacher only)
router.get('/course/:courseId', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view analytics for this course' });
    }

    const progressData = await Progress.find({ course: course._id });
    const grades = await Grade.find({ course: course._id });
    const assignments = await Assignment.find({ course: course._id });

    const avgProgress = progressData.length > 0 ?
      Math.round(progressData.reduce((sum, p) => sum + p.progressPercentage, 0) / progressData.length) : 0;

    const avgScore = grades.length > 0 ?
      Math.round(grades.reduce((sum, g) => sum + g.percentage, 0) / grades.length) : 0;

    res.json({
      course: {
        title: course.title,
        enrolled: course.enrolledStudents.length,
        avgProgress: `${avgProgress}%`,
        avgScore: `${avgScore}%`,
        assignments: assignments.length,
      },
      students: progressData,
      grades,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
