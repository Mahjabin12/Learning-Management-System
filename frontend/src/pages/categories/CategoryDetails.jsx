import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategoryDetails } from "../../services/categoryApi";
import CourseCard from "../../components/common/CourseCard";

function CategoryDetails() {
  const { id } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const isDark = theme === "dark";

  // Sync theme across app (same pattern as layouts)
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

  // Fetch category from backend
  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCategoryDetails(id);
        setCategory(res.data.category);
      } catch (err) {
        console.log("Category details error", err);
        setError("Failed to load category details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? "bg-[#061311] text-white" : "bg-[#f4faf8] text-[#061311]"
        }`}
      >
        <p className="text-xl animate-pulse">Loading category...</p>
      </div>
    );
  }

  // Error / not found state
  if (error || !category) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center gap-5 px-6 text-center ${
          isDark ? "bg-[#061311] text-white" : "bg-[#f4faf8] text-[#061311]"
        }`}
      >
        <div className="text-6xl">📚</div>
        <h2 className="text-2xl font-bold">
          {error || "Category not found"}
        </h2>
        <Link
          to="/categories"
          className="px-6 py-3 rounded-xl bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#061311] font-semibold transition"
        >
          Back to Categories
        </Link>
      </div>
    );
  }

  // Derived tutorial data straight from backend fields
  const tutorial = {
    intro: category.description,
    uses: category.skills || [],
    career: category.career,
  };

  // No course-category relation yet (see Option 2 in the plan)
  const categoryCourses = [];

  return (
    <main
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? "bg-[#061311] text-white" : "bg-[#f4faf8] text-[#061311]"
      }`}
    >
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden ${
          isDark ? "bg-[#061311] text-white" : "bg-white text-[#061311]"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.16),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.11),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.10),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.08),transparent_30%)]"
          }`}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <Link
            to="/categories"
            className="text-[#2dd4bf] hover:underline text-sm"
          >
            ← Back to Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-8">
            <div
              className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl border ${
                isDark
                  ? "bg-[#102823] border-[#24564c]"
                  : "bg-[#e6f7f4] border-[#bfe9e1]"
              }`}
            >
              {category.icon || "📚"}
            </div>

            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-[#2dd4bf]/15 text-[#2dd4bf] text-xs uppercase tracking-wider">
                Skill Category
              </span>

              <h1 className="text-4xl md:text-5xl font-bold mt-4">
                {category.name}
              </h1>

              <p
                className={`mt-5 max-w-3xl leading-7 ${
                  isDark ? "text-[#94a3b8]" : "text-slate-600"
                }`}
              >
                {tutorial.intro}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            <div
              className={`rounded-2xl border p-5 ${
                isDark
                  ? "bg-[#102823] border-[#24564c]"
                  : "bg-[#e6f7f4] border-[#bfe9e1]"
              }`}
            >
              <h3 className="text-3xl font-bold text-[#2dd4bf]">
                {categoryCourses.length}
              </h3>
              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-[#94a3b8]" : "text-slate-500"
                }`}
              >
                Available Courses
              </p>
            </div>

            <div
              className={`rounded-2xl border p-5 ${
                isDark
                  ? "bg-[#102823] border-[#24564c]"
                  : "bg-[#e6f7f4] border-[#bfe9e1]"
              }`}
            >
              <h3 className="text-3xl font-bold text-[#2dd4bf]">100%</h3>
              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-[#94a3b8]" : "text-slate-500"
                }`}
              >
                Practical Learning
              </p>
            </div>

            <div
              className={`rounded-2xl border p-5 ${
                isDark
                  ? "bg-[#102823] border-[#24564c]"
                  : "bg-[#e6f7f4] border-[#bfe9e1]"
              }`}
            >
              <h3 className="text-3xl font-bold text-[#2dd4bf]">Career</h3>
              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-[#94a3b8]" : "text-slate-500"
                }`}
              >
                Industry Ready Skills
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[2fr_380px] gap-10">
        {/* Left Content */}
        <div className="space-y-8">
          {/* About */}
          <div
            className={`rounded-3xl border shadow-sm p-8 ${
              isDark
                ? "bg-[#102823] border-[#24564c]"
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-[#2dd4bf] font-semibold uppercase tracking-widest text-sm">
              About This Skill
            </p>

            <h2 className="text-3xl font-bold mt-2">
              What is {category.name}?
            </h2>

            <p
              className={`mt-6 leading-8 ${
                isDark ? "text-[#94a3b8]" : "text-slate-600"
              }`}
            >
              {tutorial.intro}
            </p>
          </div>

          {/* Learn */}
          <div
            className={`rounded-3xl border shadow-sm p-8 ${
              isDark
                ? "bg-[#102823] border-[#24564c]"
                : "bg-white border-slate-200"
            }`}
          >
            <p className="text-[#2dd4bf] font-semibold uppercase tracking-widest text-sm">
              Skills
            </p>

            <h2 className="text-3xl font-bold mt-2">What You'll Learn</h2>

            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {tutorial.uses.length > 0 ? (
                tutorial.uses.map((item) => (
                  <div
                    key={item}
                    className={`rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                      isDark
                        ? "border-[#24564c] bg-[#0c1f1b] hover:border-[#2dd4bf]/50 hover:bg-[#2dd4bf]/5"
                        : "border-slate-200 bg-slate-50 hover:border-[#2dd4bf] hover:bg-[#e6f7f4]"
                    }`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#2dd4bf]/15 text-[#2dd4bf] flex items-center justify-center text-xl mb-4">
                      ✔
                    </div>

                    <h3 className="font-semibold">{item}</h3>

                    <p
                      className={`text-sm mt-2 leading-6 ${
                        isDark ? "text-[#94a3b8]" : "text-slate-500"
                      }`}
                    >
                      Learn this skill through structured lessons and
                      practical projects.
                    </p>
                  </div>
                ))
              ) : (
                <p className={isDark ? "text-[#94a3b8]" : "text-slate-500"}>
                  Skills for this category will be added soon.
                </p>
              )}
            </div>
          </div>

          {/* Career */}
          <div className="rounded-3xl bg-gradient-to-r from-[#2dd4bf] to-[#0f766e] p-8 text-[#061311] shadow-xl">
            <p className="uppercase tracking-widest text-sm text-[#0f2b26]">
              Career Opportunity
            </p>

            <h2 className="text-3xl font-bold mt-3">Build Your Future</h2>

            <p className="mt-5 leading-8 text-[#0f2b26]">
              {tutorial.career}
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mt-8">
              <div className="bg-[#061311]/10 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">Freelance</h3>
                <p className="text-sm mt-2 text-[#0f2b26]">
                  Work with international clients.
                </p>
              </div>

              <div className="bg-[#061311]/10 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">Full-Time</h3>
                <p className="text-sm mt-2 text-[#0f2b26]">
                  Get hired by companies.
                </p>
              </div>

              <div className="bg-[#061311]/10 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">Portfolio</h3>
                <p className="text-sm mt-2 text-[#0f2b26]">
                  Build impressive real projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div
            className={`sticky top-24 rounded-3xl border shadow-lg p-7 ${
              isDark
                ? "bg-[#102823] border-[#24564c]"
                : "bg-white border-slate-200"
            }`}
          >
            <h3 className="text-2xl font-bold">Category Summary</h3>

            <div className="space-y-5 mt-7">
              <div className="flex justify-between">
                <span className={isDark ? "text-[#94a3b8]" : "text-slate-500"}>
                  Category
                </span>
                <span className="font-semibold">{category.name}</span>
              </div>

              <div className="flex justify-between">
                <span className={isDark ? "text-[#94a3b8]" : "text-slate-500"}>
                  Courses
                </span>
                <span className="font-semibold">
                  {categoryCourses.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className={isDark ? "text-[#94a3b8]" : "text-slate-500"}>
                  Level
                </span>
                <span className="font-semibold">
                  {category.level || "Beginner → Advanced"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className={isDark ? "text-[#94a3b8]" : "text-slate-500"}>
                  Certificate
                </span>
                <span
                  className={`font-semibold ${
                    category.certificate ? "text-[#2dd4bf]" : "text-red-400"
                  }`}
                >
                  {category.certificate ? "Included" : "Not Available"}
                </span>
              </div>
            </div>

            <Link
              to="/courses"
              className="block mt-8 text-center rounded-xl bg-[#2dd4bf] py-3 text-[#061311] font-semibold hover:bg-[#14b8a6] transition"
            >
              Browse All Courses
            </Link>
          </div>
        </aside>
      </section>

      {/* Available Courses */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className="text-[#2dd4bf] font-semibold uppercase tracking-widest text-sm">
              Courses
            </p>

            <h2 className="text-4xl font-bold mt-2">
              Available {category.name} Courses
            </h2>

            <p
              className={`mt-3 ${
                isDark ? "text-[#94a3b8]" : "text-slate-500"
              }`}
            >
              Start learning with our carefully selected courses for this
              category.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-[#2dd4bf] font-semibold hover:gap-3 transition-all"
          >
            View All Courses →
          </Link>
        </div>

        {categoryCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryCourses.map((course) => (
              <div
                key={course.id}
                className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`rounded-3xl border border-dashed py-20 text-center ${
              isDark
                ? "border-[#24564c] bg-[#0c1f1b]"
                : "border-slate-300 bg-white"
            }`}
          >
            <div className="text-6xl mb-5">📚</div>

            <h3 className="text-3xl font-bold">No Courses Available</h3>

            <p
              className={`mt-4 max-w-lg mx-auto ${
                isDark ? "text-[#94a3b8]" : "text-slate-500"
              }`}
            >
              Courses for this category will be added soon. Explore other
              categories or browse all available courses.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-8 px-8 py-3 rounded-xl bg-[#2dd4bf] text-[#061311] font-semibold hover:bg-[#14b8a6] transition"
            >
              Browse All Courses
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section
        className={`${
          isDark ? "bg-[#050d0c]" : "bg-[#061311] text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Ready to Master {category.name}?
          </h2>

          <p className="text-[#94a3b8] mt-5 max-w-2xl mx-auto leading-8">
            Build practical skills through real projects, expert guidance,
            certificates and career-focused learning.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <Link
              to="/courses"
              className="px-8 py-3 rounded-xl bg-[#2dd4bf] hover:bg-[#14b8a6] text-[#061311] font-semibold transition"
            >
              Explore Courses
            </Link>

            <Link
              to="/categories"
              className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CategoryDetails;