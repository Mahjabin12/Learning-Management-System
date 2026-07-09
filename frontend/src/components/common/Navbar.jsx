import {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Link,
  NavLink,
  useNavigate,
} from "react-router-dom";
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
  if (typeof window === "undefined") {
    return "dark";
  }

  return localStorage.getItem("theme") || "dark";
}

function getUserAccess(user) {
  const mainRole = String(
    user?.role || ""
  ).toLowerCase();

  const roles = Array.isArray(user?.roles)
    ? user.roles.map((role) =>
        String(role).toLowerCase()
      )
    : [];

  const instructorStatus = String(
    user?.instructorApplicationStatus ||
      user?.instructorStatus ||
      ""
  ).toLowerCase();

  const isAdmin =
    mainRole === "admin" ||
    roles.includes("admin");

  const isInstructor =
    mainRole === "instructor" ||
    roles.includes("instructor") ||
    user?.isInstructorApproved === true ||
    instructorStatus === "approved";

  return {
    isAdmin,
    isInstructor,
  };
}

function Navbar() {
  const {
    user,
    isLoggedIn,
    logout,
  } = useAuth();

  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const [theme, setTheme] =
    useState(getSavedTheme);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const isDark = theme === "dark";

  const {
    isAdmin,
    isInstructor,
  } = getUserAccess(user);

  const userName =
    user?.name ||
    user?.fullName ||
    user?.displayName ||
    "Skillora User";

  const userEmail = user?.email || "";

  const userImage =
    user?.avatar ||
    user?.profileImage ||
    user?.photoURL ||
    "";

  const avatarText =
    userName?.trim()?.charAt(0)?.toUpperCase() ||
    userEmail?.trim()?.charAt(0)?.toUpperCase() ||
    "U";

  useEffect(() => {
    const applyTheme = () => {
      const savedTheme = getSavedTheme();

      setTheme(savedTheme);

      document.body.style.backgroundColor =
        savedTheme === "dark"
          ? "#020a08"
          : "#effaf5";
    };

    applyTheme();

    window.addEventListener(
      "themechange",
      applyTheme
    );

    window.addEventListener(
      "storage",
      applyTheme
    );

    return () => {
      window.removeEventListener(
        "themechange",
        applyTheme
      );

      window.removeEventListener(
        "storage",
        applyTheme
      );
    };
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      closeOnResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        closeOnResize
      );
    };
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  useEffect(() => {
    setProfileOpen(false);
    setMobileOpen(false);
  }, [isLoggedIn]);

  const toggleTheme = () => {
    const nextTheme = isDark
      ? "light"
      : "dark";

    localStorage.setItem(
      "theme",
      nextTheme
    );

    setTheme(nextTheme);

    document.body.style.backgroundColor =
      nextTheme === "dark"
        ? "#020a08"
        : "#effaf5";

    window.dispatchEvent(
      new Event("themechange")
    );
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const closeProfile = () => {
    setProfileOpen(false);
  };

  const closeAllMenus = () => {
    setProfileOpen(false);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeAllMenus();
    navigate("/login");
  };

  const navbarTheme = isDark
    ? "border-white/[0.07] bg-[#03110e]/95 text-white"
    : "border-emerald-900/10 bg-[#F8FFFC]/95 text-[#10241E]";

  const dropdownTheme = isDark
    ? "border-teal-400/20 bg-[#0A201A] text-white shadow-[0_24px_70px_rgba(0,0,0,0.70)]"
    : "border-emerald-900/15 bg-[#F8FFFC] text-[#10241E] shadow-[0_24px_65px_rgba(6,78,59,0.24)]";

  const dropdownDivider = isDark
    ? "border-white/10"
    : "border-emerald-900/10";

  const dropdownLinkTheme = isDark
    ? "text-slate-200 hover:bg-teal-400/15 hover:text-teal-300"
    : "text-slate-700 hover:bg-emerald-100 hover:text-emerald-800";

  const mobilePanelTheme = isDark
    ? "border-teal-400/15 bg-[#071713] text-white shadow-[0_24px_70px_rgba(0,0,0,0.65)]"
    : "border-emerald-900/15 bg-[#F8FFFC] text-[#10241E] shadow-[0_24px_60px_rgba(6,78,59,0.20)]";

  return (
    <header
      className={`sticky top-0 z-[120] border-b transition-colors duration-300 ${navbarTheme}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-teal-400/[0.035] to-transparent" />

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-400/55 to-transparent shadow-[0_0_18px_rgba(45,212,191,0.30)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeAllMenus}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-300 via-emerald-300 to-teal-500 text-xs font-black text-[#03110e] shadow-[0_10px_30px_rgba(45,212,191,0.28)] transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
              SL
            </div>

            <span
              className={`text-xl font-black tracking-tight sm:text-2xl ${
                isDark
                  ? "text-white"
                  : "text-[#10241E]"
              }`}
            >
              Skillora
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.path}
                item={item}
                isDark={isDark}
              />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex shrink-0 items-center gap-2.5">
            {/* Theme button */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:rotate-12 ${
                isDark
                  ? "border-white/10 bg-white/[0.08] text-slate-300 hover:bg-teal-400 hover:text-[#03110e]"
                  : "border-emerald-900/10 bg-white text-slate-600 shadow-sm hover:bg-teal-400 hover:text-[#03110e]"
              }`}
              aria-label="Toggle theme"
              title={
                isDark
                  ? "Light mode"
                  : "Dark mode"
              }
            >
              {isDark ? (
                <SunIcon />
              ) : (
                <MoonIcon />
              )}
            </button>

            <div className="hidden items-center gap-2.5 lg:flex">
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
                  {/* Alphabet avatar */}
                  <div
                    ref={profileMenuRef}
                    className="relative"
                    onMouseEnter={() =>
                      setProfileOpen(true)
                    }
                    onMouseLeave={() =>
                      setProfileOpen(false)
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setProfileOpen(
                          (previous) => !previous
                        )
                      }
                      className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 ${
                        isDark
                          ? "border-teal-400/20 bg-teal-400 text-[#03110e] shadow-[0_10px_25px_rgba(45,212,191,0.22)]"
                          : "border-emerald-600/20 bg-teal-400 text-[#03110e] shadow-[0_10px_22px_rgba(13,148,136,0.20)]"
                      }`}
                      aria-label="Open user menu"
                      aria-expanded={profileOpen}
                    >
                      {userImage ? (
                        <img
                          src={userImage}
                          alt={userName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-sm font-black uppercase">
                          {avatarText}
                        </span>
                      )}
                    </button>

                    {/* Dropdown */}
                    <div
                      className={`absolute right-0 top-full z-[160] w-64 pt-2 transition-all duration-200 ${
                        profileOpen
                          ? "visible translate-y-0 opacity-100"
                          : "invisible -translate-y-2 opacity-0"
                      }`}
                    >
                      <div
                        className={`overflow-hidden rounded-2xl border ${dropdownTheme}`}
                      >
                        {/* User details */}
                        <div
                          className={`border-b px-4 py-4 ${dropdownDivider}`}
                        >
                          <div className="flex items-center gap-3">
                            {userImage ? (
                              <img
                                src={userImage}
                                alt={userName}
                                className="h-11 w-11 rounded-xl object-cover"
                              />
                            ) : (
                              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 text-sm font-black uppercase text-[#03110e]">
                                {avatarText}
                              </div>
                            )}

                            <div className="min-w-0">
                              <p className="truncate text-sm font-black">
                                {userName}
                              </p>

                              {userEmail && (
                                <p
                                  className={`mt-0.5 truncate text-[10px] ${
                                    isDark
                                      ? "text-slate-400"
                                      : "text-slate-500"
                                  }`}
                                >
                                  {userEmail}
                                </p>
                              )}

                              <span
                                className={`mt-2 inline-flex rounded-full px-2 py-1 text-[8px] font-black uppercase tracking-wide ${
                                  isAdmin
                                    ? "bg-violet-400/15 text-violet-400"
                                    : isInstructor
                                    ? "bg-teal-400/15 text-teal-500"
                                    : isDark
                                    ? "bg-white/[0.07] text-slate-300"
                                    : "bg-emerald-100 text-emerald-700"
                                }`}
                              >
                                {isAdmin
                                  ? "Admin"
                                  : isInstructor
                                  ? "Instructor"
                                  : "Learner"}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Dashboard links */}
                        <div className="p-2">
                          {!isAdmin && (
                            <Link
                              to="/student/dashboard"
                              onClick={closeProfile}
                              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[12px] font-bold transition ${dropdownLinkTheme}`}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-teal-500">
                                <DashboardIcon />
                              </span>

                              <div className="min-w-0">
                                <span className="block truncate">
                                  My Dashboard
                                </span>

                                <span
                                  className={`mt-0.5 block text-[9px] font-medium ${
                                    isDark
                                      ? "text-slate-400"
                                      : "text-slate-500"
                                  }`}
                                >
                                  Manage your learning
                                </span>
                              </div>
                            </Link>
                          )}

                          {isInstructor && (
                            <Link
                              to="/instructor/dashboard"
                              onClick={closeProfile}
                              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[12px] font-bold transition ${dropdownLinkTheme}`}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-400/10 text-teal-500">
                                <InstructorIcon />
                              </span>

                              <div className="min-w-0">
                                <span className="block truncate">
                                  Instructor Dashboard
                                </span>

                                <span
                                  className={`mt-0.5 block text-[9px] font-medium ${
                                    isDark
                                      ? "text-slate-400"
                                      : "text-slate-500"
                                  }`}
                                >
                                  Manage courses and students
                                </span>
                              </div>
                            </Link>
                          )}

                          {isAdmin && (
                            <Link
                              to="/admin/dashboard"
                              onClick={closeProfile}
                              className={`flex items-center gap-3 rounded-xl px-3 py-3 text-[12px] font-bold transition ${dropdownLinkTheme}`}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-400/10 text-violet-500">
                                <DashboardIcon />
                              </span>

                              <div className="min-w-0">
                                <span className="block truncate">
                                  Admin Dashboard
                                </span>

                                <span
                                  className={`mt-0.5 block text-[9px] font-medium ${
                                    isDark
                                      ? "text-slate-400"
                                      : "text-slate-500"
                                  }`}
                                >
                                  Manage Skillora
                                </span>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Logout icon with tooltip */}
                  <div className="group relative">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-0.5 ${
                        isDark
                          ? "border-red-400/20 bg-red-500/10 text-red-300 hover:border-red-400/40 hover:bg-red-500/20 hover:text-red-200"
                          : "border-red-300 bg-red-50 text-red-600 hover:border-red-400 hover:bg-red-100"
                      }`}
                      aria-label="Logout"
                    >
                      <LogoutIcon />
                    </button>

                    <span
                      className={`pointer-events-none absolute right-0 top-full z-[170] mt-2 whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 ${
                        isDark
                          ? "bg-[#102822] text-red-300"
                          : "bg-white text-red-600"
                      }`}
                    >
                      Logout
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() =>
                setMobileOpen(
                  (previous) => !previous
                )
              }
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

      {/* Mobile menu */}
      <div
        className={`absolute left-0 top-full w-full overflow-hidden transition-all duration-500 lg:hidden ${
          mobileOpen
            ? "visible max-h-[760px] opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div
          className={`mx-3 mt-2 rounded-3xl border p-3 sm:mx-6 ${mobilePanelTheme}`}
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
                      ? "text-slate-200 hover:bg-white/[0.08] hover:text-white"
                      : "text-slate-700 hover:bg-emerald-100 hover:text-emerald-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {isLoggedIn && (
              <>
                <div
                  className={`my-2 border-t ${dropdownDivider}`}
                />

                {/* Mobile user information */}
                <div
                  className={`flex items-center gap-3 rounded-xl border p-3 ${
                    isDark
                      ? "border-teal-400/15 bg-[#0A201A]"
                      : "border-emerald-900/10 bg-white"
                  }`}
                >
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={userName}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-400 text-sm font-black uppercase text-[#03110e]">
                      {avatarText}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p
                      className={`truncate text-sm font-black ${
                        isDark
                          ? "text-white"
                          : "text-[#10241E]"
                      }`}
                    >
                      {userName}
                    </p>

                    {userEmail && (
                      <p
                        className={`truncate text-[10px] ${
                          isDark
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        {userEmail}
                      </p>
                    )}
                  </div>
                </div>

                {!isAdmin && (
                  <NavLink
                    to="/student/dashboard"
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-bold transition ${
                        isActive
                          ? "bg-teal-400 text-[#03110e]"
                          : isDark
                          ? "text-slate-200 hover:bg-white/[0.08]"
                          : "text-slate-700 hover:bg-emerald-100"
                      }`
                    }
                  >
                    My Dashboard
                  </NavLink>
                )}

                {isInstructor && (
                  <NavLink
                    to="/instructor/dashboard"
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-bold transition ${
                        isActive
                          ? "bg-teal-400 text-[#03110e]"
                          : isDark
                          ? "text-slate-200 hover:bg-white/[0.08]"
                          : "text-slate-700 hover:bg-emerald-100"
                      }`
                    }
                  >
                    Instructor Dashboard
                  </NavLink>
                )}

                {isAdmin && (
                  <NavLink
                    to="/admin/dashboard"
                    onClick={closeMobile}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-sm font-bold transition ${
                        isActive
                          ? "bg-teal-400 text-[#03110e]"
                          : isDark
                          ? "text-slate-200 hover:bg-white/[0.08]"
                          : "text-slate-700 hover:bg-emerald-100"
                      }`
                    }
                  >
                    Admin Dashboard
                  </NavLink>
                )}

                <div
                  className={`mt-2 border-t pt-3 ${dropdownDivider}`}
                >
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-black ${
                      isDark
                        ? "border-red-400/25 bg-red-500/10 text-red-300"
                        : "border-red-300 bg-red-50 text-red-600"
                    }`}
                  >
                    <LogoutIcon />
                    Logout
                  </button>
                </div>
              </>
            )}

            {!isLoggedIn && (
              <div
                className={`mt-2 border-t pt-3 ${dropdownDivider}`}
              >
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-400 px-5 py-3 text-sm font-black text-[#03110e]"
                >
                  <UserIcon />
                  Login
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

function DesktopNavItem({
  item,
  isDark,
}) {
  return (
    <NavLink
      to={item.path}
      className="group relative px-1 py-5"
    >
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

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
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
          open
            ? "translate-y-[8px] rotate-45"
            : ""
        }`}
      />

      <span
        className={`absolute left-0 top-[10px] h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
          open
            ? "scale-x-0 opacity-0"
            : ""
        }`}
      />

      <span
        className={`absolute left-0 top-[18px] h-[2px] w-6 rounded-full bg-current transition-all duration-300 ${
          open
            ? "-translate-y-[8px] -rotate-45"
            : ""
        }`}
      />
    </span>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

function InstructorIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 8 9-5 9 5-9 5-9-5Z" />
      <path d="M7 10.5V15c0 1.7 2.2 3 5 3s5-1.3 5-3v-4.5" />
      <path d="M21 8v6" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
      <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
    </svg>
  );
}

export default Navbar;