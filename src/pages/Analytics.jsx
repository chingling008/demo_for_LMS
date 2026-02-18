import { TrendingUp, BarChart3, Users, Award } from 'lucide-react';
import { analyticsData, engagementData, topPerformers } from '../data/mockData';

const Analytics = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
        <p className="text-slate-600 mt-1">Track performance and engagement across your courses</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {analyticsData.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                {stat.icon === 'trending' && <TrendingUp size={24} className="text-white" />}
                {stat.icon === 'chart' && <BarChart3 size={24} className="text-white" />}
                {stat.icon === 'users' && <Users size={24} className="text-white" />}
                {stat.icon === 'award' && <Award size={24} className="text-white" />}
              </div>
              <span className={`text-sm font-semibold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-slate-600 text-sm mb-1">{stat.title}</h3>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Student Engagement</h3>
          <div className="space-y-4">
            {engagementData.map((course) => (
              <div key={course.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">{course.name}</span>
                  <span className="text-sm text-slate-600">{course.engagement}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all"
                    style={{ width: `${course.engagement}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topPerformers.map((student, index) => (
              <div key={student.id} className="flex items-center gap-4">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-slate-400' : 'bg-orange-600'
                }`}>
                  {index + 1}
                </div>
                <div className="text-2xl">{student.avatar}</div>
                <div className="flex-1">
                  <div className="font-semibold text-slate-900">{student.name}</div>
                  <div className="text-sm text-slate-600">{student.course}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">{student.score}%</div>
                  <div className="text-sm text-slate-600">{student.assignments} tasks</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Performance */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Course Performance Overview</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Enrolled</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Avg. Score</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Completion</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Satisfaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {engagementData.map((course) => (
                  <tr key={course.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{course.name}</td>
                    <td className="px-6 py-4 text-slate-600">{course.enrolled}</td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-slate-900">{course.avgScore}%</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-slate-200 rounded-full h-2 max-w-[100px]">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${course.completion}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-slate-600">{course.completion}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{course.satisfaction}/5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
