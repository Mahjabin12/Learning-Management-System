import { useEffect, useState } from "react";

function DataTable({ columns = [], data = [] }) {
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

  const tableWrapper = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const headClass = isDark
    ? "bg-white/[0.04] border-teal-400/10"
    : "bg-emerald-50/70 border-emerald-900/10";

  const thClass = isDark ? "text-slate-400" : "text-slate-600";
  const tdClass = isDark ? "text-slate-300" : "text-slate-700";
  const rowClass = isDark
    ? "border-white/5 hover:bg-teal-400/5"
    : "border-slate-200/70 hover:bg-emerald-50/80";

  return (
    <div
      className={`rounded-3xl overflow-hidden border backdrop-blur-xl transition-colors duration-300 ${tableWrapper}`}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className={`border-b ${headClass}`}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`text-left px-5 py-4 font-semibold ${thClass}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`border-b last:border-b-0 transition ${rowClass}`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className={`px-5 py-4 ${tdClass}`}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length || 1}
                  className={`px-5 py-8 text-center ${
                    isDark ? "text-slate-500" : "text-slate-500"
                  }`}
                >
                  No data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;