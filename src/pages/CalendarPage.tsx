import DashboardLayout from '../components/layout/DashboardLayout';
import DynamicCalendar from '../components/calendar/DynamicCalendar';

export default function CalendarPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950 dark:text-emerald-50 break-words">
          Prayer Calendar
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          View your monthly prayer history and daily records.
        </p>
      </div>

      {/* Calendar Card */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 p-4 sm:p-6 lg:p-8 overflow-x-auto">
        <DynamicCalendar />
      </div>
    </DashboardLayout>
  );
}
