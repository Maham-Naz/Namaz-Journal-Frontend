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
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-950 dark:text-emerald-50 break-words">
          Settings
        </h1>

        <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          Manage your account, preferences, and data.
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row gap-6 sm:gap-8">

        {/* Sidebar */}
        <div className="xl:w-72 flex-shrink-0">

          <nav className="flex xl:flex-col gap-2 overflow-x-auto scrollbar-hide pb-2 xl:pb-0">

            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm sm:text-base font-medium whitespace-nowrap transition-all flex-shrink-0 xl:w-full ${
                    isActive
                      ? tab.id === 'danger'
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-100 shadow-sm'
                        : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-100 shadow-sm'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:shadow-sm'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 shrink-0 ${
                      isActive
                        ? tab.id === 'danger'
                          ? 'text-red-500'
                          : 'text-emerald-500'
                        : 'text-slate-400'
                    }`}
                  />

                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content */}
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
