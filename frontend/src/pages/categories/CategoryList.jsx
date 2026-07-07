import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { categories } from "../../data/dummyData";

function CategoryList() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

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

  const allCategories = useMemo(
    () => ["All", ...categories.map((item) => item.name)],
    []
  );

  const filteredCategories = categories.filter((item) => {
    const matchCategory =
      selectedCategory === "All" ||
      item.name === selectedCategory;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  const pageClass = isDark
    ? "bg-[#061311] text-white"
    : "bg-[#eef8f3] text-[#061311]";

  const cardClass = isDark
    ? "bg-white/[0.05] border-white/10 backdrop-blur-xl"
    : "bg-white border-slate-200 shadow-lg";

  const mutedText = isDark
    ? "text-white/60"
    : "text-slate-600";

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${pageClass}`}
    >
      {/* Hero */}

      <section className="relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,.14),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,.14),transparent_30%)]"
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-14">

          <div className="text-center">

            <p className="uppercase tracking-[0.25em] text-teal-400 text-sm font-bold">
              Skillora Categories
            </p>

            <h1
              className={`mt-4 text-4xl md:text-5xl font-black ${
                isDark
                  ? "text-white"
                  : "text-[#061311]"
              }`}
            >
              Explore Learning Categories
            </h1>

            <p
              className={`mt-5 max-w-3xl mx-auto leading-7 ${mutedText}`}
            >
              Browse professional learning categories and discover
              creative, design, marketing and career-focused skills
              to grow your future.
            </p>

            <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-10">

              <HeroStat
                value={`${categories.length}+`}
                label="Categories"
                isDark={isDark}
              />

              <HeroStat
                value="100+"
                label="Courses"
                isDark={isDark}
              />

              <HeroStat
                value="500+"
                label="Students"
                isDark={isDark}
              />

            </div>

          </div>
        </div>
      </section>
            {/* Search & Category Navigation */}

      <section className="max-w-7xl mx-auto px-6 pb-10">

        {/* Search Box */}

        <div className="mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category..."
            className={`w-full h-12 rounded-2xl border px-5 outline-none transition-all duration-300 ${
              isDark
                ? "bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:border-teal-400"
                : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-teal-500"
            }`}
          />
        </div>

        {/* Category Pills */}

        <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">

          {allCategories.map((item) => (

            <button
              key={item}
              onClick={() => setSelectedCategory(item)}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-all duration-300 ${
                selectedCategory === item
                  ? "bg-teal-400 text-[#061311]"
                  : isDark
                  ? "bg-white/5 border border-white/10 text-white hover:bg-teal-400 hover:text-[#061311]"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-teal-400 hover:text-[#061311]"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {/* Section Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-10 mb-8 gap-4">

          <div>

            <h2
              className={`text-3xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              All Categories
            </h2>

            <p className={`mt-2 ${mutedText}`}>
              Explore all available learning categories on Skillora.
            </p>

          </div>

          <div
            className={`rounded-2xl px-5 py-3 font-bold ${
              isDark
                ? "bg-white/5 border border-white/10"
                : "bg-white border border-slate-200"
            }`}
          >
            {filteredCategories.length} Categories Found
          </div>

        </div>

        {/* Category Grid */}

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredCategories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className={`group relative overflow-hidden rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl ${cardClass}`}
            >
              {/* Background Glow */}
              <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-teal-400/10 group-hover:scale-150 transition duration-500" />

              {/* Icon */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-teal-400/15 flex items-center justify-center text-3xl group-hover:scale-110 transition duration-300">
                {category.icon || "📚"}
              </div>

              {/* Title */}
              <h2
                className={`relative z-10 mt-6 text-2xl font-black transition ${
                  isDark
                    ? "text-white group-hover:text-teal-300"
                    : "text-[#061311] group-hover:text-teal-600"
                }`}
              >
                {category.name}
              </h2>

              {/* Description */}
              <p className={`relative z-10 mt-4 text-sm leading-7 ${mutedText}`}>
                {category.text ||
                  "Learn professional skills with practical projects, real-world examples and career-focused courses."}
              </p>

              {/* Footer */}
              <div className="relative z-10 mt-8 flex items-center justify-between">
                <span className="font-semibold text-teal-400">
                  Explore Category
                </span>

                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? "bg-white/10 group-hover:bg-teal-400 group-hover:text-[#061311]"
                      : "bg-teal-50 group-hover:bg-teal-400 group-hover:text-white"
                  }`}
                >
                  →
                </div>
              </div>

              {/* Bottom Line */}
              <div className="absolute left-0 bottom-0 h-1 w-0 bg-teal-400 transition-all duration-500 group-hover:w-full" />
            </Link>
          ))}

        </div>
      </section>
            {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div
          className={`rounded-3xl border p-12 text-center ${
            isDark
              ? "bg-white/5 border-white/10"
              : "bg-white border-slate-200"
          }`}
        >
          <div className="text-6xl mb-5">📚</div>

          <h2
            className={`text-2xl font-black ${
              isDark ? "text-white" : "text-[#061311]"
            }`}
          >
            No Categories Found
          </h2>

          <p className={`mt-3 ${mutedText}`}>
            Try searching with another keyword.
          </p>

          <button
            onClick={() => {
              setSearch("");
              setSelectedCategory("All");
            }}
            className="mt-6 rounded-xl bg-teal-400 px-6 py-3 font-bold text-[#061311] hover:scale-105 transition"
          >
            Reset Search
          </button>
        </div>
      )}
    </main>
  );
}

/* =========================
      Hero Stat Card
========================= */

function HeroStat({ value, label, isDark }) {
  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-2 ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-white border-slate-200"
      }`}
    >
      <h3 className="text-3xl font-black text-teal-400">
        {value}
      </h3>

      <p
        className={`mt-2 text-sm ${
          isDark ? "text-white/55" : "text-slate-500"
        }`}
      >
        {label}
      </p>
    </div>
  );
}

export default CategoryList;
       