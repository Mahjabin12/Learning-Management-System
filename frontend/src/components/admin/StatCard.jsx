import { useEffect, useState } from "react";

function StatCard({ title, value, note }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    syncTheme();

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)] hover:border-teal-400/40 hover:shadow-[0_0_38px_rgba(45,212,191,0.14)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)] hover:border-emerald-500/30 hover:shadow-[0_18px_45px_rgba(20,184,166,0.16)]";

  return (
    <div
      className={`rounded-3xl p-6 border backdrop-blur-xl hover:-translate-y-1 transition duration-300 ${cardClass}`}
    >
      <p className={isDark ? "text-sm text-slate-400" : "text-sm text-slate-600"}>
        {title}
      </p>

      <h2 className="text-3xl font-black text-teal-500 mt-2">
        {value}
      </h2>

      {note && (
        <p className={isDark ? "text-xs text-teal-300 mt-2" : "text-xs text-emerald-700 mt-2"}>
          {note}
        </p>
      )}
    </div>
  );
}

export default StatCard;