import { Menu, Sun, Moon, User, LogOut } from 'lucide-react';
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

  return (
    <header className="sticky top-0 z-30 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">

      <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-3">

            <img
              src={logo}
              alt="Namaz Journal"
              className="w-10 h-10 rounded-xl"
            />

            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-emerald-700">
                My Namaz Journal
              </h1>
            </div>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-5">

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>

          <div className="hidden sm:flex items-center gap-2">

            <div className="bg-emerald-100 rounded-full p-2">

              <User className="w-4 h-4 text-emerald-700" />

            </div>

            <span className="font-medium">
              {user?.fullName}
            </span>

          </div>

          <button
            onClick={logout}
            className="flex items-center gap-2 text-slate-500 hover:text-red-600 transition"
          >

            <LogOut className="w-5 h-5" />

            <span className="hidden sm:block">
              Logout
            </span>

          </button>

        </div>

      </div>

    </header>
  );
}
