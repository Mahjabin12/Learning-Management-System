import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Sparkles, LogIn } from "lucide-react";

function ResetSuccess() {
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
              ? "bg-[radial-gradient(circle_at_24%_20%,rgba(45,212,191,0.24),transparent_30%),radial-gradient(circle_at_78%_76%,rgba(16,185,129,0.18),transparent_34%)]"
              : "bg-[radial-gradient(circle_at_24%_20%,rgba(16,185,129,0.14),transparent_30%),radial-gradient(circle_at_78%_76%,rgba(6,19,17,0.07),transparent_34%)]"
          }`}
        />

        <div
          className={`absolute inset-0 opacity-25 ${
            isDark
              ? "bg-[linear-gradient(rgba(45,212,191,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(45,212,191,0.10)_1px,transparent_1px)] bg-[size:76px_76px]"
              : "bg-[linear-gradient(rgba(6,19,17,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(6,19,17,0.07)_1px,transparent_1px)] bg-[size:76px_76px]"
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
        <div className="w-full">
          {/* Top Label */}
          <div className="mb-8 text-center">
            <p
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-extrabold uppercase tracking-[0.26em] backdrop-blur-xl ${
                isDark
                  ? "border-teal-300/20 bg-white/5 text-teal-300"
                  : "border-emerald-900/10 bg-white text-emerald-700 shadow-lg"
              }`}
            >
              <Sparkles size={15} />
              Password Updated
            </p>
          </div>

          {/* Main Success Panel */}
          <div
            className={`relative mx-auto grid max-w-5xl overflow-hidden rounded-[42px] border backdrop-blur-2xl lg:grid-cols-[0.9fr_1.35fr] ${
              isDark
                ? "border-teal-300/15 bg-[#0b1f1b]/82 shadow-[0_0_90px_rgba(45,212,191,0.14)]"
                : "border-emerald-900/10 bg-white/92 shadow-[0_30px_90px_rgba(6,19,17,0.14)]"
            }`}
          >
            {/* Left Icon Area */}
            <div
              className={`relative flex min-h-[390px] items-center justify-center overflow-hidden ${
                isDark ? "bg-[#08231f]" : "bg-emerald-50"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(45,212,191,0.30),transparent_34%)]" />

              <div
                className={`absolute h-72 w-72 rounded-full border ${
                  isDark ? "border-teal-300/10" : "border-emerald-800/10"
                }`}
              />

              <div
                className={`absolute h-52 w-52 rounded-full border ${
                  isDark ? "border-teal-300/20" : "border-emerald-800/15"
                }`}
              />

              <div
                className={`relative flex h-32 w-32 items-center justify-center rounded-full border ${
                  isDark
                    ? "border-teal-300/30 bg-teal-400 text-[#061311] shadow-[0_0_70px_rgba(45,212,191,0.45)]"
                    : "border-emerald-700/20 bg-[#061311] text-white shadow-[0_24px_70px_rgba(6,19,17,0.22)]"
                }`}
              >
                <CheckCircle2 size={68} strokeWidth={2.4} />
              </div>
            </div>

            {/* Right Content */}
            <div className="flex min-h-[390px] flex-col justify-center px-7 py-10 text-center sm:px-10 lg:px-12 lg:text-left">
              <p
                className={`text-xs font-extrabold uppercase tracking-[0.28em] ${
                  isDark ? "text-teal-400" : "text-emerald-700"
                }`}
              >
                Skillora Security
              </p>

              <h1
                className={`mt-4 text-[36px] font-extrabold leading-tight sm:text-[48px] ${
                  isDark ? "text-white" : "text-[#061311]"
                }`}
              >
                Password reset successful.
              </h1>

              <p
                className={`mt-5 max-w-xl text-base leading-7 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Your password has been updated successfully. You can now login
                to your Skillora account and continue your learning journey.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  to="/login"
                  className={`inline-flex h-[56px] items-center justify-center gap-2 rounded-2xl px-7 text-base font-bold transition-all duration-300 hover:scale-[1.02] ${
                    isDark
                      ? "bg-teal-400 text-[#061311] shadow-[0_0_35px_rgba(45,212,191,0.35)] hover:bg-white"
                      : "bg-[#061311] text-white shadow-[0_18px_40px_rgba(6,19,17,0.18)] hover:bg-emerald-700"
                  }`}
                >
                  <LogIn size={19} />
                  Back to Login
                </Link>

                <Link
                  to="/"
                  className={`inline-flex h-[56px] items-center justify-center rounded-2xl border px-7 text-base font-semibold transition-all duration-300 ${
                    isDark
                      ? "border-white/10 bg-white/5 text-slate-200 hover:border-teal-400 hover:text-teal-300"
                      : "border-emerald-900/10 bg-emerald-50 text-[#061311] hover:bg-white"
                  }`}
                >
                  Go to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ResetSuccess;