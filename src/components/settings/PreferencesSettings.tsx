import { useState, useEffect } from 'react';
import { Moon, Calendar, LayoutTemplate } from 'lucide-react';

export default function PreferencesSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [defaultView, setDefaultView] = useState('month');
  const [defaultPage, setDefaultPage] = useState('dashboard');

  useEffect(() => {
    // Load from local storage
    const savedDark = localStorage.getItem('namaz_dark_mode') === 'true';
    const savedView = localStorage.getItem('namaz_default_view') || 'month';
    const savedPage = localStorage.getItem('namaz_default_page') || 'dashboard';

    setDarkMode(savedDark);
    setDefaultView(savedView);
    setDefaultPage(savedPage);
  }, []);

  const handleDarkToggle = () => {
    const newVal = !darkMode;
    setDarkMode(newVal);
    localStorage.setItem('namaz_dark_mode', String(newVal));
  };

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setDefaultView(newVal);
    localStorage.setItem('namaz_default_view', newVal);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newVal = e.target.value;
    setDefaultPage(newVal);
    localStorage.setItem('namaz_default_page', newVal);
  };

  return (
    <div className="max-w-2xl bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 space-y-8">
      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">UI Preferences</h3>
      
      <div className="space-y-6">
        
        {/* Dark Mode */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
              <Moon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">Dark Mode</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Toggle dark UI theme</p>
            </div>
          </div>
          <button 
            onClick={handleDarkToggle}
            className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${darkMode ? 'bg-indigo-500' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 bg-white dark:bg-slate-800 rounded-full absolute transition-transform ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}></div>
          </button>
        </div>

        {/* Default Calendar */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">Default Calendar View</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">How the calendar renders initially</p>
            </div>
          </div>
          <select 
            value={defaultView}
            onChange={handleViewChange}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-1.5 px-3 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="month">Month View</option>
            <option value="week">Week View</option>
          </select>
        </div>

        {/* Default Page */}
        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <LayoutTemplate className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-100">Default Landing Page</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Page to show after login</p>
            </div>
          </div>
          <select 
            value={defaultPage}
            onChange={handlePageChange}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-1.5 px-3 rounded-lg text-sm font-medium outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="dashboard">Dashboard</option>
            <option value="calendar">Calendar</option>
            <option value="statistics">Statistics</option>
          </select>
        </div>

      </div>
      <p className="text-xs text-slate-400 mt-4">* Preferences are saved automatically to your device.</p>
    </div>
  );
}
