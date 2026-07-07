import { useEffect, useState } from "react";

function AdminPageHeader({ title, subtitle, action }) {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const isDark = theme === "dark";

  useEffect(() => {
    const syncTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    syncTheme();

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-teal-500">
          ADMIN PANEL
        </p>

        <h1
          className={`text-3xl lg:text-4xl font-black mt-2 ${
            isDark ? "text-white" : "text-[#061311]"
          }`}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className={`mt-2 max-w-2xl ${
              isDark ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {subtitle}
          </p>
        )}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default AdminPageHeader;