import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";

function useAdminTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "dark");

    syncTheme();
    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
}

const analyticsCards = [
  { title: "Monthly Visitors", value: "18.4k", note: "+14% from last month" },
  { title: "Course Conversion", value: "8.7%", note: "+2.1% improvement" },
  { title: "Completion Rate", value: "72%", note: "Students finishing courses" },
  { title: "Avg. Learning Time", value: "4.8h", note: "Per active learner" },
];

const categoryStats = [
  { name: "Figma Design", percent: 88 },
  { name: "Canva Design", percent: 74 },
  { name: "UI/UX Design", percent: 69 },
  { name: "Digital Marketing", percent: 61 },
  { name: "Logo & Branding", percent: 54 },
];

function AdminAnalytics() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const innerClass = isDark
    ? "bg-[#07110f]/70 border-teal-400/10"
    : "bg-white/60 border-emerald-900/10";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <AdminPageHeader
        title="Analytics"
        subtitle="Monitor learning performance, course demand, student engagement, and platform growth."
        action={
          <button className="px-5 py-2.5 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
            Export Report
          </button>
        }
      />

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {analyticsCards.map((item) => (
          <div
            key={item.title}
            className={`rounded-3xl border backdrop-blur-xl p-6 hover:-translate-y-1 transition duration-300 ${cardClass}`}
          >
            <p className={`text-sm ${mutedClass}`}>{item.title}</p>
            <h2 className="text-4xl font-black text-teal-500 mt-3">
              {item.value}
            </h2>
            <p className="text-xs text-teal-500 mt-2">{item.note}</p>
          </div>
        ))}
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div
          className={`xl:col-span-2 rounded-3xl border backdrop-blur-xl p-6 ${cardClass}`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-teal-500">
                GROWTH ANALYTICS
              </p>
              <h2 className={`text-2xl font-black mt-2 ${headingClass}`}>
                Revenue and enrollment trend
              </h2>
            </div>

            <button
              className={`px-4 py-2 rounded-full border text-sm ${
                isDark
                  ? "border-teal-400/30 text-teal-300"
                  : "border-emerald-900/10 text-emerald-700 bg-white/60"
              }`}
            >
              Last 6 months
            </button>
          </div>

          <div
            className={`h-[320px] rounded-2xl border p-4 relative overflow-hidden ${innerClass}`}
          >
            <svg viewBox="0 0 700 260" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="analyticsGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.36" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M0 220 C95 160 150 178 220 125 C310 58 380 120 470 75 C560 35 610 82 700 45 L700 260 L0 260 Z"
                fill="url(#analyticsGradient)"
              />

              <path
                d="M0 220 C95 160 150 178 220 125 C310 58 380 120 470 75 C560 35 610 82 700 45"
                fill="none"
                stroke="#2DD4BF"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {[0, 1, 2, 3, 4, 5].map((item) => (
                <line
                  key={item}
                  x1="0"
                  x2="700"
                  y1={item * 45}
                  y2={item * 45}
                  stroke={isDark ? "rgba(255,255,255,0.06)" : "rgba(6,19,17,0.08)"}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className={`rounded-3xl border backdrop-blur-xl p-6 ${cardClass}`}>
          <p className="text-sm font-semibold text-teal-500">
            CATEGORY DEMAND
          </p>

          <h2 className={`text-2xl font-black mt-2 mb-6 ${headingClass}`}>
            Most popular skills
          </h2>

          <div className="space-y-5">
            {categoryStats.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className={headingClass}>{item.name}</span>
                  <span className="text-teal-500 font-semibold">
                    {item.percent}%
                  </span>
                </div>

                <div
                  className={`h-2 rounded-full overflow-hidden ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`}
                >
                  <div
                    className="h-full bg-teal-400 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminAnalytics;