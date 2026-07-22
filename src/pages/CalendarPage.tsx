import DashboardLayout from '../components/layout/DashboardLayout';
import DynamicCalendar from '../components/calendar/DynamicCalendar';

export default function CalendarPage() {
  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
          Prayer Calendar
        </h1>
        <p className="text-slate-600 dark:text-slate-300">
          View your monthly prayer history and daily records.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 p-6 lg:p-8">
        <DynamicCalendar />
      </div>
    </DashboardLayout>
  );
}
