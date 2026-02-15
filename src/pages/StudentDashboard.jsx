import ContinueLearning from '../components/ContinueLearning';
import CourseGrid from '../components/CourseGrid';
import { continueLearningSuggestion, studentCourses } from '../data/mockData';

const StudentDashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">My Learning</h1>
        <p className="text-slate-600 mt-1">Continue where you left off and explore new courses.</p>
      </div>

      <ContinueLearning course={continueLearningSuggestion} />

      <div className="mb-4">
        <h2 className="text-xl font-bold text-slate-900">All Courses</h2>
        <p className="text-slate-600 mt-1">Browse all your enrolled courses</p>
      </div>

      <CourseGrid courses={studentCourses} />
    </div>
  );
};

export default StudentDashboard;
