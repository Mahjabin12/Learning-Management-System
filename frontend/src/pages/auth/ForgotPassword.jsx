import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  ShieldCheck,
  KeyRound,
  LockKeyhole,
} from "lucide-react";

import { forgotPassword } from "../../services/authApi";


function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

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



  const handleSubmit = async (event) => {

  event.preventDefault();


  try {


    const response = await forgotPassword({

      email: email.trim().toLowerCase()

    });



    alert(
      `Your verification code is: ${response.data.code}`
    );



    navigate("/verify-code", {

      state:{
        email: email.trim().toLowerCase(),
        code: response.data.code
      }

    });



  } catch(error){


    alert(
      error.response?.data?.message ||
      "Something went wrong"
    );


  }

};



  const features = [
    {
      icon: <ShieldCheck size={18} />,
      title: "Secure Recovery",
    },
    {
      icon: <KeyRound size={18} />,
      title: "Verify Code",
    },
    {
      icon: <LockKeyhole size={18} />,
      title: "Reset Password",
    },
  ];

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition duration-300 ${
        isDark ? "bg-[#061311] text-white" : "bg-[#f8fafc] text-[#061311]"
      }`}
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_50%_22%,rgba(45,212,191,0.24),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.15),transparent_32%),radial-gradient(circle_at_85%_78%,rgba(45,212,191,0.12),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_50%_22%,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_20%_80%,rgba(6,19,17,0.07),transparent_32%)]"
          }`}
        />

        <div
          className={`absolute inset-0 opacity-25 ${
            isDark
              ? "bg-[linear-gradient(rgba(45,212,191,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.10)_1px,transparent_1px)] bg-[size:72px_72px]"
              : "bg-[linear-gradient(rgba(6,19,17,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,19,17,0.08)_1px,transparent_1px)] bg-[size:72px_72px]"
          }`}
        />
      </div>

      {/* Back Button */}
      <Link
        to="/login"
        className={`absolute left-6 top-6 z-30 flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 sm:left-8 sm:top-8 ${
          isDark
            ? "border-white/10 bg-white/10 text-white hover:bg-teal-400 hover:text-[#061311]"
            : "border-emerald-900/10 bg-white text-[#061311] shadow-lg hover:bg-[#061311] hover:text-white"
        }`}
        aria-label="Back to login"
      >
        <ArrowLeft size={26} />
      </Link>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-20">
        <div className="relative w-full max-w-5xl">
          {/* Big title */}
          <div className="text-center">
            <p
              className={`text-xs font-extrabold uppercase tracking-[0.28em] ${
                isDark ? "text-teal-300" : "text-emerald-700"
              }`}
            >
              Skillora Security
            </p>

            <h1
              className={`mt-5 text-[58px] font-extrabold leading-none tracking-tight sm:text-[86px] lg:text-[118px] ${
                isDark ? "text-slate-200/90" : "text-[#061311]"
              }`}
            >
              Recover
            </h1>

            <p
              className={`mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Enter your email address and we will send you a verification code
              to reset your password.
            </p>
          </div>

          {/* Main Card */}
          <div
            className={`relative mx-auto mt-10 w-full max-w-[440px] rounded-[28px] border p-6 backdrop-blur-2xl sm:p-8 ${
              isDark
                ? "border-teal-300/15 bg-[#0b1f1b]/80 shadow-[0_0_80px_rgba(45,212,191,0.14)]"
                : "border-emerald-900/10 bg-white/90 shadow-[0_28px_80px_rgba(6,19,17,0.14)]"
            }`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-teal-300/20 bg-teal-400/10 text-teal-300">
              <Mail size={22} />
            </div>

            <div className="mt-5 text-center">
              <h2
                className={`text-2xl font-extrabold ${
                  isDark ? "text-white" : "text-[#061311]"
                }`}
              >
                Forgot Password?
              </h2>

              <p
                className={`mt-2 text-sm leading-6 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                No worries. Enter your email and continue to verification.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className={`mb-2 block text-sm font-semibold ${
                    isDark ? "text-slate-100" : "text-[#061311]"
                  }`}
                >
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={20}
                    className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                      isDark ? "text-slate-400" : "text-slate-500"
                    }`}
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="student@gmail.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className={`h-[58px] w-full rounded-2xl border pl-14 pr-5 text-base outline-none transition-all duration-300 ${
                      isDark
                        ? "border-white/15 bg-white/10 text-white placeholder:text-slate-500 focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                        : "border-slate-300 bg-slate-50 text-[#061311] placeholder:text-slate-400 focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                    }`}
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`h-[56px] w-full rounded-2xl text-base font-bold transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "bg-teal-400 text-[#061311] shadow-[0_0_35px_rgba(45,212,191,0.35)] hover:bg-white"
                    : "bg-[#061311] text-white shadow-[0_18px_40px_rgba(6,19,17,0.18)] hover:bg-emerald-700"
                }`}
              >
                Send Code
              </button>
            </form>

            <div
              className={`my-6 h-px w-full ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />

            <p
              className={`text-center text-sm ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Remember your password?{" "}
              <Link
                to="/login"
                className={`font-semibold hover:underline ${
                  isDark ? "text-teal-400" : "text-emerald-700"
                }`}
              >
                Back to login
              </Link>
            </p>
          </div>

          {/* Bottom features */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-3 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className={`flex flex-col items-center justify-center gap-3 rounded-2xl border px-4 py-4 text-center text-xs font-semibold backdrop-blur-xl ${
                  isDark
                    ? "border-teal-300/10 bg-white/[0.04] text-slate-300"
                    : "border-emerald-900/10 bg-white/80 text-[#061311] shadow-lg"
                }`}
              >
                <span
                  className={isDark ? "text-teal-300" : "text-emerald-700"}
                >
                  {feature.icon}
                </span>
                {feature.title}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ForgotPassword;