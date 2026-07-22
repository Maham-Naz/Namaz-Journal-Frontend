import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-full">
            <ShieldAlert className="h-12 w-12" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">404</h1>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/dashboard"
          className="inline-block bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}
