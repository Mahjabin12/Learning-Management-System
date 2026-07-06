import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { courses } from "../../../data/dummyData";

function FeaturedCourses() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [activeTab, setActiveTab] = useState("UI/UX Design");
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const tabs = [
    "UI/UX Design",
    "Graphic Design",
    "Canva Design",
    "Adobe Tools",
    "Web Design",
    "Digital Marketing",
  ];

  const normalize = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const filteredCourses = useMemo(() => {
    const matched = courses.filter((course) => {
      const target = normalize(activeTab);
      const category = normalize(course.category);
      const title = normalize(course.title);

      return category.includes(target) || title.includes(target);
    });

    return (matched.length ? matched : courses).slice(0, 3);
  }, [activeTab]);

  const sectionBg = isDark
    ? "bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.14),transparent_34%),linear-gradient(120deg,#061311_0%,#071813_48%,#020807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(45,212,191,0.18),transparent_34%),linear-gradient(120deg,#F6F9F8_0%,#EAF7F0_48%,#DDF1E8_100%)] text-[#10241E]";

  const mutedText = isDark ? "text-slate-400" : "text-slate-600";
  const headingText = isDark ? "text-white" : "text-[#10241E]";

  const tabBase = isDark
    ? "text-slate-400 hover:text-teal-400"
    : "text-slate-500 hover:text-teal-700";

  const cardBodies = isDark
    ? [
        "bg-[linear-gradient(135deg,rgba(45,212,191,0.16),rgba(244,114,182,0.10))]",
        "bg-[linear-gradient(135deg,rgba(45,212,191,0.20),rgba(250,204,21,0.12))]",
        "bg-[linear-gradient(135deg,rgba(45,212,191,0.18),rgba(34,197,94,0.12))]",
      ]
    : [
        "bg-[linear-gradient(135deg,#EEF3FF_0%,#F8DDEB_100%)]",
        "bg-[linear-gradient(135deg,#F9F7C2_0%,#FDF6DB_100%)]",
        "bg-[linear-gradient(135deg,#E1F8E6_0%,#D8F5DD_100%)]",
      ];

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${sectionBg} py-14 sm:py-16 lg:py-20`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute left-[10%] top-[15%] h-48 w-48 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/10" : "bg-teal-400/12"
          }`}
        />

        <div
          className={`absolute right-[12%] bottom-[8%] h-56 w-56 rounded-full blur-3xl ${
            isDark ? "bg-cyan-400/8" : "bg-cyan-300/14"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-14 items-start mb-9">
          <div
            className={`relative transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <p className="flex items-center gap-2 text-teal-400 font-black text-sm">
              <span className="w-10 h-[2px] rounded-full bg-teal-400" />
              Popular Courses
            </p>

            <h2
              className={`mt-3 max-w-xl text-3xl sm:text-4xl lg:text-5xl font-black leading-tight ${headingText}`}
            >
              More Than 3.2K Courses Will Guide You
            </h2>

            <svg
              className={`hidden lg:block absolute right-8 top-10 w-20 h-20 ${
                isDark ? "text-white/35" : "text-[#10241E]/35"
              }`}
              viewBox="0 0 120 120"
              fill="none"
            >
              <path
                d="M85 12C70 42 48 56 20 62"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M42 39C33 48 25 55 15 62C27 66 39 70 51 75"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M94 36C80 53 63 65 43 72"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.7"
              />
            </svg>
          </div>

          <div
            className={`lg:pt-9 transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <p className={`max-w-md text-sm sm:text-base leading-7 ${mutedText}`}>
              Choose the course that fits your expertise and career goal.
              Skillora brings practical design, creative tools, and marketing
              lessons together so you can start from basics and grow with
              confidence.
            </p>
          </div>
        </div>

        <div
          className={`flex gap-7 overflow-x-auto pb-3 mb-6 transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative shrink-0 pb-3 text-sm font-black transition-all duration-300 ${
                activeTab === tab ? "text-teal-400" : tabBase
              }`}
            >
              {tab}

              <span
                className={`absolute left-0 bottom-0 h-[3px] rounded-full bg-teal-400 transition-all duration-300 ${
                  activeTab === tab ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <Link
              to={`/courses/${course.id}`}
              key={course.id}
              style={{
                transitionDelay: isVisible ? `${300 + index * 120}ms` : "0ms",
              }}
              className={`group overflow-hidden rounded-2xl border transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(45,212,191,0.22)] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              } ${
                isDark
                  ? "border-white/10 bg-white/[0.055]"
                  : "border-emerald-900/10 bg-white shadow-sm"
              }`}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-black text-[#061311]">
                  {course.category || activeTab}
                </span>
              </div>

              <div className={`p-5 ${cardBodies[index % cardBodies.length]}`}>
                <h3
                  className={`text-lg font-black leading-snug ${
                    isDark ? "text-white" : "text-[#10241E]"
                  }`}
                >
                  {course.title}
                </h3>

                <div
                  className={`mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold ${
                    isDark ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  <span>By {course.instructor || "Skillora Mentor"}</span>
                  <span className="text-amber-500">★</span>
                  <span>{course.rating || "4.8"} ({course.students || 122})</span>
                  <span className="font-black text-teal-500">
                    ${course.price || 128}
                  </span>
                </div>

                <div
                  className={`mt-4 flex flex-wrap gap-3 text-xs ${
                    isDark ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  <span>⏱ {course.duration || "40 Min"}</span>
                  <span>📦 {course.lessons?.length || 21} Modules</span>
                  <span>📊 {course.level || "Beginner Level"}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div
          className={`mt-10 flex justify-center transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-500 px-7 py-3 text-sm font-black text-[#061311] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(45,212,191,0.30)]"
          >
            More Courses
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedCourses;