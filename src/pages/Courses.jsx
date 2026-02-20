import { useState } from 'react';
import CourseGrid from '../components/CourseGrid';
import CourseTable from '../components/CourseTable';
import CourseModal from '../components/CourseModal';
import CourseEditModal from '../components/CourseEditModal';
import { studentCourses, teacherCourses } from '../data/mockData';
import { Plus } from 'lucide-react';

const Courses = ({ role }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [courses, setCourses] = useState(role === 'teacher' ? teacherCourses : studentCourses);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  const handleCreateCourse = () => {
    setSelectedCourse({
      id: courses.length + 1,
      title: '',
      description: '',
      duration: '10 hours',
      totalLessons: 10,
      thumbnail: '📚',
      status: 'Draft',
    });
    setShowCreateModal(true);
  };

  const handleSaveCourse = (updatedCourse) => {
    setCourses(courses.map(c => 
      c.id === updatedCourse.id ? updatedCourse : c
    ));
  };

  const handleViewAnalytics = (course) => {
    alert(`📊 Analytics for "${course.title}":\n\n• Students: ${course.students}\n• Completion: ${course.completion}%\n• Revenue: ${course.revenue}\n\nDetailed analytics coming soon!`);
  };

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
          <button 
            onClick={handleCreateCourse}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            <Plus size={20} />
            New Course
          </button>
        )}
      </div>

      {role === 'teacher' ? (
        <CourseTable 
          courses={courses} 
          onEdit={handleEditCourse}
          onViewAnalytics={handleViewAnalytics}
        />
      ) : (
        <CourseGrid 
          courses={courses}
          onCourseClick={handleCourseClick}
        />
      )}

      {/* Student Course Viewer */}
      <CourseModal
        isOpen={showCourseModal}
        onClose={() => setShowCourseModal(false)}
        course={selectedCourse}
      />

      {/* Teacher Course Editor */}
      <CourseEditModal
        isOpen={showEditModal || showCreateModal}
        onClose={() => {
          setShowEditModal(false);
          setShowCreateModal(false);
        }}
        course={selectedCourse}
        onSave={handleSaveCourse}
      />
    </div>
  );
};

export default Courses;
