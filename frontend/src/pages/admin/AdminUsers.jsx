import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { users } from "../../data/dummyData";

function useAdminTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

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

  return theme;
}

function AdminUsers() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const inputClass = isDark
    ? "bg-white/5 border-teal-400/10 text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:ring-teal-400/15"
    : "bg-white/80 border-emerald-900/10 text-[#061311] placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/15";

  const safeUsers = Array.isArray(users) ? users : [];

  const columns = [
    {
      key: "name",
      label: "User",
      render: (row) => (
        <div>
          <p className={`font-semibold ${headingClass}`}>{row.name}</p>
          <p className={`text-xs mt-1 ${mutedClass}`}>{row.email}</p>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (row) => (
        <span className="text-teal-500 font-semibold">{row.role}</span>
      ),
    },
    {
      key: "enrolledCourses",
      label: "Courses",
      render: (row) => (
        <span className={mutedClass}>{row.enrolledCourses || 0}</span>
      ),
    },
    {
      key: "joined",
      label: "Joined",
      render: (row) => <span className={mutedClass}>{row.joined}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status || "Active"} />,
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-400 text-[#061311] hover:bg-white transition">
            View
          </button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20 transition">
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Manage Users"
        subtitle="View students, admins, account status, enrolled courses, and learning access."
      />

      <section className={`rounded-3xl border backdrop-blur-xl p-5 mb-8 ${cardClass}`}>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search user"
            className={`md:col-span-2 border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />

          <select className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}>
            <option>All Roles</option>
            <option>Student</option>
            <option>Admin</option>
            <option>Instructor</option>
          </select>

          <select className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Blocked</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <div>
            <p className={`text-xs ${mutedClass}`}>Total Users</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>
              {safeUsers.length}
            </h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Active Students</p>
            <h3 className="text-2xl font-black text-teal-500">
              {safeUsers.filter((user) => user.role === "student" || user.role === "Student").length ||
                safeUsers.length}
            </h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Admins</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>3</h3>
          </div>
        </div>
      </section>

      <DataTable columns={columns} data={safeUsers} />
    </div>
  );
}

export default AdminUsers;