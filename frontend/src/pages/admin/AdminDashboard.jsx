import { useEffect, useState } from "react";

function AdminIcon({ type, className = "w-5 h-5" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  const icons = {
    users: (
      <svg {...common}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    instructor: (
      <svg {...common}>
        <path d="M22 10v6" />
        <path d="M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    courses: (
      <svg {...common}>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5z" />
      </svg>
    ),
    enrollments: (
      <svg {...common}>
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    revenue: (
      <svg {...common}>
        <path d="M12 1v22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    pending: (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    certificate: (
      <svg {...common}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
    bell: (
      <svg {...common}>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    activity: (
      <svg {...common}>
        <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
      </svg>
    ),
    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    ),
  };

  return icons[type] || icons.activity;
}

function useTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

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

  return theme;
}

function CountUp({ value, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number(value);
    const duration = 850;
    const steps = 38;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

function StatusPill({ status }) {
  const theme = useTheme();
  const isDark = theme === "dark";

  const darkStyles = {
    Pending: "bg-yellow-400/10 text-yellow-300 border-yellow-400/20",
    Approved: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    Rejected: "bg-red-400/10 text-red-300 border-red-400/20",
    Completed: "bg-teal-400/10 text-teal-300 border-teal-400/20",
    "In Progress": "bg-blue-400/10 text-blue-300 border-blue-400/20",
    "Certificate Pending":
      "bg-purple-400/10 text-purple-300 border-purple-400/20",
  };

  const lightStyles = {
    Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Approved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Rejected: "bg-red-100 text-red-700 border-red-200",
    Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
    "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
    "Certificate Pending":
      "bg-purple-100 text-purple-700 border-purple-200",
  };

  const selectedClass = isDark
    ? darkStyles[status] || "bg-white/10 text-slate-300 border-white/10"
    : lightStyles[status] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${selectedClass}`}
    >
      {status}
    </span>
  );
}

const stats = [
  {
    title: "Total Students",
    value: 2480,
    suffix: "+",
    trend: "+12% this month",
    icon: "users",
  },
  {
    title: "Instructors",
    value: 32,
    suffix: "+",
    trend: "+4 new mentors",
    icon: "instructor",
  },
  {
    title: "Courses",
    value: 86,
    suffix: "+",
    trend: "18 pending review",
    icon: "courses",
  },
  {
    title: "Enrollments",
    value: 5240,
    suffix: "+",
    trend: "+18% growth",
    icon: "enrollments",
  },
  {
    title: "Revenue",
    value: 18400,
    prefix: "$",
    trend: "+9.4% this month",
    icon: "revenue",
  },
  {
    title: "Pending Approvals",
    value: 14,
    trend: "Instructor requests",
    icon: "pending",
  },
  {
    title: "Certificate Requests",
    value: 27,
    trend: "Need admin review",
    icon: "certificate",
  },
  {
    title: "Unread Alerts",
    value: 19,
    trend: "New system updates",
    icon: "bell",
  },
];

const activities = [
  {
    title: "New student registered",
    text: "Nadia Rahman joined Figma Design Basics.",
    time: "4 min ago",
    type: "users",
  },
  {
    title: "Course approval requested",
    text: "Instructor submitted Canva Social Media Masterclass.",
    time: "18 min ago",
    type: "pending",
  },
  {
    title: "Certificate request",
    text: "Student completed UI/UX Portfolio Project.",
    time: "31 min ago",
    type: "certificate",
  },
  {
    title: "Course removal request",
    text: "Instructor requested archive for old Adobe XD course.",
    time: "1 hour ago",
    type: "courses",
  },
];

const pendingCourses = [
  {
    id: 1,
    course: "Advanced Figma Prototyping",
    instructor: "Ayesha Karim",
    submitted: "Today",
    status: "Pending",
  },
  {
    id: 2,
    course: "Canva Branding for Freelancers",
    instructor: "Tanvir Hasan",
    submitted: "Yesterday",
    status: "Pending",
  },
  {
    id: 3,
    course: "Logo Design Client Workflow",
    instructor: "Nabila Islam",
    submitted: "2 days ago",
    status: "Approved",
  },
  {
    id: 4,
    course: "Adobe XD Mobile App Design",
    instructor: "Rafi Ahmed",
    submitted: "3 days ago",
    status: "Rejected",
  },
];

const enrollments = [
  {
    id: 1,
    student: "Sarah Ahmed",
    course: "Figma UI Design Beginner",
    progress: "72%",
    status: "In Progress",
  },
  {
    id: 2,
    student: "Mahin Khan",
    course: "Canva Social Media Design",
    progress: "100%",
    status: "Completed",
  },
  {
    id: 3,
    student: "Nusrat Jahan",
    course: "Digital Marketing Strategy",
    progress: "48%",
    status: "In Progress",
  },
  {
    id: 4,
    student: "Rafi Islam",
    course: "Logo & Branding Essentials",
    progress: "100%",
    status: "Certificate Pending",
  },
];

function AdminDashboard() {
  const theme = useTheme();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)] hover:border-teal-400/40 hover:shadow-[0_0_38px_rgba(45,212,191,0.14)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)] hover:border-emerald-500/30 hover:shadow-[0_18px_45px_rgba(20,184,166,0.16)]";

  const panelClass = `rounded-3xl border backdrop-blur-xl transition duration-300 ${cardClass}`;

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";
  const softMutedClass = isDark ? "text-slate-500" : "text-slate-500";

  const innerPanelClass = isDark
    ? "bg-[#07110f]/70 border-teal-400/10"
    : "bg-white/60 border-emerald-900/10";

  return (
    <div className="relative p-4 sm:p-6 lg:p-8 space-y-8 overflow-hidden">
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(18px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes drawLine {
            from {
              stroke-dashoffset: 720;
            }
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes pulseGlow {
            0%, 100% {
              box-shadow: 0 0 0 rgba(45,212,191,0);
            }
            50% {
              box-shadow: 0 0 35px rgba(45,212,191,0.25);
            }
          }

          .fade-up {
            animation: fadeUp 0.72s ease both;
          }

          .chart-line {
            stroke-dasharray: 720;
            stroke-dashoffset: 720;
            animation: drawLine 1.45s ease forwards;
          }

          .glow-button:active {
            animation: pulseGlow 0.42s ease;
          }
        `}
      </style>

      <div className="pointer-events-none absolute right-8 top-8 hidden xl:grid grid-cols-4 gap-2 opacity-50">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className={`w-1.5 h-1.5 rounded-full ${
              isDark ? "bg-teal-400" : "bg-emerald-500"
            }`}
          />
        ))}
      </div>

      <section className={`fade-up ${panelClass} p-6 lg:p-8 relative overflow-hidden`}>
        <div
          className={`absolute right-8 top-8 w-44 h-44 rounded-full blur-3xl ${
            isDark ? "bg-teal-400/10" : "bg-emerald-400/20"
          }`}
        />

        <div className="relative flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">
          <div>
            <p className="text-sm font-semibold text-teal-500">
              BYWAY ADMIN CONTROL CENTER
            </p>

            <h1 className={`mt-3 text-4xl lg:text-5xl font-black leading-tight ${headingClass}`}>
              Manage the full{" "}
              <span className="text-teal-500">learning ecosystem</span>
            </h1>

            <p className={`mt-4 max-w-2xl leading-7 ${mutedClass}`}>
              Track students, instructors, course approvals, certificates,
              revenue, landing content, and system-wide activity from one
              premium admin dashboard.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button className="glow-button px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
              Review Pending Courses
            </button>

            <button
              className={`glow-button w-12 h-12 rounded-full border flex items-center justify-center transition ${
                isDark
                  ? "border-teal-400 text-teal-300 hover:bg-teal-400 hover:text-[#061311]"
                  : "border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              <AdminIcon type="arrow" />
            </button>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat, index) => (
          <div
            key={stat.title}
            className={`fade-up ${panelClass} rounded-3xl p-5 hover:-translate-y-1 hover:scale-[1.015] relative overflow-hidden`}
            style={{ animationDelay: `${index * 0.06}s` }}
          >
            <div
              className={`absolute right-4 top-4 w-20 h-20 rounded-full blur-2xl ${
                isDark ? "bg-teal-400/10" : "bg-emerald-400/20"
              }`}
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className={`text-sm ${mutedClass}`}>{stat.title}</p>

                <h2 className="mt-3 text-3xl lg:text-4xl font-black">
                  <span className="text-teal-500">
                    <CountUp
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </span>
                </h2>

                <p
                  className={`mt-2 text-xs ${
                    isDark ? "text-teal-300" : "text-emerald-700"
                  }`}
                >
                  {stat.trend}
                </p>
              </div>

              <div className="w-12 h-12 rounded-full bg-white text-teal-500 flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
                <AdminIcon type={stat.icon} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div className={`fade-up ${panelClass} p-6 xl:col-span-2`}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-sm text-teal-500 font-semibold">
                REVENUE & ENROLLMENTS
              </p>

              <h2 className={`text-2xl font-bold mt-2 ${headingClass}`}>
                Platform growth overview
              </h2>
            </div>

            <button
              className={`px-4 py-2 rounded-full border text-sm transition ${
                isDark
                  ? "border-teal-400/40 text-teal-300 hover:bg-teal-400 hover:text-[#061311]"
                  : "border-emerald-500/40 text-emerald-700 hover:bg-emerald-600 hover:text-white"
              }`}
            >
              Monthly
            </button>
          </div>

          <div
            className={`h-[300px] rounded-2xl border p-4 relative overflow-hidden ${innerPanelClass}`}
          >
            <div
              className={`absolute inset-0 ${
                isDark
                  ? "bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.13),transparent_35%)]"
                  : "bg-[radial-gradient(circle_at_top_right,rgba(20,184,166,0.18),transparent_35%)]"
              }`}
            />

            <svg
              viewBox="0 0 700 260"
              className="relative z-10 w-full h-full"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="adminAreaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.38" />
                  <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M0 210 C80 160 120 180 190 120 C260 62 330 120 410 82 C500 38 580 85 700 42 L700 260 L0 260 Z"
                fill="url(#adminAreaGradient)"
              />

              <path
                className="chart-line"
                d="M0 210 C80 160 120 180 190 120 C260 62 330 120 410 82 C500 38 580 85 700 42"
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

        <div className={`fade-up ${panelClass} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-teal-500 font-semibold">LIVE FEED</p>

              <h2 className={`text-2xl font-bold mt-2 ${headingClass}`}>
                Recent activity
              </h2>
            </div>

            <div
              className={`relative w-11 h-11 rounded-full border flex items-center justify-center ${
                isDark
                  ? "border-teal-400/30 text-teal-300"
                  : "border-emerald-500/30 text-emerald-700 bg-white/60"
              }`}
            >
              <AdminIcon type="bell" />
              <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-teal-400" />
            </div>
          </div>

          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className={`flex gap-4 p-4 rounded-2xl border transition ${
                  isDark
                    ? "bg-white/5 border-white/5 hover:border-teal-400/25 hover:bg-teal-400/5"
                    : "bg-white/60 border-emerald-900/10 hover:border-emerald-500/25 hover:bg-emerald-50/80"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-white text-teal-500 flex items-center justify-center shrink-0 shadow-sm">
                  <AdminIcon type={activity.type} className="w-4 h-4" />
                </div>

                <div>
                  <h3 className={`font-semibold ${headingClass}`}>
                    {activity.title}
                  </h3>

                  <p className={`text-sm mt-1 ${mutedClass}`}>
                    {activity.text}
                  </p>

                  <p
                    className={`text-xs mt-2 ${
                      isDark ? "text-teal-300" : "text-emerald-700"
                    }`}
                  >
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid xl:grid-cols-2 gap-6">
        <div className={`fade-up ${panelClass} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-teal-500 font-semibold">
                COURSE APPROVALS
              </p>

              <h2 className={`text-2xl font-bold mt-2 ${headingClass}`}>
                Pending course requests
              </h2>
            </div>

            <button
              className={`text-sm transition ${
                isDark ? "text-teal-300 hover:text-white" : "text-emerald-700 hover:text-[#061311]"
              }`}
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr
                  className={`text-left border-b ${
                    isDark ? "text-slate-400 border-white/10" : "text-slate-600 border-slate-200"
                  }`}
                >
                  <th className="pb-4 font-medium">Course</th>
                  <th className="pb-4 font-medium">Instructor</th>
                  <th className="pb-4 font-medium">Submitted</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody>
                {pendingCourses.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b transition ${
                      isDark
                        ? "border-white/5 hover:bg-teal-400/5"
                        : "border-slate-200/70 hover:bg-emerald-50/70"
                    }`}
                  >
                    <td className={`py-4 font-medium ${headingClass}`}>
                      {item.course}
                    </td>
                    <td className={`py-4 ${mutedClass}`}>{item.instructor}</td>
                    <td className={`py-4 ${mutedClass}`}>{item.submitted}</td>
                    <td className="py-4">
                      <StatusPill status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className={`fade-up ${panelClass} p-6`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-teal-500 font-semibold">
                ENROLLMENTS
              </p>

              <h2 className={`text-2xl font-bold mt-2 ${headingClass}`}>
                Recent student progress
              </h2>
            </div>

            <button
              className={`text-sm transition ${
                isDark ? "text-teal-300 hover:text-white" : "text-emerald-700 hover:text-[#061311]"
              }`}
            >
              View all
            </button>
          </div>

          <div className="space-y-4">
            {enrollments.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition ${
                  isDark
                    ? "bg-white/5 border-white/5 hover:border-teal-400/25 hover:bg-teal-400/5"
                    : "bg-white/60 border-emerald-900/10 hover:border-emerald-500/25 hover:bg-emerald-50/80"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className={`font-semibold ${headingClass}`}>
                      {item.student}
                    </h3>

                    <p className={`text-sm mt-1 ${mutedClass}`}>
                      {item.course}
                    </p>
                  </div>

                  <StatusPill status={item.status} />
                </div>

                <div className="mt-4">
                  <div className={`flex justify-between text-xs mb-2 ${softMutedClass}`}>
                    <span>Progress</span>
                    <span>{item.progress}</span>
                  </div>

                  <div
                    className={`h-2 rounded-full overflow-hidden ${
                      isDark ? "bg-white/10" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className="h-full rounded-full bg-teal-400"
                      style={{ width: item.progress }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;