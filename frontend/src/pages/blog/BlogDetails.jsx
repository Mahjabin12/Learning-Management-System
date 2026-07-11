import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Clock, User } from "lucide-react";

function BlogDetails() {
  const { id } = useParams();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

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

  // Fetch Blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Current Blog
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await res.json();

        if (data.success) {
          setBlog(data.data);
        }

        // Related Blogs
        const res2 = await fetch("http://localhost:5000/api/blogs");
        const data2 = await res2.json();

        if (data2.success) {
          setRelatedBlogs(
            data2.data
              .filter((item) => item._id !== id)
              .slice(0, 3)
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);
    const isDark = theme === "dark";

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-black text-white"
          : "bg-[#eef7f4] text-slate-900"
      }`}
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-br from-teal-500/20 via-black to-black"
              : "bg-gradient-to-br from-teal-100 via-white to-white"
          }`}
        />

        <div className="relative max-w-6xl mx-auto px-6 py-20 text-center">
          <span className="inline-flex items-center rounded-full bg-teal-500 px-4 py-2 text-sm font-semibold text-white">
            {blog.category}
          </span>

          <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-black leading-tight">
            {blog.title}
          </h1>

          <p
            className={`mt-6 max-w-3xl mx-auto leading-8 ${
              isDark ? "text-white/70" : "text-slate-600"
            }`}
          >
            {blog.description}
          </p>

          <div
            className={`mt-10 flex flex-wrap justify-center gap-6 text-sm ${
              isDark ? "text-white/60" : "text-slate-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <User size={18} />
              {blog.author}
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} />
              {blog.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div
          className={`overflow-hidden rounded-3xl border shadow-2xl ${
            isDark
              ? "bg-[#111827] border-white/10"
              : "bg-white border-slate-200"
          }`}
        >
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[250px] sm:h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </section>
            {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <article
          className={`rounded-3xl p-8 sm:p-10 ${
            isDark
              ? "bg-white/5 border border-white/10"
              : "bg-white border border-slate-200 shadow-lg"
          }`}
        >
          <div
            className={`prose prose-lg max-w-none ${
              isDark ? "prose-invert" : ""
            }`}
          >
            <p className="leading-9 whitespace-pre-line">
              {blog.content}
            </p>

            <blockquote className="border-l-4 border-teal-500 pl-6 italic text-xl my-10">
              “Learning never exhausts the mind. Every lesson brings you one
              step closer to success.”
            </blockquote>

            <h2>Why This Matters</h2>

            <p>
              Technology is changing rapidly. Learning practical skills like AI,
              Web Development, UI/UX Design, and Digital Marketing helps
              students build successful careers. Continuous practice, real
              projects, and consistent learning are the keys to becoming
              industry-ready.
            </p>
          </div>
        </article>
      </section>

      {/* Related Blogs */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-10">
          <p className="text-teal-400 font-semibold uppercase tracking-widest">
            More Articles
          </p>

          <h2 className="text-3xl sm:text-4xl font-black mt-2">
            Related Blogs
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedBlogs.map((item) => (
            <div
              key={item._id}
              className={`group overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-2 ${
                isDark
                  ? "bg-white/5 border border-white/10 hover:border-teal-400"
                  : "bg-white border border-slate-200 shadow hover:shadow-2xl"
              }`}
            >
              <div className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
                />
              </div>

              <div className="p-6">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-sm font-semibold">
                  {item.category}
                </span>

                <h3 className="mt-4 text-2xl font-bold">
                  {item.title}
                </h3>

                <p
                  className={`mt-3 line-clamp-3 ${
                    isDark ? "text-white/60" : "text-slate-600"
                  }`}
                >
                  {item.description}
                </p>

                <Link
                  to={`/blogs/${item._id}`}
                  className="mt-6 inline-flex items-center gap-2 text-teal-400 font-semibold hover:gap-3 transition-all"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
            {/* CTA */}
      <section className="pb-24 px-6">
        <div
          className={`max-w-6xl mx-auto rounded-[36px] overflow-hidden text-center px-8 py-16 ${
            isDark
              ? "bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#052e2b]"
              : "bg-gradient-to-r from-cyan-50 via-white to-teal-50 border border-slate-200"
          }`}
        >
          <span className="inline-block px-5 py-2 rounded-full bg-teal-500/10 text-teal-500 font-semibold">
            Skillora
          </span>

          <h2 className="mt-6 text-3xl md:text-5xl font-black">
            Keep Learning Every Day
          </h2>

          <p
            className={`mt-5 max-w-2xl mx-auto leading-8 ${
              isDark
                ? "text-white/60"
                : "text-slate-600"
            }`}
          >
            Discover premium courses in Artificial Intelligence,
            Programming, UI/UX Design, Web Development and Digital
            Marketing.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/courses"
              className="px-8 py-4 rounded-2xl bg-teal-500 text-white font-bold hover:bg-teal-400 transition"
            >
              Browse Courses
            </Link>

            <Link
              to="/blogs"
              className={`px-8 py-4 rounded-2xl font-bold transition ${
                isDark
                  ? "border border-white/10 hover:bg-white/10"
                  : "border border-slate-300 hover:bg-slate-100"
              }`}
            >
              Back to Blogs
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default BlogDetails;