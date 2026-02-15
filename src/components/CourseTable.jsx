import { Edit, BarChart3, Users } from 'lucide-react';

const CourseTable = ({ courses }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Course Title</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Students</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Completion</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Revenue</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {courses.map((course) => (
            <tr key={course.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4">
                <span className="font-medium text-slate-900">{course.title}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 text-slate-600">
                  <Users size={16} />
                  <span>{course.students}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-2 max-w-[100px]">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${course.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-slate-600">{course.completion}%</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="font-medium text-slate-900">{course.revenue}</span>
              </td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  course.status === 'Active'
                    ? 'bg-green-50 text-green-700'
                    : 'bg-yellow-50 text-yellow-700'
                }`}>
                  {course.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group">
                    <Edit size={16} className="text-slate-400 group-hover:text-indigo-600" />
                  </button>
                  <button className="p-2 hover:bg-indigo-50 rounded-lg transition-colors group">
                    <BarChart3 size={16} className="text-slate-400 group-hover:text-indigo-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
