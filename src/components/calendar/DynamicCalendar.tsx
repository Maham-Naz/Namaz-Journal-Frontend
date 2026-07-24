import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import api from '../../utils/api';
import PrayerPanel from './PrayerPanel';

interface MonthlyRecord {
  date: string;
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export default function DynamicCalendar() {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [monthlyRecords, setMonthlyRecords] = useState<MonthlyRecord[]>([]);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Generate years from 2026 to 2036
  const years = Array.from({ length: 11 }, (_, i) => 2026 + i);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Calendar logic
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  // Fetch monthly data whenever month/year changes
  const fetchMonthlyData = async () => {
    try {
      const monthFormatted = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}`;
      const response = await api.get(`/prayers?month=${monthFormatted}`);
      setMonthlyRecords(response.data);
    } catch (error) {
      // Silently fail
    } finally { }
  };

  useEffect(() => {
    fetchMonthlyData();
  }, [currentYear, currentMonth]);

  // Memoize the calendar grid calculation
  const calendarGrid = useMemo(() => {
    const grid = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
      const row = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          row.push(null); // Empty cells before the 1st
        } else if (day > daysInMonth) {
          row.push(null); // Empty cells after the last day
        } else {
          row.push(day);
          day++;
        }
      }
      grid.push(row);
      if (day > daysInMonth) break;
    }
    return grid;
  }, [currentYear, currentMonth, daysInMonth, firstDayOfMonth]);

  const handlePrevMonth = () => {
    setDirection(-1);
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(today);
    // Don't open panel automatically on "Today" click unless desired
  };

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth === selectedDate.getMonth() &&
      currentYear === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    setIsPanelOpen(true);
  };

  // Determine color for a specific day
  const getDayColorClass = (day: number) => {
    const dateFormatted = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = monthlyRecords.find(r => r.date === dateFormatted);
    
    if (!record) return 'hover:bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:text-slate-50'; // Gray/Default

    const prayers = [record.fajr, record.dhuhr, record.asr, record.maghrib, record.isha];
    const completedCount = prayers.filter(Boolean).length;

    if (completedCount === 5) {
      return 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200'; // Green
    } else if (completedCount > 0) {
      return 'bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200'; // Yellow
    }

    return 'hover:bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:text-slate-50'; // Gray/Default
  };

  const [direction, setDirection] = useState(0);

  return (
    <>
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Calendar Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 bg-slate-50/50">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center sm:justify-start">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl shrink-0">
              <CalendarIcon className="h-5 w-5" />
            </div>
            <h2 className="text-base sm:text-xl font-bold text-emerald-950 dark:text-emerald-50 whitespace-nowrap">
              {months[currentMonth]}
            </h2>
            
            <div className="relative">
              <select
                value={currentYear}
                onChange={handleYearChange}
                className="appearance-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-1.5 pl-3 pr-8 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm dark:shadow-none"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500 dark:text-slate-400">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToday}
              className="px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-50 dark:bg-emerald-900/30 hover:bg-emerald-100 rounded-lg transition-colors"
            >
              Today
            </button>
            <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5">
              <button
                onClick={handlePrevMonth}
                className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-white dark:bg-slate-800 hover:text-emerald-600 hover:shadow-sm dark:shadow-none transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-1.5 rounded-md text-slate-500 dark:text-slate-400 hover:bg-white dark:bg-slate-800 hover:text-emerald-600 hover:shadow-sm dark:shadow-none transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-3 sm:p-6">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-slate-400 uppercase tracking-wider py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentYear}-${currentMonth}`}
                initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-7 gap-1 sm:gap-2"
              >
                {calendarGrid.map((row, rowIndex) => (
                  row.map((day, colIndex) => {
                    const key = `${rowIndex}-${colIndex}`;
                    if (!day) {
                      return <div key={key} className="h-10 sm:h-12 md:h-14"></div>;
                    }

                    const todayFlag = isToday(day);
                    const selectedFlag = isSelected(day) && isPanelOpen;
                    const colorClass = getDayColorClass(day);

                    return (
                      <button
                        key={key}
                        onClick={() => handleDateClick(day)}
                        className={`
                          h-10 sm:h-12 md:h-14 w-full rounded-xl flex items-center justify-center text-sm sm:text-base transition-all duration-200 relative border
                          ${selectedFlag 
                            ? 'ring-2 ring-offset-2 ring-emerald-500 scale-105 z-10 font-bold' 
                            : colorClass
                          }
                          ${!selectedFlag && !colorClass.includes('bg-') ? 'border-transparent' : ''}
                        `}
                      >
                        <span className="relative z-10">{day}</span>
                        
                        {/* Today indicator dot */}
                        {todayFlag && (
                          <div className={`absolute bottom-1.5 sm:bottom-2 w-1.5 h-1.5 rounded-full ${colorClass.includes('bg-emerald') ? 'bg-white dark:bg-slate-800' : 'bg-emerald-600'}`}></div>
                        )}
                      </button>
                    );
                  })
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <PrayerPanel 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
        date={selectedDate} 
        onUpdate={fetchMonthlyData} // Refresh colors automatically
      />
    </>
  );
}
