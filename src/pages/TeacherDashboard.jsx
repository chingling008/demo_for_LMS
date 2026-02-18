import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import TeacherStats from '../components/TeacherStats';
import CourseTable from '../components/CourseTable';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { dashboardApi, coursesApi } from '../services/api';
import { teacherStats, teacherCourses } from '../data/mockData';

const TeacherDashboard = () => {
  const [stats, setStats] = useState(null);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, coursesData] = await Promise.all([
          dashboardApi.getTeacherStats().catch(() => teacherStats),
          coursesApi.getAll('teacher').catch(() => teacherCourses),
        ]);
        setStats(statsData);
        setCourses(coursesData);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
        // Fallback to mock data
        setStats(teacherStats);
        setCourses(teacherCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner fullScreen message="Loading dashboard..." />;
  if (error && !stats) return <ErrorMessage message={error} fullScreen />;

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

      <TeacherStats stats={stats || teacherStats} />

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Your Courses</h2>
      </div>
      
      <CourseTable courses={courses || teacherCourses} />
    </div>
  );
};

export default TeacherDashboard;
