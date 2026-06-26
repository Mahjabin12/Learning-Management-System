import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { announcements } from "../../data/dummyData";

function useAdminTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

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

function AdminAnnouncements() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const inputClass = isDark
    ? "bg-white/5 border-teal-400/10 text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:ring-teal-400/15"
    : "bg-white/80 border-emerald-900/10 text-[#061311] placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/15";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  const columns = [
    {
      key: "title",
      label: "Title",
      render: (row) => (
        <div>
          <p className={`font-semibold ${headingClass}`}>{row.title}</p>
          <p className={`text-xs mt-1 ${mutedClass}`}>
            Homepage / platform communication
          </p>
        </div>
      ),
    },
    {
      key: "audience",
      label: "Audience",
      render: (row) => (
        <span className={mutedClass}>{row.audience}</span>
      ),
    },
    {
      key: "date",
      label: "Date",
      render: (row) => (
        <span className={mutedClass}>{row.date}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status || "Published"} />,
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <div className="flex gap-2">
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-400 text-[#061311] hover:bg-white transition"
          >
            Edit
          </button>

          <button
            type="button"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20 transition"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Announcements"
        subtitle="Create, publish, update, and remove announcements for students, instructors, and landing page users."
        action={
          <button
            type="button"
            className="px-5 py-2.5 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition shadow-[0_12px_30px_rgba(20,184,166,0.25)]"
          >
            New Announcement
          </button>
        }
      />

      <section
        className={`rounded-3xl border backdrop-blur-xl p-6 mb-8 transition duration-300 ${cardClass}`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
          <div>
            <p className="text-sm font-semibold text-teal-500">
              LANDING & PLATFORM NOTICE
            </p>

            <h2 className={`text-2xl font-black mt-2 ${headingClass}`}>
              Create Announcement
            </h2>

            <p className={`text-sm mt-2 ${mutedClass}`}>
              Use this for homepage banners, student notices, instructor alerts,
              or general LMS updates.
            </p>
          </div>

          <div className="hidden md:grid grid-cols-4 gap-2 opacity-50">
            {Array.from({ length: 16 }).map((_, index) => (
              <span
                key={index}
                className="w-1.5 h-1.5 rounded-full bg-teal-400"
              />
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Announcement title"
            className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />

          <select
            className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          >
            <option>All Students</option>
            <option>All Users</option>
            <option>All Instructors</option>
            <option>Specific Course Students</option>
            <option>Landing Page Visitors</option>
          </select>
        </div>

        <textarea
          rows="4"
          placeholder="Write announcement message"
          className={`w-full border rounded-2xl px-4 py-3 mt-4 outline-none focus:ring-2 transition ${inputClass}`}
        />

        <div className="flex flex-wrap gap-3 mt-5">
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
          >
            Publish
          </button>

          <button
            type="button"
            className={`px-6 py-3 rounded-full border font-semibold transition ${
              isDark
                ? "border-teal-400/30 text-teal-300 hover:bg-teal-400/10"
                : "border-emerald-900/10 text-emerald-700 hover:bg-white/70"
            }`}
          >
            Save Draft
          </button>
        </div>
      </section>

      <DataTable columns={columns} data={announcements} />
    </div>
  );
}

export default AdminAnnouncements;