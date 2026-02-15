import CourseGrid from '../components/CourseGrid';
import CourseTable from '../components/CourseTable';
import { studentCourses, teacherCourses } from '../data/mockData';
import { Plus } from 'lucide-react';

const Courses = ({ role }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {role === 'teacher' ? 'Manage Courses' : 'My Courses'}
          </h1>
          <p className="text-slate-600 mt-1">
            {role === 'teacher' 
              ? 'Create and manage your courses' 
              : 'All your enrolled courses in one place'}
          </p>
        </div>
        {role === 'teacher' && (
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
            <Plus size={20} />
            New Course
          </button>
        )}
      </div>

      {role === 'teacher' ? (
        <CourseTable courses={teacherCourses} />
      ) : (
        <CourseGrid courses={studentCourses} />
      )}
    </div>
  );
};

export default Courses;
