import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function UserIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="w-4 h-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3A7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      className="w-6 h-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const [theme, setTheme] = useState("dark");
  const [mobileOpen, setMobileOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.body.style.backgroundColor =
      savedTheme === "dark" ? "#061311" : "#e8f3ee";
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    document.body.style.backgroundColor =
      newTheme === "dark" ? "#061311" : "#e8f3ee";

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
    user?.role === "admin"
      ? "A"
      : user?.role === "instructor"
      ? "I"
      : "S";

  const navClass = ({ isActive }) => {
    if (isDark) {
      return isActive
        ? "px-4 py-2 rounded-md bg-white text-[#061311] text-xs font-bold shadow-sm"
        : "px-4 py-2 rounded-md text-white/65 hover:text-white hover:bg-white/10 text-xs font-medium transition duration-300";
    }

    return isActive
      ? "px-4 py-2 rounded-md bg-[#061311] text-white text-xs font-bold shadow-sm"
      : "px-4 py-2 rounded-md text-slate-700 hover:text-[#061311] hover:bg-white/70 text-xs font-medium transition duration-300";
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        isDark ? "bg-[#061311]" : "bg-[#e8f3ee]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="h-14 flex items-center justify-between gap-5">
          <Link to="/" onClick={closeMobile} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center font-black text-xs shadow-[0_0_25px_rgba(45,212,191,0.35)]">
              SL
            </div>

            <span
              className={`text-xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Skillora
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/about" className={navClass}>
              About Us
            </NavLink>

            <NavLink to="/courses" className={navClass}>
              Courses
            </NavLink>

            <NavLink to="/categories" className={navClass}>
              Categories
            </NavLink>

            <NavLink to="/blogs" className={navClass}>
              Blog
            </NavLink>

            <NavLink to="/contact" className={navClass}>
              Contact
            </NavLink>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition duration-300 ${
                isDark
                  ? "bg-white/10 text-white/75 hover:text-teal-400 hover:bg-white/15"
                  : "bg-white/70 text-slate-700 hover:text-emerald-700"
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>

            {!isLoggedIn ? (
              <Link
                to="/login"
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition duration-300 ${
                  isDark
                    ? "border border-white/15 text-white/80 hover:bg-teal-400 hover:text-[#061311]"
                    : "border border-emerald-900/10 bg-white/70 text-slate-800 hover:bg-emerald-600 hover:text-white"
                }`}
              >
                <UserIcon />
                Login
              </Link>
            ) : (
              <>
                <Link
                  to={dashboardPath}
                  className="w-9 h-9 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center font-black uppercase hover:bg-white transition"
                >
                  {avatarText}
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                    isDark
                      ? "border border-white/15 text-white/80 hover:bg-red-500/20 hover:text-red-300"
                      : "border border-emerald-900/10 bg-white/70 text-slate-800 hover:bg-red-50 hover:text-red-600"
                  }`}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={`lg:hidden ${isDark ? "text-white" : "text-[#061311]"}`}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen && (
          <div className="lg:hidden py-5">
            <nav className="flex flex-col gap-3">
              <NavLink to="/" onClick={closeMobile} className={navClass}>
                Home
              </NavLink>

              <NavLink to="/about" onClick={closeMobile} className={navClass}>
                About Us
              </NavLink>

              <NavLink to="/courses" onClick={closeMobile} className={navClass}>
                Courses
              </NavLink>

              <NavLink
                to="/categories"
                onClick={closeMobile}
                className={navClass}
              >
                Categories
              </NavLink>

              <NavLink to="/blogs" onClick={closeMobile} className={navClass}>
                Blog
              </NavLink>

              <NavLink to="/contact" onClick={closeMobile} className={navClass}>
                Contact
              </NavLink>

              {isLoggedIn && (
                <NavLink
                  to={dashboardPath}
                  onClick={closeMobile}
                  className={navClass}
                >
                  Dashboard
                </NavLink>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    isDark ? "bg-white/10 text-white" : "bg-white/70 text-slate-800"
                  }`}
                  aria-label="Toggle theme"
                >
                  {isDark ? <SunIcon /> : <MoonIcon />}
                </button>

                {!isLoggedIn ? (
                  <Link
                    to="/login"
                    onClick={closeMobile}
                    className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold ${
                      isDark
                        ? "border border-white/15 text-white"
                        : "bg-white/80 text-[#061311]"
                    }`}
                  >
                    <UserIcon />
                    Login
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex-1 px-5 py-3 rounded-full bg-teal-400 text-[#061311] font-bold"
                  >
                    Logout
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;