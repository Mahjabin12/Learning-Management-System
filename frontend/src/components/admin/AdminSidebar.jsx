import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Courses", path: "/admin/courses" },
    { name: "Users", path: "/admin/users" },
    { name: "Enrollments", path: "/admin/enrollments" },
    { name: "Messages", path: "/admin/messages" },
    { name: "Announcements", path: "/admin/announcements" },
    { name: "Revenue", path: "/admin/revenue" },
    { name: "Settings", path: "/admin/settings" },
  ];

  const linkClass = ({ isActive }) =>
    isActive
      ? "block px-4 py-3 rounded-lg bg-blue-600 text-white font-medium"
      : "block px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-blue-400">Byway Admin</h1>
        <p className="text-xs text-slate-400 mt-1">Learning Management System</p>
      </div>

      <nav className="p-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={linkClass}
          >
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="absolute bottom-6 left-4 right-4">
        <button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;