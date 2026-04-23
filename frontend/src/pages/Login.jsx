import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.detail || "Login failed");
    }
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/forgot-password", { email: forgotEmail });
      alert("If the email exists, a reset link has been sent.");
      setShowForgotPassword(false);
      setForgotEmail("");
    } catch (err) {
      alert("Error sending reset email");
    }
  };

  return (
    <div className="min-h-screen bg-green-300 text-gray-900 flex flex-col items-center justify-between px-4 py-10">
      <div className="w-full max-w-md mx-auto">
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-200 min-h-[420px]">
          <div className="p-6 h-full flex flex-col justify-center">
            <div>
              <h2 className="mb-4 text-3xl font-bold text-center">Login</h2>
              <img src="/images/login2.jpeg" alt="Login Image" className="mx-auto mb-6 h-10 w-10 rounded-full object-cover" />
              {showForgotPassword ? (
                <form onSubmit={handleForgotSubmit} className="flex flex-col h-full mt-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 mb-4"
                    required
                  />

                  <div className="mt-12">
                    <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold transition hover:bg-blue-700 mb-2">
                      Send Reset Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(false)}
                      className="w-full text-blue-600 hover:underline"
                    >
                      Back to Login
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col h-full mt-2">
                  <input
                    placeholder="Username"
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 mb-4"
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-gray-900 outline-none transition focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 mb-12"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />

                  <div className="mt-12">
                    <button
                      className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold transition hover:bg-blue-700 mb-2 disabled:cursor-not-allowed disabled:bg-blue-400"
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Login"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="w-full text-blue-600 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full max-w-md mx-auto mt-0 flex justify-end">
        <div className="flex items-center justify-between rounded-2xl bg-green-300 p-6 w-full max-w-[420px]">
          <img src="/images/govLogo2.png" alt="Department Logo" className="h-[100px] w-[100px] rounded-full object-cover" />
          <p className="text-lg font-semibold text-gray-800 text-right leading-snug">
            <strong>Education Engineering Department</strong>
          </p>
        </div>
      </footer>
    </div>
  );
}
