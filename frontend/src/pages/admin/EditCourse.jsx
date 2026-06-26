import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { courses } from "../../data/dummyData";

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

function EditCourse() {
  const { id } = useParams();
  const course = courses.find((item) => String(item.id) === id) || courses[0];

  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const labelClass = isDark ? "text-slate-300" : "text-slate-700";

  const inputClass = isDark
    ? "bg-white/5 border-teal-400/10 text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:ring-teal-400/15"
    : "bg-white/80 border-emerald-900/10 text-[#061311] placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/15";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Edit Course"
        subtitle="Update course information, pricing, status, thumbnail, and curriculum."
      />

      <form className={`rounded-3xl border backdrop-blur-xl p-6 space-y-6 ${cardClass}`}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                  Course Title
                </label>
                <input
                  type="text"
                  defaultValue={course.title}
                  className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                  Category
                </label>
                <input
                  type="text"
                  defaultValue={course.category}
                  className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                  Instructor
                </label>
                <input
                  type="text"
                  defaultValue={course.instructor}
                  className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
                />
              </div>

              <div>
                <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                  Price
                </label>
                <input
                  type="number"
                  defaultValue={course.price}
                  className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                Thumbnail URL
              </label>
              <input
                type="text"
                defaultValue={course.thumbnail}
                className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                Course Description
              </label>
              <textarea
                rows="5"
                defaultValue={course.description}
                className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
              />
            </div>
          </div>

          <aside
            className={`rounded-3xl border p-5 h-fit ${
              isDark
                ? "bg-white/5 border-teal-400/10"
                : "bg-emerald-50/70 border-emerald-900/10"
            }`}
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-44 object-cover rounded-2xl border border-teal-400/20"
            />

            <div className="mt-5 space-y-3 text-sm">
              <p className={labelClass}>
                <span className="text-teal-500 font-semibold">Status:</span>{" "}
                {course.status || "Published"}
              </p>
              <p className={labelClass}>
                <span className="text-teal-500 font-semibold">Students:</span>{" "}
                {course.students || 0}+ enrolled
              </p>
              <p className={labelClass}>
                <span className="text-teal-500 font-semibold">Rating:</span>{" "}
                ⭐ {course.rating || "4.8"}
              </p>
            </div>
          </aside>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition shadow-[0_12px_30px_rgba(20,184,166,0.25)]"
          >
            Update Course
          </button>

          <button
            type="button"
            className={`px-6 py-3 rounded-full border font-semibold transition ${
              isDark
                ? "border-teal-400/30 text-teal-300 hover:bg-teal-400/10"
                : "border-emerald-900/10 text-emerald-700 hover:bg-white/70"
            }`}
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;