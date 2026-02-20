import { useState } from 'react';
import Modal from './Modal';
import { Play, CheckCircle, Lock, Clock, BookOpen } from 'lucide-react';

const CourseModal = ({ isOpen, onClose, course }) => {
  const [currentLesson, setCurrentLesson] = useState(course?.lessonsCompleted || 1);
  const [showVideo, setShowVideo] = useState(false);

  if (!course) return null;

  const lessons = [
    { id: 1, title: 'Introduction to the Course', duration: '8:30', completed: true, locked: false },
    { id: 2, title: 'Core Concepts Overview', duration: '12:45', completed: true, locked: false },
    { id: 3, title: 'Practical Applications', duration: '15:20', completed: true, locked: false },
    { id: 4, title: 'Case Study Analysis', duration: '18:15', completed: false, locked: false },
    { id: 5, title: 'Advanced Techniques', duration: '20:10', completed: false, locked: false },
    { id: 6, title: 'Industry Best Practices', duration: '14:30', completed: false, locked: false },
    { id: 7, title: 'Real-World Implementation', duration: '16:45', completed: false, locked: false },
    { id: 8, title: 'Optimization Strategies', duration: '19:20', completed: false, locked: false },
    { id: 9, title: 'Common Challenges', duration: '13:55', completed: false, locked: false },
    { id: 10, title: 'Final Project & Assessment', duration: '25:00', completed: false, locked: false },
  ];

  const handlePlayLesson = (lessonId) => {
    setCurrentLesson(lessonId);
    setShowVideo(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={course.title} size="xl">
      <div className="grid grid-cols-3 gap-6">
        {/* Video Player / Course Info */}
        <div className="col-span-2">
          {showVideo ? (
            <div className="bg-slate-900 rounded-lg aspect-video flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-6xl mb-4">{course.thumbnail}</div>
                <p className="text-white text-lg mb-2">Lesson {currentLesson}: Video Content</p>
                <p className="text-slate-400">🎥 Video player simulation</p>
                <button
                  onClick={() => setShowVideo(false)}
                  className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Back to Lessons
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg aspect-video flex items-center justify-center mb-4">
              <div className="text-center">
                <div className="text-8xl mb-4">{course.thumbnail}</div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">{course.title}</h3>
                <p className="text-slate-600">Select a lesson to start learning</p>
              </div>
            </div>
          )}

          {/* Course Details */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">About this course</h3>
              <p className="text-slate-600">
                Comprehensive course covering all aspects of {course.title.toLowerCase()}. 
                Learn from industry experts with real-world examples and practical exercises.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-slate-600">
                <Clock size={18} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <BookOpen size={18} />
                <span>{course.totalLessons} lessons</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <span className="font-semibold">Instructor:</span>
                <span>{course.instructor}</span>
              </div>
            </div>

            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Your Progress</span>
                <span className="text-sm font-bold text-indigo-600">{course.progress}%</span>
              </div>
              <div className="bg-slate-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="col-span-1">
          <h3 className="text-lg font-bold text-slate-900 mb-4">Course Content</h3>
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  currentLesson === lesson.id
                    ? 'border-indigo-600 bg-indigo-50'
                    : lesson.completed
                    ? 'border-green-200 bg-green-50 hover:bg-green-100'
                    : 'border-slate-200 hover:bg-slate-50'
                } ${lesson.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !lesson.locked && handlePlayLesson(lesson.id)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {lesson.completed ? (
                        <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
                      ) : lesson.locked ? (
                        <Lock size={16} className="text-slate-400 flex-shrink-0" />
                      ) : (
                        <Play size={16} className="text-indigo-600 flex-shrink-0" />
                      )}
                      <span className="text-xs font-medium text-slate-500">
                        Lesson {lesson.id}
                      </span>
                    </div>
                    <p className={`text-sm font-medium ${
                      currentLesson === lesson.id ? 'text-indigo-600' : 'text-slate-900'
                    }`}>
                      {lesson.title}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">{lesson.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CourseModal;
