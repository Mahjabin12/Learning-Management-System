import { useEffect, useState } from "react";

const contactItems = [
  {
    type: "email",
    title: "Email us",
    text: "support@skillora.com",
    link: "mailto:support@skillora.com",
  },
  {
    type: "phone",
    title: "Call us",
    text: "+880 1234 567890",
    link: "tel:+8801234567890",
  },
  {
    type: "location",
    title: "Visit us",
    text: "Kumira, Sitakunda, Chattogram",
    link: "https://maps.google.com/?q=International+Islamic+University+Chittagong",
  },
];

const socialLinks = [
  {
    name: "Facebook",
    type: "facebook",
    url: "https://www.facebook.com/",
  },
  {
    name: "Instagram",
    type: "instagram",
    url: "https://www.instagram.com/",
  },
  {
    name: "LinkedIn",
    type: "linkedin",
    url: "https://www.linkedin.com/",
  },
  {
    name: "YouTube",
    type: "youtube",
    url: "https://www.youtube.com/",
  },
];

function Contact() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);

    return () => {
      window.removeEventListener(
        "themechange",
        handleThemeChange
      );

      window.removeEventListener(
        "storage",
        handleThemeChange
      );
    };
  }, []);

  const isDark = theme === "dark";

  return (
    <main
      className={`relative min-h-screen overflow-hidden px-5 py-16 transition-colors duration-500 sm:px-8 ${
        isDark
          ? "bg-black text-white"
          : "bg-[#eef7f4] text-[#061311]"
      }`}
    >
      {/* BACKGROUND GLOW */}
      <div
        className={`pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full blur-[120px] ${
          isDark
            ? "bg-teal-400/20"
            : "bg-teal-500/20"
        }`}
      />

      <section className="relative mx-auto max-w-7xl">
        {/* BACKGROUND TEXT */}
        <h1
          className={`pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-6xl font-black tracking-[0.15em] sm:text-7xl lg:text-8xl xl:text-9xl ${
            isDark
              ? "text-white/[0.035]"
              : "text-black/[0.05]"
          }`}
        >
          CONTACT
        </h1>

        <div className="relative z-10 grid grid-cols-1 items-start gap-10 pt-24 lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div>
            <div
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                isDark
                  ? "border-white/10 bg-white/5"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />

              Contact
            </div>

            <h2 className="mt-7 text-4xl font-black sm:text-5xl">
              Get in touch
            </h2>

            <p
              className={`mt-4 max-w-lg text-sm leading-7 sm:text-base ${
                isDark
                  ? "text-white/60"
                  : "text-slate-600"
              }`}
            >
              Have questions about Skillora? Our support
              team is always ready to help you.
            </p>

            {/* CONTACT BOXES */}
            <div className="mt-8 space-y-3.5">
              {contactItems.map((item) => (
                <a
                  key={item.title}
                  href={item.link}
                  target={
                    item.type === "location"
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.type === "location"
                      ? "noreferrer"
                      : undefined
                  }
                  className={`group flex min-h-[82px] items-center justify-between gap-4 rounded-2xl border px-4 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400/60 ${
                    isDark
                      ? "border-white/10 bg-white/[0.025] hover:bg-white/[0.045]"
                      : "border-gray-200 bg-white shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3.5">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition duration-300 group-hover:scale-105 ${
                        isDark
                          ? "border-teal-400/15 bg-teal-400/10 text-teal-300"
                          : "border-emerald-900/10 bg-teal-50 text-teal-700"
                      }`}
                    >
                      <ContactIcon type={item.type} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="text-[15px] font-bold sm:text-base">
                        {item.title}
                      </h3>

                      <p
                        className={`mt-1 truncate text-xs sm:text-[13px] ${
                          isDark
                            ? "text-white/55"
                            : "text-slate-500"
                        }`}
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400 text-[#061311] transition duration-300 group-hover:rotate-45">
                    <ArrowIcon />
                  </div>
                </a>
              ))}
            </div>

            {/* COMPACT FOLLOW US */}
            <div className="mt-7">
              <p
                className={`text-[11px] font-bold ${
                  isDark
                    ? "text-slate-400"
                    : "text-slate-600"
                }`}
              >
                Follow us
              </p>

              <div className="mt-3 flex items-center gap-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className={`flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-400 hover:text-[#061311] ${
                      isDark
                        ? "border-white/10 bg-white/[0.06] text-slate-300"
                        : "border-gray-200 bg-white text-slate-600 shadow-sm"
                    }`}
                  >
                    <SocialIcon type={social.type} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className={`rounded-[32px] border p-6 transition-all duration-300 sm:p-8 ${
              isDark
                ? "border-white/10 bg-white/[0.04]"
                : "border-gray-200 bg-white shadow-xl"
            }`}
          >
            <h2 className="text-3xl font-black">
              Send Message
            </h2>

            <p
              className={`mb-6 mt-2 text-sm ${
                isDark
                  ? "text-white/60"
                  : "text-slate-600"
              }`}
            >
              Fill out the form below.
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10 ${
                  isDark
                    ? "border-white/10 bg-black/40 text-white placeholder:text-white/30"
                    : "border-gray-300 bg-white text-[#061311] placeholder:text-gray-400"
                }`}
              />

              <input
                type="email"
                placeholder="Email Address"
                className={`w-full rounded-2xl border px-5 py-4 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10 ${
                  isDark
                    ? "border-white/10 bg-black/40 text-white placeholder:text-white/30"
                    : "border-gray-300 bg-white text-[#061311] placeholder:text-gray-400"
                }`}
              />

              <textarea
                rows="7"
                placeholder="Your Message"
                className={`w-full resize-none rounded-2xl border px-5 py-4 text-sm outline-none transition focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10 ${
                  isDark
                    ? "border-white/10 bg-black/40 text-white placeholder:text-white/30"
                    : "border-gray-300 bg-white text-[#061311] placeholder:text-gray-400"
                }`}
              />

              <button
                type="button"
                className="w-full rounded-2xl bg-teal-400 py-4 text-sm font-bold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-300"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>

        {/* MAP SECTION */}
        <div className="mt-24">
          <div className="mb-8 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-teal-400">
              Our Location
            </p>

            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Find Us on Map
            </h2>

            <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-teal-400" />
          </div>

          <div
            className={`overflow-hidden rounded-[32px] border transition-all duration-300 hover:shadow-[0_0_45px_rgba(45,212,191,0.18)] ${
              isDark
                ? "border-white/10"
                : "border-gray-200 shadow-xl"
            }`}
          >
            <iframe
              title="Skillora Location"
              src="https://maps.google.com/maps?q=International%20Islamic%20University%20Chittagong&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              className="h-[320px] w-full sm:h-[450px]"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactIcon({ type }) {
  const commonProps = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  if (type === "email") {
    return (
      <svg {...commonProps}>
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="3"
        />

        <path d="m4 7 8 6 8-6" />
      </svg>
    );
  }

  if (type === "phone") {
    return (
      <svg {...commonProps}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />
    </svg>
  );
}

function SocialIcon({ type }) {
  const commonClass = "h-3.5 w-3.5";

  if (type === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={commonClass}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M13.7 22v-8h2.7l.4-3.1h-3.1v-2c0-.9.3-1.5 1.6-1.5H17V4.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.1H7.5V14h2.8v8h3.4Z" />
      </svg>
    );
  }

  if (type === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={commonClass}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
        />

        <circle
          cx="12"
          cy="12"
          r="4"
        />

        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    );
  }

  if (type === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        className={commonClass}
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6.5 8.2H3.2V21h3.3V8.2ZM4.9 3A1.9 1.9 0 1 0 5 6.8 1.9 1.9 0 0 0 4.9 3ZM21 13.7c0-3.8-2-5.6-4.7-5.6-2.2 0-3.1 1.2-3.7 2V8.2H9.3V21h3.3v-6.3c0-1.7.3-3.3 2.4-3.3 2 0 2.1 1.9 2.1 3.4V21H21v-7.3Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={commonClass}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M23 7.1a3 3 0 0 0-2.1-2.1C19 4.5 12 4.5 12 4.5s-7 0-8.9.5A3 3 0 0 0 1 7.1 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.9 3 3 0 0 0 3.1 19c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.9 31 31 0 0 0-.5-4.9ZM9.7 15.2V8.8L15.3 12l-5.6 3.2Z" />
    </svg>
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

export default Contact;