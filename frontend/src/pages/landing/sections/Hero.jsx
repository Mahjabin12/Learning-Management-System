import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

function Hero() {
  const { user, isLoggedIn } = useAuth();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [joinOpen, setJoinOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const isDark = theme === "dark";

  const isInstructor =
    user?.role === "instructor" ||
    user?.roles?.includes?.("instructor");

  const learningLink = isLoggedIn
  ? "/courses"
  : "/login";

  const teachingLink = !isLoggedIn
    ? "/login"
    : isInstructor
    ? "/instructor/dashboard"
    : "/become-instructor";

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
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = joinOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [joinOpen]);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const sectionBg = isDark
    ? "bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.26),transparent_32%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.20),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_34%),linear-gradient(120deg,#061311_0%,#071813_48%,#020807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.22),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(45,212,191,0.20),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_36%),linear-gradient(120deg,#F6F9F8_0%,#EAF7F0_48%,#DDF1E8_100%)] text-[#10241E]";

  const curveColor = isDark
    ? "bg-[#08251f]"
    : "bg-[radial-gradient(circle_at_center,rgba(20,184,166,0.10),transparent_42%),linear-gradient(120deg,#F6F9F8_0%,#EAF7F0_48%,#DDF1E8_100%)]";

  const accent = isDark ? "text-teal-400" : "text-teal-600";
  const muted = isDark ? "text-slate-400" : "text-slate-600";

  const statCard = isDark
    ? "bg-white/[0.055] border-white/10 text-white backdrop-blur-xl"
    : "bg-white/80 border-emerald-900/10 text-[#10241E] shadow-sm backdrop-blur-xl";

  return (
    <section className={`relative overflow-hidden ${sectionBg}`}>
      {/* blurred background image collage */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute inset-0 ${
            isDark ? "bg-[#061311]/45" : "bg-[#F6F9F8]/35"
          } z-10`}
        />

        <div
          className={`absolute left-1/2 top-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/14" : "bg-teal-400/12"
          }`}
        />

        <div className="absolute right-[-60px] top-20 hidden sm:block w-[360px] h-[420px] rounded-[32px] overflow-hidden opacity-25 blur-[2px] rotate-6">
          <img
            src="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=900&q=80"
            alt="UI design wireframe"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute left-[-70px] top-24 hidden md:block w-[300px] h-[260px] rounded-[32px] overflow-hidden opacity-20 blur-[2px] -rotate-6">
          <img
            src="https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=700&q=80"
            alt="Graphic design interface"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute right-[15%] bottom-16 hidden lg:block w-[260px] h-[180px] rounded-[28px] overflow-hidden opacity-20 blur-[2px] -rotate-3">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=700&q=80"
            alt="Digital design dashboard"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute left-[18%] bottom-20 hidden lg:block w-[210px] h-[160px] rounded-[26px] overflow-hidden opacity-20 blur-[2px] rotate-3">
          <img
            src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=700&q=80"
            alt="Branding and creative tools"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-20 sm:pb-24 lg:pb-28">
        <div className="max-w-4xl mx-auto text-center">
          <p className={`font-bold text-sm mb-4 sm:mb-5 ${accent}`}>
            Design. Build. Grow.
          </p>

          <h1 className="text-[36px] sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] max-w-4xl mx-auto">
            Master Creative{" "}
            <span className={accent}>Design Skills</span> & Build Your
            Digital Career
          </h1>

          <p
            className={`mt-5 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base leading-7 ${muted}`}
          >
            Learn Figma, Canva, Adobe tools, web design, logo design, product
            design, and digital marketing with portfolio-ready projects for
            freelancing, branding, and career growth.
          </p>

          <div className="mt-8 flex flex-col items-center">
            <button
              type="button"
              onClick={() => setJoinOpen(true)}
              className="group relative inline-flex rounded-2xl p-[2px] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(45,212,191,0.35)]"
            >
              <span className="absolute inset-[-180%] bg-[conic-gradient(from_90deg,transparent_0deg,#2DD4BF_80deg,#A7F3D0_140deg,transparent_210deg,#14B8A6_290deg,transparent_360deg)] opacity-80 group-hover:opacity-100 group-hover:animate-spin" />

              <span className="relative inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-[14px] bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-500 text-[#061311] font-black transition duration-300 group-hover:from-white group-hover:via-teal-200 group-hover:to-teal-400">
                Unlock Your Creative Future

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </button>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-3">
              <div
                className={`relative rounded-xl px-5 py-3 border font-mono text-xl sm:text-2xl font-black tracking-wider ${
                  isDark
                    ? "bg-black/55 border-red-500/40 text-red-400 shadow-[0_0_28px_rgba(248,113,113,0.20)]"
                    : "bg-[#1b0b0b] border-red-400/50 text-red-400 shadow-[0_12px_35px_rgba(248,113,113,0.18)]"
                }`}
              >
                <span className="absolute inset-0 rounded-xl bg-red-500/5 animate-pulse" />

                <span className="relative">{formattedTime}</span>
              </div>

              <div className="animate-bounce rounded-full bg-red-500 text-white px-4 py-2 text-xs font-black shadow-[0_12px_25px_rgba(239,68,68,0.25)]">
                Time is flying — start today
              </div>
            </div>
          </div>

          <div className="mt-9 sm:mt-10 grid grid-cols-3 gap-3 sm:gap-5 max-w-md mx-auto">
            <div className={`rounded-2xl p-3 sm:p-5 border ${statCard}`}>
              <h3 className="text-xl sm:text-2xl font-black">50+</h3>

              <p className={`text-[11px] sm:text-xs mt-1 ${muted}`}>
                Skill Courses
              </p>
            </div>

            <div className={`rounded-2xl p-3 sm:p-5 border ${statCard}`}>
              <h3 className="text-xl sm:text-2xl font-black">15+</h3>

              <p className={`text-[11px] sm:text-xs mt-1 ${muted}`}>
                Mentors
              </p>
            </div>

            <div className={`rounded-2xl p-3 sm:p-5 border ${statCard}`}>
              <h3 className="text-xl sm:text-2xl font-black">2400+</h3>

              <p className={`text-[11px] sm:text-xs mt-1 ${muted}`}>
                Students
              </p>
            </div>
          </div>
        </div>
      </div>

      {joinOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-5">
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-md"
            onClick={() => setJoinOpen(false)}
          />

          <div
            className={`relative w-full max-w-md rounded-3xl border p-6 sm:p-8 shadow-2xl ${
              isDark
                ? "bg-[#0b1f1b] border-white/10 text-white"
                : "bg-white border-emerald-900/10 text-[#10241E]"
            }`}
          >
            <button
              type="button"
              onClick={() => setJoinOpen(false)}
              className={`absolute right-5 top-5 w-9 h-9 rounded-full flex items-center justify-center transition ${
                isDark
                  ? "bg-white/10 text-white hover:bg-teal-400 hover:text-[#061311]"
                  : "bg-slate-100 text-slate-700 hover:bg-teal-400 hover:text-[#061311]"
              }`}
              aria-label="Close join options"
            >
              ×
            </button>

            <p className="text-teal-400 text-sm font-bold tracking-wide">
              Join Skillora
            </p>

            <h2 className="text-2xl sm:text-3xl font-black mt-3">
              Choose how you want to start
            </h2>

            <p className={`mt-3 text-sm leading-6 ${muted}`}>
              Continue as a learner to build design skills, or join as an
              instructor to teach creative courses.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mt-7">
              <Link
  to={learningLink}
  state={
    !isLoggedIn
      ? {
          from: "/courses",
        }
      : undefined
  }
  onClick={() => setJoinOpen(false)}
  className="rounded-2xl bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-500 text-[#061311] p-5 font-black hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(45,212,191,0.28)] transition-all duration-300"
>
  <span className="block text-2xl mb-3">📚</span>

  Start Learning

  <span className="block text-xs font-semibold mt-2 text-[#061311]/70">
    Join as learner
  </span>
</Link>

              <Link
                to={teachingLink}
                state={
                  !isLoggedIn
                    ? {
                        from: "/become-instructor",
                      }
                    : undefined
                }
                onClick={() => setJoinOpen(false)}
                className={`rounded-2xl border p-5 font-black hover:-translate-y-1 transition-all duration-300 ${
                  isDark
                    ? "border-white/10 bg-white/[0.05] hover:border-teal-300 hover:bg-teal-400/10"
                    : "border-slate-200 bg-slate-50 hover:border-teal-400 hover:bg-teal-50"
                }`}
              >
                <span className="block text-2xl mb-3">🎓</span>

                Start Teaching

                <span className={`block text-xs font-semibold mt-2 ${muted}`}>
                  Join as instructor
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Hero;