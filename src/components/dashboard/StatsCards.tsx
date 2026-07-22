import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, CalendarCheck, CalendarDays, Flame, Award } from 'lucide-react';
import api from '../../utils/api';

export default function StatsCards() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch overall stats
        const response = await api.get('/prayers/stats');
        setStats(response.data);
      } catch (error) {
        // Silently fail on dashboard
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 h-32 animate-pulse"></div>
        ))}
      </div>
    );
  }

  // Fallback defaults
  const completedDays = stats?.completedDays || 0;
  const totalDays = stats?.totalDays || 0;
  const completionRate = totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100);
  
  const cards = [
    {
      title: "Perfect Days",
      value: completedDays.toString(),
      subtitle: "All 5 prayers",
      icon: Target,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      delay: 0.1
    },
    {
      title: "Overall Completion",
      value: `${completionRate}%`,
      subtitle: "Since joined",
      icon: CalendarCheck,
      color: "text-gold-600",
      bg: "bg-gold-100",
      delay: 0.2
    },
    {
      title: "Days Tracked",
      value: totalDays.toString(),
      subtitle: "Total records",
      icon: CalendarDays,
      color: "text-blue-600",
      bg: "bg-blue-100",
      delay: 0.3
    },
    {
      title: "Current Streak",
      value: (stats?.currentStreak || 0).toString(),
      subtitle: "Days",
      icon: Flame,
      color: "text-orange-500",
      bg: "bg-orange-100",
      delay: 0.4
    },
    {
      title: "Longest Streak",
      value: (stats?.longestStreak || 0).toString(),
      subtitle: "Days",
      icon: Award,
      color: "text-purple-600",
      bg: "bg-purple-100",
      delay: 0.5
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: card.delay }}
            className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            {/* Decorative background element */}
            <div className={`absolute -right-6 -top-6 w-24 h-24 ${card.bg} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500`}></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-2 rounded-xl ${card.bg}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-1">{card.value}</h3>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{card.title}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{card.subtitle}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
