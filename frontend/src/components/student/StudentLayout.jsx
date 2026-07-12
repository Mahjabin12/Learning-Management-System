import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./StudentSidebar";
import StudentTopbar from "./StudentTopbar";

function StudentLayout({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => {
      const savedTheme = localStorage.getItem("theme") || "dark";
      setTheme(savedTheme);
      document.body.style.backgroundColor =
        savedTheme === "dark" ? "#061311" : "#e8f3ee";
    };

    syncTheme();

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const themeVars = {
    "--student-heading": isDark ? "#ffffff" : "#061311",
    "--student-muted": isDark ? "#94A3B8" : "#475569",
    "--student-card": isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.82)",
    "--student-soft": isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.65)",
    "--student-border": isDark ? "rgba(45,212,191,0.15)" : "rgba(6,19,17,0.10)",
    "--student-input": isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.80)",
  };

  const layoutBg = isDark
    ? "bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.11),transparent_28%),linear-gradient(120deg,#061311,#071813,#020807)]"
    : "bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_28%),linear-gradient(120deg,#e8f3ee,#dff0e9,#d4ebe2)]";

  return (
    <div
      style={themeVars}
      className={`min-h-screen transition-colors duration-300 ${layoutBg}`}
    >
      {sidebarOpen && (
        <button
          type="button"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close student sidebar"
        />
      )}

      <StudentSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
      />

      <div className="min-h-screen lg:pl-72">
        <StudentTopbar
          onMenuClick={() => setSidebarOpen(true)}
          theme={theme}
        />

        <main className="relative pt-4 px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8">
          <div className="relative rounded-[28px]">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 gap-1 p-2 border-t backdrop-blur-xl lg:hidden ${
          isDark
            ? "bg-[#061311]/95 border-teal-400/10"
            : "bg-[#e8f3ee]/95 border-emerald-900/10"
        }`}
      >
        <a href="/student/dashboard" className="text-center text-xs text-teal-400 py-2">
          🏠<br />Home
        </a>
        <a href="/student/my-learning" className="text-center text-xs text-[var(--student-muted)] py-2">
          📚<br />Learn
        </a>
        <a href="/student/cart" className="text-center text-xs text-[var(--student-muted)] py-2">
          🛒<br />Cart
        </a>
        <a href="/student/profile" className="text-center text-xs text-[var(--student-muted)] py-2">
          👤<br />Profile
        </a>
      </nav>
    </div>
  );
}

export default StudentLayout;