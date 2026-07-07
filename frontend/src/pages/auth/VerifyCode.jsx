import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  KeyRound,
  Mail,
  ShieldCheck,
} from "lucide-react";

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "your email";

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");

  const inputRefs = useRef([]);

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

  const codeValue = code.join("");

  const handleCodeChange = (event, index) => {
    const value = event.target.value.replace(/\D/g, "");

    if (!value) {
      const updatedCode = [...code];
      updatedCode[index] = "";
      setCode(updatedCode);
      setError("");
      return;
    }

    const updatedCode = [...code];
    updatedCode[index] = value.slice(-1);
    setCode(updatedCode);
    setError("");

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedCode) return;

    const updatedCode = ["", "", "", "", "", ""];

    pastedCode.split("").forEach((digit, index) => {
      updatedCode[index] = digit;
    });

    setCode(updatedCode);
    setError("");

    const nextIndex = pastedCode.length >= 6 ? 5 : pastedCode.length;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (codeValue.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    navigate("/reset-password", {
      state: {
        email,
      },
    });
  };

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
              ? "bg-[radial-gradient(circle_at_50%_18%,rgba(45,212,191,0.24),transparent_30%),radial-gradient(circle_at_18%_80%,rgba(16,185,129,0.15),transparent_34%),radial-gradient(circle_at_86%_78%,rgba(45,212,191,0.12),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_50%_18%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_18%_80%,rgba(6,19,17,0.07),transparent_34%)]"
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
        to="/forgot-password"
        className={`absolute left-6 top-6 z-30 flex h-14 w-14 items-center justify-center rounded-2xl border backdrop-blur-xl transition-all duration-300 hover:-translate-x-1 sm:left-8 sm:top-8 ${
          isDark
            ? "border-white/10 bg-white/10 text-white hover:bg-teal-400 hover:text-[#061311]"
            : "border-emerald-900/10 bg-white text-[#061311] shadow-lg hover:bg-[#061311] hover:text-white"
        }`}
        aria-label="Back to forgot password"
      >
        <ArrowLeft size={26} />
      </Link>

      <section className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-20">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center">
            <p
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-xs font-extrabold uppercase tracking-[0.26em] backdrop-blur-xl ${
                isDark
                  ? "border-teal-300/20 bg-white/5 text-teal-300"
                  : "border-emerald-900/10 bg-white text-emerald-700 shadow-lg"
              }`}
            >
              <ShieldCheck size={15} />
              Skillora Verification
            </p>

            <h1
              className={`mt-6 text-[58px] font-extrabold leading-none tracking-tight sm:text-[86px] lg:text-[118px] ${
                isDark ? "text-slate-200/90" : "text-[#061311]"
              }`}
            >
              Verify
            </h1>

            <p
              className={`mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg ${
                isDark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              We sent a demo verification code to{" "}
              <span
                className={`font-bold ${
                  isDark ? "text-teal-300" : "text-emerald-700"
                }`}
              >
                {email}
              </span>
              . Enter any 6-digit code to continue.
            </p>
          </div>

          {/* Main Verify Card */}
          <div
            className={`relative mx-auto mt-10 w-full max-w-[520px] rounded-[32px] border p-6 backdrop-blur-2xl sm:p-8 ${
              isDark
                ? "border-teal-300/15 bg-[#0b1f1b]/82 shadow-[0_0_90px_rgba(45,212,191,0.14)]"
                : "border-emerald-900/10 bg-white/92 shadow-[0_30px_90px_rgba(6,19,17,0.14)]"
            }`}
          >
            <div
              className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full border ${
                isDark
                  ? "border-teal-300/20 bg-teal-400/10 text-teal-300"
                  : "border-emerald-700/20 bg-emerald-100 text-emerald-700"
              }`}
            >
              <KeyRound size={24} />
            </div>

            <div className="mt-5 text-center">
              <h2
                className={`text-2xl font-extrabold ${
                  isDark ? "text-white" : "text-[#061311]"
                }`}
              >
                Enter Verification Code
              </h2>

              <p
                className={`mt-2 text-sm leading-6 ${
                  isDark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Type the 6-digit code below to move to password reset.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8">
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(event) => handleCodeChange(event, index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    onPaste={handlePaste}
                    className={`h-[58px] rounded-2xl border text-center text-xl font-extrabold outline-none transition-all duration-300 sm:h-[64px] sm:text-2xl ${
                      error
                        ? "border-red-500 bg-red-500/5 text-red-300 focus:ring-2 focus:ring-red-400/30"
                        : isDark
                        ? "border-white/15 bg-white/10 text-white focus:border-teal-400 focus:bg-white/15 focus:ring-2 focus:ring-teal-400/30"
                        : "border-slate-300 bg-slate-50 text-[#061311] focus:border-emerald-700 focus:bg-white focus:ring-2 focus:ring-emerald-700/20"
                    }`}
                  />
                ))}
              </div>

              {error && (
                <p className="mt-3 text-center text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={`mt-6 h-[56px] w-full rounded-2xl text-base font-bold transition-all duration-300 hover:scale-[1.02] ${
                  isDark
                    ? "bg-teal-400 text-[#061311] shadow-[0_0_35px_rgba(45,212,191,0.35)] hover:bg-white"
                    : "bg-[#061311] text-white shadow-[0_18px_40px_rgba(6,19,17,0.18)] hover:bg-emerald-700"
                }`}
              >
                Verify Code
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
              Did not receive code?{" "}
              <Link
                to="/forgot-password"
                className={`font-semibold hover:underline ${
                  isDark ? "text-teal-400" : "text-emerald-700"
                }`}
              >
                Try again
              </Link>
            </p>
          </div>

          {/* Bottom status */}
          <div
            className={`mx-auto mt-8 flex max-w-[520px] items-center justify-center gap-3 rounded-2xl border px-5 py-4 text-center text-sm backdrop-blur-xl ${
              isDark
                ? "border-teal-300/10 bg-white/[0.04] text-slate-300"
                : "border-emerald-900/10 bg-white/80 text-[#061311] shadow-lg"
            }`}
          >
            <Mail
              size={18}
              className={isDark ? "text-teal-300" : "text-emerald-700"}
            />

            <span>
              Verification is required before creating a new password.
            </span>

            <CheckCircle
              size={18}
              className={isDark ? "text-teal-300" : "text-emerald-700"}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default VerifyCode;