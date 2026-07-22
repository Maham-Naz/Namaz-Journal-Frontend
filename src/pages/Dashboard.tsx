import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCards from '../components/dashboard/StatsCards';
import DynamicCalendar from '../components/calendar/DynamicCalendar';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
          Welcome back, {user?.fullName?.split(' ')[0]}!
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          Track your prayers and maintain consistency in your spiritual journey.
        </p>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DynamicCalendar />
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50 mb-4">Daily Inspiration</h3>
            <div className="flex-1 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl p-6 flex items-center justify-center border border-emerald-100 border-dashed">
              <p className="text-emerald-800 text-center font-medium italic">
                "And establish prayer at the two ends of the day and at the approach of the night..." <br/><br/>
                <span className="text-sm opacity-75">— Quran 11:114</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
