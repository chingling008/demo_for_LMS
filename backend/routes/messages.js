import express from 'express';
import Conversation from '../models/Conversation.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/messages
// @desc    Get all conversations for current user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .populate('participants', 'name email avatar role')
      .sort('-lastMessageTime');

    // Format conversations for frontend
    const formattedConversations = conversations.map(conv => {
      const otherParticipant = conv.participants.find(
        p => p._id.toString() !== req.user._id.toString()
      );
      
      return {
        _id: conv._id,
        name: otherParticipant.name,
        avatar: otherParticipant.avatar,
        role: otherParticipant.role,
        lastMessage: conv.lastMessage,
        time: conv.lastMessageTime,
        unread: conv.unreadCount.get(req.user._id.toString()) || 0,
      };
    });

    res.json(formattedConversations);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/messages/:conversationId
// @desc    Get messages in a conversation
// @access  Private
router.get('/:conversationId', protect, async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.conversationId)
      .populate('participants', 'name email avatar')
      .populate('messages.sender', 'name avatar');

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Check if user is participant
    if (!conversation.participants.some(p => p._id.toString() === req.user._id.toString())) {
      return res.status(403).json({ message: 'Not authorized to view this conversation' });
    }

    // Mark messages as read
    conversation.unreadCount.set(req.user._id.toString(), 0);
    await conversation.save();

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/messages
// @desc    Create new conversation or send message
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { recipientId, message } = req.body;

    // Check if conversation already exists
    let conversation = await Conversation.findOne({
      participants: { $all: [req.user._id, recipientId] },
    });

    if (!conversation) {
      // Create new conversation
      conversation = await Conversation.create({
        participants: [req.user._id, recipientId],
        messages: [],
      });
    }

    // Add message
    await conversation.addMessage(req.user._id, message);

    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/messages/:conversationId/message
// @desc    Send message in existing conversation
// @access  Private
router.post('/:conversationId/message', protect, async (req, res) => {
  try {
    const { text } = req.body;
    const conversation = await Conversation.findById(req.params.conversationId);

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' });
    }

    // Check if user is participant
    if (!conversation.participants.includes(req.user._id)) {
      return res.status(403).json({ message: 'Not authorized to send messages in this conversation' });
    }

    await conversation.addMessage(req.user._id, text);

    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
