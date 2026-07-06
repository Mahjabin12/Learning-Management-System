import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const instructors = [
  {
    id: 1,
    name: "Danny Morison",
    role: "Web Design Mentor",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 2,
    name: "Haley Richard",
    role: "Graphic Design Mentor",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Lincoln Costa",
    role: "Marketing Mentor",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Kate Winslate",
    role: "Product Design Mentor",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
  },
];

const socials = [
  {
    label: "f",
    name: "Facebook",
    href: "https://facebook.com",
  },
  {
    label: "dr",
    name: "Dribbble",
    href: "https://dribbble.com",
  },
  {
    label: "ig",
    name: "Instagram",
    href: "https://instagram.com",
  },
  {
    label: "in",
    name: "LinkedIn",
    href: "https://linkedin.com",
  },
];

function TopInstructors() {
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
      { threshold: 0.16 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  const sectionBg = isDark
    ? "bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.16),transparent_34%),linear-gradient(120deg,#061311_0%,#071813_48%,#020807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(45,212,191,0.18),transparent_34%),linear-gradient(120deg,#F6F9F8_0%,#EAF7F0_48%,#DDF1E8_100%)] text-[#10241E]";

  const mutedText = isDark ? "text-slate-400" : "text-slate-600";

  const cardShell = isDark
    ? "border-white/10 bg-white/[0.055] text-white"
    : "border-emerald-900/10 bg-white/80 text-[#10241E] shadow-sm";

  const cardInnerGlow = isDark
    ? "bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.20),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(45,212,191,0.10),transparent_42%)]"
    : "bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.18),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(20,184,166,0.12),transparent_42%)]";

  const socialClass = isDark
    ? "bg-white/90 text-[#061311] hover:bg-teal-300"
    : "bg-[#10241E] text-white hover:bg-teal-400 hover:text-[#061311]";

  const cardPositions = [
    "lg:-translate-y-8",
    "lg:-translate-y-14",
    "lg:translate-y-8",
    "lg:translate-y-0",
  ];

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${sectionBg} py-16 sm:py-20 lg:py-24`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute left-[6%] top-[18%] h-56 w-56 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/10" : "bg-teal-400/13"
          }`}
        />

        <div
          className={`absolute right-[8%] bottom-[12%] h-64 w-64 rounded-full blur-3xl ${
            isDark ? "bg-emerald-400/8" : "bg-emerald-300/14"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        <div
          className={`relative min-h-[560px] sm:min-h-[600px] lg:min-h-[520px] transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
        >
          <div className="absolute left-0 top-20 hidden sm:block text-teal-400/70">
            <div className="relative w-20 h-20">
              <span className="absolute left-4 top-4 text-4xl">✧</span>
              <span className="absolute right-2 bottom-2 text-3xl">✧</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[520px] mx-auto lg:mx-0 lg:ml-16">
            {instructors.map((instructor, index) => (
              <div
                key={instructor.id}
                style={{
                  transitionDelay: isVisible ? `${index * 120}ms` : "0ms",
                }}
                className={`group relative rounded-[24px] p-[1px] bg-gradient-to-br from-teal-300/40 via-white/10 to-emerald-500/20 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(45,212,191,0.24)] ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                } ${cardPositions[index]}`}
              >
                <div
                  className={`relative overflow-hidden rounded-[23px] border p-5 text-center backdrop-blur-xl ${cardShell}`}
                >
                  <div
                    className={`absolute inset-0 opacity-80 transition duration-500 group-hover:opacity-100 ${cardInnerGlow}`}
                  />

                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-teal-300 via-emerald-400 to-transparent opacity-70" />

                  <div className="relative mx-auto w-24 h-24 rounded-full p-[3px] bg-gradient-to-br from-teal-300 to-emerald-500 shadow-[0_12px_30px_rgba(45,212,191,0.18)]">
                    <img
                      src={instructor.img}
                      alt={instructor.name}
                      className="w-full h-full rounded-full object-cover border-4 border-[#10241E]/20"
                    />
                  </div>

                  <h3 className="relative mt-4 text-sm sm:text-base font-black">
                    {instructor.name}
                  </h3>

                  <p className={`relative mt-1 text-xs ${mutedText}`}>
                    {instructor.role}
                  </p>

                  <div className="relative mt-4 flex justify-center gap-2">
                    {socials.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={social.name}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black uppercase transition-all duration-300 hover:-translate-y-1 ${socialClass}`}
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-teal-400 text-[#061311] px-5 py-5 text-center shadow-[0_20px_50px_rgba(45,212,191,0.28)] transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-white flex items-center justify-center text-2xl">
              ✽
            </div>

            <h4 className="text-sm font-black leading-tight">
              Top Instructors
            </h4>
            <p className="text-xs font-semibold mt-1 text-[#061311]/75">
              In List
            </p>
          </div>
        </div>

        <div
          className={`relative text-center lg:text-left transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
        >
          <p className="text-teal-400 text-sm font-black">Let&apos;s meet</p>

          <div className="mt-3 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-7">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                Our Top <span className="text-teal-400">Instructors</span>
              </h2>

              <div className="mx-auto lg:mx-0 mt-3 h-[3px] w-24 rounded-full bg-teal-400" />
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-3 shrink-0">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index % 3 === 0 ? "bg-teal-400" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>

          <p
            className={`mt-6 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-7 ${mutedText}`}
          >
            Learn from mentors who understand design tools, creative workflows,
            branding, UI/UX, web design, and digital marketing from real project
            experience.
          </p>

          <p
            className={`mt-4 max-w-xl mx-auto lg:mx-0 text-sm sm:text-base leading-7 ${mutedText}`}
          >
            Skillora instructors guide learners with practical lessons,
            portfolio-focused tasks, and clear feedback so every student can
            grow with confidence.
          </p>

          <Link
            to="/instructors"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-400 px-6 py-3 text-sm font-black text-[#061311] transition-all duration-300 hover:-translate-y-1 hover:bg-teal-300 hover:shadow-[0_18px_40px_rgba(45,212,191,0.30)]"
          >
            See All Mentor List
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default TopInstructors;