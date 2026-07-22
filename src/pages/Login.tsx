import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, EyeOff, Eye, Moon, ArrowRight, Loader2, XCircle } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/login', formData);
      await checkAuth(); // Update global state
      navigate('/dashboard');
    } catch (err: any) {
      // For security, standardizing generic invalid message even if specific error is returned, but using backend message if possible
      setError(err.response?.data?.error || 'Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold-200/40 rounded-full mix-blend-multiply filter blur-3xl"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-3 bg-emerald-100 rounded-2xl group-hover:bg-emerald-200 transition">
              <Moon className="h-8 w-8 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">Namaz Journal</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-emerald-950 dark:text-emerald-50">
          Welcome Back
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
          Or{' '}
          <Link to="/register" className="font-medium text-emerald-600 hover:text-emerald-500 transition">
            create a new account
          </Link>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="glass py-8 px-4 sm:rounded-3xl sm:px-10 border border-white/40 shadow-2xl shadow-emerald-900/5">
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
              <XCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Username</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type="text"
                  required
                  disabled={loading}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm dark:shadow-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/50 focus:bg-white dark:bg-slate-800 disabled:opacity-50"
                  placeholder="Enter your username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  className="appearance-none block w-full pl-10 pr-10 px-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm dark:shadow-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/50 focus:bg-white dark:bg-slate-800 disabled:opacity-50"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  disabled={loading}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center disabled:opacity-50"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-emerald-500 transition" />
                  ) : (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-emerald-500 transition" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  disabled={loading}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 rounded cursor-pointer disabled:opacity-50"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-200 cursor-pointer">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500 transition">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition transform hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Signing In...
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
