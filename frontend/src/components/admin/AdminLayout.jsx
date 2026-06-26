import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

function AdminLayout({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  const layoutBg = isDark
    ? "bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.16),transparent_30%),radial-gradient(circle_at_top_right,rgba(20,184,166,0.11),transparent_28%),linear-gradient(120deg,#061311,#071813,#020807)] text-white"
    : "bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.14),transparent_30%),radial-gradient(circle_at_top_right,rgba(45,212,191,0.12),transparent_28%),linear-gradient(120deg,#e8f3ee,#dff0e9,#d4ebe2)] text-[#061311]";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${layoutBg}`}>
      {mobileSidebarOpen && (
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close sidebar overlay"
        />
      )}

      <AdminSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="min-h-screen lg:pl-72">
        <AdminTopbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="relative p-4 sm:p-6 lg:p-8 overflow-hidden">
          <div className="pointer-events-none absolute right-10 top-10 hidden lg:grid grid-cols-4 gap-2 opacity-40">
            {Array.from({ length: 24 }).map((_, index) => (
              <span
                key={index}
                className={`w-1.5 h-1.5 rounded-full ${
                  isDark ? "bg-teal-400" : "bg-emerald-500"
                }`}
              />
            ))}
          </div>

          <div
            className={`relative rounded-[28px] min-h-[calc(100vh-120px)] transition-colors duration-300 ${
              isDark ? "bg-white/[0.02]" : "bg-white/35"
            }`}
          >
            {children || <Outlet />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;