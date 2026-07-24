import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Loader2, CheckCircle, Moon } from "lucide-react";
import api from "../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post("/auth/forgot-password", {
        email,
      });

      setSuccess(res.data.message);
    } catch {
      setSuccess(
        "If an account with that email exists, a reset link has been sent."
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl p-6 sm:p-8 w-full max-w-md">

        <div className="flex justify-center mb-6">
          <Moon className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-sm sm:text-base text-slate-500 mb-6">
          Enter your email address and we'll send you a password reset link.
        </p>

        {success && (
          <div className="bg-green-50 text-green-700 border border-green-200 rounded-xl p-3 flex items-center gap-2 mb-5 text-sm">
            <CheckCircle className="w-5 h-5 shrink-0" />
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          <div className="relative mb-5">
            <Mail className="absolute left-3 top-3 text-emerald-600" />

            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full border rounded-xl pl-10 py-3 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 font-semibold flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Sending...
              </>
            ) : (
              "Send Reset Link"
            )}
          </button>

        </form>

        <div className="mt-6 text-center">
          <Link
            to="/login"
            className="text-emerald-600 hover:text-emerald-700"
          >
            Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}