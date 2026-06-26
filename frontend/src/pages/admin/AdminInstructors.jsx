import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { instructors, courses } from "../../data/dummyData";

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

function AdminInstructors() {
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

  const safeInstructors = Array.isArray(instructors) ? instructors : [];

  const columns = [
    {
      key: "name",
      label: "Instructor",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[240px]">
          <img
            src={row.image}
            alt={row.name}
            className="w-12 h-12 rounded-full object-cover border border-teal-400/20"
          />

          <div>
            <p className={`font-semibold ${headingClass}`}>{row.name}</p>
            <p className={`text-xs mt-1 ${mutedClass}`}>
              {row.role || "Instructor"}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "specialty",
      label: "Specialty",
      render: (row) => (
        <span className={mutedClass}>{row.specialty || "Creative Skills"}</span>
      ),
    },
    {
      key: "courses",
      label: "Courses",
      render: (row) => {
        const count = courses.filter(
          (course) => course.instructor === row.name
        ).length;

        return <span className="text-teal-500 font-semibold">{count}</span>;
      },
    },
    {
      key: "students",
      label: "Students",
      render: (row) => (
        <span className={mutedClass}>{row.students || 0}+ learners</span>
      ),
    },
    {
      key: "rating",
      label: "Rating",
      render: (row) => (
        <span className={headingClass}>⭐ {row.rating || "4.8"}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: () => <StatusBadge status="Active" />,
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
            Disable
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Manage Instructors"
        subtitle="View instructor profiles, track submitted courses, monitor performance, and control instructor access."
        action={
          <button className="px-5 py-2.5 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
            Add Instructor
          </button>
        }
      />

      <section className={`rounded-3xl border backdrop-blur-xl p-5 mb-8 ${cardClass}`}>
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search instructor"
            className={`md:col-span-2 border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />

          <select className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}>
            <option>All Specialties</option>
            <option>Figma Design</option>
            <option>Canva Design</option>
            <option>UI/UX Design</option>
            <option>Digital Marketing</option>
          </select>

          <select className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-5">
          <div>
            <p className={`text-xs ${mutedClass}`}>Total Instructors</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>
              {safeInstructors.length}
            </h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Pending Course Requests</p>
            <h3 className="text-2xl font-black text-teal-500">14</h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Active Instructors</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>
              {safeInstructors.length}
            </h3>
          </div>
        </div>
      </section>

      <DataTable columns={columns} data={safeInstructors} />
    </div>
  );
}

export default AdminInstructors;