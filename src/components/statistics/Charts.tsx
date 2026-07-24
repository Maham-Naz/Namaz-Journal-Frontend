import { useMemo } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { motion } from 'framer-motion';

interface ChartsProps {
  stats: any; // Using any for brevity, typically would strongly type this
  monthlyData: any[];
  yearlyData: any[];
}

export default function Charts({ stats, monthlyData, yearlyData }: ChartsProps) {
  
  // Format monthly data for Bar Chart
  const formattedMonthly = useMemo(() => {
    // Generate an array of 1..31 based on monthlyData
    // For simplicity, we just count how many prayers were done each day
    return monthlyData.map(record => {
      const day = parseInt(record.date.split('-')[2]);
      const count = [record.fajr, record.dhuhr, record.asr, record.maghrib, record.isha].filter(Boolean).length;
      return { day, count };
    });
  }, [monthlyData]);

  // Format pie chart data
  const pieData = [
    { name: 'Fajr', value: stats.breakdown.fajr, color: '#0ea5e9' },
    { name: 'Dhuhr', value: stats.breakdown.dhuhr, color: '#f59e0b' },
    { name: 'Asr', value: stats.breakdown.asr, color: '#f97316' },
    { name: 'Maghrib', value: stats.breakdown.maghrib, color: '#f43f5e' },
    { name: 'Isha', value: stats.breakdown.isha, color: '#6366f1' }
  ];

  // Format yearly trend data
  const formattedYearly = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const counts = new Array(12).fill(0);
    
    yearlyData.forEach(record => {
      const monthIdx = parseInt(record.date.split('-')[1]) - 1;
      const completed = record.fajr && record.dhuhr && record.asr && record.maghrib && record.isha;
      if (completed) {
        counts[monthIdx]++;
      }
    });

    return months.map((month, idx) => ({ month, perfectDays: counts[idx] }));
  }, [yearlyData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      
      {/* Monthly Bar Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 p-4 sm:p-6"
      >
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 sm:mb-6">Daily Prayers This Month</h3>
        <div className="h-56 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={formattedMonthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <RechartsTooltip 
                cursor={{ fill: '#f1f5f9' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* Pie Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 p-4 sm:p-6"
      >
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Prayer Distribution</h3>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-4">Total recorded instances by prayer type</p>
        <div className="h-52 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={window.innerWidth < 640 ? 40 : 60}
                outerRadius={window.innerWidth < 640 ? 70 : 90}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-2">
          {pieData.map(item => (
            <div key={item.name} className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }}></div>
              {item.name}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Yearly Line Chart */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 p-4 sm:p-6 lg:col-span-2"
      >
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-4 sm:mb-6">Yearly Perfect Days Trend</h3>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedYearly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="perfectDays" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  );
}
