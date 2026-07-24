import { WifiOff } from 'lucide-react';

export default function ServerError() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-50 text-red-500 rounded-full animate-pulse">
            <WifiOff className="h-10 w-10 sm:h-12 sm:w-12" />
          </div>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Connection Lost</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-8">
          We're having trouble connecting to the server. Please check your internet connection and try again.
        </p>
        <button 
          onClick={() => window.location.href = '/dashboard'}
          className="inline-block bg-slate-800 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-900 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
}
