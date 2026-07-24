import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/layout/DashboardLayout';
import StatsCards from '../components/dashboard/StatsCards';
import DynamicCalendar from '../components/calendar/DynamicCalendar';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950 dark:text-emerald-50 break-words">
          Welcome back,
          <span className="block sm:inline sm:ml-2">
            {user?.fullName?.split(' ')[0]}!
          </span>
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Track your prayers and maintain consistency in your spiritual journey.
        </p>
      </div>

      {/* Stats */}
      <StatsCards />

      {/* Main Content */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">

        {/* Calendar */}
        <div className="xl:col-span-2">
          <DynamicCalendar />
        </div>

        {/* Inspiration Card */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 h-full flex flex-col p-5 sm:p-6">

            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50 mb-4">
              Daily Inspiration
            </h3>

            <div className="flex-1 flex items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50 dark:bg-emerald-900/30 p-5 sm:p-6">

              <p className="text-center italic text-emerald-800 dark:text-emerald-100 text-sm sm:text-base leading-relaxed">
                "And establish prayer at the two ends of the day and at the approach of the night..."
                <br />
                <br />
                <span className="text-xs sm:text-sm opacity-75">
                  — Quran 11:114
                </span>
              </p>

            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
