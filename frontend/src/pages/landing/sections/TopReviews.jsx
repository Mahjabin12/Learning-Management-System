import { useEffect, useRef, useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Lincoln D. Costa",
    role: "Web Design Learner",
    text: "Skillora made design learning simple and practical. I can now build real design projects with more confidence.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 2,
    name: "Atika Rahman",
    role: "UI/UX Student",
    text: "The roadmap is clear and motivating. Figma and UI lessons helped me understand real design workflow.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 3,
    name: "Misel Coren",
    role: "Graphic Design Learner",
    text: "Canva and branding lessons helped me create better social posts, brand kits, and visual content faster.",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 4,
    name: "Axel Coley",
    role: "Digital Marketing Learner",
    text: "I learned how design and marketing work together. The lessons feel useful for freelancing and real projects.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 5,
    name: "Nadia Islam",
    role: "Product Design Student",
    text: "The learning experience is clean and focused. Progress tracking keeps me motivated to complete courses.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
  },
  {
    id: 6,
    name: "Rafi Ahmed",
    role: "Adobe Tools Learner",
    text: "The examples are beginner friendly and realistic. I finally understand how to use creative tools properly.",
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80",
  },
];

function TopReviews() {
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
    ? "bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.14),transparent_34%),linear-gradient(120deg,#061311_0%,#071813_48%,#020807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.18),transparent_32%),radial-gradient(circle_at_85%_35%,rgba(45,212,191,0.18),transparent_34%),linear-gradient(120deg,#F6F9F8_0%,#EAF7F0_48%,#DDF1E8_100%)] text-[#10241E]";

  const mutedText = isDark ? "text-slate-400" : "text-slate-600";

  const cardGradients = isDark
    ? [
        "bg-[linear-gradient(135deg,rgba(45,212,191,0.20)_0%,rgba(168,85,247,0.14)_55%,rgba(255,255,255,0.05)_100%)]",
        "bg-[linear-gradient(135deg,rgba(250,204,21,0.18)_0%,rgba(45,212,191,0.14)_58%,rgba(255,255,255,0.05)_100%)]",
        "bg-[linear-gradient(135deg,rgba(34,197,94,0.18)_0%,rgba(45,212,191,0.16)_55%,rgba(255,255,255,0.05)_100%)]",
        "bg-[linear-gradient(135deg,rgba(244,114,182,0.16)_0%,rgba(45,212,191,0.14)_58%,rgba(255,255,255,0.05)_100%)]",
      ]
    : [
        "bg-[linear-gradient(135deg,#F1E9FF_0%,#EDE7FF_45%,#FFFFFF_100%)]",
        "bg-[linear-gradient(135deg,#FFF8B8_0%,#FFF7CF_45%,#FFFFFF_100%)]",
        "bg-[linear-gradient(135deg,#DFFFF0_0%,#E8FFE9_45%,#FFFFFF_100%)]",
        "bg-[linear-gradient(135deg,#EAF0FF_0%,#F1E9FF_45%,#FFFFFF_100%)]",
      ];

  const ReviewCard = ({ item, index }) => (
    <div
      className={`group relative w-[96vw] sm:w-[700px] lg:w-[400px] rounded-2xl border px-5 py-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_55px_rgba(45,212,191,0.22)] ${
        isDark
          ? "border-white/10 text-white"
          : "border-slate-200 text-[#10241E] shadow-sm"
      } ${cardGradients[index % cardGradients.length]}`}
    >
      <div className="absolute right-5 top-4 text-2xl opacity-50">❞</div>

      <div className="relative flex items-start gap-4">
        <img
          src={item.img}
          alt={item.name}
          className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white/70"
        />

        <div className="min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <h3 className="text-sm font-black">{item.name}</h3>

            <span
              className={`hidden sm:block h-1 w-1 rounded-full ${
                isDark ? "bg-slate-500" : "bg-slate-400"
              }`}
            />

            <p
              className={`text-xs font-bold ${
                isDark ? "text-teal-300" : "text-teal-700"
              }`}
            >
              {item.role}
            </p>
          </div>

          <p
            className={`mt-3 max-w-[470px] text-sm leading-6 ${
              isDark ? "text-slate-300" : "text-slate-700"
            }`}
          >
            {item.text}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${sectionBg} py-14 sm:py-16 lg:py-20`}
    >
      <style>
        {`
          @keyframes skilloraMarqueeLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          @keyframes skilloraMarqueeRight {
            from { transform: translateX(-50%); }
            to { transform: translateX(0); }
          }

          .skillora-marquee-left {
            animation: skilloraMarqueeLeft 58s linear infinite;
          }

          .skillora-marquee-right {
            animation: skilloraMarqueeRight 66s linear infinite;
          }

          .skillora-marquee:hover .skillora-marquee-left,
          .skillora-marquee:hover .skillora-marquee-right {
            animation-play-state: paused;
          }
        `}
      </style>

      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute left-[12%] top-[20%] h-48 w-48 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/10" : "bg-teal-400/12"
          }`}
        />
        <div
          className={`absolute right-[10%] bottom-[14%] h-56 w-56 rounded-full blur-3xl ${
            isDark ? "bg-emerald-400/8" : "bg-emerald-300/14"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div
          className={`relative mx-auto max-w-3xl text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"
          }`}
        >
          <p className="inline-flex items-center gap-2 text-teal-400 font-black text-sm">
            <span className="w-10 h-[2px] rounded-full bg-teal-400" />
            Testimonials
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
            What Our Students Say{" "}
            <span className="text-teal-400">About Us</span>
          </h2>

          <p className={`mt-4 text-sm sm:text-base leading-7 ${mutedText}`}>
            Real learners, real progress. See how Skillora helps students build
            confidence in design, creativity, tools, and career-focused skills.
          </p>

          <svg
            className={`hidden sm:block absolute right-0 top-0 w-20 h-20 ${
              isDark ? "text-white/35" : "text-[#10241E]/35"
            }`}
            viewBox="0 0 120 120"
            fill="none"
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
            <path
              d="M94 42C80 58 64 69 44 76"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.7"
            />
          </svg>
        </div>
      </div>

      <div
        className={`skillora-marquee relative mt-10 sm:mt-12 transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {isDark && (
          <>
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#061311] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#061311] to-transparent" />
          </>
        )}

        <div className="overflow-hidden">
          <div className="skillora-marquee-left flex w-max gap-5 px-5">
            {[...testimonials, ...testimonials].map((item, index) => (
              <ReviewCard
                key={`top-${item.id}-${index}`}
                item={item}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="mt-5 overflow-hidden">
          <div className="skillora-marquee-right flex w-max gap-5 px-5">
            {[
              ...testimonials.slice().reverse(),
              ...testimonials.slice().reverse(),
            ].map((item, index) => (
              <ReviewCard
                key={`bottom-${item.id}-${index}`}
                item={item}
                index={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopReviews;