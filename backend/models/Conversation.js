import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const conversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  messages: [messageSchema],
  lastMessage: {
    type: String,
    default: '',
  },
  lastMessageTime: {
    type: Date,
    default: Date.now,
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: new Map(),
  },
}, {
  timestamps: true,
});

// Update last message when a new message is added
conversationSchema.methods.addMessage = function(senderId, text) {
  const message = {
    text,
    sender: senderId,
    timestamp: new Date(),
  };
  
  this.messages.push(message);
  this.lastMessage = text;
  this.lastMessageTime = message.timestamp;
  
  // Update unread count for other participants
  this.participants.forEach(participantId => {
    if (participantId.toString() !== senderId.toString()) {
      const currentCount = this.unreadCount.get(participantId.toString()) || 0;
      this.unreadCount.set(participantId.toString(), currentCount + 1);
    }
  });
  
  return this.save();
};

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
