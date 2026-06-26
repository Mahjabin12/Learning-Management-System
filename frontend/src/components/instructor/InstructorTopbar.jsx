import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function InstructorTopbar({ onMenuClick, theme = "dark" }) {
  const { user } = useAuth();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    document.body.style.backgroundColor =
      nextTheme === "dark" ? "#061311" : "#e8f3ee";

    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <header
      className={`sticky top-0 z-40 h-16 backdrop-blur-xl border-b ${
        isDark
          ? "bg-[#061311]/80 border-teal-400/10"
          : "bg-[#e8f3ee]/80 border-emerald-900/10"
      }`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-5">
        <button
          type="button"
          onClick={onMenuClick}
          className={`lg:hidden w-10 h-10 rounded-full border flex items-center justify-center ${
            isDark
              ? "border-teal-400/20 text-slate-300"
              : "border-emerald-900/10 text-slate-700"
          }`}
        >
          ☰
        </button>

        <div className="hidden md:block max-w-md flex-1">
          <input
            type="text"
            placeholder="Search your courses, students..."
            className={`w-full px-5 py-2.5 rounded-full border text-sm outline-none focus:ring-2 ${
              isDark
                ? "bg-white/5 border-teal-400/10 text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:ring-teal-400/15"
                : "bg-white/70 border-emerald-900/10 text-[#061311] placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/15"
            }`}
          />
        </div>

        <div className="md:hidden">
          <h2
            className={`font-bold ${isDark ? "text-white" : "text-[#061311]"}`}
          >
            Instructor Panel
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
              isDark
                ? "border-teal-400/20 text-slate-300 hover:text-teal-300 hover:bg-teal-400/10"
                : "border-emerald-900/10 text-slate-700 hover:bg-white/70"
            }`}
          >
            {isDark ? "☼" : "☾"}
          </button>

          <Link to="/instructor/dashboard" className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p
                className={`text-sm font-semibold ${
                  isDark ? "text-white" : "text-[#061311]"
                }`}
              >
                {user?.name || "Instructor"}
              </p>

              <p
                className={
                  isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"
                }
              >
                {user?.email || "ins@lms.com"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center font-black shadow-[0_0_24px_rgba(45,212,191,0.28)]">
              I
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default InstructorTopbar;