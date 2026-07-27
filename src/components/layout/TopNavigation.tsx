import { Menu, Sun, Moon, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/logo.png';

interface TopNavigationProps {
  onMenuClick: () => void;
}

export default function TopNavigation({
  onMenuClick,
}: TopNavigationProps) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Left */}
        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="My Namaz Journal"
              className="w-10 h-10 object-contain shrink-0"
            />

            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight text-emerald-700 dark:text-emerald-400">
                My Namaz Journal
              </h1>
            </div>

          </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-4 sm:gap-5">

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <div className="hidden sm:flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-5">

            <div className="bg-emerald-100 dark:bg-emerald-900/40 rounded-full p-2">
              <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
            </div>

            <span className="font-medium text-slate-700 dark:text-slate-200">
              {user?.fullName || 'User'}
            </span>

          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-500 dark:text-slate-300 hover:text-red-600 transition"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
            <span className="hidden sm:block font-medium">
              Logout
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}

