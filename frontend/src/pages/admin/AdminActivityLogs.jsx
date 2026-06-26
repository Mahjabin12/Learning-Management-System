import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";

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

const activityLogs = [
  {
    id: 1,
    user: "Admin",
    role: "Super Admin",
    activity: "Approved new course: Advanced Figma Prototyping",
    module: "Courses",
    time: "5 min ago",
    status: "Completed",
  },
  {
    id: 2,
    user: "Ayesha Karim",
    role: "Instructor",
    activity: "Submitted course for admin approval",
    module: "Instructors",
    time: "18 min ago",
    status: "Pending",
  },
  {
    id: 3,
    user: "Sarah Ahmed",
    role: "Student",
    activity: "Completed Canva Social Media Design course",
    module: "Certificates",
    time: "32 min ago",
    status: "Completed",
  },
  {
    id: 4,
    user: "Admin",
    role: "Super Admin",
    activity: "Updated homepage announcement banner",
    module: "Announcements",
    time: "1 hour ago",
    status: "Completed",
  },
  {
    id: 5,
    user: "Tanvir Hasan",
    role: "Instructor",
    activity: "Requested course removal",
    module: "Courses",
    time: "2 hours ago",
    status: "Pending",
  },
];

function AdminActivityLogs() {
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

  const columns = [
    {
      key: "user",
      label: "User",
      render: (row) => (
        <div>
          <p className={`font-semibold ${headingClass}`}>{row.user}</p>
          <p className={`text-xs mt-1 ${mutedClass}`}>{row.role}</p>
        </div>
      ),
    },
    {
      key: "activity",
      label: "Activity",
      render: (row) => <span className={mutedClass}>{row.activity}</span>,
    },
    {
      key: "module",
      label: "Module",
      render: (row) => (
        <span className="text-teal-500 font-semibold">{row.module}</span>
      ),
    },
    {
      key: "time",
      label: "Time",
      render: (row) => <span className={mutedClass}>{row.time}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Activity Logs"
        subtitle="Track important actions across students, instructors, courses, certificates, and landing page controls."
      />

      <section
        className={`rounded-3xl border backdrop-blur-xl p-5 mb-8 ${cardClass}`}
      >
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search activity"
            className={`md:col-span-2 border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />

          <select
            className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          >
            <option>All Modules</option>
            <option>Courses</option>
            <option>Students</option>
            <option>Instructors</option>
            <option>Certificates</option>
            <option>Announcements</option>
          </select>

          <select
            className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          >
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <div>
            <p className={`text-xs ${mutedClass}`}>Total Logs</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>
              {activityLogs.length}
            </h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Pending Actions</p>
            <h3 className="text-2xl font-black text-teal-500">
              {activityLogs.filter((log) => log.status === "Pending").length}
            </h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Completed Today</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>12</h3>
          </div>
        </div>
      </section>

      <DataTable columns={columns} data={activityLogs} />
    </div>
  );
}

export default AdminActivityLogs;