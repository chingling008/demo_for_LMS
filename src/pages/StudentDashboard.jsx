import { useEffect, useState } from 'react';
import ContinueLearning from '../components/ContinueLearning';
import CourseGrid from '../components/CourseGrid';
import CourseModal from '../components/CourseModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { dashboardApi, coursesApi } from '../services/api';
import { continueLearningSuggestion, studentCourses } from '../data/mockData';

const StudentDashboard = () => {
  const [continueLearning, setContinueLearning] = useState(null);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [continueData, coursesData] = await Promise.all([
          dashboardApi.getContinueLearning().catch(() => continueLearningSuggestion),
          coursesApi.getAll('student').catch(() => studentCourses),
        ]);
        setContinueLearning(continueData);
        setCourses(coursesData);
      } catch (err) {
        setError(err.message || 'Failed to load dashboard');
        // Fallback to mock data
        setContinueLearning(continueLearningSuggestion);
        setCourses(studentCourses);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleContinueCourse = () => {
    setSelectedCourse(continueLearning || continueLearningSuggestion);
    setShowCourseModal(true);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  if (loading) return <LoadingSpinner fullScreen message="Loading your courses..." />;
  if (error && !courses) return <ErrorMessage message={error} fullScreen />;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">My Learning</h1>
        <p className="text-slate-600 mt-1">Continue where you left off and explore new courses.</p>
      </div>

      <ContinueLearning 
        course={continueLearning || continueLearningSuggestion} 
        onContinue={handleContinueCourse}
      />

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">All Courses</h2>
        <p className="text-slate-600 mt-1">Browse all your enrolled courses</p>
      </div>

      <CourseGrid 
        courses={courses || studentCourses} 
        onCourseClick={handleCourseClick}
      />

      <CourseModal
        isOpen={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        course={selectedCourse}
      />
    </div>
  );
};

export default StudentDashboard;
