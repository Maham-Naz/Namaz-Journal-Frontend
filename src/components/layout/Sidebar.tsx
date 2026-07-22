import { LayoutDashboard, CalendarDays, BarChart2, Settings, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, disabled: false },
    { name: 'Prayer Calendar', path: '/calendar', icon: CalendarDays, disabled: false },
    { name: 'Statistics', path: '/statistics', icon: BarChart2, disabled: false },
    { name: 'Settings', path: '/settings', icon: Settings, disabled: false },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar component */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-emerald-950 text-emerald-50 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 lg:hidden border-b border-emerald-900/50">
          <span className="text-lg font-bold text-white">Menu</span>
          <button onClick={onClose} className="p-2 text-emerald-300 hover:text-white rounded-md">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-2 mt-4 lg:mt-0">
          <div className="text-xs font-semibold text-emerald-400/70 uppercase tracking-wider mb-2 px-3">
            Main Menu
          </div>
          
          <nav className="flex-1 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return item.disabled ? (
                <div 
                  key={item.name}
                  className="flex items-center gap-3 px-3 py-3 text-emerald-400/50 rounded-xl cursor-not-allowed group relative"
                  title="Coming in a future phase"
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                  <span className="ml-auto text-[10px] uppercase bg-emerald-900/50 px-2 py-0.5 rounded-full text-emerald-500">Soon</span>
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-emerald-800/80 text-white shadow-sm dark:shadow-none border border-emerald-700/50' 
                      : 'text-emerald-200 hover:bg-emerald-900/50 hover:text-white'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? 'text-gold-400' : ''}`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
