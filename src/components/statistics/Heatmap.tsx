import { motion } from 'framer-motion';

interface HeatmapProps {
  yearlyData: any[];
  year: number;
}

export default function Heatmap({ yearlyData, year }: HeatmapProps) {
  
  // Create a map of date (YYYY-MM-DD) to completion status
  const dateMap = new Map<string, number>();
  
  yearlyData.forEach(record => {
    const count = [record.fajr, record.dhuhr, record.asr, record.maghrib, record.isha].filter(Boolean).length;
    dateMap.set(record.date, count);
  });

  // Calculate grid cells for the year
  const generateGrid = () => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);
    
    // Find the first Sunday before or on Jan 1st
    const startGrid = new Date(startDate);
    startGrid.setDate(startGrid.getDate() - startGrid.getDay());
    
    const weeks = [];
    let currentDay = new Date(startGrid);
    
    while (currentDay <= endDate || currentDay.getDay() !== 0) {
      const week = [];
      for (let i = 0; i < 7; i++) {
        // If currentDay > endDate, we still fill the week but it's empty visually (or out of year)
        // Just for layout
        if (currentDay.getFullYear() === year) {
          const dateStr = `${currentDay.getFullYear()}-${String(currentDay.getMonth() + 1).padStart(2, '0')}-${String(currentDay.getDate()).padStart(2, '0')}`;
          const count = dateMap.get(dateStr) || 0;
          week.push({ date: dateStr, count, inYear: true });
        } else {
          week.push({ date: null, count: 0, inYear: false });
        }
        currentDay.setDate(currentDay.getDate() + 1);
      }
      weeks.push(week);
      if (currentDay > endDate) break;
    }
    
    return weeks;
  };

  const weeks = generateGrid();
  
  const getColor = (count: number) => {
    if (count === 5) return 'bg-emerald-500';
    if (count > 0) return 'bg-amber-400';
    return 'bg-slate-100 dark:bg-slate-800';
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 p-6 mt-6 overflow-x-auto"
    >
      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">Yearly Contribution</h3>
      
      <div className="min-w-[800px]">
        {/* Month labels */}
        <div className="flex ml-8 mb-2">
          {months.map((m) => (
            <div key={m} className="flex-1 text-xs text-slate-500 dark:text-slate-400">{m}</div>
          ))}
        </div>

        <div className="flex gap-1">
          {/* Day labels */}
          <div className="flex flex-col gap-1 pr-2 text-[10px] text-slate-400 justify-between py-1">
            <span>Sun</span>
            <span>Tue</span>
            <span>Thu</span>
            <span>Sat</span>
          </div>

          {/* Grid */}
          <div className="flex gap-1 flex-1">
            {weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1">
                {week.map((day, dIdx) => (
                  <div 
                    key={dIdx}
                    title={day.inYear ? `${day.date}: ${day.count} prayers` : ''}
                    className={`w-3 h-3 rounded-sm ${day.inYear ? getColor(day.count) : 'bg-transparent'} ${day.inYear ? 'hover:ring-2 hover:ring-offset-1 hover:ring-slate-300 cursor-pointer transition-all' : ''}`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Less</span>
          <div className="w-3 h-3 rounded-sm bg-slate-100 dark:bg-slate-800"></div>
          <div className="w-3 h-3 rounded-sm bg-amber-400"></div>
          <div className="w-3 h-3 rounded-sm bg-emerald-500"></div>
          <span>More</span>
        </div>
      </div>
    </motion.div>
  );
}
