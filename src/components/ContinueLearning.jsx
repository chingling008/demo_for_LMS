import { Play, Clock } from 'lucide-react';

const ContinueLearning = ({ course }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-8 mb-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-indigo-200 text-sm font-medium mb-2">CONTINUE LEARNING</p>
          <h2 className="text-3xl font-bold mb-3">{course.title}</h2>
          <p className="text-indigo-100 mb-4">by {course.instructor}</p>
          
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-indigo-200" />
              <span className="text-sm">{course.timeLeft}</span>
            </div>
            <div className="h-4 w-px bg-indigo-400"></div>
            <div className="text-sm">
              Current: <span className="font-medium">{course.currentLesson}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Course Progress</span>
              <span className="text-sm font-bold">{course.progress}%</span>
            </div>
            <div className="bg-indigo-500 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
          </div>

          <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
            <Play size={20} />
            Continue Lesson
          </button>
        </div>

        <div className="text-[120px] opacity-20">
          {course.thumbnail}
        </div>
      </div>
    </div>
  );
};

export default ContinueLearning;
