import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../../../data/dummyData";

function Categories() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
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
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const sectionBg = isDark
    ? "bg-[radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.22),transparent_30%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_80%_85%,rgba(20,184,166,0.14),transparent_34%),linear-gradient(120deg,#061311_0%,#071813_48%,#020807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.18),transparent_32%),radial-gradient(circle_at_80%_85%,rgba(16,185,129,0.12),transparent_35%),linear-gradient(120deg,#F6F9F8_0%,#EAF7F0_48%,#DDF1E8_100%)] text-[#10241E]";

  const paragraphClass = isDark ? "text-slate-400" : "text-slate-600";

  const cardDirections = [
    "-translate-x-14",
    "translate-y-14",
    "translate-x-14",
    "-translate-y-14",
    "-translate-x-14",
    "translate-y-14",
    "translate-x-14",
    "-translate-y-14",
  ];

  return (
    <section
      id="categories"
      ref={sectionRef}
      className={`relative overflow-hidden transition-colors duration-500 ${sectionBg} py-16 sm:py-18 lg:py-20`}
    >
      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <p className="text-teal-400 font-semibold text-sm">Have a look</p>

          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3 leading-tight">
            Explore Our Top <span className="text-teal-400">Categories</span>
          </h2>

          <p
            className={`max-w-2xl mx-auto text-sm sm:text-base mt-4 leading-7 ${paragraphClass}`}
          >
            Learn creative and career-focused skills through structured courses.
            Choose a category and start building real-world skills today.
          </p>

          <div
            className={`mt-7 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
          >
            <Link
              to="/categories"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-400/50 text-teal-400 text-sm font-semibold hover:bg-teal-400 hover:text-[#061311] hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] transition duration-300"
            >
              Explore Categories
              <span>→</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-10 sm:mt-12 text-left">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              to={`/categories/${category.id}`}
              key={category.id}
              style={{
                transitionDelay: isVisible ? `${index * 110}ms` : "0ms",
              }}
              className={`group relative overflow-hidden rounded-xl p-[1px] transition-all duration-700 ease-out hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(45,212,191,0.35)] ${
                isVisible
                  ? "opacity-100 translate-x-0 translate-y-0"
                  : `opacity-0 ${cardDirections[index] || "translate-y-14"}`
              } ${
                index === 1
                  ? "bg-teal-400 shadow-[0_0_35px_rgba(45,212,191,0.30)]"
                  : isDark
                  ? "bg-white/10 hover:bg-gradient-to-r hover:from-teal-400 hover:via-cyan-300 hover:to-teal-500"
                  : "bg-white/75 hover:bg-gradient-to-r hover:from-teal-400 hover:via-cyan-300 hover:to-teal-500 shadow-sm"
              }`}
            >
              <div
                className={`relative h-full min-h-[190px] rounded-xl p-5 sm:p-6 transition duration-500 ${
                  index === 1
                    ? "bg-teal-500 text-[#061311]"
                    : isDark
                    ? "bg-[#142824]/95 group-hover:bg-[#071d19]/95"
                    : "bg-white/90 group-hover:bg-[#071d19]/95"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.25),transparent_35%)]" />

                <div
                  className={`relative w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-5 transition duration-300 ${
                    index === 1
                      ? "bg-white/20 text-white"
                      : isDark
                      ? "bg-white/10 text-white group-hover:bg-teal-400 group-hover:text-[#061311] group-hover:shadow-[0_0_22px_rgba(45,212,191,0.55)]"
                      : "bg-teal-50 text-[#10241E] group-hover:bg-teal-400 group-hover:text-[#061311] group-hover:shadow-[0_0_22px_rgba(45,212,191,0.55)]"
                  }`}
                >
                  {category.icon || "📚"}
                </div>

                <h3
                  className={`relative font-bold text-base tracking-tight transition duration-300 ${
                    index === 1
                      ? "text-white"
                      : isDark
                      ? "text-white"
                      : "text-[#10241E] group-hover:text-white"
                  }`}
                >
                  {category.name}
                </h3>

                <p
                  className={`relative text-xs leading-6 mt-3 transition duration-300 ${
                    index === 1
                      ? "text-white/85"
                      : isDark
                      ? "text-slate-400 group-hover:text-slate-300"
                      : "text-slate-500 group-hover:text-slate-300"
                  }`}
                >
                  {category.text || `${category.courses} courses available.`}
                </p>

                <span className="absolute right-4 bottom-4 w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition duration-300 shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;