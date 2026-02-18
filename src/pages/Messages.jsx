import { Search, Send, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { conversations, messages } from '../data/mockData';

const Messages = ({ role }) => {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');

  const conversationMessages = messages.filter(
    msg => msg.conversationId === selectedConversation.id
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Messages</h1>
        <p className="text-slate-600 mt-1">Communicate with your {role === 'teacher' ? 'students' : 'instructors'}</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden flex h-[calc(100vh-250px)]">
        {/* Conversations List */}
        <div className="w-80 border-r border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation)}
                className={`p-4 border-b border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors ${
                  selectedConversation.id === conversation.id ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{conversation.avatar}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-slate-900 truncate">{conversation.name}</div>
                      <div className="text-xs text-slate-500">{conversation.time}</div>
                    </div>
                    <div className="text-sm text-slate-600 truncate mt-1">{conversation.lastMessage}</div>
                    {conversation.unread > 0 && (
                      <div className="mt-2">
                        <span className="inline-block bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          {conversation.unread} new
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{selectedConversation.avatar}</div>
              <div>
                <div className="font-semibold text-slate-900">{selectedConversation.name}</div>
                <div className="text-sm text-slate-600">{selectedConversation.role || 'Student'}</div>
              </div>
            </div>
            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
              <MoreVertical size={20} className="text-slate-600" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {conversationMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-md ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.sender === 'me'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {message.text}
                  </div>
                  <div className={`text-xs text-slate-500 mt-1 ${message.sender === 'me' ? 'text-right' : 'text-left'}`}>
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-slate-200 bg-slate-50">
            <div className="flex gap-3">
              <input
                type="text"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors flex items-center gap-2"
              >
                <Send size={18} />
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
