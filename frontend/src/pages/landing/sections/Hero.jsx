import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", syncTheme);
    return () => window.removeEventListener("themechange", syncTheme);
  }, []);

  const scrollToCategories = () => {
    const section = document.getElementById("categories");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sectionBg = isDark
    ? "bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_30%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.12),transparent_30%),linear-gradient(120deg,#061311_0%,#071813_48%,#020807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.16),transparent_28%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.14),transparent_30%),linear-gradient(120deg,#e8f3ee_0%,#dff0e9_50%,#d4ebe2_100%)] text-[#061311]";

  const accent = isDark ? "text-teal-400" : "text-emerald-700";
  const muted = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <section className={`relative overflow-hidden ${sectionBg}`}>
      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative z-10">
          <p className={`font-semibold text-sm mb-5 ${accent}`}>
            Let&apos;s Join With Us
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight max-w-2xl">
            Learn Creative{" "}
            <span className={accent}>Design Skills</span> For Career Growth
          </h1>

          <p className={`mt-6 max-w-xl text-sm sm:text-base leading-7 ${muted}`}>
            Build practical skills in Figma, Canva, Adobe tools, web design,
            logo design, product design, and digital marketing. Learn how to use
            these skills in real-world projects, freelancing, and career growth.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-teal-500 text-[#061311] rounded-md font-bold hover:bg-teal-400 transition"
            >
              Join Us Now
            </Link>

            <button
              type="button"
              onClick={scrollToCategories}
              className={`w-11 h-11 rounded-full border flex items-center justify-center transition ${
                isDark
                  ? "border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-[#061311]"
                  : "border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
              }`}
              aria-label="Scroll to categories"
            >
              ▼
            </button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-5 max-w-md">
            <div>
              <h3 className="text-2xl font-bold">50+</h3>
              <p className={`text-xs ${muted}`}>Skill Courses</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">15+</h3>
              <p className={`text-xs ${muted}`}>Mentors</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">2400+</h3>
              <p className={`text-xs ${muted}`}>Students</p>
            </div>
          </div>
        </div>

        <div className="relative min-h-[430px] sm:min-h-[520px]">
          <div className="absolute right-10 top-8 w-56 sm:w-72 h-72 sm:h-96 rounded-xl border-2 border-teal-400 p-2 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80"
              alt="UI design wireframe"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="absolute right-0 top-0 w-28 sm:w-36 h-28 sm:h-36 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=500&q=80"
              alt="Creative design"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute right-0 top-44 sm:top-56 w-32 sm:w-44 h-32 sm:h-44 rounded-xl overflow-hidden border border-teal-500 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=500&q=80"
              alt="Product design"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute left-8 sm:left-16 bottom-16 w-28 sm:w-36 h-28 sm:h-36 rounded-xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=500&q=80"
              alt="Graphic design"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute left-0 top-48 sm:top-60 bg-teal-500 text-[#061311] rounded-xl p-4 shadow-xl">
            <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-xl mb-3">
              🎨
            </div>
            <h3 className="font-bold text-sm">Top Rated</h3>
            <p className="text-xs">Design Courses</p>
          </div>

          <div className="absolute right-16 bottom-8 hidden sm:block w-28 h-28 border-4 border-white/50 rounded-md" />

          <div className="absolute left-1/2 top-16 hidden sm:grid grid-cols-3 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            ))}
          </div>
        </div>
      </div>

      <div className={`absolute left-0 right-0 bottom-0 h-24 rounded-t-[100%] ${isDark ? "bg-[#08251f]" : "bg-[#dcefe7]"}`} />
    </section>
  );
}

export default Hero;