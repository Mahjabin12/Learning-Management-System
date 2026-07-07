import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function getSavedTheme() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark";
}

function About() {
  const [theme, setTheme] = useState(getSavedTheme);
  const [isVisible, setIsVisible] = useState(false);

  const sectionRef = useRef(null);
  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getSavedTheme());
    };

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -5% 0px",
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  const mutedText = isDark ? "text-slate-400" : "text-slate-600";
  const softText = isDark ? "text-white/45" : "text-[#10241E]/45";

  const cardBase =
    "relative overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-700 hover:-translate-y-1.5 hover:shadow-[0_18px_45px_rgba(45,212,191,0.18)]";

  const cardTheme = isDark
    ? "border-white/10 bg-white/[0.055]"
    : "border-emerald-900/10 bg-white/75 shadow-sm";

  const iconBox = isDark
    ? "border-white/10 bg-white/10 text-white"
    : "border-emerald-900/10 bg-white text-[#10241E] shadow-sm";

  const pillTheme = isDark
    ? "border-white/10 bg-white/10 text-slate-200"
    : "border-emerald-900/10 bg-white/80 text-[#10241E] shadow-sm";

  const titleColor = isDark ? "text-white" : "text-[#10241E]";

  return (
    <section
      ref={sectionRef}
      className={`relative -mt-[2px] overflow-hidden py-16 sm:py-20 lg:py-24 ${
        isDark
          ? "bg-[#041B16] text-white"
          : "bg-[#EAF7F0] text-[#10241E]"
      }`}
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`absolute right-[6%] top-[8%] h-52 w-52 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/10" : "bg-teal-400/14"
          }`}
        />

        <div
          className={`absolute bottom-[8%] left-[5%] h-56 w-56 rounded-full blur-3xl ${
            isDark ? "bg-emerald-400/8" : "bg-emerald-300/16"
          }`}
        />

        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-[linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px)]"
              : "bg-[linear-gradient(90deg,rgba(6,95,70,0.025)_1px,transparent_1px),linear-gradient(rgba(6,95,70,0.025)_1px,transparent_1px)]"
          } bg-[size:72px_72px] opacity-40`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div
          className={`mb-7 flex flex-col gap-3 transition-all duration-700 sm:flex-row sm:items-center sm:justify-between ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "-translate-y-8 opacity-0"
          }`}
        >
          <p className="w-fit rounded-full border border-teal-400/40 px-4 py-2 text-xs font-black tracking-[0.2em] text-teal-400">
            ABOUT US
          </p>

          <p className="text-lg font-black tracking-tight">
            Skillora<span className="text-teal-400">.</span>
          </p>
        </div>

        {/* Main statement */}
        <div
          className={`mb-9 max-w-5xl transition-all delay-100 duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-8 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-black leading-tight sm:text-3xl lg:text-[38px]">
            <span className={titleColor}>
              We help learners turn ideas{" "}
            </span>

            <span className="mx-1 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-300 to-emerald-500 align-middle text-base text-[#061311] shadow-[0_12px_28px_rgba(45,212,191,0.25)]">
              ✦
            </span>

            <span className="text-teal-400">
              into confident design skills
            </span>

            <span className={softText}>
              {" "}
              through practical lessons, AI-supported workflows, and
              portfolio-focused learning.
            </span>
          </h2>

          <p
            className={`mt-5 max-w-3xl text-sm leading-7 sm:text-base ${mutedText}`}
          >
            Skillora is built for students, creators, and future freelancers who
            want to grow from basic tool practice to real design execution in
            Figma, Canva, Adobe tools, UI/UX, branding, web design, and digital
            marketing.
          </p>
        </div>

        {/* Bento cards */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Our motive */}
          <div
            className={`${cardBase} ${cardTheme} min-h-[160px] p-5 lg:col-span-4 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "140ms" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(244,114,182,0.20),transparent_48%)]" />

            <div className="relative">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${iconBox}`}
              >
                🎯
              </div>

              <h3 className="mt-4 text-lg font-black">Our Motive</h3>

              <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                We make design education simple, practical, and career-useful
                so learners can create real work, not only collect notes.
              </p>
            </div>
          </div>

          {/* Growth process */}
          <div
            className={`${cardBase} ${cardTheme} min-h-[160px] p-5 lg:col-span-5 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "-translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "240ms" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_50%)]" />

            <div className="relative flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${iconBox}`}
                >
                  🚀
                </div>

                <h3 className="mt-4 text-lg font-black">
                  How Design Growth Happens
                </h3>

                <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                  Learners follow a clear path: understand the tool, practice
                  with guided tasks, then improve through real projects.
                </p>
              </div>

              <div className="flex shrink-0 gap-2 md:w-[78px] md:flex-col">
                {["Learn", "Create", "Grow"].map((item, index) => (
                  <div
                    key={item}
                    className={`flex-1 rounded-lg border px-2 py-2 text-center ${pillTheme}`}
                  >
                    <p className="text-[9px] font-black leading-none text-teal-400">
                      0{index + 1}
                    </p>

                    <p className="mt-1 text-[10px] font-black leading-none">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI */}
          <div
            className={`${cardBase} ${cardTheme} min-h-[160px] p-5 lg:col-span-3 ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-12 opacity-0"
            }`}
            style={{ transitionDelay: "340ms" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.22),transparent_48%)]" />

            <div className="relative">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl border text-lg ${iconBox}`}
              >
                🤖
              </div>

              <h3 className="mt-4 text-lg font-black">Design + AI</h3>

              <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                We use AI to support ideas, content planning, visual direction,
                faster workflows, and smarter design decisions.
              </p>
            </div>
          </div>

          {/* How we work */}
          <div
            className={`${cardBase} ${cardTheme} min-h-[150px] p-5 lg:col-span-5 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "440ms" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.18),transparent_48%)]" />

            <div className="relative">
              <h3 className="text-lg font-black">How We Work</h3>

              <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                Skillora combines structured lessons, clean dashboards,
                progress tracking, and role-based learning for students and
                instructors.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Roadmap", "Practice", "Progress", "Certificate"].map(
                  (item) => (
                    <span
                      key={item}
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold ${pillTheme}`}
                    >
                      {item}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Course count */}
          <div
            className={`${cardBase} ${cardTheme} min-h-[150px] p-5 lg:col-span-3 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            style={{ transitionDelay: "540ms" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(96,165,250,0.18),transparent_52%)]" />

            <div className="relative">
              <h3 className="text-3xl font-black tracking-tight">50+</h3>

              <h4 className="mt-3 text-base font-black">
                Practical Courses
              </h4>

              <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                Design tools, UI/UX, branding, web design, product design, and
                marketing skills in one learning platform.
              </p>
            </div>
          </div>

          {/* Portfolio CTA */}
          <div
            className={`${cardBase} ${cardTheme} min-h-[150px] p-5 lg:col-span-4 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
            style={{ transitionDelay: "640ms" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_52%)]" />

            <div className="relative">
              <h3 className="text-lg font-black">
                Portfolio-Ready Confidence
              </h3>

              <p className={`mt-2 text-sm leading-6 ${mutedText}`}>
                Our goal is to help learners build visible work, understand
                design logic, and feel ready for freelancing, projects, and
                career growth.
              </p>

              <Link
                to="/about"
                className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-2.5 text-sm font-black text-[#061311] transition-all duration-300 hover:-translate-y-1 hover:bg-teal-300 hover:shadow-[0_14px_35px_rgba(45,212,191,0.25)]"
              >
                Explore Skillora

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;