import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { enrollments } from "../../data/dummyData";

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

function AdminEnrollments() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const safeEnrollments = Array.isArray(enrollments) ? enrollments : [];

  const columns = [
    { key: "id", label: "Enrollment ID" },
    {
      key: "student",
      label: "Student",
      render: (row) => <span className={`font-semibold ${headingClass}`}>{row.student}</span>,
    },
    {
      key: "course",
      label: "Course",
      render: (row) => <span className={mutedClass}>{row.course}</span>,
    },
    {
      key: "progress",
      label: "Progress",
      render: (row) => (
        <div className="min-w-[160px]">
          <div className="flex justify-between text-xs mb-2">
            <span className={mutedClass}>Progress</span>
            <span className="text-teal-500 font-semibold">{row.progress}</span>
          </div>
          <div className={`h-2 rounded-full overflow-hidden ${isDark ? "bg-white/10" : "bg-slate-200"}`}>
            <div className="h-full bg-teal-400 rounded-full" style={{ width: row.progress }} />
          </div>
        </div>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row) => <span className={mutedClass}>{row.date}</span>,
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
        title="Enrollments"
        subtitle="Track student course enrollments, learning progress, completion status, and certificate eligibility."
      />

      <section className={`rounded-3xl border backdrop-blur-xl p-5 mb-8 ${cardClass}`}>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <p className={`text-xs ${mutedClass}`}>Total Enrollments</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>{safeEnrollments.length}</h3>
          </div>
          <div>
            <p className={`text-xs ${mutedClass}`}>Completed</p>
            <h3 className="text-2xl font-black text-teal-500">
              {safeEnrollments.filter((item) => item.status === "Completed").length}
            </h3>
          </div>
          <div>
            <p className={`text-xs ${mutedClass}`}>In Progress</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>
              {safeEnrollments.filter((item) => item.status === "In Progress").length}
            </h3>
          </div>
          <div>
            <p className={`text-xs ${mutedClass}`}>Certificate Pending</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>7</h3>
          </div>
        </div>
      </section>

      <DataTable columns={columns} data={safeEnrollments} />
    </div>
  );
}

export default AdminEnrollments;