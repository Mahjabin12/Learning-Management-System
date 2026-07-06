import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "How Structured Learning Helps You Build Real Design Skills",
    date: "June 20, 2026",
    category: "Learning Guide",
    text: "A clear roadmap helps learners move from basic tool practice to confident project execution.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Why Hands-on Practice Makes Creative Skills Stronger",
    date: "June 18, 2026",
    category: "Design Practice",
    text: "Practical tasks, small projects, and feedback help students improve faster than theory-only learning.",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Modern Design Learning Trends Every Beginner Should Know",
    date: "June 15, 2026",
    category: "Design Trends",
    text: "AI, portfolio learning, UI/UX workflow, and digital marketing are changing how learners grow online.",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
  },
];

function Blogs() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
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
    const currentSection = sectionRef.current;

    if (!currentSection) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.16,
      }
    );

    observer.observe(currentSection);

    return () => observer.disconnect();
  }, []);

  const sectionBg = isDark
    ? "bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_34%),linear-gradient(120deg,#061311_0%,#071813_48%,#020807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(45,212,191,0.18),transparent_34%),linear-gradient(120deg,#F6F9F8_0%,#EAF7F0_48%,#DDF1E8_100%)] text-[#10241E]";

  const mutedText = isDark ? "text-slate-400" : "text-slate-600";

  const cardTheme = isDark
    ? "border-white/10 bg-white/[0.055]"
    : "border-emerald-900/10 bg-white/80 shadow-sm";

  const tagTheme = isDark
    ? "border-white/10 bg-black/30 text-teal-300"
    : "border-white/70 bg-white/85 text-teal-700";

  const titleTheme = isDark
    ? "text-white group-hover:text-teal-300"
    : "text-[#10241E] group-hover:text-teal-700";

  const cardDirections = [
    "-translate-x-12",
    "translate-y-12",
    "translate-x-12",
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden py-16 sm:py-20 lg:py-24 ${sectionBg}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute left-[8%] top-[15%] h-48 w-48 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/10" : "bg-teal-400/12"
          }`}
        />

        <div
          className={`absolute bottom-[10%] right-[8%] h-56 w-56 rounded-full blur-3xl ${
            isDark ? "bg-emerald-400/8" : "bg-emerald-300/14"
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div
          className={`relative mx-auto max-w-3xl text-center transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0"
          }`}
        >
          <p className="inline-flex items-center gap-2 text-sm font-black text-teal-400">
            <span className="h-[2px] w-10 rounded-full bg-teal-400" />
            Skillora Blog
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            Latest News &{" "}
            <span className="text-teal-400">Learning Insights</span>
          </h2>

          <p
            className={`mt-4 text-sm leading-7 sm:text-base ${mutedText}`}
          >
            Explore practical tips, design trends, learning guides, and creative
            ideas to help you grow smarter with Skillora.
          </p>

          <svg
            className={`absolute right-0 top-0 hidden h-20 w-20 sm:block ${
              isDark ? "text-white/35" : "text-[#10241E]/35"
            }`}
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M88 16C72 44 50 58 22 64"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />

            <path
              d="M44 42C34 50 27 57 16 64C28 68 40 73 52 78"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="mt-12 grid gap-6 text-left md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <Link
              key={blog.id}
              to={`/blogs/${blog.id}`}
              style={{
                transitionDelay: isVisible
                  ? `${index * 130}ms`
                  : "0ms",
              }}
              className={`group relative block overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(45,212,191,0.22)] ${
                isVisible
                  ? "translate-x-0 translate-y-0 opacity-100"
                  : `opacity-0 ${cardDirections[index]}`
              } ${cardTheme}`}
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={blog.img}
                  alt={blog.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#061311]/90 via-[#061311]/20 to-transparent" />

                <span
                  className={`absolute left-4 top-4 rounded-full border px-3 py-1 text-xs font-black backdrop-blur-md ${tagTheme}`}
                >
                  {blog.category}
                </span>

                <span className="absolute bottom-4 right-4 rounded-full bg-teal-400 px-3 py-1 text-xs font-black text-[#061311] transition-transform duration-300 group-hover:scale-105">
                  Read
                </span>
              </div>

              <div className="relative p-5 sm:p-6">
                <p className="text-xs font-black text-teal-400">
                  {blog.date}
                </p>

                <h3
                  className={`mt-3 text-lg font-black leading-snug transition-colors duration-300 sm:text-xl ${titleTheme}`}
                >
                  {blog.title}
                </h3>

                <p className={`mt-3 text-sm leading-6 ${mutedText}`}>
                  {blog.text}
                </p>

                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-teal-400 transition-colors duration-300 group-hover:text-teal-300">
                  Read more

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>

              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.15),transparent_35%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>
          ))}
        </div>

        <div
          className={`mt-10 flex justify-center transition-all delay-500 duration-700 ${
            isVisible
              ? "scale-100 opacity-100"
              : "scale-90 opacity-0"
          }`}
        >
          <Link
            to="/blogs"
            className="group inline-flex items-center gap-2 rounded-xl bg-teal-400 px-6 py-3 text-sm font-black text-[#061311] transition-all duration-300 hover:-translate-y-1 hover:bg-teal-300 hover:shadow-[0_18px_40px_rgba(45,212,191,0.30)]"
          >
            View All Articles

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Blogs;