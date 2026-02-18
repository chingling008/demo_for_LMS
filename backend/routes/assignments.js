import express from 'express';
import Assignment from '../models/Assignment.js';
import Course from '../models/Course.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/assignments
// @desc    Get all assignments (filtered by role)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { role } = req.user;
    let assignments;

    if (role === 'teacher') {
      assignments = await Assignment.find({ instructor: req.user._id })
        .populate('course', 'title')
        .sort('-dueDate');
    } else {
      // Get student's courses
      const courses = await Course.find({ _id: { $in: req.user.enrolledCourses } });
      const courseIds = courses.map(course => course._id);

      assignments = await Assignment.find({ course: { $in: courseIds } })
        .populate('course', 'title')
        .sort('dueDate');

      // Add submission status for each assignment
      assignments = assignments.map(assignment => {
        const submission = assignment.submissions.find(
          sub => sub.student.toString() === req.user._id.toString()
        );
        
        const now = new Date();
        let status = 'Pending';
        
        if (submission) {
          status = submission.status;
        } else if (assignment.dueDate < now) {
          status = 'Overdue';
        }

        return {
          ...assignment.toObject(),
          status,
          grade: submission ? submission.grade : null,
          submittedAt: submission ? submission.submittedAt : null,
        };
      });
    }

    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/assignments/:id
// @desc    Get single assignment
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id)
      .populate('course', 'title')
      .populate('submissions.student', 'name email avatar');

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    res.json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/assignments
// @desc    Create new assignment
// @access  Private (Teacher only)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { title, description, course, dueDate, maxPoints, weight } = req.body;

    const assignment = await Assignment.create({
      title,
      description,
      course,
      instructor: req.user._id,
      dueDate,
      maxPoints,
      weight,
    });

    res.status(201).json(assignment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/assignments/:id/submit
// @desc    Submit assignment
// @access  Private (Student only)
router.post('/:id/submit', protect, authorize('student'), async (req, res) => {
  try {
    const { content, fileUrl } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Check if already submitted
    const existingSubmission = assignment.submissions.find(
      sub => sub.student.toString() === req.user._id.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({ message: 'Assignment already submitted' });
    }

    const now = new Date();
    const status = assignment.dueDate < now ? 'Late' : 'Submitted';

    assignment.submissions.push({
      student: req.user._id,
      content,
      fileUrl,
      status,
    });

    await assignment.save();
    res.json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/assignments/:id/submissions/:submissionId/grade
// @desc    Grade an assignment submission
// @access  Private (Teacher only)
router.put('/:id/submissions/:submissionId/grade', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { grade, feedback } = req.body;
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    const submission = assignment.submissions.id(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    submission.status = 'Graded';

    await assignment.save();
    res.json({ message: 'Assignment graded successfully', submission });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
