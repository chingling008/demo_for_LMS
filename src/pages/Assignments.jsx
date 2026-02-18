import { Calendar, Clock, CheckCircle, AlertCircle, Upload } from 'lucide-react';
import { studentAssignments, teacherAssignments } from '../data/mockData';

const Assignments = ({ role }) => {
  const assignments = role === 'teacher' ? teacherAssignments : studentAssignments;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
      case 'Graded':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Overdue':
      case 'Late':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Submitted':
      case 'Graded':
        return <CheckCircle size={16} />;
      case 'Pending':
      case 'Overdue':
      case 'Late':
        return <AlertCircle size={16} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">
          {role === 'teacher' ? 'Manage Assignments' : 'My Assignments'}
        </h1>
        <p className="text-slate-600 mt-1">
          {role === 'teacher'
            ? 'Review and grade student submissions'
            : 'Track your assignments and submission deadlines'}
        </p>
      </div>

      {role === 'student' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Pending</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {assignments.filter(a => a.status === 'Pending').length}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Clock className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Submitted</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {assignments.filter(a => a.status === 'Submitted' || a.status === 'Graded').length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <CheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Overdue</p>
                <p className="text-3xl font-bold text-slate-900 mt-1">
                  {assignments.filter(a => a.status === 'Overdue').length}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <AlertCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {role === 'teacher' ? 'Assignment' : 'Title'}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {role === 'teacher' ? 'Course' : 'Course'}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {role === 'teacher' ? 'Submissions' : 'Due Date'}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {role === 'teacher' ? 'Deadline' : 'Grade'}
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-slate-900">{assignment.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-slate-600">{assignment.course}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Calendar size={16} />
                    {role === 'teacher' ? assignment.submissions : assignment.dueDate}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {role === 'teacher' ? (
                    <div className="text-slate-600">{assignment.deadline}</div>
                  ) : (
                    <div className="font-semibold text-slate-900">
                      {assignment.grade || '-'}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(assignment.status)}`}>
                    {getStatusIcon(assignment.status)}
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {role === 'teacher' ? (
                    <button className="text-indigo-600 hover:text-indigo-800 font-semibold">
                      Review
                    </button>
                  ) : assignment.status === 'Pending' ? (
                    <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold ml-auto">
                      <Upload size={16} />
                      Submit
                    </button>
                  ) : (
                    <button className="text-slate-600 hover:text-slate-800 font-semibold">
                      View
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignments;
