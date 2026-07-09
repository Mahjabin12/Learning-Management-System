import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

const coreValues = [
  {
    number: "01",
    title: "Understand design",
    text: "Learn the principles behind typography, colour, layout, hierarchy and meaningful visual communication.",
  },
  {
    number: "02",
    title: "Create with purpose",
    text: "Apply each concept through guided projects that build confidence, consistency and practical ability.",
  },
  {
    number: "03",
    title: "Present professionally",
    text: "Learn how to organise, explain and showcase your work for clients, employers and digital audiences.",
  },
];

const journeySteps = [
  {
    number: "01",
    label: "Foundation",
    title: "Learn how design works",
    text: "Develop visual judgement by understanding the principles behind effective and intentional design.",
  },
  {
    number: "02",
    label: "Practice",
    title: "Build a reliable process",
    text: "Use structured exercises and real creative challenges to turn knowledge into practical capability.",
  },
  {
    number: "03",
    label: "Portfolio",
    title: "Create visible proof",
    text: "Transform your learning into polished work that clearly demonstrates your skills and thinking.",
  },
  {
    number: "04",
    label: "Digital presence",
    title: "Show your value confidently",
    text: "Present your work professionally and prepare for freelance, employment and creative opportunities.",
  },
];

function getSavedTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return localStorage.getItem("theme") || "dark";
}

function Reveal({
  children,
  className = "",
  delay = 0,
}) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-7 opacity-0"
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AboutUs() {
  const [theme, setTheme] = useState(
    getSavedTheme
  );

  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(getSavedTheme());
    };

    syncTheme();

    window.addEventListener(
      "themechange",
      syncTheme
    );

    window.addEventListener(
      "storage",
      syncTheme
    );

    return () => {
      window.removeEventListener(
        "themechange",
        syncTheme
      );

      window.removeEventListener(
        "storage",
        syncTheme
      );
    };
  }, []);

  const pageTheme = isDark
    ? "bg-[#020806] text-white"
    : "bg-[#f4faf7] text-[#061311]";

  const mutedText = isDark
    ? "text-slate-400"
    : "text-slate-600";

  const borderTheme = isDark
    ? "border-white/10"
    : "border-emerald-950/10";

  const cardTheme = isDark
    ? "border-white/10 bg-white/[0.035]"
    : "border-emerald-950/10 bg-white shadow-[0_16px_45px_rgba(6,78,59,0.06)]";

  const journeyTheme = isDark
    ? "border-teal-400/10 bg-[#030908]"
    : "border-emerald-950/10 bg-[#e5f5ed]";

  return (
    <main
      className={`min-h-screen overflow-hidden transition-colors duration-500 ${pageTheme}`}
    >
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pb-24 pt-10 sm:px-8 sm:pb-28 sm:pt-14 lg:pb-32">
        {/* Background glows */}
        <div
          className={`pointer-events-none absolute left-1/2 top-[-120px] h-[620px] w-[980px] -translate-x-1/2 rounded-full blur-[155px] ${
            isDark
              ? "bg-teal-400/17"
              : "bg-teal-400/19"
          }`}
        />

        <div
          className={`pointer-events-none absolute -left-40 top-36 h-80 w-80 rounded-full blur-[120px] ${
            isDark
              ? "bg-emerald-400/8"
              : "bg-emerald-400/12"
          }`}
        />

        <div
          className={`pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full blur-[135px] ${
            isDark
              ? "bg-teal-300/7"
              : "bg-teal-300/12"
          }`}
        />

        {/* Decorative lines */}
        <div className="pointer-events-none absolute inset-0 opacity-70">
          <div
            className={`absolute left-[-130px] top-36 h-[180px] w-[280px] rounded-full border ${
              isDark
                ? "border-teal-400/10"
                : "border-emerald-700/10"
            }`}
          />

          <div
            className={`absolute right-[-150px] top-24 h-[250px] w-[360px] rounded-full border ${
              isDark
                ? "border-teal-400/10"
                : "border-emerald-700/10"
            }`}
          />

          <div className="absolute left-1/2 top-[310px] h-px w-[84%] -translate-x-1/2 bg-gradient-to-r from-transparent via-teal-400/25 to-transparent" />
        </div>

        {/* Huge ABOUT US background text */}
        <div className="pointer-events-none absolute inset-x-0 top-14 flex justify-center overflow-hidden sm:top-8 lg:top-[-10px]">
          <h1
            className={`select-none whitespace-nowrap text-[105px] font-black uppercase leading-none tracking-[-0.075em] sm:text-[175px] lg:text-[270px] xl:text-[330px] ${
              isDark
                ? "text-white/[0.032]"
                : "text-emerald-950/[0.045]"
            }`}
          >
            About Us
          </h1>
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <Reveal>
            <div className="flex justify-center">
              <div
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-black uppercase tracking-[0.17em] ${
                  isDark
                    ? "border-white/10 bg-black/20 text-slate-300"
                    : "border-emerald-950/10 bg-white/85 text-slate-600 shadow-sm"
                }`}
              >
                <Link
                  to="/"
                  className="transition hover:text-teal-400"
                >
                  Home
                </Link>

                <span
                  className={
                    isDark
                      ? "text-slate-600"
                      : "text-slate-400"
                  }
                >
                  /
                </span>

                <span className="text-teal-400">
                  About Us
                </span>
              </div>
            </div>
          </Reveal>

          {/* Main hero content */}
          <div className="mx-auto mt-24 max-w-5xl text-center sm:mt-32 lg:mt-40">
            <Reveal delay={80}>
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-teal-400/50" />

                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-400 sm:text-[10px]">
                  Learn · Create · Present
                </p>

                <span className="h-px w-8 bg-teal-400/50" />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <h2 className="mx-auto mt-6 max-w-5xl text-[38px] font-black leading-[1.04] tracking-[-0.045em] sm:text-5xl lg:text-[70px]">
                Learn Today's Skills. Build Tomorrow's {" "}
                <span className="relative inline-block text-teal-400">
                  Career
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-transparent via-teal-400 to-transparent" />
                </span>
              </h2>
            </Reveal>

            <Reveal delay={220}>
              <p
                className={`mx-auto mt-7 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8 ${mutedText}`}
              >
                Skillora is a focused learning platform
                where people develop practical design
                skills, create meaningful work and learn
                how to present their abilities with
                confidence in the digital world.
              </p>
            </Reveal>

            {/* Hero capability strip */}
            <Reveal delay={290}>
              <div
                className={`mx-auto mt-12 grid max-w-4xl overflow-hidden rounded-[24px] border sm:grid-cols-3 ${
                  isDark
                    ? "border-white/10 bg-black/25"
                    : "border-emerald-950/10 bg-white/75 shadow-[0_20px_60px_rgba(6,78,59,0.07)]"
                }`}
              >
                <HeroCapability
                  title="Design fundamentals"
                  text="Understand why effective design works."
                  isDark={isDark}
                />

                <HeroCapability
                  title="Portfolio projects"
                  text="Turn lessons into visible proof of skill."
                  isDark={isDark}
                  middle
                />

                <HeroCapability
                  title="Digital visibility"
                  text="Present your work with professional clarity."
                  isDark={isDark}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PURPOSE SECTION */}
      <section className="px-5 py-16 sm:px-8 sm:py-20">
        <div
          className={`mx-auto max-w-7xl border-t pt-16 sm:pt-20 ${borderTheme}`}
        >
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-teal-400">
                  Our purpose
                </p>

                <h2 className="mt-5 max-w-xl text-3xl font-black leading-[1.08] tracking-[-0.035em] sm:text-4xl lg:text-[48px]">
            Design education should create more than
                  software knowledge.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={110}>
              <div className="lg:pt-7">
                <p
                  className={`text-sm leading-7 sm:text-[15px] sm:leading-8 ${mutedText}`}
                >
                  Skillora is built for learners who want
                  more than isolated tutorials. The
                  platform connects visual thinking,
                  practical execution and professional
                  presentation in one structured learning
                  experience.
                </p>

                <p
                  className={`mt-5 text-sm leading-7 sm:text-[15px] sm:leading-8 ${mutedText}`}
                >
                  Learners understand the reasoning behind
                  design decisions, practise through
                  real-world projects and develop the
                  confidence to communicate their creative
                  value online.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Core values */}
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {coreValues.map((value, index) => (
              <Reveal
                key={value.number}
                delay={index * 100}
              >
                <article
                  className={`group h-full rounded-[24px] border p-5 transition-all duration-500 hover:-translate-y-1 hover:border-teal-400/35 sm:p-6 ${cardTheme}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black tracking-[0.2em] text-teal-400">
                      {value.number}
                    </span>

                    <span
                      className={`h-px w-10 transition-all duration-300 group-hover:w-16 ${
                        isDark
                          ? "bg-white/15"
                          : "bg-emerald-950/15"
                      }`}
                    />
                  </div>

                  <h3 className="mt-8 text-lg font-black sm:text-xl">
                    {value.title}
                  </h3>

                  <p
                    className={`mt-3 text-[12px] leading-6 sm:text-[13px] ${mutedText}`}
                  >
                    {value.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY SECTION */}
      <section className="px-5 pb-20 pt-6 sm:px-8 sm:pb-24">
        <Reveal>
          <div
            className={`relative mx-auto max-w-7xl overflow-hidden rounded-[34px] border px-5 py-14 sm:px-8 sm:py-16 lg:px-12 lg:py-20 ${journeyTheme}`}
          >
            <div className="pointer-events-none absolute left-1/2 top-8 h-[440px] w-[440px] -translate-x-1/2 rounded-full bg-teal-400/9 blur-[140px]" />

            <div className="relative mx-auto max-w-4xl text-center">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-teal-400">
                The Skillora journey
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black leading-[1.1] tracking-[-0.035em] sm:text-4xl lg:text-[50px]">
                From understanding design to building a
                professional digital presence.
              </h2>

              <p
                className={`mx-auto mt-5 max-w-2xl text-sm leading-7 ${mutedText}`}
              >
                Each stage builds on the previous one,
                helping learners move from knowledge to
                execution and from execution to visible
                opportunity.
              </p>
            </div>

            {/* Desktop process */}
            <div className="relative mt-16 hidden min-h-[650px] lg:block">
              <svg
                viewBox="0 0 1100 650"
                className="pointer-events-none absolute inset-0 h-full w-full"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="journeyLine"
                    x1="520"
                    y1="10"
                    x2="570"
                    y2="640"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop
                      stopColor="#2DD4BF"
                      stopOpacity="0.2"
                    />

                    <stop
                      offset="0.45"
                      stopColor="#A3E635"
                      stopOpacity="0.9"
                    />

                    <stop
                      offset="1"
                      stopColor="#2DD4BF"
                      stopOpacity="0.2"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M550 10
                     C550 95 760 50 755 145
                     C750 240 420 200 430 315
                     C438 410 760 370 744 470
                     C730 565 410 520 430 640"
                  stroke="url(#journeyLine)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <circle
                  cx="550"
                  cy="52"
                  r="5"
                  fill="#2DD4BF"
                />

                <circle
                  cx="755"
                  cy="145"
                  r="5"
                  fill="#A3E635"
                />

                <circle
                  cx="430"
                  cy="315"
                  r="5"
                  fill="#2DD4BF"
                />

                <circle
                  cx="744"
                  cy="470"
                  r="5"
                  fill="#A3E635"
                />
              </svg>

              <div className="absolute left-[7%] top-[1%] w-[310px]">
                <JourneyCard
                  step={journeySteps[0]}
                  isDark={isDark}
                />
              </div>

              <div className="absolute right-[5%] top-[22%] w-[320px]">
                <JourneyCard
                  step={journeySteps[1]}
                  isDark={isDark}
                  alignRight
                />
              </div>

              <div className="absolute left-[3%] top-[50%] w-[325px]">
                <JourneyCard
                  step={journeySteps[2]}
                  isDark={isDark}
                />
              </div>

              <div className="absolute bottom-[0%] right-[6%] w-[340px]">
                <JourneyCard
                  step={journeySteps[3]}
                  isDark={isDark}
                  alignRight
                />
              </div>

              <div className="absolute left-1/2 top-[43%] -translate-x-1/2">
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-teal-400/20 bg-teal-400/[0.035]">
                  <div className="absolute inset-3 animate-pulse rounded-full border border-lime-300/25" />

                  <span className="text-[9px] font-black uppercase tracking-[0.18em] text-teal-400">
                    Skillora
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile process */}
            <div className="relative mt-12 space-y-4 pl-7 lg:hidden">
              <div
                className={`absolute bottom-4 left-[9px] top-4 w-px ${
                  isDark
                    ? "bg-gradient-to-b from-teal-400 via-lime-300/70 to-teal-400/15"
                    : "bg-gradient-to-b from-emerald-500 via-lime-500 to-emerald-500/20"
                }`}
              />

              {journeySteps.map((step, index) => (
                <Reveal
                  key={step.number}
                  delay={index * 90}
                >
                  <div className="relative">
                    <span className="absolute -left-[27px] top-7 flex h-[19px] w-[19px] items-center justify-center rounded-full border border-teal-400/50 bg-teal-400/15">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    </span>

                    <JourneyCard
                      step={step}
                      isDark={isDark}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 pb-20 sm:px-8 sm:pb-24">
        <Reveal>
          <div
            className={`relative mx-auto max-w-7xl overflow-hidden rounded-[32px] border px-6 py-12 sm:px-10 sm:py-16 ${
              isDark
                ? "border-teal-400/15 bg-[#08201a]"
                : "border-emerald-950/10 bg-[#dff5eb]"
            }`}
          >
            <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-80 w-80 rounded-full bg-teal-400/16 blur-[100px]" />

            <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-teal-400">
                  Begin your creative journey
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl lg:text-[48px]">
                  Learn the skill. Build the work. Show the
                  world what you can do.
                </h2>

                <p
                  className={`mt-4 max-w-2xl text-sm leading-7 ${mutedText}`}
                >
                  Explore structured design courses or
                  contact the Skillora team for more
                  information about the platform.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Link
                  to="/courses"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-teal-400 px-6 text-[12px] font-black text-[#03110e] transition duration-300 hover:-translate-y-1 hover:bg-teal-300 hover:shadow-[0_16px_35px_rgba(45,212,191,0.22)]"
                >
                  Explore Courses
                  <ArrowIcon />
                </Link>

                <Link
                  to="/contact"
                  className={`inline-flex min-h-[46px] items-center justify-center rounded-full border px-6 text-[12px] font-black transition duration-300 hover:-translate-y-1 hover:border-teal-400 hover:text-teal-400 ${
                    isDark
                      ? "border-white/15 bg-white/[0.035] text-white"
                      : "border-emerald-950/15 bg-white text-[#061311]"
                  }`}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function HeroCapability({
  title,
  text,
  isDark,
  middle = false,
}) {
  return (
    <div
      className={`px-5 py-5 text-left sm:px-6 ${
        middle
          ? isDark
            ? "border-y border-white/10 sm:border-x sm:border-y-0"
            : "border-y border-emerald-950/10 sm:border-x sm:border-y-0"
          : ""
      }`}
    >
      <p className="text-[11px] font-black text-teal-400">
        {title}
      </p>

      <p
        className={`mt-1.5 text-[11px] leading-5 ${
          isDark
            ? "text-slate-500"
            : "text-slate-600"
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function JourneyCard({
  step,
  isDark,
  alignRight = false,
}) {
  return (
    <article
      className={`group rounded-[22px] border p-5 transition-all duration-500 hover:-translate-y-1 hover:border-teal-400/35 sm:p-6 ${
        isDark
          ? "border-white/10 bg-white/[0.035]"
          : "border-emerald-950/10 bg-white/80"
      } ${alignRight ? "lg:text-right" : ""}`}
    >
      <div
        className={`flex items-center gap-3 ${
          alignRight
            ? "lg:justify-end"
            : ""
        }`}
      >
        <span className="text-[9px] font-black tracking-[0.18em] text-lime-300">
          {step.number}
        </span>

        <span
          className={`h-px w-8 ${
            isDark
              ? "bg-white/15"
              : "bg-emerald-950/15"
          }`}
        />

        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-teal-400">
          {step.label}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-black sm:text-xl">
        {step.title}
      </h3>

      <p
        className={`mt-3 text-[12px] leading-6 ${
          isDark
            ? "text-slate-400"
            : "text-slate-600"
        }`}
      >
        {step.text}
      </p>
    </article>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export default AboutUs;