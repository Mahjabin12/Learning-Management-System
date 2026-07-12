import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Icon({ type, className = "h-5 w-5" }) {
  const commonProps = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  const icons = {
    menu: (
      <svg {...commonProps}>
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),

    bell: (
      <svg {...commonProps}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
    ),

    message: (
      <svg {...commonProps}>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
      </svg>
    ),

    mail: (
      <svg {...commonProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),

    blog: (
      <svg {...commonProps}>
        <path d="M6 3h9l4 4v14H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
        <path d="M14 3v5h5" />
        <path d="M8 13h8M8 17h6" />
      </svg>
    ),

    sun: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41" />
        <path d="M17.66 17.66l1.41 1.41M2 12h2M20 12h2" />
        <path d="M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),

    moon: (
      <svg {...commonProps}>
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
    ),

    grid: (
      <svg {...commonProps}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),

    settings: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.12 2.12-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V20.3h-3v-.08a1.7 1.7 0 0 0-1.03-1.56 1.7 1.7 0 0 0-1.88.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7 15a1.7 1.7 0 0 0-1.56-1.03H5.3v-3h.14A1.7 1.7 0 0 0 7 9.94a1.7 1.7 0 0 0-.34-1.88L6.6 8l2.12-2.12.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 11.7 4.7V4.6h3v.1a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.88-.34l.06-.06L19.8 8l-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.56 1.03h.14v3h-.14A1.7 1.7 0 0 0 19.4 15Z" />
      </svg>
    ),

    logout: (
      <svg {...commonProps}>
        <path d="M10 17l5-5-5-5" />
        <path d="M15 12H3" />
        <path d="M14 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5" />
      </svg>
    ),
  };

  return icons[type] || null;
}

function AdminTopbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const topbarRef = useRef(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  const [profileOpen, setProfileOpen] = useState(false);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);

  const isDark = theme === "dark";

  const adminName =
    user?.fullName?.trim() ||
    user?.name?.trim() ||
    user?.username?.trim() ||
    "Admin";

  const email = user?.email || "admin@lms.com";
  const profileInitial = adminName.charAt(0).toUpperCase() || "A";

  useEffect(() => {
    const syncTheme = () => {
      const currentTheme = localStorage.getItem("theme") || "dark";

      setTheme(currentTheme);

      document.documentElement.classList.toggle(
        "dark",
        currentTheme === "dark"
      );
    };

    syncTheme();

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    const closeDropdowns = (event) => {
      if (
        topbarRef.current &&
        !topbarRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
        setQuickMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setQuickMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdowns);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", closeDropdowns);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";

    localStorage.setItem("theme", nextTheme);
    document.documentElement.classList.toggle(
      "dark",
      nextTheme === "dark"
    );

    setTheme(nextTheme);
    window.dispatchEvent(new Event("themechange"));
  };

  const handleLogout = async () => {
    setProfileOpen(false);

    try {
      await logout();
    } finally {
      navigate("/", { replace: true });
    }
  };

  const closeMenus = () => {
    setProfileOpen(false);
    setQuickMenuOpen(false);
  };

  const actionButtonClass = `
    relative inline-flex h-11 w-11 shrink-0
    items-center justify-center rounded-xl border
    transition duration-200
    focus:outline-none focus-visible:ring-2
    focus-visible:ring-teal-400/70
    ${
      isDark
        ? "border-white/10 text-slate-300 hover:border-teal-400/30 hover:bg-white/[0.06] hover:text-teal-300"
        : "border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:bg-teal-50 hover:text-teal-700"
    }
  `;

  const dropdownClass = `
    absolute right-0 top-[calc(100%+12px)]
    z-[70] overflow-hidden rounded-2xl border shadow-2xl
    ${
      isDark
        ? "border-white/10 bg-[#0b1a17] text-white shadow-black/30"
        : "border-slate-200 bg-white text-slate-900 shadow-slate-300/40"
    }
  `;

  const dropdownItemClass = `
    flex w-full items-center gap-3 rounded-xl px-3 py-3
    text-sm font-medium transition
    ${
      isDark
        ? "text-slate-300 hover:bg-white/[0.06] hover:text-teal-300"
        : "text-slate-700 hover:bg-teal-50 hover:text-teal-700"
    }
  `;

  return (
    <header
      ref={topbarRef}
      className={`
        sticky top-0 z-50 h-[88px] w-full min-w-0
        border-b backdrop-blur-xl
        ${
          isDark
            ? "border-teal-400/10 bg-[#061311]/95"
            : "border-slate-200 bg-white/95"
        }
      `}
    >
      <div className="flex h-full min-w-0 items-center gap-3 px-4 sm:gap-4 sm:px-6 xl:px-8">
        {/* Mobile sidebar button */}
        <button
          type="button"
          onClick={onMenuClick}
          className={`${actionButtonClass} lg:hidden`}
          aria-label="Open sidebar"
        >
          <Icon type="menu" />
        </button>

        {/* Welcome section */}
        <div className="min-w-0 flex-1">
          <h2
            className={`
              truncate text-base font-bold leading-tight
              sm:text-lg xl:text-xl
              ${isDark ? "text-white" : "text-[#061311]"}
            `}
          >
            Welcome back, {adminName}{" "}
            <span aria-hidden="true">👋</span>
          </h2>

          <p
            className={`
              mt-1 hidden truncate text-xs sm:block sm:text-sm
              ${isDark ? "text-slate-400" : "text-slate-500"}
            `}
          >
            Manage your Skillora platform
          </p>
        </div>

        {/* Right actions */}
        <div className="flex shrink-0 items-center gap-2">
          {/* Theme */}
          <button
            type="button"
            onClick={toggleTheme}
            className={actionButtonClass}
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            title={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
          >
            <Icon type={isDark ? "sun" : "moon"} />
          </button>

          {/* Desktop quick links */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              to="/admin/messages"
              onClick={closeMenus}
              className={actionButtonClass}
              aria-label="Messages"
              title="Messages"
            >
              <Icon type="message" />
            </Link>

            <Link
              to="/admin/contact-requests"
              onClick={closeMenus}
              className={actionButtonClass}
              aria-label="Contact requests"
              title="Contact requests"
            >
              <Icon type="mail" />
            </Link>

            <Link
              to="/admin/blog"
              onClick={closeMenus}
              className={actionButtonClass}
              aria-label="Blog management"
              title="Blog management"
            >
              <Icon type="blog" />
            </Link>
          </div>

          {/* Mobile quick links dropdown */}
          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => {
                setQuickMenuOpen((previous) => !previous);
                setProfileOpen(false);
              }}
              className={actionButtonClass}
              aria-label="Open quick links"
              aria-expanded={quickMenuOpen}
            >
              <Icon type="grid" />
            </button>

            {quickMenuOpen && (
              <div className={`${dropdownClass} w-60 p-2`}>
                <Link
                  to="/admin/messages"
                  onClick={closeMenus}
                  className={dropdownItemClass}
                >
                  <Icon type="message" />
                  <span>Messages</span>
                </Link>

                <Link
                  to="/admin/contact-requests"
                  onClick={closeMenus}
                  className={dropdownItemClass}
                >
                  <Icon type="mail" />
                  <span>Contact Requests</span>
                </Link>

                <Link
                  to="/admin/blog"
                  onClick={closeMenus}
                  className={dropdownItemClass}
                >
                  <Icon type="blog" />
                  <span>Blog Management</span>
                </Link>
              </div>
            )}
          </div>

          {/* Notifications */}
          <Link
            to="/admin/notifications"
            onClick={closeMenus}
            className={actionButtonClass}
            aria-label="Notifications"
            title="Notifications"
          >
            <Icon type="bell" />

            <span
              className="
                absolute right-[9px] top-[8px]
                h-2.5 w-2.5 rounded-full
                border-2 border-[#061311] bg-teal-400
              "
            />
          </Link>

          {/* Profile */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setProfileOpen((previous) => !previous);
                setQuickMenuOpen(false);
              }}
              className={`
                flex items-center gap-3 rounded-xl
                transition focus:outline-none
                focus-visible:ring-2 focus-visible:ring-teal-400/70
                xl:pl-2
              `}
              aria-label="Open profile menu"
              aria-expanded={profileOpen}
            >
              <div className="hidden min-w-0 text-right xl:block">
                <p
                  className={`
                    max-w-40 truncate text-sm font-semibold
                    ${isDark ? "text-white" : "text-[#061311]"}
                  `}
                >
                  {adminName}
                </p>

                <p
                  className={`
                    mt-0.5 max-w-44 truncate text-xs
                    ${isDark ? "text-slate-400" : "text-slate-500"}
                  `}
                >
                  {email}
                </p>
              </div>

              <div
                className="
                  flex h-11 w-11 shrink-0 items-center justify-center
                  rounded-xl bg-teal-400 text-base font-black
                  text-[#061311] shadow-lg shadow-teal-500/10
                  transition hover:bg-teal-300
                "
              >
                {profileInitial}
              </div>
            </button>

            {profileOpen && (
              <div className={`${dropdownClass} w-[280px] p-3`}>
                <div
                  className={`
                    rounded-xl border p-4
                    ${
                      isDark
                        ? "border-white/10 bg-white/[0.03]"
                        : "border-slate-100 bg-slate-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="
                        flex h-11 w-11 shrink-0 items-center
                        justify-center rounded-xl bg-teal-400
                        font-black text-[#061311]
                      "
                    >
                      {profileInitial}
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold">
                        {adminName}
                      </h3>

                      <p
                        className={`
                          mt-1 truncate text-xs
                          ${
                            isDark
                              ? "text-slate-400"
                              : "text-slate-500"
                          }
                        `}
                      >
                        {email}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  <Link
                    to="/admin/settings"
                    onClick={closeMenus}
                    className={dropdownItemClass}
                  >
                    <Icon type="settings" />
                    <span>Account Settings</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="
                      flex w-full items-center gap-3 rounded-xl
                      px-3 py-3 text-sm font-semibold text-red-400
                      transition hover:bg-red-500/10
                    "
                  >
                    <Icon type="logout" />
                    <span>Logout</span>
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