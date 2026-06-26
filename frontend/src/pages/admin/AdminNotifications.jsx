import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
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

const notifications = [
  {
    id: 1,
    title: "New student registered",
    message: "Nadia Rahman created a student account.",
    type: "Student",
    time: "5 min ago",
    status: "Open",
  },
  {
    id: 2,
    title: "Course approval required",
    message: "Instructor submitted Advanced Figma Prototyping for review.",
    type: "Course Approval",
    time: "18 min ago",
    status: "Pending",
  },
  {
    id: 3,
    title: "Certificate request",
    message: "Mahin Khan completed Canva Social Media Design.",
    type: "Certificate",
    time: "32 min ago",
    status: "Pending",
  },
  {
    id: 4,
    title: "Course removal request",
    message: "Instructor requested removal of old Adobe XD course.",
    type: "Instructor Request",
    time: "1 hour ago",
    status: "Open",
  },
  {
    id: 5,
    title: "Payment completed",
    message: "A student completed payment for UI/UX Portfolio Project.",
    type: "Revenue",
    time: "2 hours ago",
    status: "Resolved",
  },
];

function AdminNotifications() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const innerClass = isDark
    ? "bg-white/5 border-white/5 hover:border-teal-400/25 hover:bg-teal-400/5"
    : "bg-white/70 border-emerald-900/10 hover:border-emerald-500/25 hover:bg-emerald-50/80";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Notifications"
        subtitle="Review course approvals, certificate requests, new student activity, instructor changes, and system alerts."
        action={
          <button className="px-5 py-2.5 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
            Mark All Read
          </button>
        }
      />

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <div className={`rounded-3xl border backdrop-blur-xl p-5 ${cardClass}`}>
          <p className={mutedClass}>Unread Alerts</p>
          <h3 className="text-3xl font-black text-teal-500 mt-2">19</h3>
        </div>

        <div className={`rounded-3xl border backdrop-blur-xl p-5 ${cardClass}`}>
          <p className={mutedClass}>Course Approvals</p>
          <h3 className={`text-3xl font-black mt-2 ${headingClass}`}>14</h3>
        </div>

        <div className={`rounded-3xl border backdrop-blur-xl p-5 ${cardClass}`}>
          <p className={mutedClass}>Certificate Requests</p>
          <h3 className={`text-3xl font-black mt-2 ${headingClass}`}>27</h3>
        </div>

        <div className={`rounded-3xl border backdrop-blur-xl p-5 ${cardClass}`}>
          <p className={mutedClass}>Resolved Today</p>
          <h3 className={`text-3xl font-black mt-2 ${headingClass}`}>8</h3>
        </div>
      </section>

      <section className={`rounded-3xl border backdrop-blur-xl p-6 ${cardClass}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <p className="text-sm font-semibold text-teal-500">
              LIVE ADMIN ALERTS
            </p>
            <h2 className={`text-2xl font-black mt-2 ${headingClass}`}>
              Latest notifications
            </h2>
          </div>

          <select
            className={`px-4 py-2.5 rounded-full border outline-none ${
              isDark
                ? "bg-white/5 border-teal-400/10 text-white"
                : "bg-white/80 border-emerald-900/10 text-[#061311]"
            }`}
          >
            <option>All Notifications</option>
            <option>Course Approval</option>
            <option>Certificate</option>
            <option>Student</option>
            <option>Revenue</option>
          </select>
        </div>

        <div className="space-y-4">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`rounded-2xl border p-4 transition ${innerClass}`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-full bg-white text-teal-500 flex items-center justify-center font-black shrink-0">
                    !
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className={`font-bold ${headingClass}`}>
                        {item.title}
                      </h3>

                      <span className="text-xs text-teal-500 font-semibold">
                        {item.type}
                      </span>
                    </div>

                    <p className={`text-sm mt-1 ${mutedClass}`}>
                      {item.message}
                    </p>

                    <p className="text-xs text-teal-500 mt-2">
                      {item.time}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <StatusBadge status={item.status} />

                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-400 text-[#061311] hover:bg-white transition">
                    Review
                  </button>

                  <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20 transition">
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminNotifications;