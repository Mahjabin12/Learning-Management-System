import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";

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

function AddCourse() {
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
        title="Add Course"
        subtitle="Create a new course, assign instructor, set price, upload thumbnail, and prepare it for publishing."
      />

      <form className={`rounded-3xl border backdrop-blur-xl p-6 space-y-6 ${cardClass}`}>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
              Course Title
            </label>
            <input
              type="text"
              placeholder="Figma UI Design Beginner"
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
              Category
            </label>
            <select
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            >
              <option>Figma Design</option>
              <option>Canva Design</option>
              <option>UI/UX Design</option>
              <option>Logo & Branding</option>
              <option>Product Design</option>
              <option>Digital Marketing</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
              Instructor
            </label>
            <input
              type="text"
              placeholder="Instructor name"
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
              Price
            </label>
            <input
              type="number"
              placeholder="49"
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
              Level
            </label>
            <select
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
              Status
            </label>
            <select
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            >
              <option>Draft</option>
              <option>Pending</option>
              <option>Published</option>
            </select>
          </div>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
            Thumbnail URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/course-image.jpg"
            className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
            Course Description
          </label>
          <textarea
            rows="5"
            placeholder="Write course description"
            className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
            Curriculum / Lessons
          </label>
          <textarea
            rows="4"
            placeholder="Lesson 1: Introduction&#10;Lesson 2: Tools and workflow&#10;Lesson 3: Project work"
            className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition shadow-[0_12px_30px_rgba(20,184,166,0.25)]"
          >
            Create Course
          </button>

          <button
            type="button"
            className={`px-6 py-3 rounded-full border font-semibold transition ${
              isDark
                ? "border-teal-400/30 text-teal-300 hover:bg-teal-400/10"
                : "border-emerald-900/10 text-emerald-700 hover:bg-white/70"
            }`}
          >
            Save as Draft
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCourse;