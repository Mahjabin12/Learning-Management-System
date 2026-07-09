import { Link } from "react-router-dom";
import { blogs } from "../../data/dummyData";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Calendar,
  Clock3,
  User,
  ArrowRight,
} from "lucide-react";

function BlogList() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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

  const categories = [
    "All",
    "AI",
    "Programming",
    "UI/UX",
    "Digital Marketing",
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.description.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "All" ||
        blog.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <main
      className={`min-h-screen transition-all duration-500 ${
        isDark
          ? "bg-[#050505] text-white"
          : "bg-[#f6fbfb] text-slate-900"
      }`}
    >
      {/* Hero */}

      <section className="relative overflow-hidden py-24">

        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] blur-[130px] rounded-full ${
            isDark
              ? "bg-teal-500/20"
              : "bg-cyan-400/20"
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">

          <span className="inline-block rounded-full bg-teal-500/10 text-teal-400 px-5 py-2 font-semibold border border-teal-500/30">
            Skillora Blog
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl font-black">
            Learn.
            <span className="text-teal-400">
              {" "}
              Build.
            </span>
            Grow.
          </h1>

          <p
            className={`mt-6 max-w-3xl mx-auto text-lg leading-8 ${
              isDark
                ? "text-white/60"
                : "text-slate-600"
            }`}
          >
            Discover articles on Artificial Intelligence,
            Programming, UI/UX Design, Web Development,
            Digital Marketing and Career Growth.
          </p>

          {/* Search */}

          <div className="relative max-w-xl mx-auto mt-10">

            <Search
              size={20}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className={`w-full pl-14 pr-5 py-4 rounded-2xl border outline-none transition ${
                isDark
                  ? "bg-[#111] border-white/10 text-white"
                  : "bg-white border-slate-200"
              }`}
            />

          </div>

          {/* Categories */}

          <div className="flex flex-wrap justify-center gap-4 mt-10">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`px-6 py-3 rounded-full font-semibold transition ${
                  category === item
                    ? "bg-teal-500 text-white"
                    : isDark
                    ? "bg-white/5 hover:bg-white/10"
                    : "bg-white border border-slate-200 hover:border-teal-500"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

      </section>
            {/* ================= BLOG CARDS ================= */}

      <section className="max-w-7xl mx-auto px-6 pb-24">

        {filteredBlogs.length === 0 ? (

          <div className="text-center py-24">

            <h2 className="text-3xl font-bold">
              No Blog Found
            </h2>

            <p
              className={`mt-4 ${
                isDark
                  ? "text-white/60"
                  : "text-slate-500"
              }`}
            >
              Try searching with another keyword.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredBlogs.map((blog) => (

              <article
                key={blog.id}
                className={`group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                  isDark
                    ? "bg-[#111] border border-white/10 hover:border-teal-500/40"
                    : "bg-white border border-slate-200 hover:border-teal-400 shadow-sm hover:shadow-xl"
                }`}
              >

                <div className="overflow-hidden">

                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-60 w-full object-cover transition duration-700 group-hover:scale-110"
                  />

                </div>

                <div className="p-6">

                  <span className="inline-flex rounded-full bg-teal-500/10 text-teal-400 px-3 py-1 text-sm font-semibold">
                    {blog.category}
                  </span>

                  <h2
                    className={`mt-5 text-2xl font-bold leading-8 ${
                      isDark
                        ? "text-white"
                        : "text-slate-900"
                    }`}
                  >
                    {blog.title}
                  </h2>

                  <p
                    className={`mt-4 leading-7 ${
                      isDark
                        ? "text-white/60"
                        : "text-slate-600"
                    }`}
                  >
                    {blog.description}
                  </p>

                  <div
                    className={`flex items-center gap-5 mt-6 text-sm ${
                      isDark
                        ? "text-white/50"
                        : "text-slate-500"
                    }`}
                  >

                    <div className="flex items-center gap-2">
                      <User size={16} />
                      Skillora
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {blog.date}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      5 min
                    </div>

                  </div>

                  <Link
                    to={`/blogs/${blog.id}`}
                    className="mt-8 inline-flex items-center gap-2 text-teal-400 font-semibold hover:gap-3 transition-all"
                  >
                    Read Article
                    <ArrowRight size={18} />
                  </Link>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>
            {/* ================= NEWSLETTER ================= */}

      <section className="pb-24 px-6">

        <div
          className={`max-w-6xl mx-auto rounded-[40px] overflow-hidden relative ${
            isDark
              ? "bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#052e2b]"
              : "bg-gradient-to-r from-cyan-50 via-white to-teal-50 border border-slate-200"
          }`}
        >

          <div
            className={`absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[120px] ${
              isDark ? "bg-teal-500/20" : "bg-cyan-300/40"
            }`}
          />

          <div className="relative px-8 md:px-16 py-16 text-center">

            <span className="inline-block px-5 py-2 rounded-full bg-teal-500/10 text-teal-400 font-semibold">
              Stay Updated
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-black">
              Never Miss a New Article
            </h2>

            <p
              className={`mt-5 max-w-2xl mx-auto leading-8 ${
                isDark
                  ? "text-white/60"
                  : "text-slate-600"
              }`}
            >
              Get the latest articles about Artificial Intelligence,
              Programming, UI/UX Design, Digital Marketing and Career
              Development directly in your inbox.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full sm:w-[420px] rounded-2xl px-6 py-4 outline-none border ${
                  isDark
                    ? "bg-[#111] border-white/10 text-white placeholder:text-white/40"
                    : "bg-white border-slate-300"
                }`}
              />

              <button className="rounded-2xl px-8 py-4 bg-teal-500 hover:bg-teal-400 text-white font-bold transition">
                Subscribe
              </button>

            </div>

          </div>

        </div>

      </section>
          </main>
  );
}

export default BlogList;