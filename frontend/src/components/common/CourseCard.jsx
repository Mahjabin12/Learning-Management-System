import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function CourseCard({ course }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const handleTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", handleTheme);
    window.addEventListener("storage", handleTheme);

    return () => {
      window.removeEventListener("themechange", handleTheme);
      window.removeEventListener("storage", handleTheme);
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
        isDark
          ? "bg-[#0b1f1b] border-white/10"
          : "bg-white/75 border-emerald-900/10 backdrop-blur-xl"
      }`}
    >
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-5">
        <p className="text-xs font-semibold text-teal-500">
          {course.category}
        </p>

        <h3
          className={`mt-2 text-lg font-bold line-clamp-2 ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {course.title}
        </h3>

        <p
          className={`text-sm mt-2 ${
            isDark ? "text-white/60" : "text-slate-500"
          }`}
        >
          By {course.instructor}
        </p>

        <div className="flex items-center gap-2 mt-3 text-sm">
          <span className="text-yellow-500">★★★★★</span>

          <span className={isDark ? "text-white/70" : "text-slate-600"}>
            {course.rating}
          </span>

          <span className={isDark ? "text-white/40" : "text-slate-400"}>
            ({course.students})
          </span>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <span
              className={`text-xl font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              ${course.price}
            </span>

            <span
              className={`text-sm line-through ml-2 ${
                isDark ? "text-white/35" : "text-slate-400"
              }`}
            >
              ${course.oldPrice}
            </span>
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="text-sm font-semibold text-teal-500 hover:text-teal-400 transition"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;