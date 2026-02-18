import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { calendarApi } from '../services/api';
import { calendarEvents } from '../data/mockData';

const Calendar = ({ role }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 18)); // Feb 18, 2026
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await calendarApi.getEvents(
          currentDate.getMonth() + 1,
          currentDate.getFullYear()
        ).catch(() => calendarEvents);
        setEvents(data);
      } catch (err) {
        setError(err.message || 'Failed to load calendar events');
        setEvents(calendarEvents);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [currentDate]);

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getEventsForDay = (day) => {
    return (events.length > 0 ? events : calendarEvents).filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === day &&
             eventDate.getMonth() === currentDate.getMonth() &&
             eventDate.getFullYear() === currentDate.getFullYear();
    });
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'assignment':
        return 'bg-red-500';
      case 'class':
        return 'bg-blue-500';
      case 'quiz':
        return 'bg-purple-500';
      case 'exam':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-24 bg-slate-50"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const events = getEventsForDay(day);
    const isToday = day === 18; // Current date is Feb 18
    
    days.push(
      <div
        key={day}
        className={`h-24 border border-slate-200 p-2 hover:bg-slate-50 transition-colors ${
          isToday ? 'bg-indigo-50 border-indigo-300' : 'bg-white'
        }`}
      >
        <div className={`text-sm font-semibold mb-1 ${isToday ? 'text-indigo-600' : 'text-slate-900'}`}>
          {day}
          {isToday && <span className="ml-1 text-xs">(Today)</span>}
        </div>
        <div className="space-y-1">
          {events.slice(0, 2).map((event, idx) => (
            <div
              key={idx}
              className={`text-xs px-2 py-1 rounded text-white truncate ${getEventColor(event.type)}`}
              title={event.title}
            >
              {event.title}
            </div>
          ))}
          {events.length > 2 && (
            <div className="text-xs text-slate-500 px-2">
              +{events.length - 2} more
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      {loading && <LoadingSpinner message="Loading calendar..." />}
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Calendar</h1>
          <p className="text-slate-600 mt-1">View your schedule and upcoming events</p>
        </div>
        {role === 'teacher' && (
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            <Plus size={20} />
            Add Event
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{monthName}</h2>
          <div className="flex gap-2">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-slate-100 p-2 text-center font-semibold text-slate-600 text-sm">
              {day}
            </div>
          ))}
          {days}
        </div>

        <div className="mt-6 flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-sm text-slate-600">Assignment</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-sm text-slate-600">Class</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-500 rounded"></div>
            <span className="text-sm text-slate-600">Quiz</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-sm text-slate-600">Exam</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {(events.length > 0 ? events : calendarEvents).slice(0, 5).map((event) => (
            <div key={event.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-lg transition-colors">
              <div className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`}></div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900">{event.title}</div>
                <div className="text-sm text-slate-600">{event.course}</div>
              </div>
              <div className="text-sm text-slate-600">
                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                {event.time && ` • ${event.time}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
