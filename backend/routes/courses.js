import express from 'express';
import Course from '../models/Course.js';
import Progress from '../models/Progress.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses (filtered by role)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { role } = req.user;
    let courses;

    if (role === 'teacher') {
      courses = await Course.find({ instructor: req.user._id })
        .populate('instructor', 'name email avatar')
        .sort('-createdAt');
    } else {
      courses = await Course.find({ _id: { $in: req.user.enrolledCourses } })
        .populate('instructor', 'name email avatar')
        .sort('-createdAt');
      
      // Get progress for each course
      const coursesWithProgress = await Promise.all(
        courses.map(async (course) => {
          const progress = await Progress.findOne({
            student: req.user._id,
            course: course._id,
          });
          return {
            ...course.toObject(),
            progress: progress ? progress.progressPercentage : 0,
            lessonsCompleted: progress ? progress.lessonsCompleted : 0,
          };
        })
      );
      courses = coursesWithProgress;
    }

    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/courses/:id
// @desc    Get single course
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate('instructor', 'name email avatar');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/courses
// @desc    Create new course
// @access  Private (Teacher only)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { title, description, thumbnail, duration, totalLessons } = req.body;

    const course = await Course.create({
      title,
      description,
      instructor: req.user._id,
      instructorName: req.user.name,
      thumbnail,
      duration,
      totalLessons,
    });

    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/courses/:id
// @desc    Update course
// @access  Private (Teacher only)
router.put('/:id', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if user is the instructor
    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/courses/:id
// @desc    Delete course
// @access  Private (Teacher only)
router.delete('/:id', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }

    await course.deleteOne();
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/courses/:id/enroll
// @desc    Enroll in a course
// @access  Private (Student only)
router.post('/:id/enroll', protect, authorize('student'), async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    if (course.enrolledStudents.includes(req.user._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }

    course.enrolledStudents.push(req.user._id);
    await course.save();

    // Create progress record
    await Progress.create({
      student: req.user._id,
      course: course._id,
      totalLessons: course.totalLessons,
    });

    res.json({ message: 'Successfully enrolled in course' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
