import { Clock, BookOpen } from 'lucide-react';

const CourseGrid = ({ courses, onCourseClick }) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      {courses.map((course) => (
        <div
          key={course.id}
          onClick={() => onCourseClick && onCourseClick(course)}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
        >
          {/* Thumbnail */}
          <div className="bg-indigo-50 h-48 flex items-center justify-center text-6xl">
            {course.thumbnail}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-bold text-lg text-slate-900 mb-2">{course.title}</h3>
            <p className="text-sm text-slate-600 mb-4">by {course.instructor}</p>

            <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <BookOpen size={16} />
                <span>{course.lessonsCompleted}/{course.totalLessons} lessons</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progress</span>
                <span className="text-sm font-bold text-indigo-600">{course.progress}%</span>
              </div>
              <div className="bg-slate-100 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseGrid;
