import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Courses", path: "/courses" },
  { label: "Categories", path: "/categories" },
  { label: "Blog", path: "/blogs" },
  { label: "Contact", path: "/contact" },
];

function getSavedTheme() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.6 6.6 0 0 0 21 12.8Z" />
    </svg>
  );
}

function MenuIcon({ open }) {
  return (
    <span className="relative block h-5 w-6">
      <span
        className={`absolute left-0 top-[2px] h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
          open ? "translate-y-[8px] rotate-45" : ""
        }`}
      />

      <span
        className={`absolute left-0 top-[10px] h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
          open ? "scale-x-0 opacity-0" : ""
        }`}
      />

      <span
        className={`absolute left-0 top-[18px] h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
          open ? "-translate-y-[8px] -rotate-45" : ""
        }`}
      />
    </span>
  );
}

function DesktopNavItem({ item, isDark }) {
  return (
    <NavLink to={item.path} className="group relative px-1 py-5">
      {({ isActive }) => (
        <>
          <span
            className={`text-sm font-bold transition-colors duration-300 ${
              isActive
                ? isDark
                  ? "text-white"
                  : "text-[#10241E]"
                : isDark
                ? "text-slate-400 group-hover:text-white"
                : "text-slate-500 group-hover:text-[#10241E]"
            }`}
          >
            {item.label}
          </span>

          <span
            className={`absolute bottom-[13px] left-0 h-[2px] w-full origin-left rounded-full bg-gradient-to-r from-teal-300 to-emerald-400 transition-transform duration-300 ${
              isActive
                ? "scale-x-100"
                : "scale-x-0 group-hover:scale-x-100"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState(getSavedTheme);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = getSavedTheme();

      setTheme(savedTheme);

      document.body.style.backgroundColor =
        savedTheme === "dark" ? "#020a08" : "#effaf5";
    };

    applyTheme();

    window.addEventListener("themechange", applyTheme);
    window.addEventListener("storage", applyTheme);

    return () => {
      window.removeEventListener("themechange", applyTheme);
      window.removeEventListener("storage", applyTheme);
    };
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);

    return () => {
      window.removeEventListener("resize", closeOnResize);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);

    document.body.style.backgroundColor =
      nextTheme === "dark" ? "#020a08" : "#effaf5";

    window.dispatchEvent(new Event("themechange"));
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMobile();
    navigate("/login");
  };

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "instructor"
      ? "/instructor/dashboard"
      : "/student/dashboard";

  const avatarText =
    user?.name?.trim()?.charAt(0)?.toUpperCase() ||
    (user?.role === "admin"
      ? "A"
      : user?.role === "instructor"
      ? "I"
      : "S");

  const navbarTheme = isDark
    ? "border-white/[0.07] bg-[#03110e]/82 text-white"
    : "border-emerald-900/10 bg-white/80 text-[#10241E]";

  const mobilePanelTheme = isDark
    ? "border-white/10 bg-[#061713]/96 text-white"
    : "border-emerald-900/10 bg-white/96 text-[#10241E]";

  return (
    <header
      className={`sticky top-0 z-[120] border-b backdrop-blur-2xl transition-colors duration-300 ${navbarTheme}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/[0.035] to-transparent" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-400/55 to-transparent shadow-[0_0_18px_rgba(45,212,191,0.30)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={closeMobile}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 via-emerald-300 to-teal-500 text-xs font-black text-[#03110e] shadow-[0_10px_30px_rgba(45,212,191,0.28)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
              SL
            </div>

            <span
              className={`text-xl font-black tracking-tight sm:text-2xl ${
                isDark ? "text-white" : "text-[#10241E]"
              }`}
            >
              Skillora
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.path}
                item={item}
                isDark={isDark}
              />
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:rotate-12 ${
                isDark
                  ? "border-white/10 bg-white/[0.08] text-slate-300 hover:bg-teal-400 hover:text-[#03110e]"
                  : "border-emerald-900/10 bg-white text-slate-600 shadow-sm hover:bg-teal-400 hover:text-[#03110e]"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            <div className="hidden lg:flex lg:items-center lg:gap-2.5">
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  className={`inline-flex h-10 items-center gap-2 rounded-full border px-5 text-sm font-black transition-all duration-300 hover:-translate-y-0.5 ${
                    isDark
                      ? "border-white/10 bg-white/[0.045] text-white hover:border-teal-300/50 hover:bg-teal-400/10"
                      : "border-emerald-900/10 bg-white text-[#10241E] shadow-sm hover:border-teal-500/40 hover:bg-teal-50"
                  }`}
                >
                  <UserIcon />
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to={dashboardPath}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 to-emerald-500 text-sm font-black uppercase text-[#03110e] shadow-[0_10px_25px_rgba(45,212,191,0.22)] transition-all duration-300 hover:scale-105"
                    aria-label="Open dashboard"
                  >
                    {avatarText}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`h-10 rounded-full border px-4 text-sm font-bold transition-all duration-300 ${
                      isDark
                        ? "border-white/10 bg-white/[0.04] text-slate-300 hover:border-red-400/40 hover:bg-red-500/10 hover:text-red-300"
                        : "border-emerald-900/10 bg-white text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                    }`}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((previous) => !previous)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border lg:hidden ${
                isDark
                  ? "border-white/10 bg-white/[0.08] text-white"
                  : "border-emerald-900/10 bg-white text-[#10241E]"
              }`}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon open={mobileOpen} />
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute left-0 top-full w-full overflow-hidden transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "visible max-h-[620px] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div
          className={`mx-3 mt-2 rounded-3xl border p-3 shadow-2xl backdrop-blur-2xl sm:mx-6 ${mobilePanelTheme}`}
        >
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-teal-400 text-[#03110e]"
                      : isDark
                      ? "text-slate-300 hover:bg-white/[0.08] hover:text-white"
                      : "text-slate-600 hover:bg-teal-50 hover:text-[#10241E]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isLoggedIn && (
              <NavLink
                to={dashboardPath}
                onClick={closeMobile}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? "bg-teal-400 text-[#03110e]"
                      : isDark
                      ? "text-slate-300 hover:bg-white/[0.08]"
                      : "text-slate-600 hover:bg-teal-50"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            <div
              className={`mt-2 border-t pt-3 ${
                isDark ? "border-white/10" : "border-emerald-900/10"
              }`}
            >
              {!isLoggedIn ? (
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-black text-[#03110e]"
                >
                  <UserIcon />
                  Login
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-teal-400 px-5 py-3 text-sm font-black text-[#03110e]"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;