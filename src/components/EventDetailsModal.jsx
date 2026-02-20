import Modal from './Modal';
import { Calendar, Clock, BookOpen, MapPin } from 'lucide-react';

const EventDetailsModal = ({ isOpen, onClose, event }) => {
  if (!event) return null;

  const getEventIcon = (type) => {
    switch (type) {
      case 'assignment':
        return '📝';
      case 'class':
        return '🎓';
      case 'quiz':
        return '📊';
      case 'exam':
        return '📋';
      default:
        return '📅';
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'assignment':
        return 'bg-red-50 border-red-200 text-red-700';
      case 'class':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'quiz':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'exam':
        return 'bg-orange-50 border-orange-200 text-orange-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Event Details" size="md">
      <div className="space-y-6">
        {/* Event Icon & Title */}
        <div className="text-center">
          <div className="text-6xl mb-3">{getEventIcon(event.type)}</div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">{event.title}</h3>
          <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border ${getEventColor(event.type)}`}>
            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
          </span>
        </div>

        {/* Event Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <BookOpen size={20} className="text-slate-600 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">Course</p>
              <p className="font-semibold text-slate-900">{event.course}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Calendar size={20} className="text-slate-600 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">Date</p>
              <p className="font-semibold text-slate-900">
                {new Date(event.date).toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
            <Clock size={20} className="text-slate-600 mt-0.5" />
            <div>
              <p className="text-sm text-slate-600">Time</p>
              <p className="font-semibold text-slate-900">{event.time}</p>
            </div>
          </div>

          {event.type === 'class' && (
            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
              <MapPin size={20} className="text-slate-600 mt-0.5" />
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="font-semibold text-slate-900">Online Virtual Classroom</p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4 border-t border-slate-200">
          {event.type === 'class' && (
            <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              Join Class
            </button>
          )}
          {event.type === 'assignment' && (
            <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              View Assignment
            </button>
          )}
          {(event.type === 'quiz' || event.type === 'exam') && (
            <button className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
              Start {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EventDetailsModal;
