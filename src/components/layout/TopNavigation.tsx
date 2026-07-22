import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Moon, LogOut, User, Sun, Menu } from 'lucide-react';

interface TopNavigationProps {
  onMenuClick: () => void;
}

export default function TopNavigation({ onMenuClick }: TopNavigationProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-30 shadow-sm dark:shadow-none">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Moon className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="text-xl font-bold text-emerald-950 dark:text-emerald-50 hidden sm:block">
              Namaz Journal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            onClick={toggleTheme}
            className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            title="Toggle Dark Mode"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6">
            <div className="bg-emerald-100 p-1.5 rounded-full">
              <User className="h-4 w-4 text-emerald-700" />
            </div>
            <span className="font-medium text-slate-700 dark:text-slate-200">{user?.fullName || 'User'}</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}
