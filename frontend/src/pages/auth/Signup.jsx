import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaXTwitter,
} from "react-icons/fa6";

import { registerUser } from "../../services/authApi";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
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

  const steps = [
    {
      number: "01",
      title: "Create Account",
      text: "Sign up with your name and email.",
    },
    {
      number: "02",
      title: "Start Learning",
      text: "Choose courses and track progress.",
    },
    {
      number: "03",
      title: "Earn Skills",
      text: "Complete lessons and build portfolio.",
    },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

const handleSubmit = async (event) => {
  event.preventDefault();

  const name = formData.name.trim();
  const email = formData.email.trim().toLowerCase();
  const password = formData.password;
  const confirmPassword = formData.confirmPassword;


  const newErrors = {
    password: "",
    confirmPassword: "",
  };


  let hasError = false;


  if (password.length < 8) {
    newErrors.password =
      "Password must be at least 8 characters.";

    hasError = true;
  }


  if (password !== confirmPassword) {
    newErrors.confirmPassword =
      "Passwords do not match.";

    hasError = true;
  }


  setErrors(newErrors);


  if (hasError) return;



  try {

    setLoading(true);


    const response = await registerUser({
      name,
      email,
      password,
    });



    const {
      token,
      user,
    } = response.data;



    login(user, token);



    navigate("/student/my-learning");



  } catch (error) {


    console.error(
      "Signup error:",
      error.response?.data || error.message
    );


    alert(
      error.response?.data?.message ||
      "Registration failed"
    );


  } finally {

    setLoading(false);

  }
};



  return (
    <main
      className={`relative min-h-screen overflow-x-hidden transition duration-300 ${
        isDark ? "bg-[#061311] text-white" : "bg-[#f8fafc] text-[#061311]"
      }`}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.20),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(16,185,129,0.15),transparent_32%)]"
              : "bg-[radial-gradient(circle_at_18%_18%,rgba(16,185,129,0.12),transparent_28%),radial-gradient(circle_at_84%_72%,rgba(6,19,17,0.06),transparent_32%)]"
          }`}
        />
      </div>

      {/* Main Connected Auth Card */}
      <div className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-[1240px] items-center px-5 py-8 sm:px-8">
        <div
          className={`grid w-full overflow-hidden rounded-[42px] border shadow-[0_35px_110px_rgba(0,0,0,0.30)] lg:grid-cols-[1.35fr_0.95fr] ${
            isDark
              ? "border-teal-300/15 bg-[#061311]"
              : "border-emerald-900/10 bg-white"
          }`}
        >
          {/* Left Concept Panel */}
          <section className="relative hidden min-h-[680px] overflow-hidden lg:block">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(45,212,191,0.26),transparent_28%),radial-gradient(circle_at_80%_90%,rgba(16,185,129,0.22),transparent_36%)]" />

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop&q=90"
              alt="Skillora learning"
              className="absolute inset-0 h-full w-full object-cover opacity-15"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-[#061311]/96 via-[#07352e]/82 to-[#061311]/98" />

            <Link
              to="/"
              className="absolute left-12 top-10 z-20 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:bg-teal-400 hover:text-[#061311]"
            >
              <ArrowLeft size={16} />
              Back to Website
            </Link>

            <div className="relative z-10 flex min-h-[680px] flex-col justify-end px-14 pb-14 pt-28">
              <div className="mb-12 grid grid-cols-[1fr_1fr] items-end gap-10">
                <div>
                  <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.28em] text-teal-300">
                    Get Started
                  </p>

                  <h1 className="max-w-[450px] text-[44px] font-extrabold leading-tight text-white">
                    Start your learning journey with Skillora.
                  </h1>
                </div>

                <p className="max-w-[300px] text-base leading-7 text-slate-300">
                  Complete these easy steps to create your account and start
                  learning practical digital skills.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {steps.map((step, index) => (
                  <div
                    key={step.number}
                    className={`min-h-[210px] rounded-[28px] border p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${
                      index === 0
                        ? "border-white bg-white text-[#061311] shadow-[0_20px_60px_rgba(255,255,255,0.16)]"
                        : "border-white/10 bg-white/10 text-white"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-extrabold ${
                        index === 0
                          ? "bg-[#061311] text-white"
                          : "bg-white/10 text-teal-300"
                      }`}
                    >
                      {step.number}
                    </span>

                    <h3 className="mt-8 text-lg font-extrabold leading-snug">
                      {step.title}
                    </h3>

                    <p
                      className={`mt-4 text-sm leading-6 ${
                        index === 0 ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Right Signup Panel */}
          <section
            className={`flex min-h-[680px] items-center justify-center px-6 py-8 sm:px-9 lg:px-12 ${
              isDark ? "bg-[#050b0a]" : "bg-white"
            }`}
          >
            <div className="w-full max-w-[430px]">
              <Link
                to="/"
                className={`mb-6 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-300 hover:-translate-x-1 lg:hidden ${
                  isDark
                    ? "border-teal-300/20 bg-white/10 text-slate-200 hover:bg-teal-400 hover:text-[#061311]"
                    : "border-emerald-900/10 bg-emerald-50 text-[#061311] hover:bg-[#061311] hover:text-white"
                }`}
              >
                <ArrowLeft size={16} />
                Back to Website
              </Link>

              <div className="text-center">
                <p
                  className={`text-xs font-extrabold uppercase tracking-[0.28em] ${
                    isDark ? "text-teal-400" : "text-emerald-700"
                  }`}
                >
                  Create Account
                </p>

                <h2
                  className={`mt-4 text-[34px] font-extrabold leading-tight ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  Sign Up Account
                </h2>

                <p
                  className={`mt-3 text-sm leading-6 ${
                    isDark ? "text-slate-400" : "text-slate-600"
                  }`}
                >
                  Enter your personal data to create your account.
                </p>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {["Fast", "Secure", "Modern"].map((item) => (
                  <div
                    key={item}
                    className={`flex h-[46px] items-center justify-center gap-1.5 rounded-xl border text-xs font-semibold ${
                      isDark
                        ? "border-white/10 bg-white/5 text-slate-300"
                        : "border-emerald-900/10 bg-emerald-50 text-[#061311]"
                    }`}
                  >
                    <CheckCircle
                      size={14}
                      className={isDark ? "text-teal-400" : "text-emerald-700"}
                    />
                    {item}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="mt-7 grid gap-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className={`mb-2 block text-sm font-semibold ${
                      isDark ? "text-slate-100" : "text-[#061311]"
                    }`}
                  >
                    Full Name
                  </label>

                  <div className="relative">
                    <User
                      size={19}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`h-[54px] w-full rounded-2xl border pl-12 pr-4 text-[15px] outline-none transition-all duration-300 ${
                        isDark
                          ? "border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                          : "border-slate-300 bg-slate-50 text-[#061311] placeholder:text-slate-400 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                      }`}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className={`mb-2 block text-sm font-semibold ${
                      isDark ? "text-slate-100" : "text-[#061311]"
                    }`}
                  >
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="student@gmail.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`h-[54px] w-full rounded-2xl border pl-12 pr-4 text-[15px] outline-none transition-all duration-300 ${
                        isDark
                          ? "border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                          : "border-slate-300 bg-slate-50 text-[#061311] placeholder:text-slate-400 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                      }`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className={`mb-2 block text-sm font-semibold ${
                      isDark ? "text-slate-100" : "text-[#061311]"
                    }`}
                  >
                    Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className={`h-[54px] w-full rounded-2xl border pl-12 pr-12 text-[15px] outline-none transition-all duration-300 ${
                        errors.password
                          ? "border-red-500 bg-red-500/5 text-white focus:ring-2 focus:ring-red-400/30"
                          : isDark
                          ? "border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                          : "border-slate-300 bg-slate-50 text-[#061311] placeholder:text-slate-400 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
                        isDark
                          ? "text-slate-400 hover:text-teal-400"
                          : "text-slate-500 hover:text-emerald-700"
                      }`}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                    </button>
                  </div>

                  <p
                    className={`mt-2 text-xs ${
                      errors.password
                        ? "text-red-400"
                        : isDark
                        ? "text-slate-500"
                        : "text-slate-500"
                    }`}
                  >
                    {errors.password || "Must be at least 8 characters."}
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className={`mb-2 block text-sm font-semibold ${
                      isDark ? "text-slate-100" : "text-[#061311]"
                    }`}
                  >
                    Confirm Password
                  </label>

                  <div className="relative">
                    <Lock
                      size={19}
                      className={`absolute left-4 top-1/2 -translate-y-1/2 ${
                        isDark ? "text-slate-400" : "text-slate-500"
                      }`}
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      minLength={8}
                      className={`h-[54px] w-full rounded-2xl border pl-12 pr-12 text-[15px] outline-none transition-all duration-300 ${
                        errors.confirmPassword
                          ? "border-red-500 bg-red-500/5 text-white focus:ring-2 focus:ring-red-400/30"
                          : isDark
                          ? "border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                          : "border-slate-300 bg-slate-50 text-[#061311] placeholder:text-slate-400 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                      }`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition ${
                        isDark
                          ? "text-slate-400 hover:text-teal-400"
                          : "text-slate-500 hover:text-emerald-700"
                      }`}
                      aria-label="Toggle confirm password visibility"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  {errors.confirmPassword && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`mt-1 h-[54px] w-full rounded-2xl text-[15px] font-bold transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? "bg-teal-400 text-[#061311] shadow-[0_0_35px_rgba(45,212,191,0.35)] hover:bg-white"
                      : "bg-[#061311] text-white shadow-[0_18px_40px_rgba(6,19,17,0.18)] hover:bg-emerald-700"
                  }`}
                >
                  {loading ? "Creating Account..." : "Sign Up"}
                </button>
              </form>

              <p
                className={`mt-6 text-center text-sm ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className={`font-semibold hover:underline ${
                    isDark ? "text-teal-400" : "text-emerald-700"
                  }`}
                >
                  Login
                </Link>
              </p>
            </div>
          </section>
        </div>
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

export default Signup;