import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AlertTriangle, Trash2 } from 'lucide-react';
import api from '../../utils/api';

export default function DangerZone() {
  const { logout } = useAuth();
  const [isConfirming, setIsConfirming] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.delete('/user', { data: { password } });
      // Successfully deleted. The backend clears the cookie.
      // We just need to log out the frontend context.
      logout();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to delete account');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm dark:shadow-none border border-red-100 space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-100 text-red-600 rounded-xl">
          <AlertTriangle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">Danger Zone</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Once you delete your account, there is no going back. Please be certain.</p>
        </div>
      </div>

      {!isConfirming ? (
        <button 
          onClick={() => setIsConfirming(true)}
          className="mt-4 px-6 py-2 border-2 border-red-200 text-red-600 font-bold rounded-xl hover:bg-red-50 transition-colors"
        >
          Delete Account
        </button>
      ) : (
        <div className="mt-4 p-6 bg-red-50 rounded-2xl border border-red-200">
          <h4 className="font-bold text-red-800 mb-2">Are you absolutely sure?</h4>
          <p className="text-sm text-red-700 mb-6">
            This action cannot be undone. This will permanently delete your account, prayer records, and all associated data.
          </p>

          <form onSubmit={handleDelete} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-red-800 mb-1">Enter your password to confirm</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Current password"
                className="w-full px-4 py-2 border border-red-300 rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-50"
              />
            </div>
            
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

            <div className="flex items-center gap-3 pt-2">
              <button 
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Deleting...' : <><Trash2 className="h-4 w-4" /> Delete Permanently</>}
              </button>
              <button 
                type="button"
                onClick={() => { setIsConfirming(false); setPassword(''); setError(''); }}
                disabled={loading}
                className="px-4 py-2 text-slate-600 dark:text-slate-300 font-medium hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
