import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import DashboardLayout from '../components/layout/DashboardLayout';
import OverviewStats from '../components/statistics/OverviewStats';
import Charts from '../components/statistics/Charts';
import Heatmap from '../components/statistics/Heatmap';
import api from '../utils/api';

export default function Statistics() {
  const [loading, setLoading] = useState(true);
  
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);

  const [stats, setStats] = useState<any>(null);
  const [yearlyData, setYearlyData] = useState<any[]>([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);

  const years = Array.from({ length: 11 }, (_, i) => 2026 + i);
  const months = [
    { value: 1, label: 'January' }, { value: 2, label: 'February' },
    { value: 3, label: 'March' }, { value: 4, label: 'April' },
    { value: 5, label: 'May' }, { value: 6, label: 'June' },
    { value: 7, label: 'July' }, { value: 8, label: 'August' },
    { value: 9, label: 'September' }, { value: 10, label: 'October' },
    { value: 11, label: 'November' }, { value: 12, label: 'December' }
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const monthStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}`;
        
        // Fetch in parallel
        const [statsRes, yearRes, monthRes] = await Promise.all([
          api.get('/prayers/stats'),
          api.get(`/prayers/year?year=${selectedYear}`),
          api.get(`/prayers?month=${monthStr}`)
        ]);

        setStats(statsRes.data);
        setYearlyData(yearRes.data);
        setMonthlyData(monthRes.data);
      } catch (error) {
        // Silently handle error in production
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [selectedYear, selectedMonth]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 print:hidden">
        <div>
          <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">Statistics & Analytics</h1>
          <p className="text-slate-600 dark:text-slate-300">Deep dive into your prayer consistency.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select 
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm dark:shadow-none"
          >
            {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
          </select>
          
          <select 
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm dark:shadow-none"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>

          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-xl text-sm font-bold hover:bg-emerald-700 transition-colors shadow-sm dark:shadow-none"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export Summary</span>
          </button>
        </div>
      </div>

      {/* Print-only Header */}
      <div className="hidden print:block mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">My Namaz Journal - Summary</h1>
        <p className="text-slate-600 dark:text-slate-300">Generated on {new Date().toLocaleDateString()}</p>
        <hr className="mt-4 border-slate-200 dark:border-slate-700" />
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
        </div>
      ) : (
        stats && (
          <div className="print:space-y-4">
            <OverviewStats stats={stats} />
            <Charts stats={stats} monthlyData={monthlyData} yearlyData={yearlyData} />
            <Heatmap yearlyData={yearlyData} year={selectedYear} />
          </div>
        )
      )}
    </DashboardLayout>
  );
}
