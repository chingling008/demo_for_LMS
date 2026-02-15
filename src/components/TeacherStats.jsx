import { Users, BookOpen, Trophy, DollarSign, TrendingUp } from 'lucide-react';

const iconMap = {
  users: Users,
  bookOpen: BookOpen,
  trophy: Trophy,
  dollarSign: DollarSign,
};

const TeacherStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];
        return (
          <div key={stat.id} className="bg-white rounded-xl p-6 border border-slate-200">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-indigo-50 rounded-xl">
                <Icon size={24} className="text-indigo-600" />
              </div>
              <span className={`flex items-center gap-1 text-sm font-medium ${
                stat.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp size={16} />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
            <p className="text-slate-600 text-sm">{stat.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TeacherStats;
