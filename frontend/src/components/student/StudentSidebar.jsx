import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function StudentSidebar({
  isOpen = false,
  onClose,
  theme = "dark",
}) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const userName =
    user?.name ||
    user?.fullName ||
    user?.displayName ||
    "Skillora User";

  const learningLinks = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: "dashboard",
    },
    {
      name: "My Learning",
      path: "/student/my-learning",
      icon: "learning",
    },
    {
      name: "Browse Courses",
      path: "/courses",
      icon: "browse",
    },
    {
      name: "Wishlist",
      path: "/student/wishlist",
      icon: "wishlist",
    },
    {
      name: "Certificates",
      path: "/student/certificates",
      icon: "certificate",
    },
  ];

  const accountLinks = [
    {
      name: "Settings",
      path: "/student/settings",
      icon: "settings",
    },
  ];

  const sidebarTheme = isDark
    ? "border-teal-400/10 bg-[#061311]/95"
    : "border-emerald-900/10 bg-[#e8f3ee]/95";

  const dividerTheme = isDark
    ? "border-teal-400/10"
    : "border-emerald-900/10";

  const normalLinkTheme = isDark
    ? "border-transparent text-slate-400 hover:border-teal-400/10 hover:bg-teal-400/[0.07] hover:text-teal-300"
    : "border-transparent text-slate-600 hover:border-emerald-900/10 hover:bg-white/60 hover:text-emerald-700";

  const activeLinkTheme = isDark
    ? "border-teal-400/25 bg-teal-400/12 text-teal-300 shadow-[0_0_24px_rgba(45,212,191,0.10)]"
    : "border-emerald-900/10 bg-white text-emerald-800 shadow-sm";

  const handleLogout = () => {
    logout();
    onClose?.();
    navigate("/");
  };

  const handleNavigation = () => {
    onClose?.();
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
        isOpen
          ? "translate-x-0"
          : "-translate-x-full"
      } ${sidebarTheme}`}
    >
      {/* Brand */}
      <div
        className={`shrink-0 border-b px-5 py-4 ${dividerTheme}`}
      >
        <div className="flex items-center justify-between gap-3">
          <NavLink
            to="/"
            onClick={handleNavigation}
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-300 to-emerald-500 text-[11px] font-black text-[#061311] shadow-[0_0_24px_rgba(45,212,191,0.24)]">
              SL
            </div>

            <div className="min-w-0">
              <h1
                className={`truncate text-xl font-black leading-6 ${
                  isDark
                    ? "text-white"
                    : "text-[#061311]"
                }`}
              >
                Skillora
              </h1>

              <p
                className={`truncate text-[11px] font-semibold leading-4 ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              >
                {userName}
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border transition lg:hidden ${
              isDark
                ? "border-white/10 text-slate-400 hover:text-white"
                : "border-emerald-900/10 text-slate-500 hover:text-[#061311]"
            }`}
            aria-label="Close sidebar"
          >
            <CloseIcon />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <SidebarLabel
          text="Learning"
          isDark={isDark}
        />

        <div className="mt-2 space-y-1">
          {learningLinks.map((link) => (
            <SidebarLink
              key={link.path}
              link={link}
              onClick={handleNavigation}
              normalTheme={normalLinkTheme}
              activeTheme={activeLinkTheme}
            />
          ))}
        </div>

        <div
          className={`my-4 border-t ${dividerTheme}`}
        />

        <SidebarLabel
          text="Account"
          isDark={isDark}
        />

        <div className="mt-2 space-y-1">
          {accountLinks.map((link) => (
            <SidebarLink
              key={link.path}
              link={link}
              onClick={handleNavigation}
              normalTheme={normalLinkTheme}
              activeTheme={activeLinkTheme}
            />
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div
        className={`shrink-0 border-t p-3 ${dividerTheme}`}
      >
        <button
          type="button"
          onClick={handleLogout}
          className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 bg-red-500/[0.08] px-4 py-2.5 text-[13px] font-bold text-red-400 transition hover:border-red-400/30 hover:bg-red-500/15"
        >
          <LogoutIcon />
          Logout
        </button>
      </div>
    </aside>
  );
}

function SidebarLabel({
  text,
  isDark,
}) {
  return (
    <p
      className={`px-3 text-[9px] font-black uppercase tracking-[0.18em] ${
        isDark
          ? "text-slate-600"
          : "text-slate-500"
      }`}
    >
      {text}
    </p>
  );
}

function SidebarLink({
  link,
  onClick,
  normalTheme,
  activeTheme,
}) {
  return (
    <NavLink
      to={link.path}
      onClick={onClick}
      className={({ isActive }) =>
        `group flex min-h-[42px] items-center gap-3 rounded-xl border px-3 py-2 text-[13px] font-semibold transition-all duration-200 ${
          isActive
            ? activeTheme
            : normalTheme
        }`
      }
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-current/[0.045]">
        <SidebarIcon name={link.icon} />
      </span>

      <span className="truncate">
        {link.name}
      </span>
    </NavLink>
  );
}

function SidebarIcon({ name }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    className: "h-[15px] w-[15px]",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (name === "dashboard") {
    return (
      <svg {...commonProps}>
        <rect
          x="3"
          y="3"
          width="7"
          height="7"
        />
        <rect
          x="14"
          y="3"
          width="7"
          height="7"
        />
        <rect
          x="3"
          y="14"
          width="7"
          height="7"
        />
        <rect
          x="14"
          y="14"
          width="7"
          height="7"
        />
      </svg>
    );
  }

  if (name === "learning") {
    return (
      <svg {...commonProps}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
        <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      </svg>
    );
  }

  if (name === "browse") {
    return (
      <svg {...commonProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
        <path d="M8 11h6M11 8v6" />
      </svg>
    );
  }

  if (name === "wishlist") {
    return (
      <svg {...commonProps}>
        <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
      </svg>
    );
  }

  if (name === "certificate") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="9" r="5" />
        <path d="m9 13-1 8 4-2 4 2-1-8" />
        <path d="m10.5 9 1 1 2-2" />
      </svg>
    );
  }

  if (name === "settings") {
    return (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="3" />

        <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
      </svg>
    );
  }

  return null;
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

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default StudentSidebar;