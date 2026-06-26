import { useEffect, useState } from "react";

function ArrowUpIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 420);
    };

    const syncTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    handleScroll();
    syncTheme();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={goToTop}
      aria-label="Scroll to top"
      className={`fixed right-5 bottom-5 z-[999] w-12 h-12 rounded-full flex items-center justify-center border transition duration-300 ${
        isDark
          ? "bg-teal-400 text-[#061311] border-teal-300 shadow-[0_0_30px_rgba(45,212,191,0.55)] hover:bg-white hover:-translate-y-1"
          : "bg-[#061311] text-white border-emerald-900/20 shadow-[0_18px_40px_rgba(6,19,17,0.18)] hover:bg-emerald-700 hover:-translate-y-1"
      }`}
    >
      <ArrowUpIcon />
    </button>
  );
}

export default ScrollToTop;