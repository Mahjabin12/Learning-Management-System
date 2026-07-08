import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowLeft } from "lucide-react";
import { courses } from "../../data/dummyData";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    syncTheme();

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const isDark = theme === "dark";

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = formData.email.trim().toLowerCase();
    const role = email === "admin@lms.com" ? "admin" : "student";

    login({
      name: role === "admin" ? "Admin User" : "Student User",
      email,
      role,
    });

    navigate(role === "admin" ? "/admin" : "/my-learning");
  };

  return (
    <main
      className={`relative min-h-screen overflow-x-hidden transition duration-300 ${
        isDark ? "bg-[#061311] text-white" : "bg-[#f8fafc] text-[#061311]"
      }`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.22),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(16,185,129,0.16),transparent_32%)]"
              : "bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.14),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(6,19,17,0.08),transparent_32%)]"
          }`}
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-[1500px] items-center gap-12 px-6 py-8 sm:px-10 lg:grid-cols-[590px_minmax(0,1fr)] lg:gap-16 lg:py-10">
        {/* Login Form */}
        <section className="flex w-full justify-center">
          <div
            className={`w-full max-w-[590px] rounded-[36px] px-8 py-9 backdrop-blur-xl transition duration-300 ${
              isDark
                ? "border border-teal-300/20 bg-[#0b1f1b]/85 shadow-[0_0_70px_rgba(45,212,191,0.14)]"
                : "border border-emerald-900/10 bg-white shadow-[0_24px_70px_rgba(6,19,17,0.12)]"
            }`}
          >
            <Link
              to="/"
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-x-1 ${
                isDark
                  ? "border-teal-300/20 bg-white/10 text-slate-200 hover:bg-teal-400 hover:text-[#061311]"
                  : "border-emerald-900/10 bg-emerald-50 text-[#061311] hover:bg-[#061311] hover:text-white"
              }`}
            >
              <ArrowLeft size={16} />
              Back to Website
            </Link>

            <p
              className={`mt-7 text-xs font-extrabold uppercase tracking-[0.22em] ${
                isDark ? "text-teal-400" : "text-emerald-700"
              }`}
            >
              Welcome Back
            </p>

            <h1
              className={`mt-2 text-[34px] font-extrabold leading-tight sm:text-[38px] ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Login to your{" "}
              <span
                className={
                  isDark
                    ? "text-teal-400"
                    : "bg-gradient-to-r from-[#061311] to-emerald-700 bg-clip-text text-transparent"
                }
              >
                Learning Account
              </span>
            </h1>

            <p
              className={`mt-4 text-base leading-7 ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Access your enrolled courses, progress, and dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div>
                <label
                  htmlFor="email"
                  className={`mb-2.5 block text-sm font-semibold ${
                    isDark ? "text-slate-100" : "text-[#061311]"
                  }`}
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={22}
                    className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`h-[62px] w-full rounded-2xl border pl-16 pr-6 text-[17px] outline-none transition-all duration-300 ${
                      isDark
                        ? "border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                        : "border-slate-300 bg-slate-50 text-[#061311] placeholder:text-slate-400 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className={`mb-2.5 block text-sm font-semibold ${
                    isDark ? "text-slate-100" : "text-[#061311]"
                  }`}
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={22}
                    className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`h-[62px] w-full rounded-2xl border pl-16 pr-16 text-[17px] outline-none transition-all duration-300 ${
                      isDark
                        ? "border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                        : "border-slate-300 bg-slate-50 text-[#061311] placeholder:text-slate-400 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className={`absolute right-5 top-1/2 -translate-y-1/2 transition ${
                      isDark
                        ? "text-slate-400 hover:text-teal-400"
                        : "text-slate-500 hover:text-emerald-700"
                    }`}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className={`text-sm font-semibold transition hover:underline ${
                    isDark
                      ? "text-teal-400 hover:text-teal-300"
                      : "text-emerald-700 hover:text-[#061311]"
                  }`}
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className={`h-[60px] w-full rounded-2xl text-[17px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "bg-teal-400 text-[#061311] shadow-[0_0_35px_rgba(45,212,191,0.35)] hover:bg-white"
                    : "bg-[#061311] text-white shadow-[0_18px_40px_rgba(6,19,17,0.18)] hover:bg-emerald-700"
                }`}
              >
                Login
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
              <p className={isDark ? "text-slate-400" : "text-slate-600"}>
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className={`font-semibold hover:underline ${
                    isDark ? "text-teal-400" : "text-emerald-700"
                  }`}
                >
                  Sign up
                </Link>
              </p>

              <p
                className={
                  isDark ? "text-xs text-slate-500" : "text-xs text-slate-500"
                }
              >
                Admin: admin@lms.com
              </p>
            </div>
          </div>
        </section>

        {/* Right Image */}
        <section className="relative hidden min-h-[640px] items-center justify-center lg:flex">
          <div
            className={`relative h-[600px] w-full max-w-[870px] overflow-hidden rounded-[44px] transition-all duration-500 hover:scale-[1.01] ${
              isDark
                ? "border border-teal-300/20 bg-white/10 shadow-[0_0_90px_rgba(45,212,191,0.16)]"
                : "border border-emerald-900/10 bg-white shadow-[0_34px_100px_rgba(6,19,17,0.18)]"
            }`}
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1800&auto=format&fit=crop&q=90"
              alt="Skillora online learning platform"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-gradient-to-t from-[#061311]/96 via-[#061311]/46 to-[#061311]/10"
                  : "bg-gradient-to-t from-[#061311]/90 via-[#061311]/35 to-transparent"
              }`}
            />

            {/* Floating Cards - inside image box */}
            {courses.slice(0, 5).map((course, index) => (
              <div
                key={course.id || index}
                className={`absolute z-20 max-w-[235px] animate-bounce rounded-2xl border px-5 py-3 text-sm font-semibold shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "border-teal-300/20 bg-[#061311]/90 text-white hover:bg-teal-400 hover:text-[#061311]"
                    : "border-white/20 bg-[#061311]/85 text-white hover:bg-white hover:text-[#061311]"
                } ${
                  index === 0
                    ? "left-10 top-8"
                    : index === 1
                    ? "right-10 top-10"
                    : index === 2
                    ? "left-8 top-[210px]"
                    : index === 3
                    ? "right-8 top-[195px]"
                    : "right-12 top-[305px]"
                }`}
                style={{
                  animationDelay: `${index * 0.35}s`,
                  animationDuration: "2.8s",
                }}
              >
                {course.title || course.name || "Course"}
              </div>
            ))}

            {/* Main Text */}
            <div className="absolute bottom-10 left-10 right-10 z-50">
              <p
                className={`mb-4 inline-flex rounded-full border px-5 py-2 text-xs font-extrabold uppercase tracking-[0.22em] backdrop-blur-md ${
                  isDark
                    ? "border-teal-300/40 bg-teal-400 text-[#061311] shadow-[0_0_35px_rgba(45,212,191,0.55)]"
                    : "border-white/40 bg-white text-[#061311] shadow-[0_18px_40px_rgba(6,19,17,0.20)]"
                }`}
              >
                Skillora
              </p>

              <h2 className="max-w-xl text-[36px] font-extrabold leading-tight text-white">
                Learn digital skills with practical online courses.
              </h2>

              <p className="mt-4 max-w-lg text-base leading-7 text-slate-300">
                Track progress, complete lessons, and build your learning
                portfolio with a modern LMS experience.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer
        className={`relative border-t transition duration-300 ${
          isDark
            ? "border-teal-300/10 bg-[#061311]"
            : "border-emerald-900/10 bg-white/95"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-6">
          <p
            className={`mb-5 text-center text-sm font-medium ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Connect With Us
          </p>

          <div className="flex flex-wrap justify-center gap-5">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1877F2] text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF size={17} />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-orange-500 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram size={17} />
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube size={17} />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              aria-label="Twitter X"
            >
              <FaXTwitter size={17} />
            </a>

            <a
              href="https://www.fiverr.com"
              target="_blank"
              rel="noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110"
              aria-label="Fiverr"
            >
              fi
            </a>
          </div>

          <p
            className={`mt-6 text-center text-xs ${
              isDark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            © 2026 Skillora. All Rights Reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Login;