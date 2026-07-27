import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
} from 'lucide-react';

import logo from '../assets/logo.png';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const getPasswordStrength = (pass: string) => {
    let score = 0;

    if (pass.length >= 8) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    return score;
  };

  const strength = getPasswordStrength(formData.password);

  const strengthText = [
    'Very Weak',
    'Weak',
    'Fair',
    'Good',
    'Strong',
    'Very Strong',
  ];

  const passwordsMatch =
    formData.password === formData.confirmPassword;

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setError('');

    if (
      !formData.fullName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError('Please fill all fields.');
      return;
    }

    if (formData.password.length < 8) {
      setError(
        'Password must be at least 8 characters.'
      );
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setIsLoading(true);

      await api.post('/auth/register', {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      await checkAuth();

      navigate('/dashboard');
    } catch (err: any) {
      setError(
        err?.response?.data?.error ||
          'Registration failed.'
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
            Create your account
          </p>

        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-8">

          {error && (
            <div className="mb-5 bg-red-50 border border-red-200 rounded-xl p-3 flex gap-2 text-red-600">
              <XCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>
              <label>Full Name</label>

              <div className="relative mt-2">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500"/>

                <input
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 outline-none dark:bg-slate-700"
                  value={formData.fullName}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      fullName:e.target.value
                    })
                  }
                  placeholder="Enter Full Name"
                />
              </div>
            </div>

            <div>
              <label>Username</label>

              <div className="relative mt-2">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500"/>

                <input
                  className="w-full pl-10 py-3 rounded-xl border dark:bg-slate-700"
                  value={formData.username}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      username:e.target.value
                    })
                  }
                  placeholder="Enter Username"
                />
              </div>
            </div>

            <div>
              <label>Email</label>

              <div className="relative mt-2">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500"/>

                <input
                  type="email"
                  className="w-full pl-10 py-3 rounded-xl border dark:bg-slate-700"
                  value={formData.email}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      email:e.target.value
                    })
                  }
                  placeholder="Enter Email"
                />
              </div>
            </div>

            <div>

              <label>Password</label>

              <div className="relative mt-2">

                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500"/>

                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border dark:bg-slate-700"
                  value={formData.password}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      password:e.target.value
                    })
                  }
                  placeholder="Enter Password"
                />

                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={()=>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? <EyeOff size={20}/>
                    : <Eye size={20}/>}
                </button>

              </div>

              {formData.password && (

                <div className="mt-2">

                  <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">

                    <div
                      className="bg-emerald-500 h-2"
                      style={{
                        width:`${strength*20}%`
                      }}
                    />

                  </div>

                  <p className="text-xs mt-1 text-slate-500">

                    {strengthText[strength]}

                  </p>

                </div>

              )}

            </div>

            <div>

              <label>Confirm Password</label>

              <div className="relative mt-2">

                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-emerald-500"/>

                <input
                  type={showPassword ? 'text':'password'}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border dark:bg-slate-700"
                  value={formData.confirmPassword}
                  onChange={(e)=>
                    setFormData({
                      ...formData,
                      confirmPassword:e.target.value
                    })
                  }
                  placeholder="Confirm Password"
                />

                <div className="absolute right-3 top-3">

                  {formData.confirmPassword.length>0 &&

                  (passwordsMatch
                  ?<CheckCircle className="text-green-500"/>
                  :<XCircle className="text-red-500"/>)}

                </div>

              </div>

            </div>

            <button
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >

              {isLoading
              ?<>
              <Loader2 className="animate-spin"/>
              Creating...
              </>
              :"Create Account"}

            </button>

          </form>

          <p className="text-center mt-6">

            Already have an account?

            <Link
              to="/login"
              className="text-emerald-600 ml-2 font-semibold"
            >
              Sign In
            </Link>

          </p>

        </div>

      </motion.div>

    </div>
  );
}
