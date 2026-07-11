import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Calendar,
  Clock3,
  User,
  ArrowRight,
} from "lucide-react";

function BlogList() {
  const [theme, setTheme] =useState(
    localStorage.getItem("theme") || "dark"
  );

  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Theme
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

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data = await res.json();

        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
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
        blog.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        blog.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        category === "All" ||
        blog.category === category;

      return matchSearch && matchCategory;
    });
  }, [blogs, search, category]);

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
          className={`absolute left-1/2 top-0 h-[350px] w-[700px] -translate-x-1/2 rounded-full blur-[130px] ${
            isDark
              ? "bg-teal-500/20"
              : "bg-cyan-400/20"
          }`}
        />

        <div className="relative mx-auto max-w-7xl px-6 text-center">

          <span className="inline-block rounded-full border border-teal-500/30 bg-teal-500/10 px-5 py-2 font-semibold text-teal-400">
            Skillora Blog
          </span>

          <h1 className="mt-8 text-5xl font-black md:text-7xl">
            Learn
            <span className="text-teal-400">
              . Build.
            </span>
            Grow.
          </h1>

          <p
            className={`mx-auto mt-6 max-w-3xl text-lg leading-8 ${
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
          <div className="relative mx-auto mt-10 max-w-xl">

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
              className={`w-full rounded-2xl border py-4 pl-14 pr-5 outline-none transition ${
                isDark
                  ? "border-white/10 bg-[#111] text-white"
                  : "border-slate-200 bg-white"
              }`}
            />

          </div>

          {/* Categories */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">

            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-6 py-3 font-semibold transition ${
                  category === item
                    ? "bg-teal-500 text-white"
                    : isDark
                    ? "bg-white/5 hover:bg-white/10"
                    : "border border-slate-200 bg-white hover:border-teal-500"
                }`}
              >
                {item}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* Blog Section */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
                {loading ? (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-bold">
              Loading blogs...
            </h2>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="py-24 text-center">
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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            {filteredBlogs.map((blog) => (

              <article
                key={blog._id}
                className={`group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                  isDark
                    ? "border border-white/10 bg-[#111] hover:border-teal-500/40"
                    : "border border-slate-200 bg-white shadow-sm hover:border-teal-400 hover:shadow-xl"
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

                  <span className="inline-flex rounded-full bg-teal-500/10 px-3 py-1 text-sm font-semibold text-teal-400">
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
                    className={`mt-6 flex items-center gap-5 text-sm ${
                      isDark
                        ? "text-white/50"
                        : "text-slate-500"
                    }`}
                  >

                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {blog.author}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {blog.createdAt
                        ? new Date(
                            blog.createdAt
                          ).toLocaleDateString()
                        : "New"}
                    </div>

                    <div className="flex items-center gap-2">
                      <Clock3 size={16} />
                      {blog.readTime}
                    </div>

                  </div>

                  <Link
                    to={`/blogs/${blog._id}`}
                    className="mt-8 inline-flex items-center gap-2 font-semibold text-teal-400 transition-all hover:gap-3"
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

      {/* Newsletter */}
      <section className="pb-24 px-6">

             <div
          className={`relative mx-auto max-w-6xl overflow-hidden rounded-[40px] ${
            isDark
              ? "bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#052e2b]"
              : "border border-slate-200 bg-gradient-to-r from-cyan-50 via-white to-teal-50"
          }`}
        >
          <div
            className={`absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[120px] ${
              isDark
                ? "bg-teal-500/20"
                : "bg-cyan-300/40"
            }`}
          />

          <div className="relative px-8 py-16 text-center md:px-16">

            <span className="inline-block rounded-full bg-teal-500/10 px-5 py-2 font-semibold text-teal-400">
              Stay Updated
            </span>

            <h2 className="mt-6 text-4xl font-black md:text-5xl">
              Never Miss a New Article
            </h2>

            <p
              className={`mx-auto mt-5 max-w-2xl leading-8 ${
                isDark
                  ? "text-white/60"
                  : "text-slate-600"
              }`}
            >
              Get the latest articles about Artificial Intelligence,
              Programming, UI/UX Design, Digital Marketing and Career
              Development directly in your inbox.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full rounded-2xl border px-6 py-4 outline-none sm:w-[420px] ${
                  isDark
                    ? "border-white/10 bg-[#111] text-white placeholder:text-white/40"
                    : "border-slate-300 bg-white"
                }`}
              />

              <button className="rounded-2xl bg-teal-500 px-8 py-4 font-bold text-white transition hover:bg-teal-400">
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