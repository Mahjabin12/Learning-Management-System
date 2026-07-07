import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
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

  const footerBg = isDark
    ? "bg-[radial-gradient(circle_at_18%_25%,rgba(45,212,191,0.16),transparent_36%),radial-gradient(circle_at_72%_40%,rgba(20,184,166,0.12),transparent_40%),linear-gradient(120deg,#070B0C_0%,#0A1212_48%,#050807_100%)] text-white"
    : "bg-[radial-gradient(circle_at_18%_30%,rgba(74,222,128,0.30),transparent_36%),radial-gradient(circle_at_72%_55%,rgba(187,247,208,0.45),transparent_34%),radial-gradient(circle_at_90%_15%,rgba(255,255,255,0.95),transparent_28%),linear-gradient(120deg,#FFFFFF_0%,#F0FDF4_45%,#DCFCE7_100%)] text-[#0B1F12]";

  const mutedText = isDark ? "text-slate-400" : "text-[#0B1F12]/65";

  const getCellClass = (index) => {
    // deterministic pseudo-random pattern of bright / mid / dark cells
    const v = (index * 37 + 11) % 10;

    if (isDark) {
      if (v < 3) return "border-teal-400/15 bg-gradient-to-br from-teal-500/15 via-[#0F1C1B]/60 to-black/60"; // teal accent card
      if (v < 7) return "border-white/5 bg-[#101413]/80"; // dark charcoal card
      return "border-white/5 bg-gradient-to-br from-[#0E1716]/70 to-black/50"; // deep charcoal-green
    } else {
      if (v < 3) return "border-white bg-white shadow-[0_8px_24px_rgba(34,197,94,0.12)]"; // bright white
      if (v < 7) return "border-emerald-200/70 bg-gradient-to-br from-emerald-200/70 via-emerald-100/60 to-white/40"; // light green
      return "border-emerald-300/60 bg-emerald-300/40"; // brighter green-ish mid
    }
  };

  const socialClass = isDark
    ? "bg-white/10 text-white hover:bg-teal-400 hover:text-[#070B0C]"
    : "bg-white text-emerald-600 shadow-[0_6px_18px_rgba(34,197,94,0.20)] hover:bg-emerald-500 hover:text-white";

  const linkClass = isDark
    ? "text-white/55 hover:text-teal-300"
    : "text-[#0B1F12]/70 hover:text-emerald-600";

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.25h4V23h-4V8.25zM8.5 8.25h3.83v2.01h.05c.53-1 1.84-2.06 3.79-2.06 4.06 0 4.81 2.67 4.81 6.14V23h-4v-6.84c0-1.63-.03-3.73-2.27-3.73-2.27 0-2.62 1.78-2.62 3.61V23h-4V8.25z" />
        </svg>
      ),
    },
    {
      name: "Twitter / X",
      href: "https://twitter.com",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M18.9 2H22l-7.6 8.7L23.5 22h-7l-5.5-7-6.3 7H1.5l8.1-9.3L0.5 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L6.4 4H4.6l13.1 16z" />
        </svg>
      ),
    },
    {
      name: "Telegram",
      href: "https://t.me",
      icon: (
        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
          <path d="M21.9 3.3 2.7 10.9c-1.2.5-1.2 1.2-.2 1.5l4.9 1.5 1.9 5.8c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8L23.9 4.6c.3-1.2-.4-1.7-1.9-1.3zM8.6 14.4 18 8.2c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.1-1.4-3.9z" />
        </svg>
      ),
    },
  ];

  return (
    <footer className={`relative overflow-hidden ${footerBg}`}>
      <style>
        {`
          @keyframes footerSoftFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }

          .footer-float {
            animation: footerSoftFloat 5s ease-in-out infinite;
          }
        `}
      </style>

      {/* Background serial grid of gradient hover cards */}
      <div className="absolute inset-0 pointer-events-auto overflow-hidden">
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 h-full w-full">
          {Array.from({ length: 48 }).map((_, index) => {
            const col = index % 8;
            const row = Math.floor(index / 8);
            const isContentZone = row >= 1 && row <= 3 && col >= 2 && col <= 5;

            return (
              <div
                key={index}
                className={`relative rounded-3xl border backdrop-blur-md transition-all duration-300 ease-out ${getCellClass(
                  index
                )} ${isContentZone ? "" : "group hover:z-10 hover:scale-110"}`}
                style={{ aspectRatio: "1 / 1" }}
              >
                <span
                  className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                    isDark
                      ? "bg-gradient-to-br from-teal-400/35 via-emerald-500/20 to-transparent"
                      : "bg-gradient-to-br from-emerald-400/40 via-green-200/40 to-transparent"
                  }`}
                />
                <span
                  className={`pointer-events-none absolute inset-0 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100 ${
                    isDark ? "shadow-[0_0_35px_rgba(45,212,191,0.45)]" : "shadow-[0_0_35px_rgba(34,197,94,0.4)]"
                  }`}
                />
              </div>
            );
          })}
        </div>

        <div
          className={`absolute left-[-10%] bottom-[-18%] h-80 w-80 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/10" : "bg-green-300/35"
          }`}
        />

        <div
          className={`absolute right-[-8%] top-[-18%] h-80 w-80 rounded-full blur-3xl ${
            isDark ? "bg-emerald-500/10" : "bg-emerald-200/35"
          }`}
        />

        {/* fade so footer content stays readable on top */}
        <div
          className={`absolute inset-0 ${
            isDark
              ? "bg-gradient-to-b from-[#070B0C]/35 via-[#0A1212]/50 to-[#050807]/70"
              : "bg-gradient-to-b from-white/30 via-[#F0FDF4]/45 to-[#DCFCE7]/65"
          }`}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-6">
        <div className="relative z-10 text-center">
          {/* Logo badge */}
          <Link
            to="/"
            className="footer-float mx-auto flex w-fit flex-col items-center gap-4 transition-transform duration-300 hover:scale-105"
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-300 to-emerald-600 flex items-center justify-center text-[#070B0C] text-3xl font-black shadow-[0_18px_45px_rgba(45,212,191,0.30)]">
              S
            </div>
          </Link>

          {/* Tagline */}
          <p className={`mt-5 mx-auto max-w-md text-sm sm:text-base leading-7 ${mutedText}`}>
            Design-focused learning for Figma, Canva, Adobe tools, UI/UX,
            branding, web &amp; digital marketing.
          </p>

          {/* Contact info */}
          <div className="mt-4 flex flex-col items-center gap-1 text-sm font-medium">
            <p className={mutedText}>support@skillora.com</p>
            <p className={mutedText}>+880 1234 567890</p>
          </div>

          {/* Social icons */}
          <div className="mt-6 flex items-center justify-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className={`h-9 w-9 rounded-full flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${socialClass}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Giant watermark text */}
        <div className="pointer-events-none select-none -mt-2 text-center leading-none">
          <h2
            className={`text-[74px] sm:text-[130px] md:text-[170px] lg:text-[220px] font-black tracking-[-0.08em] ${
              isDark ? "text-white/[0.05]" : "text-white/70"
            }`}
          >
            SKILLORA
          </h2>
        </div>

        {/* Bottom bar */}
        <div
          className={`relative z-10 -mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-medium ${
            isDark ? "text-white/50" : "text-[#0B1F12]/70"
          }`}
        >
          <p>
            © 2026 <span className="font-black">SKILLORA</span>. All rights
            reserved.
          </p>

          <div className="flex items-center gap-4">
            <Link to="/terms" className={`transition duration-300 ${linkClass}`}>
              Terms of Service
            </Link>

            <span className={isDark ? "text-white/20" : "text-[#0B1F12]/25"}>
              |
            </span>

            <Link
              to="/privacy"
              className={`transition duration-300 ${linkClass}`}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;