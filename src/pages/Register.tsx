import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, EyeOff, Eye, Moon, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const getPasswordStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 7) score++;
    if (pass.length > 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(formData.password);
  
  const strengthLabels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  const strengthColors = [
    'bg-slate-200',
    'bg-red-400',
    'bg-orange-400',
    'bg-gold-400',
    'bg-emerald-400',
    'bg-emerald-600'
  ];

  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;
  const showMatchError = formData.confirmPassword.length > 0 && !passwordsMatch;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!passwordsMatch || formData.password.length < 8) return;
    
    setLoading(true);
    try {
      await api.post('/auth/register', {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      
      // Auto-login: update user context
      await checkAuth();
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/50 rounded-full mix-blend-multiply filter blur-3xl"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-200/40 rounded-full mix-blend-multiply filter blur-3xl"></div>

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
          Create Your Account
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 dark:text-slate-300">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-emerald-600 hover:text-emerald-500 transition">
            Sign in
          </Link>
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10"
      >
        <div className="glass py-8 px-4 sm:rounded-3xl sm:px-10 border border-white/40 shadow-2xl shadow-emerald-900/5">
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 text-sm">
              <XCircle className="h-5 w-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Full Name</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type="text"
                  required
                  disabled={loading}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm dark:shadow-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/50 focus:bg-white dark:bg-slate-800 disabled:opacity-50"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Username</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type="text"
                  required
                  disabled={loading}
                  className="appearance-none block w-full pl-10 px-3 py-3 border border-slate-200 dark:border-slate-700 rounded-xl shadow-sm dark:shadow-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition bg-white/50 focus:bg-white dark:bg-slate-800 disabled:opacity-50"
                  placeholder="johndoe123"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">
            Email Address
          </label>

          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex           items-center pointer-events-none">
              <Mail className="h-5 w-5 text-emerald-500" />
            </div>

            <input
              type="email"
              required
              disabled={loading}
              className="appearance-none block w-full pl-10 px-3 py-3 border        border-slate-200 dark:border-slate-700 rounded-xl shadow-sm       dark:shadow-none placeholder-slate-400 focus:outline-none       focus:ring-2 focus:ring-emerald-500 focus:border-transparent      transition bg-white/50 focus:bg-white dark:bg-slate-800        disabled:opacity-50"
              placeholder="example@gmail.com"
              value={formData.email}
              onChange={(e) =>
            setFormData({
              ...formData,
              email: e.target.value
             })
            }
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
                  placeholder="At least 8 characters"
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
              
              {/* Password Strength */}
              {formData.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 h-1.5 mb-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`flex-1 rounded-full ${
                          level <= strength ? strengthColors[strength] : 'bg-slate-200'
                        } transition-colors duration-300`}
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex justify-between">
                    <span>Strength: {strengthLabels[strength]}</span>
                    {formData.password.length < 8 && <span className="text-red-500">Needs 8+ chars</span>}
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200">Confirm Password</label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={loading}
                  className={`appearance-none block w-full pl-10 pr-10 px-3 py-3 border rounded-xl shadow-sm dark:shadow-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white/50 focus:bg-white dark:bg-slate-800 disabled:opacity-50 ${
                    showMatchError ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-200 dark:border-slate-700 focus:border-transparent'
                  }`}
                  placeholder="Repeat your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  {formData.confirmPassword.length > 0 && (
                    passwordsMatch ? (
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )
                  )}
                </div>
              </div>
              {showMatchError && (
                <p className="mt-1 text-xs text-red-500">Passwords do not match.</p>
              )}
            </div>

            <div>
              {/* Helper text showing what's needed to enable the button */}
              {(!passwordsMatch || formData.password.length < 8 || !formData.fullName || !formData.username || !formData.email) && (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center mb-3">
                  {!formData.fullName || !formData.username || !formData.email
                    ? 'Fill in all fields to continue'
                    : formData.password.length < 8
                    ? 'Password must be at least 8 characters'
                    : 'Passwords must match'}
                </p>
              )}
              <button
                type="submit"
                disabled={!passwordsMatch || formData.password.length < 8 || loading || !formData.fullName || !formData.username || !formData.email}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition transform hover:-translate-y-0.5 disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed disabled:bg-emerald-800 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Creating...
                  </>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
