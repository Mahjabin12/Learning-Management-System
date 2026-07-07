import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function SidebarIcon({ type }) {
  const common = "w-5 h-5 transition duration-300";

  const icons = {
    dashboard: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M3 13h8V3H3v10Z" />
        <path d="M13 21h8V11h-8v10Z" />
        <path d="M13 3v6h8V3h-8Z" />
        <path d="M3 21h8v-6H3v6Z" />
      </svg>
    ),
    courses: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5Z" />
      </svg>
    ),
    users: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    instructor: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 10v6" />
        <path d="M2 10l10-5 10 5-10 5Z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    enrollments: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    revenue: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    bell: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    activity: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
      </svg>
    ),
    settings: (
      <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 15.5A3.5 3.5 0 1 0 12 8a3.5 3.5 0 0 0 0 7.5Z" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.09A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6 1.7 1.7 0 0 0 .4-1.1V3a2 2 0 1 1 4 0v.09A1.7 1.7 0 0 0 15 4.6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.22.37.58.65 1 .75.17.04.34.06.5.06H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
      </svg>
    ),
  };

  return icons[type] || icons.dashboard;
}

function AdminSidebar({ isOpen = false, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "dark");

    syncTheme();
    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const links = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "dashboard" },
    { name: "Courses", path: "/admin/courses", icon: "courses" },
    { name: "Students", path: "/admin/users", icon: "users" },
    { name: "Instructors", path: "/admin/instructors", icon: "instructor" },
    { name: "Enrollments", path: "/admin/enrollments", icon: "enrollments" },
    { name: "Certificates", path: "/admin/notifications", icon: "bell" },
    { name: "Revenue", path: "/admin/revenue", icon: "revenue" },
    { name: "Notifications", path: "/admin/notifications", icon: "bell" },
    { name: "Announcements", path: "/admin/announcements", icon: "courses" },
    { name: "Activity Logs", path: "/admin/activity-logs", icon: "activity" },
    { name: "Settings", path: "/admin/settings", icon: "settings" },
  ];

  const sidebarBg = isDark
    ? "bg-[#061311]/95 border-teal-400/10"
    : "bg-[#e8f3ee]/95 border-emerald-900/10";

  const logoText = isDark ? "text-white" : "text-[#061311]";
  const mutedText = isDark ? "text-slate-400" : "text-slate-600";

  const linkClass = ({ isActive }) => {
    if (isDark) {
      return isActive
        ? "flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-teal-400/15 text-teal-300 font-semibold border border-teal-400/25 shadow-[0_0_28px_rgba(45,212,191,0.16)]"
        : "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-slate-400 hover:text-teal-300 hover:bg-teal-400/10 hover:border-teal-400/20 border border-transparent transition duration-300";
    }

    return isActive
      ? "flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#061311] text-white font-semibold border border-[#061311] shadow-[0_14px_35px_rgba(6,19,17,0.16)]"
      : "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-slate-600 hover:text-emerald-700 hover:bg-white/70 hover:border-emerald-500/20 border border-transparent transition duration-300";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 w-72 h-screen flex flex-col border-r backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } ${sidebarBg}`}
    >
      <div
        className={`px-6 py-5 border-b shrink-0 ${
          isDark ? "border-teal-400/10" : "border-emerald-900/10"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center font-black shadow-[0_0_28px_rgba(45,212,191,0.35)]">
            SL
          </div>

          <div>
            <h1 className={`text-2xl font-black ${logoText}`}>Skillora</h1>
            <p className={`text-xs ${mutedText}`}>Admin Control Center</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto admin-sidebar-scroll">
        {links.map((link) => (
          <NavLink
            key={`${link.name}-${link.path}`}
            to={link.path}
            onClick={onClose}
            className={linkClass}
          >
            <SidebarIcon type={link.icon} />
            <span>{link.name}</span>
          </NavLink>
        ))}
      </nav>

      <div
        className={`p-4 border-t shrink-0 ${
          isDark ? "border-teal-400/10" : "border-emerald-900/10"
        }`}
      >
        <button
          type="button"
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-2xl bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20 transition"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;