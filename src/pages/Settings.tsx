import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import ProfileSettings from '../components/settings/ProfileSettings';
import PreferencesSettings from '../components/settings/PreferencesSettings';
import DataSettings from '../components/settings/DataSettings';
import DangerZone from '../components/settings/DangerZone';
import { User, Sliders, Database, ShieldAlert } from 'lucide-react';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Sliders },
    { id: 'data', label: 'Data & Backup', icon: Database },
    { id: 'danger', label: 'Danger Zone', icon: ShieldAlert },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-300">Manage your account, preferences, and data.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? tab.id === 'danger' 
                        ? 'bg-red-50 text-red-700 shadow-sm dark:shadow-none border border-red-100' 
                        : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 shadow-sm dark:shadow-none border border-emerald-100'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:bg-slate-800 hover:shadow-sm dark:shadow-none border border-transparent'
                  }`}
                >
                  <Icon className={`h-5 w-5 ${isActive ? (tab.id === 'danger' ? 'text-red-500' : 'text-emerald-500') : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && <ProfileSettings />}
          {activeTab === 'preferences' && <PreferencesSettings />}
          {activeTab === 'data' && <DataSettings />}
          {activeTab === 'danger' && <DangerZone />}
        </div>
      </div>
    </DashboardLayout>
  );
}
