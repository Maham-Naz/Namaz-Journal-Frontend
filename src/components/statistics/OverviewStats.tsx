import { motion } from 'framer-motion';
import { Target, CheckCircle2, Percent, Sunrise, Sun, Sunset, Moon } from 'lucide-react';

interface OverviewStatsProps {
  stats: {
    totalDays: number;
    completedDays: number;
    breakdown: {
      fajr: number;
      dhuhr: number;
      asr: number;
      maghrib: number;
      isha: number;
    }
  };
}

export default function OverviewStats({ stats }: OverviewStatsProps) {
  const { totalDays, completedDays, breakdown } = stats;
  
  const overallPercentage = totalDays === 0 ? 0 : Math.round((completedDays / totalDays) * 100);
  
  const getPercentage = (count: number) => {
    if (totalDays === 0) return 0;
    return Math.round((count / totalDays) * 100);
  };

  const cards = [
    { title: "Total Tracked", value: totalDays, icon: Target, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Perfect Days", value: completedDays, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-100" },
    { title: "Overall %", value: `${overallPercentage}%`, icon: Percent, color: "text-purple-600", bg: "bg-purple-100" },
  ];

  const prayers = [
    { name: "Fajr", value: getPercentage(breakdown.fajr), icon: Sunrise, color: "text-sky-500" },
    { name: "Dhuhr", value: getPercentage(breakdown.dhuhr), icon: Sun, color: "text-amber-500" },
    { name: "Asr", value: getPercentage(breakdown.asr), icon: Sun, color: "text-orange-500" },
    { name: "Maghrib", value: getPercentage(breakdown.maghrib), icon: Sunset, color: "text-rose-500" },
    { name: "Isha", value: getPercentage(breakdown.isha), icon: Moon, color: "text-indigo-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl ${card.bg}`}>
                <Icon className={`h-6 w-6 ${card.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.title}</p>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{card.value}</h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Individual Prayer Percentages */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 p-6 sm:p-8">
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Prayer Completion Rates</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {prayers.map((prayer, i) => {
            const Icon = prayer.icon;
            return (
              <motion.div
                key={prayer.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.05) }}
                className="flex flex-col items-center justify-center text-center group"
              >
                <div className="relative mb-3">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="36" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                    <circle 
                      cx="40" cy="40" r="36" 
                      stroke="currentColor" 
                      strokeWidth="6" 
                      fill="transparent" 
                      strokeDasharray="226.19" 
                      strokeDashoffset={226.19 - (226.19 * prayer.value) / 100}
                      className={`${prayer.color} transition-all duration-1000 ease-out`} 
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className={`h-6 w-6 ${prayer.color} group-hover:scale-110 transition-transform`} />
                  </div>
                </div>
                <p className="font-semibold text-slate-800 dark:text-slate-100">{prayer.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{prayer.value}%</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
