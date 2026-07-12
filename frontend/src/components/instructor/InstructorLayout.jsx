import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import InstructorSidebar from "./InstructorSidebar";
import InstructorTopbar from "./InstructorTopbar";

function InstructorLayout({ children }) {
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
    "--instructor-heading": isDark ? "#ffffff" : "#061311",
    "--instructor-muted": isDark ? "#94A3B8" : "#475569",
    "--instructor-card": isDark
      ? "rgba(255,255,255,0.06)"
      : "rgba(255,255,255,0.82)",
    "--instructor-soft": isDark
      ? "rgba(255,255,255,0.05)"
      : "rgba(255,255,255,0.65)",
    "--instructor-border": isDark
      ? "rgba(45,212,191,0.15)"
      : "rgba(6,19,17,0.10)",
    "--instructor-input": isDark
      ? "rgba(255,255,255,0.05)"
      : "rgba(255,255,255,0.80)",
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
          aria-label="Close instructor sidebar"
        />
      )}

      <InstructorSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        theme={theme}
      />

      <div className="min-h-screen lg:pl-72">
        <InstructorTopbar
          onMenuClick={() => setSidebarOpen(true)}
          theme={theme}
        />

        <main className="relative pt-4 px-4 sm:px-6 lg:px-8 pb-24 lg:pb-8">
          <div className="relative rounded-[28px]">
            {children || <Outlet />}
          </div>
        </main>
      </div>

      {/* bottom nav unchanged */}
    </div>
  );
}

export default InstructorLayout;