import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function TopbarIcon({ type }) {
  if (type === "menu") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    );
  }

  if (type === "moon") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79Z" />
      </svg>
    );
  }

  if (type === "sun") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    );
  }

  if (type === "settings") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.51-1.4H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-.6V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 .6 1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.51 1.4H21a2 2 0 1 1 0 4h-.09A1.7 1.7 0 0 0 19.4 15Z" />
      </svg>
    );
  }

  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function AdminTopbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [profileOpen, setProfileOpen] = useState(false);

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

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);

    document.body.style.backgroundColor =
      nextTheme === "dark" ? "#061311" : "#e8f3ee";

    window.dispatchEvent(new Event("themechange"));
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const adminName = user?.role === "admin" ? "Admin" : user?.name || "Admin";
  const adminEmail = user?.email || "admin@lms.com";

  const topbarBg = isDark
    ? "bg-[#061311]/80 border-teal-400/10"
    : "bg-[#e8f3ee]/80 border-emerald-900/10";

  const iconButton = isDark
    ? "border-teal-400/20 text-slate-300 hover:text-teal-300 hover:bg-teal-400/10"
    : "border-emerald-900/10 text-slate-700 hover:text-emerald-700 hover:bg-white/70";

  const searchInput = isDark
    ? "bg-white/5 border-teal-400/10 text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:ring-teal-400/15"
    : "bg-white/70 border-emerald-900/10 text-[#061311] placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/15";

  const dropdownClass = isDark
    ? "bg-[#0b1714] border-teal-400/15 text-white shadow-[0_22px_60px_rgba(0,0,0,0.35)]"
    : "bg-white border-emerald-900/10 text-[#061311] shadow-[0_18px_45px_rgba(6,19,17,0.12)]";

  return (
    <header
      className={`sticky top-0 z-40 h-16 backdrop-blur-xl border-b transition-colors duration-300 ${topbarBg}`}
    >
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-5">
        <button
          type="button"
          onClick={onMenuClick}
          className={`lg:hidden w-10 h-10 rounded-full border flex items-center justify-center transition ${iconButton}`}
          aria-label="Open admin sidebar"
        >
          <TopbarIcon type="menu" />
        </button>

        <div className="hidden md:flex items-center gap-3 max-w-md flex-1">
          <div className="relative w-full">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
              <TopbarIcon type="search" />
            </span>

            <input
              type="text"
              placeholder="Search students, courses, instructors..."
              className={`w-full pl-11 pr-4 py-2.5 rounded-full border text-sm outline-none focus:ring-2 transition duration-300 ${searchInput}`}
            />
          </div>
        </div>

        <div className="md:hidden">
          <h2 className={`font-bold ${isDark ? "text-white" : "text-[#061311]"}`}>
            Admin Panel
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${iconButton}`}
            aria-label="Toggle theme"
          >
            <TopbarIcon type={isDark ? "sun" : "moon"} />
          </button>

          <button
            type="button"
            className={`relative w-10 h-10 rounded-full border flex items-center justify-center transition ${iconButton}`}
            aria-label="Notifications"
          >
            <TopbarIcon type="bell" />
            <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-teal-400 shadow-[0_0_12px_rgba(45,212,191,0.8)]" />
          </button>

          <div className="relative flex items-center gap-3 pl-1 sm:pl-2">
            <button
              type="button"
              onClick={() => setProfileOpen((prev) => !prev)}
              className="flex items-center gap-3"
            >
              <div className="hidden sm:block text-right">
                <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#061311]"}`}>
                  {adminName}
                </p>

                <p className={isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
                  {adminEmail}
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center font-black shadow-[0_0_24px_rgba(45,212,191,0.28)]">
                A
              </div>
            </button>

            {profileOpen && (
              <div
                className={`absolute right-0 top-14 w-72 rounded-3xl border p-5 z-50 ${dropdownClass}`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center font-black">
                    A
                  </div>

                  <div>
                    <h3 className="font-bold">Admin</h3>
                    <p className={isDark ? "text-xs text-slate-400" : "text-xs text-slate-500"}>
                      {adminEmail}
                    </p>
                  </div>
                </div>

                <div
                  className={`mt-5 rounded-2xl p-4 space-y-3 text-sm ${
                    isDark ? "bg-white/5" : "bg-emerald-50"
                  }`}
                >
                  <p className="flex justify-between">
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>
                      Role
                    </span>
                    <span className="font-semibold">Super Admin</span>
                  </p>

                  <p className="flex justify-between">
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>
                      Total Admins
                    </span>
                    <span className="font-semibold">3</span>
                  </p>

                  <p className="flex justify-between">
                    <span className={isDark ? "text-slate-400" : "text-slate-600"}>
                      Status
                    </span>
                    <span className="font-semibold text-teal-500">Active</span>
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    to="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-center text-sm font-semibold border transition ${
                      isDark
                        ? "border-teal-400/20 text-teal-300 hover:bg-teal-400/10"
                        : "border-emerald-900/10 text-emerald-700 hover:bg-emerald-50"
                    }`}
                  >
                    Settings
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-4 py-2.5 rounded-xl text-sm font-semibold bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20 transition"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminTopbar;