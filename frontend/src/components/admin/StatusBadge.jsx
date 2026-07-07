import { useEffect, useState } from "react";

function StatusBadge({ status }) {
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

  const darkStatusClass = {
    Published: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    Draft: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
    Active: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    Inactive: "bg-red-400/10 text-red-300 border-red-400/20",
    Paid: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    Pending: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
    Completed: "bg-blue-400/10 text-blue-300 border-blue-400/20",
    "In Progress": "bg-purple-400/10 text-purple-300 border-purple-400/20",
    Open: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
    Resolved: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    Approved: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    Rejected: "bg-red-400/10 text-red-300 border-red-400/20",
  };

  const lightStatusClass = {
    Published: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Active: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Inactive: "bg-red-100 text-red-700 border-red-200",
    Paid: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Completed: "bg-blue-100 text-blue-700 border-blue-200",
    "In Progress": "bg-purple-100 text-purple-700 border-purple-200",
    Open: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
  };

  const statusClass = isDark
    ? darkStatusClass[status] || "bg-white/10 text-slate-300 border-white/10"
    : lightStatusClass[status] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${statusClass}`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;