import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { courses } from "../../data/dummyData";

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

function AdminCourses() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  const filterCardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const inputClass = isDark
    ? "bg-white/5 border-teal-400/10 text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:ring-teal-400/15"
    : "bg-white/80 border-emerald-900/10 text-[#061311] placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/15";

  const columns = [
    {
      key: "title",
      label: "Course",
      render: (row) => (
        <div className="flex items-center gap-3 min-w-[260px]">
          <div className="relative">
            <img
              src={row.thumbnail}
              alt={row.title}
              className="w-16 h-12 object-cover rounded-xl border border-teal-400/20"
            />

            <div className="absolute -right-1 -bottom-1 w-4 h-4 rounded-full bg-teal-400 shadow-[0_0_16px_rgba(45,212,191,0.6)]" />
          </div>

          <div>
            <p className={`font-semibold ${headingClass}`}>{row.title}</p>
            <p className={`text-xs mt-1 ${mutedClass}`}>{row.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: "instructor",
      label: "Instructor",
      render: (row) => (
        <span className={mutedClass}>{row.instructor}</span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (row) => (
        <span className="font-semibold text-teal-500">${row.price}</span>
      ),
    },
    {
      key: "students",
      label: "Students",
      render: (row) => (
        <span className={mutedClass}>{row.students}+ learners</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status || "Published"} />,
    },
    {
      key: "approval",
      label: "Approval",
      render: (row) => (
        <StatusBadge status={row.approvalStatus || row.status || "Approved"} />
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex flex-wrap gap-2 min-w-[180px]">
          <Link
            to={`/admin/courses/edit/${row.id}`}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-400 text-[#061311] hover:bg-white transition"
          >
            Edit
          </Link>

          <button
            type="button"
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
              isDark
                ? "border-teal-400/25 text-teal-300 hover:bg-teal-400/10"
                : "border-emerald-900/10 text-emerald-700 hover:bg-emerald-50"
            }`}
          >
            Review
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
        title="Manage Courses"
        subtitle="Add, edit, review, approve, publish, unpublish, and remove courses across the Byway LMS."
        action={
          <Link
            to="/admin/courses/add"
            className="inline-flex px-5 py-2.5 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition shadow-[0_12px_30px_rgba(20,184,166,0.25)]"
          >
            Add Course
          </Link>
        }
      />

      <section
        className={`rounded-3xl border backdrop-blur-xl p-5 mb-8 transition duration-300 ${filterCardClass}`}
      >
        <div className="grid md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search course"
            className={`md:col-span-2 border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />

          <select
            className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          >
            <option>All Categories</option>
            <option>Figma Design</option>
            <option>Canva Design</option>
            <option>UI/UX Design</option>
            <option>Digital Marketing</option>
          </select>

          <select
            className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          >
            <option>All Status</option>
            <option>Published</option>
            <option>Pending</option>
            <option>Draft</option>
            <option>Rejected</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
          <div>
            <p className={`text-xs ${mutedClass}`}>Total Courses</p>
            <h3 className="text-2xl font-black text-teal-500">
              {courses.length}
            </h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Published</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>
              {courses.filter((course) => course.status === "Published").length ||
                courses.length}
            </h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Pending Review</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>18</h3>
          </div>

          <div>
            <p className={`text-xs ${mutedClass}`}>Total Learners</p>
            <h3 className={`text-2xl font-black ${headingClass}`}>
              {courses
                .reduce((total, course) => total + Number(course.students || 0), 0)
                .toLocaleString()}
              +
            </h3>
          </div>
        </div>
      </section>

      <DataTable columns={columns} data={courses} />
    </div>
  );
}

export default AdminCourses;