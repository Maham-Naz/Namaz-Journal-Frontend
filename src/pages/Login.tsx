import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  XCircle,
} from 'lucide-react';

import logo from '../assets/logo.png';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true);

      await api.post('/auth/login', formData);

      await checkAuth();

      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          'Invalid username or password.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >

        {/* Logo */}

        <div className="flex flex-col items-center mb-8">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <img
              src={logo}
              alt="Namaz Journal"
              className="w-14 h-14 rounded-2xl"
            />

            <h1 className="text-2xl font-bold text-emerald-700">
              My Namaz Journal
            </h1>
          </Link>

          <p className="mt-2 text-slate-500">
            Welcome Back
          </p>

        </div>

        {/* Card */}

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 flex gap-2 text-red-600 text-sm">
              <XCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Username */}

            <div>

              <label className="text-sm font-medium">
                Username
              </label>

              <div className="relative mt-2">

                <User className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500" />

                <input
                  type="text"
                  value={formData.username}
                  disabled={isLoading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      username: e.target.value,
                    })
                  }
                  placeholder="Enter username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-slate-700"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="text-sm font-medium">
                Password
              </label>

              <div className="relative mt-2">

                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500" />

                <input
                  type={
                    showPassword ? 'text' : 'password'
                  }
                  value={formData.password}
                  disabled={isLoading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-slate-700"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-500" />
                  )}
                </button>

              </div>

            </div>

            {/* Remember */}

            <div className="flex justify-between items-center">

              <label className="flex items-center gap-2 text-sm">

                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rememberMe: e.target.checked,
                    })
                  }
                />

                Remember me

              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-emerald-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2 transition"
            >

              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}

            </button>

          </form>

          <p className="mt-6 text-center text-sm">

            Don't have an account?{' '}

            <Link
              to="/register"
              className="text-emerald-600 font-semibold hover:underline"
            >
              Create Account
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}
