import { useEffect, useMemo, useState } from "react";
import CourseCard from "../../components/common/CourseCard";
import { courses } from "../../data/dummyData";

const levels = ["Beginner", "Intermediate", "Advanced"];
const prices = ["Free", "Paid"];

function CourseList() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [level, setLevel] = useState(null);
  const [price, setPrice] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);

    return () => {
      window.removeEventListener("themechange", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
    };
  }, []);

  const isDark = theme === "dark";

  const categories = useMemo(() => {
    return [...new Set(courses.map((course) => course.category))];
  }, []);

  const filteredCourses = useMemo(() => {
    let result = courses.filter((course) => {
      const priceValue = course.basePrice ?? course.price ?? 0;
      const searchableText = `${course.title} ${course.instructor} ${course.category}`.toLowerCase();

      if (query && !searchableText.includes(query.toLowerCase())) {
        return false;
      }

      if (category && course.category !== category) {
        return false;
      }

      if (level && course.level !== level) {
        return false;
      }

      if (price === "Free" && priceValue > 0) {
        return false;
      }

      if (price === "Paid" && priceValue === 0) {
        return false;
      }

      return true;
    });

    if (sortBy === "popular") {
      result = [...result].sort(
        (a, b) => (b.students || 0) - (a.students || 0)
      );
    }

    if (sortBy === "low") {
      result = [...result].sort(
        (a, b) => (a.basePrice ?? a.price ?? 0) - (b.basePrice ?? b.price ?? 0)
      );
    }

    if (sortBy === "high") {
      result = [...result].sort(
        (a, b) => (b.basePrice ?? b.price ?? 0) - (a.basePrice ?? a.price ?? 0)
      );
    }

    return result;
  }, [query, category, level, price, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setCategory(null);
    setLevel(null);
    setPrice(null);
    setSortBy("latest");
  };

  const pageClass = isDark
    ? "bg-[#061311] text-white"
    : "bg-[#e8f3ee] text-[#061311]";

  const cardClass = isDark
    ? "bg-white/[0.055] border-white/10 backdrop-blur-xl"
    : "bg-white/75 border-emerald-900/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(6,19,17,0.08)]";

  const inputClass = isDark
    ? "bg-white/[0.07] border-white/10 text-white placeholder:text-white/35 focus:border-teal-300 focus:ring-teal-300/30"
    : "bg-white/85 border-emerald-900/10 text-[#061311] placeholder:text-slate-400 focus:border-teal-500 focus:ring-teal-500/25";

  const mutedText = isDark ? "text-white/60" : "text-slate-600";

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${pageClass}`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(20,184,166,0.14),transparent_28%)]"
            : "bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.20),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(16,185,129,0.13),transparent_30%)]"
        }`}
      />

      <section className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div
          className={`relative overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10 mb-8 sm:mb-10 border shadow-2xl ${
            isDark
              ? "bg-[#071715] border-white/10"
              : "bg-[#f2faf6] border-emerald-900/10"
          }`}
        >
          <div
            className={`absolute inset-0 pointer-events-none ${
              isDark
                ? "bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.16),transparent_30%)]"
                : "bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.22),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.14),transparent_30%)]"
            }`}
          />

          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-teal-400 font-bold text-xs sm:text-sm tracking-[0.22em] uppercase">
                Skillora Courses
              </p>

              <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-black mt-4 leading-tight ${
                  isDark ? "text-white" : "text-[#061311]"
                }`}
              >
                Explore Online{" "}
                <span className="text-teal-400">Design Skills</span>
              </h1>

              <p className={`mt-4 max-w-2xl leading-7 ${mutedText}`}>
                Learn Figma, Canva, UI/UX, web design, branding, product design,
                and digital marketing through structured online courses.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-7 sm:mt-8 max-w-xl">
                <HeroStat label="Courses" value={`${courses.length}+`} isDark={isDark} />
                <HeroStat label="Students" value="500+" isDark={isDark} />
                <HeroStat label="Instructors" value="20+" isDark={isDark} />
              </div>
            </div>

            <div className="hidden lg:block">
              <div
                className={`rounded-3xl p-6 border backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-teal-300/40 hover:shadow-[0_0_45px_rgba(45,212,191,0.16)] ${
                  isDark
                    ? "bg-white/[0.07] border-white/10"
                    : "bg-white/70 border-emerald-900/10"
                }`}
              >
                <h2
                  className={`text-2xl font-black ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  Start Learning Today
                </h2>

                <p className={`mt-3 leading-7 ${mutedText}`}>
                  Browse creative, design, marketing, and career-focused courses
                  in one Skillora learning platform.
                </p>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  {categories.slice(0, 0).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`rounded-2xl p-3 text-left text-sm font-semibold border transition-all duration-300 hover:bg-teal-400 hover:text-[#061311] hover:scale-105 ${
                        isDark
                          ? "bg-white/[0.055] border-white/10 text-white/75"
                          : "bg-white/80 border-emerald-900/10 text-slate-700"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_220px_120px]">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search courses by title, instructor or category..."
            className={`h-12 w-full rounded-2xl border px-4 text-sm outline-none focus:ring-2 transition ${inputClass}`}
          />

         <select
  value={sortBy}
  onChange={(event) => setSortBy(event.target.value)}
  className={`h-12 rounded-2xl border px-4 text-sm outline-none focus:ring-2 transition ${inputClass}`}
>
  <option
    value="latest"
    style={{ color: "#0f172a", background: "#ffffff" }}
  >
    Sort by Latest
  </option>

  <option
    value="popular"
    style={{ color: "#0f172a", background: "#ffffff" }}
  >
    Most Popular
  </option>

  <option
    value="low"
    style={{ color: "#0f172a", background: "#ffffff" }}
  >
    Price Low → High
  </option>

  <option
    value="high"
    style={{ color: "#0f172a", background: "#ffffff" }}
  >
    Price High → Low
  </option>
</select>

          <button
            type="button"
            onClick={() => setFiltersOpen((prev) => !prev)}
            className={`h-12 rounded-2xl border px-5 text-sm font-bold transition lg:hidden ${
              isDark
                ? "bg-white/[0.07] border-white/10 text-white hover:bg-teal-400 hover:text-[#061311]"
                : "bg-white/85 border-emerald-900/10 text-[#061311] hover:bg-teal-400"
            }`}
          >
            Filters
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside className={`${filtersOpen ? "block" : "hidden lg:block"}`}>
            <div
              className={`lg:sticky lg:top-20 space-y-6 rounded-3xl border p-5 sm:p-6 transition-all duration-300 hover:border-teal-300/40 hover:shadow-[0_0_40px_rgba(45,212,191,0.12)] ${cardClass}`}
            >
              <div className="flex items-center justify-between gap-4">
                <h3
                  className={`font-black ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  Filter Courses
                </h3>

                {(category || level || price || query) && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs text-teal-400 font-bold hover:underline"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <FilterGroup title="Category" isDark={isDark}>
                {categories.map((item) => (
                  <Pill
                    key={item}
                    active={category === item}
                    isDark={isDark}
                    onClick={() => setCategory(category === item ? null : item)}
                  >
                    {item}
                  </Pill>
                ))}
              </FilterGroup>

              <FilterGroup title="Level" isDark={isDark}>
                {levels.map((item) => (
                  <Pill
                    key={item}
                    active={level === item}
                    isDark={isDark}
                    onClick={() => setLevel(level === item ? null : item)}
                  >
                    {item}
                  </Pill>
                ))}
              </FilterGroup>

              <FilterGroup title="Price" isDark={isDark}>
                {prices.map((item) => (
                  <Pill
                    key={item}
                    active={price === item}
                    isDark={isDark}
                    onClick={() => setPrice(price === item ? null : item)}
                  >
                    {item}
                  </Pill>
                ))}
              </FilterGroup>
            </div>
          </aside>

          <section>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h2
                  className={`text-2xl font-black ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  Available Courses
                </h2>

                <p className={`text-sm mt-1 ${mutedText}`}>
                  {filteredCourses.length} courses found
                </p>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02]"
                  >
                    <CourseCard course={course} />
                  </div>
                ))
              ) : (
                <div
                  className={`col-span-full rounded-3xl p-10 sm:p-12 text-center border ${cardClass}`}
                >
                  <h3
                    className={`text-2xl font-black ${
                      isDark ? "text-white" : "text-[#061311]"
                    }`}
                  >
                    No Courses Found
                  </h3>

                  <p className={`mt-3 ${mutedText}`}>
                    Try changing your search keyword or filters.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-6 px-6 py-3 rounded-xl bg-teal-400 text-[#061311] font-black hover:bg-white hover:-translate-y-1 transition-all duration-300"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function HeroStat({ label, value, isDark }) {
  return (
    <div
      className={`rounded-2xl p-3 sm:p-4 border transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/40 ${
        isDark
          ? "bg-white/[0.055] border-white/10"
          : "bg-white/75 border-emerald-900/10"
      }`}
    >
      <h3 className="text-xl sm:text-2xl font-black text-teal-400">{value}</h3>
      <p className={isDark ? "text-xs text-white/50 mt-1" : "text-xs text-slate-500 mt-1"}>
        {label}
      </p>
    </div>
  );
}

function FilterGroup({ title, children, isDark }) {
  return (
    <div>
      <h4
        className={`mb-3 text-xs font-black uppercase tracking-[0.18em] ${
          isDark ? "text-white/45" : "text-slate-500"
        }`}
      >
        {title}
      </h4>

      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({ active, children, onClick, isDark }) {
  const activeClass = "bg-teal-400 text-[#061311] border-teal-400 shadow-[0_10px_25px_rgba(45,212,191,0.22)]";

  const inactiveClass = isDark
    ? "bg-white/[0.05] text-white/65 border-white/10 hover:border-teal-300/50 hover:text-teal-300 hover:bg-teal-400/10"
    : "bg-white/80 text-slate-600 border-emerald-900/10 hover:border-teal-400 hover:text-teal-700 hover:bg-teal-50";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-all duration-200 hover:scale-105 ${
        active ? activeClass : inactiveClass
      }`}
    >
      {children}
    </button>
  );
}

export default CourseList;