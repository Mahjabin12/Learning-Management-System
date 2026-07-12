import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCourseById } from "../../services/adminApi";

function useAdminTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "dark");

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
}

function ReadOnlyField({ label, value, isDark }) {
  return (
    <div>
      <label className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
        {label}
      </label>

      <div
        className={`w-full mt-2 h-12 rounded-xl px-4 flex items-center text-sm font-medium ${
          isDark
            ? "bg-[#132824] border border-teal-400/15 text-white"
            : "bg-slate-50 border border-slate-200 text-[#061311]"
        }`}
      >
        {value || "—"}
      </div>
    </div>
  );
}

function EditCourse() {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";

  const cardClass = isDark
    ? "border-teal-400/15 bg-white/[0.05]"
    : "border-slate-200 bg-white shadow-sm";

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const res = await getCourseById(id);
        setCourse(res.data.course || null);
      } catch (error) {
        console.log("Course load error", error);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id]);

  const price = course?.price ?? 0;
  const isFree = Number(price) === 0;
  const lessons = course?.lessons || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-start mb-6 gap-4">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-400">
            Admin Panel
          </p>

          <h1 className={`text-2xl sm:text-3xl font-black ${headingClass}`}>
            Course Details
          </h1>

          <p className={`mt-1 text-sm ${mutedClass}`}>
            View instructor-submitted course information.
          </p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className={`shrink-0 px-5 py-2 rounded-xl border transition ${
            isDark
              ? "border-teal-400/30 text-teal-400 hover:bg-teal-400/10"
              : "border-teal-600/25 text-teal-700 hover:bg-teal-50"
          }`}
        >
          ← Back
        </button>
      </div>

      {loading ? (
        <p className={mutedClass}>Loading course...</p>
      ) : !course ? (
        <p className={mutedClass}>Course not found.</p>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: thumbnail + all quick stats */}
          <div className={`rounded-3xl border p-5 ${cardClass} h-fit`}>
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-44 object-cover rounded-2xl border border-teal-400/15"
            />

            <h3 className={`mt-4 text-lg font-black ${headingClass}`}>
              {course.title}
            </h3>

            <p className={`text-xs mt-1 ${mutedClass}`}>{course.category}</p>

            <span
              className={`inline-block mt-3 px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                isDark
                  ? "bg-teal-400/10 text-teal-300 border-teal-400/20"
                  : "bg-teal-50 text-teal-700 border-teal-600/15"
              }`}
            >
              {course.status}
            </span>

            <div className={`mt-5 space-y-3 text-sm ${mutedClass}`}>
              <p>⭐ {course.rating || 4.8} rating</p>
              <p>👥 {Number(course.students || 0).toLocaleString()} students</p>
              <p>📚 {lessons.length} lessons</p>
              <p>⏱ {course.duration || "6 Weeks"}</p>
              <p>🎯 Level: {course.level || "All levels"}</p>
              <p>
                📅 Published:{" "}
                {course.publishedAt
                  ? new Date(course.publishedAt).toLocaleString()
                  : "Not published yet"}
              </p>
            </div>

            <div className="mt-5 pt-5 border-t border-teal-400/10 flex items-center justify-between">
              {isFree ? (
                <span className="text-2xl font-black text-teal-400">FREE</span>
              ) : (
                <span className={`text-2xl font-black ${headingClass}`}>
                  ${price}
                </span>
              )}

              {course.oldPrice && !isFree && (
                <span className={`line-through text-sm ${mutedClass}`}>
                  ${course.oldPrice}
                </span>
              )}
            </div>
          </div>

          {/* Right: full details */}
          <div className={`lg:col-span-2 rounded-3xl border p-6 ${cardClass}`}>
            <div className="mb-6">
              <h2 className={`text-xl font-bold ${headingClass}`}>
                Course Information
              </h2>
              <p className={`text-sm mt-1 ${mutedClass}`}>
                Instructor-submitted information — view only.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <ReadOnlyField label="Course Title" value={course.title} isDark={isDark} />
              <ReadOnlyField label="Instructor" value={course.instructor} isDark={isDark} />
              <ReadOnlyField label="Category" value={course.category} isDark={isDark} />
              <ReadOnlyField label="Level" value={course.level} isDark={isDark} />
              <ReadOnlyField label="Duration" value={course.duration} isDark={isDark} />
              <ReadOnlyField
                label="Price"
                value={isFree ? "Free" : `$${price}${course.oldPrice ? ` (was $${course.oldPrice})` : ""}`}
                isDark={isDark}
              />
              <ReadOnlyField label="Rating" value={`⭐ ${course.rating || 4.8}`} isDark={isDark} />
              <ReadOnlyField
                label="Students Enrolled"
                value={Number(course.students || 0).toLocaleString()}
                isDark={isDark}
              />
            </div>

            <div className="mt-5">
              <label className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Description
              </label>
              <div
                className={`w-full mt-2 rounded-xl p-4 text-sm leading-6 ${
                  isDark
                    ? "bg-[#132824] border border-teal-400/15 text-slate-200"
                    : "bg-slate-50 border border-slate-200 text-slate-700"
                }`}
              >
                {course.description || "No description provided."}
              </div>
            </div>

            <div className="mt-5">
              <label className={`text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                Lessons ({lessons.length})
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {lessons.length ? (
                  lessons.map((lesson, index) => (
                    <span
                      key={`${lesson}-${index}`}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                        isDark
                          ? "bg-teal-400/10 text-teal-300 border border-teal-400/20"
                          : "bg-teal-50 text-teal-700 border border-teal-600/15"
                      }`}
                    >
                      {lesson}
                    </span>
                  ))
                ) : (
                  <span className={`text-sm ${mutedClass}`}>No lessons added.</span>
                )}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                className={`px-6 py-3 rounded-xl border font-semibold transition ${
                  isDark
                    ? "border-teal-400/20 text-teal-300 hover:bg-teal-400/10"
                    : "border-teal-600/20 text-teal-700 hover:bg-teal-50"
                }`}
              >
                Message Instructor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EditCourse;