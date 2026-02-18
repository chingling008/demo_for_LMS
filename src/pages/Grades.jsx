import { Award, TrendingUp, TrendingDown } from 'lucide-react';
import { studentGrades, gradeStats } from '../data/mockData';

const Grades = () => {
  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-600 bg-green-100';
    if (grade >= 80) return 'text-blue-600 bg-blue-100';
    if (grade >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getLetterGrade = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">My Grades</h1>
        <p className="text-slate-600 mt-1">Track your academic performance across all courses</p>
      </div>

      {/* Grade Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-indigo-600 p-3 rounded-lg">
              <Award className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-slate-600 text-sm mb-1">Overall GPA</h3>
          <p className="text-3xl font-bold text-slate-900">{gradeStats.gpa}</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-600 p-3 rounded-lg">
              <TrendingUp className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-slate-600 text-sm mb-1">Average Score</h3>
          <p className="text-3xl font-bold text-slate-900">{gradeStats.average}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-600 p-3 rounded-lg">
              <Award className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-slate-600 text-sm mb-1">Highest Grade</h3>
          <p className="text-3xl font-bold text-slate-900">{gradeStats.highest}%</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-amber-600 p-3 rounded-lg">
              <TrendingDown className="text-white" size={24} />
            </div>
          </div>
          <h3 className="text-slate-600 text-sm mb-1">Lowest Grade</h3>
          <p className="text-3xl font-bold text-slate-900">{gradeStats.lowest}%</p>
        </div>
      </div>

      {/* Grades by Course */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Grades by Course</h2>
        </div>
        
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Assignment
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Score
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Letter Grade
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                Submitted
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {studentGrades.map((grade) => (
              <tr key={grade.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-slate-900">{grade.course}</div>
                  <div className="text-sm text-slate-600">{grade.instructor}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-slate-900">{grade.assignment}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{grade.score}%</span>
                    <span className="text-sm text-slate-600">({grade.points}/{grade.maxPoints})</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getGradeColor(grade.score)}`}>
                    {getLetterGrade(grade.score)}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {grade.weight}%
                </td>
                <td className="px-6 py-4 text-slate-600">
                  {grade.submittedDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Grade Distribution */}
      <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-4">Grade Distribution</h3>
        <div className="grid grid-cols-5 gap-4">
          {[
            { letter: 'A', count: 8, color: 'bg-green-500' },
            { letter: 'B', count: 5, color: 'bg-blue-500' },
            { letter: 'C', count: 2, color: 'bg-yellow-500' },
            { letter: 'D', count: 1, color: 'bg-orange-500' },
            { letter: 'F', count: 0, color: 'bg-red-500' },
          ].map((grade) => (
            <div key={grade.letter} className="text-center">
              <div className={`${grade.color} text-white rounded-lg py-8 mb-2`}>
                <div className="text-3xl font-bold">{grade.count}</div>
              </div>
              <div className="font-semibold text-slate-900">Grade {grade.letter}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Grades;
