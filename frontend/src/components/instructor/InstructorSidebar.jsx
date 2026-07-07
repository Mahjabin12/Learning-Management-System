import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function InstructorSidebar({ isOpen = false, onClose, theme = "dark" }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const isDark = theme === "dark";

  const links = [
    { name: "Dashboard", path: "/instructor/dashboard", icon: "▦" },
    { name: "My Courses", path: "/instructor/my-courses", icon: "▣" },
    { name: "Add Course", path: "/instructor/courses/add", icon: "+" },
    { name: "Students", path: "/instructor/students", icon: "◉" },
    { name: "Earnings", path: "/instructor/earnings", icon: "$" },
    { name: "Reviews", path: "/instructor/reviews", icon: "★" },
    { name: "Messages", path: "/instructor/messages", icon: "✉" },
    { name: "Settings", path: "/instructor/settings", icon: "⚙" },
  ];

  const sidebarBg = isDark
    ? "bg-[#061311]/95 border-teal-400/10"
    : "bg-[#e8f3ee]/95 border-emerald-900/10";

  const linkClass = ({ isActive }) => {
    if (isDark) {
      return isActive
        ? "flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-teal-400/15 text-teal-300 font-semibold border border-teal-400/25 shadow-[0_0_28px_rgba(45,212,191,0.16)]"
        : "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-slate-400 hover:text-teal-300 hover:bg-teal-400/10 border border-transparent transition";
    }

    return isActive
      ? "flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#061311] text-white font-semibold border border-[#061311]"
      : "flex items-center gap-3 px-4 py-2.5 rounded-2xl text-slate-600 hover:text-emerald-700 hover:bg-white/70 border border-transparent transition";
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
            <h1
              className={`text-2xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Skillora
            </h1>
            <p
              className={
                isDark ? "text-xs text-slate-400" : "text-xs text-slate-600"
              }
            >
              Instructor Control Center
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            onClick={onClose}
            className={linkClass}
          >
            <span className="w-6 text-center">{link.icon}</span>
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

export default InstructorSidebar;
