import { Plus } from 'lucide-react';
import TeacherStats from '../components/TeacherStats';
import CourseTable from '../components/CourseTable';
import { teacherStats, teacherCourses } from '../data/mockData';

const TeacherDashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Welcome back! Here's your overview.</p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors">
          <Plus size={20} />
          New Course
        </button>
      </div>

      <TeacherStats stats={teacherStats} />

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Courses</h2>
      </div>
      
      <CourseTable courses={teacherCourses} />
    </div>
  );
};

export default TeacherDashboard;
