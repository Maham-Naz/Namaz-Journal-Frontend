import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Lock,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle,
  XCircle,
  Moon,
} from "lucide-react";
import api from "../utils/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const strengthLabels = [
    "Very Weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very Strong",
  ];

  const strengthColors = [
    "bg-slate-200",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-emerald-500",
    "bg-emerald-700",
  ];

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.confirmPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!passwordsMatch) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/reset-password", {
        token,
        password: formData.password,
      });

      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Unable to reset password."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex justify-center items-center px-4">

      <motion.div
        initial={{ opacity: 0, scale: .95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md"
      >

        <div className="flex justify-center mb-5">
          <div className="p-3 bg-emerald-100 rounded-2xl">
            <Moon className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-600" />
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-700">
          Reset Password
        </h1>

        <p className="text-center text-sm sm:text-base text-slate-500 mt-2 mb-6">
          Enter your new password below.
        </p>

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 rounded-xl p-3 flex gap-2 text-sm">
            <XCircle className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 flex gap-2 text-sm">
            <CheckCircle className="w-5 h-5 shrink-0" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Password */}

          <div>

            <label className="block mb-1 text-sm font-medium">
              New Password
            </label>

            <div className="relative">

              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-emerald-500"/>

              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password: e.target.value,
                  })
                }
                className="w-full border rounded-xl pl-10 pr-10 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="New Password"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-3"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-slate-400"/>
                ) : (
                  <Eye className="w-5 h-5 text-slate-400"/>
                )}
              </button>

            </div>

            {formData.password.length > 0 && (

              <div className="mt-3">

                <div className="flex gap-1 h-2">

                  {[1,2,3,4,5].map((item)=>(
                    <div
                      key={item}
                      className={`flex-1 rounded-full ${
                        item <= strength
                          ? strengthColors[strength]
                          : "bg-slate-200"
                      }`}
                    />
                  ))}

                </div>

                <p className="text-xs text-slate-500 mt-1">
                  Strength: {strengthLabels[strength]}
                </p>

              </div>

            )}

          </div>

          {/* Confirm Password */}

          <div>

            <label className="block mb-1 text-sm font-medium">
              Confirm Password
            </label>

            <div className="relative">

              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-emerald-500"/>

              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e)=>
                  setFormData({
                    ...formData,
                    confirmPassword:e.target.value,
                  })
                }
                className="w-full border rounded-xl pl-10 py-3 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="Confirm Password"
                required
              />

            </div>

            {formData.confirmPassword.length>0 && (

              passwordsMatch ? (

                <p className="text-xs text-emerald-600 mt-2">
                  ✓ Passwords match
                </p>

              ) : (

                <p className="text-xs text-red-500 mt-2">
                  Passwords do not match
                </p>

              )

            )}

          </div>

          <button
            disabled={
              loading ||
              !passwordsMatch ||
              formData.password.length<8
            }
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2 disabled:opacity-40"
          >

            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5"/>
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}

          </button>

        </form>

        <div className="text-center mt-6">

          <Link
            to="/login"
            className="text-emerald-600 hover:text-emerald-700"
          >
            Back to Login
          </Link>

        </div>

      </motion.div>

    </div>
  );
}
