import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Save } from 'lucide-react';
import api from '../../utils/api';

export default function ProfileSettings() {
  const { user } = useAuth(); // We'll manually update context by re-logging in or just trusting local state
  // Or better, just update window.location.reload() if name changes
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [username, setUsername] = useState(user?.username || '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passMessage, setPassMessage] = useState('');
  const [passError, setPassError] = useState('');

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      await api.put('/user/profile', { fullName, username });
      setMessage('Profile updated successfully! Refresh to see changes globally.');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassLoading(true);
    setPassMessage('');
    setPassError('');
    try {
      await api.put('/user/password', { currentPassword, newPassword });
      setPassMessage('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err: any) {
      setPassError(err.response?.data?.error || 'Failed to update password');
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Profile Info */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Profile Information</h3>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-emerald-600 text-sm">{message}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {loading ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm dark:shadow-none border border-slate-100 dark:border-slate-700">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-6">Change Password</h3>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
            />
          </div>
          
          {passError && <p className="text-red-500 text-sm">{passError}</p>}
          {passMessage && <p className="text-emerald-600 text-sm">{passMessage}</p>}
          
          <button
            type="submit"
            disabled={passLoading}
            className="flex items-center gap-2 bg-slate-800 text-white px-6 py-2 rounded-xl font-medium hover:bg-slate-900 transition-colors disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {passLoading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
