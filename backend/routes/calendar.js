import express from 'express';
import CalendarEvent from '../models/CalendarEvent.js';
import Course from '../models/Course.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/calendar
// @desc    Get all calendar events for current user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { role } = req.user;
    const { startDate, endDate } = req.query;

    let query = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    let events;

    if (role === 'teacher') {
      events = await CalendarEvent.find({
        ...query,
        createdBy: req.user._id,
      })
        .populate('course', 'title')
        .sort('date');
    } else {
      // Get student's courses
      const courses = await Course.find({ _id: { $in: req.user.enrolledCourses } });
      const courseIds = courses.map(course => course._id);

      events = await CalendarEvent.find({
        ...query,
        $or: [
          { course: { $in: courseIds } },
          { participants: req.user._id },
        ],
      })
        .populate('course', 'title')
        .sort('date');
    }

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/calendar/:id
// @desc    Get single calendar event
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id)
      .populate('course', 'title')
      .populate('createdBy', 'name email');

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/calendar
// @desc    Create new calendar event
// @access  Private (Teacher only)
router.post('/', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const { title, description, course, type, date, time, duration, location } = req.body;

    const event = await CalendarEvent.create({
      title,
      description,
      course,
      type,
      date,
      time,
      duration,
      location,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/calendar/:id
// @desc    Update calendar event
// @access  Private (Teacher only)
router.put('/:id', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    const updatedEvent = await CalendarEvent.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/calendar/:id
// @desc    Delete calendar event
// @access  Private (Teacher only)
router.delete('/:id', protect, authorize('teacher', 'admin'), async (req, res) => {
  try {
    const event = await CalendarEvent.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
