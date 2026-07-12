import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| Admin routes
|--------------------------------------------------------------------------
| কোনো route আলাদা হলে শুধু এই object-এ path change করবে।
*/
const ADMIN_ROUTES = {
  students: "/admin/students",
  instructors: "/admin/instructors",
  courses: "/admin/courses",
  categories: "/admin/categories",
  enrollments: "/admin/enrollments",
  certificates: "/admin/certificates",
  payments: "/admin/payments",
  blogs: "/admin/blog",
  reviews: "/admin/reviews",
  contactRequests: "/admin/contact-requests",
  activityLogs: "/admin/activity-logs",
};

/*
|--------------------------------------------------------------------------
| Backend base URL
|--------------------------------------------------------------------------
| .env file:
| VITE_API_BASE_URL=http://localhost:5000/api
*/
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const EMPTY_SUMMARY = {
  totalStudents: 0,
  totalInstructors: 0,
  totalCourses: 0,
  totalEnrollments: 0,
  totalRevenue: 0,
  pendingCourses: 0,
  pendingCertificates: 0,
  unreadContacts: 0,
  currency: "BDT",
};

function AdminIcon({ type, className = "h-4 w-4" }) {
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

    categories: (
      <svg {...common}>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
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

    certificate: (
      <svg {...common}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7z" />
        <path d="M14 2v6h6" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),

    payment: (
      <svg {...common}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <path d="M6 15h4" />
      </svg>
    ),

    blog: (
      <svg {...common}>
        <path d="M4 4h16v16H4z" />
        <path d="M8 8h8" />
        <path d="M8 12h8" />
        <path d="M8 16h5" />
      </svg>
    ),

    reviews: (
      <svg {...common}>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    ),

    contact: (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    ),

    activity: (
      <svg {...common}>
        <path d="M22 12h-4l-3 8L9 4l-3 8H2" />
      </svg>
    ),

    plus: (
      <svg {...common}>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </svg>
    ),

    edit: (
      <svg {...common}>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z" />
      </svg>
    ),

    trash: (
      <svg {...common}>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 14H6L5 6" />
        <path d="M10 11v5" />
        <path d="M14 11v5" />
      </svg>
    ),

    refresh: (
      <svg {...common}>
        <path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 4v5h5" />
        <path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 20v-5h-5" />
      </svg>
    ),

    arrow: (
      <svg {...common}>
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </svg>
    ),

    check: (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    ),

    close: (
      <svg {...common}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    ),

    alert: (
      <svg {...common}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
  };

  return icons[type] || icons.activity;
}

function getInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  return localStorage.getItem("theme") || "dark";
}

function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

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

  return theme;
}

function formatNumber(value) {
  return new Intl.NumberFormat("en-BD").format(Number(value) || 0);
}

function formatCurrency(value, currency = "BDT") {
  try {
    return new Intl.NumberFormat("en-BD", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);
  } catch {
    return `৳${formatNumber(value)}`;
  }
}

function StatusPill({ status, isDark }) {
  const normalizedStatus = String(status || "").toLowerCase();

  let styleClass = isDark
    ? "border-white/10 bg-white/5 text-slate-300"
    : "border-slate-200 bg-slate-100 text-slate-700";

  if (
    normalizedStatus === "active" ||
    normalizedStatus === "approved" ||
    normalizedStatus === "completed" ||
    normalizedStatus === "paid"
  ) {
    styleClass = isDark
      ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
      : "border-emerald-200 bg-emerald-50 text-emerald-700";
  }

  if (
    normalizedStatus === "pending" ||
    normalizedStatus === "processing" ||
    normalizedStatus === "in progress"
  ) {
    styleClass = isDark
      ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
      : "border-amber-200 bg-amber-50 text-amber-700";
  }

  if (
    normalizedStatus === "rejected" ||
    normalizedStatus === "failed" ||
    normalizedStatus === "cancelled" ||
    normalizedStatus === "inactive"
  ) {
    styleClass = isDark
      ? "border-red-400/20 bg-red-400/10 text-red-300"
      : "border-red-200 bg-red-50 text-red-700";
  }

  return (
    <span
      className={`inline-flex whitespace-nowrap rounded-full border px-2 py-0.5 text-[11px] font-medium ${styleClass}`}
    >
      {status || "Unknown"}
    </span>
  );
}

function StatCard({
  title,
  value,
  icon,
  onClick,
  isDark,
  loading,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-xl border p-4 text-left transition ${
        isDark
          ? "border-white/[0.08] bg-white/[0.035] hover:border-teal-400/30 hover:bg-white/[0.055]"
          : "border-slate-200 bg-white hover:border-teal-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`truncate text-xs font-medium ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {title}
          </p>

          {loading ? (
            <div
              className={`mt-2 h-7 w-20 animate-pulse rounded ${
                isDark ? "bg-white/10" : "bg-slate-200"
              }`}
            />
          ) : (
            <p
              className={`mt-1 text-xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {value}
            </p>
          )}
        </div>

        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
            isDark
              ? "bg-teal-400/10 text-teal-300 group-hover:bg-teal-400 group-hover:text-slate-950"
              : "bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white"
          }`}
        >
          <AdminIcon type={icon} />
        </div>
      </div>
    </button>
  );
}

function SectionHeader({
  eyebrow,
  title,
  actionLabel,
  onAction,
  isDark,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-inherit px-4 py-3.5">
      <div>
        {eyebrow ? (
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-teal-500">
            {eyebrow}
          </p>
        ) : null}

        <h2
          className={`mt-0.5 text-sm font-semibold ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {title}
        </h2>
      </div>

      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
            isDark
              ? "text-teal-300 hover:bg-teal-400/10 hover:text-teal-200"
              : "text-teal-700 hover:bg-teal-50"
          }`}
        >
          {actionLabel}
          <AdminIcon type="arrow" className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  );
}

function EmptyState({
  title,
  description,
  buttonLabel,
  onButtonClick,
  isDark,
  icon = "courses",
}) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center px-5 py-8 text-center">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          isDark
            ? "bg-white/5 text-slate-400"
            : "bg-slate-100 text-slate-500"
        }`}
      >
        <AdminIcon type={icon} className="h-5 w-5" />
      </div>

      <h3
        className={`mt-3 text-sm font-semibold ${
          isDark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-1 max-w-sm text-xs leading-5 ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        {description}
      </p>

      {buttonLabel && onButtonClick ? (
        <button
          type="button"
          onClick={onButtonClick}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-teal-500 px-3 py-2 text-xs font-semibold text-slate-950 transition hover:bg-teal-400"
        >
          <AdminIcon type="plus" className="h-3.5 w-3.5" />
          {buttonLabel}
        </button>
      ) : null}
    </div>
  );
}

function QuickManageCard({
  title,
  description,
  icon,
  onCreate,
  onManage,
  isDark,
}) {
  return (
    <div
      className={`rounded-xl border p-3.5 transition ${
        isDark
          ? "border-white/[0.08] bg-white/[0.025] hover:border-teal-400/25"
          : "border-slate-200 bg-white hover:border-teal-300"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
            isDark
              ? "bg-teal-400/10 text-teal-300"
              : "bg-teal-50 text-teal-700"
          }`}
        >
          <AdminIcon type={icon} />
        </div>

        <div className="min-w-0 flex-1">
          <h3
            className={`text-sm font-semibold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            {title}
          </h3>

          <p
            className={`mt-1 line-clamp-2 text-xs leading-5 ${
              isDark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            {description}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onCreate}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-teal-500 px-2.5 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-teal-400"
        >
          <AdminIcon type="plus" className="h-3.5 w-3.5" />
          Add
        </button>

        <button
          type="button"
          onClick={onManage}
          className={`inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition ${
            isDark
              ? "border-white/10 text-slate-300 hover:border-teal-400/30 hover:text-teal-300"
              : "border-slate-200 text-slate-700 hover:border-teal-300 hover:text-teal-700"
          }`}
        >
          Manage
          <AdminIcon type="arrow" className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme === "dark";

  const [summary, setSummary] = useState(EMPTY_SUMMARY);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);

  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");

  const panelClass = isDark
    ? "border-white/[0.08] bg-white/[0.03]"
    : "border-slate-200 bg-white";

  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";

  const openCreatePage = (path) => {
    navigate(`${path}?action=create`);
  };

  const openEditPage = (path, id) => {
    navigate(`${path}?action=edit&id=${encodeURIComponent(id)}`);
  };

  /*
  |--------------------------------------------------------------------------
  | Dashboard GET API
  |--------------------------------------------------------------------------
  | Expected endpoint:
  | GET /admin/dashboard
  |
  | Expected response:
  | {
  |   "summary": {},
  |   "pendingCourses": [],
  |   "recentEnrollments": [],
  |   "recentActivities": []
  | }
  */
  const loadDashboard = useCallback(async () => {
    setError("");

    if (!API_BASE_URL) {
      setSummary(EMPTY_SUMMARY);
      setPendingCourses([]);
      setRecentEnrollments([]);
      setRecentActivities([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Dashboard information could not be loaded.");
      }

      const result = await response.json();
      const data = result?.data || result || {};

      setSummary({
        ...EMPTY_SUMMARY,
        ...(data.summary || {}),
      });

      setPendingCourses(
        Array.isArray(data.pendingCourses)
          ? data.pendingCourses
          : []
      );

      setRecentEnrollments(
        Array.isArray(data.recentEnrollments)
          ? data.recentEnrollments
          : []
      );

      setRecentActivities(
        Array.isArray(data.recentActivities)
          ? data.recentActivities
          : []
      );
    } catch (requestError) {
      setError(
        requestError?.message ||
          "Something went wrong while loading the dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  /*
  |--------------------------------------------------------------------------
  | Course approval/rejection UPDATE operation
  |--------------------------------------------------------------------------
  */
  const updateCourseStatus = async (courseId, status) => {
    if (!API_BASE_URL) {
      setError("Backend API is not connected yet.");
      return;
    }

    try {
      setActionLoadingId(courseId);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/admin/courses/${courseId}/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error(`Course could not be ${status.toLowerCase()}.`);
      }

      setPendingCourses((currentCourses) =>
        currentCourses.filter(
          (course) => course.id !== courseId
        )
      );

      setSummary((currentSummary) => ({
        ...currentSummary,
        pendingCourses: Math.max(
          0,
          Number(currentSummary.pendingCourses || 0) - 1
        ),
      }));
    } catch (requestError) {
      setError(
        requestError?.message ||
          "Course status could not be updated."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Course DELETE operation
  |--------------------------------------------------------------------------
  */
  const deleteCourse = async (courseId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this course? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    if (!API_BASE_URL) {
      setError("Backend API is not connected yet.");
      return;
    }

    try {
      setActionLoadingId(courseId);
      setError("");

      const response = await fetch(
        `${API_BASE_URL}/admin/courses/${courseId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Course could not be deleted.");
      }

      setPendingCourses((currentCourses) =>
        currentCourses.filter(
          (course) => course.id !== courseId
        )
      );

      setSummary((currentSummary) => ({
        ...currentSummary,
        totalCourses: Math.max(
          0,
          Number(currentSummary.totalCourses || 0) - 1
        ),
        pendingCourses: Math.max(
          0,
          Number(currentSummary.pendingCourses || 0) - 1
        ),
      }));
    } catch (requestError) {
      setError(
        requestError?.message ||
          "Course could not be deleted."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const summaryCards = useMemo(
    () => [
      {
        title: "Total Students",
        value: formatNumber(summary.totalStudents),
        icon: "users",
        path: ADMIN_ROUTES.students,
      },
      {
        title: "Total Instructors",
        value: formatNumber(summary.totalInstructors),
        icon: "instructor",
        path: ADMIN_ROUTES.instructors,
      },
      {
        title: "Total Courses",
        value: formatNumber(summary.totalCourses),
        icon: "courses",
        path: ADMIN_ROUTES.courses,
      },
      {
        title: "Total Enrollments",
        value: formatNumber(summary.totalEnrollments),
        icon: "enrollments",
        path: ADMIN_ROUTES.enrollments,
      },
      {
        title: "Total Revenue",
        value: formatCurrency(
          summary.totalRevenue,
          summary.currency
        ),
        icon: "revenue",
        path: ADMIN_ROUTES.payments,
      },
      {
        title: "Pending Courses",
        value: formatNumber(summary.pendingCourses),
        icon: "courses",
        path: ADMIN_ROUTES.courses,
      },
      {
        title: "Certificate Requests",
        value: formatNumber(summary.pendingCertificates),
        icon: "certificate",
        path: ADMIN_ROUTES.certificates,
      },
      {
        title: "Unread Contacts",
        value: formatNumber(summary.unreadContacts),
        icon: "contact",
        path: ADMIN_ROUTES.contactRequests,
      },
    ],
    [summary]
  );

  const managementModules = useMemo(
    () => [
      {
        title: "Students",
        description:
          "Create, view, update, suspend or remove student accounts.",
        icon: "users",
        path: ADMIN_ROUTES.students,
      },
      {
        title: "Instructors",
        description:
          "Manage instructor profiles, approvals and account access.",
        icon: "instructor",
        path: ADMIN_ROUTES.instructors,
      },
      {
        title: "Courses",
        description:
          "Create courses and manage approval, content and status.",
        icon: "courses",
        path: ADMIN_ROUTES.courses,
      },
      {
        title: "Categories",
        description:
          "Create and organise the platform course categories.",
        icon: "categories",
        path: ADMIN_ROUTES.categories,
      },
      {
        title: "Enrollments",
        description:
          "View, update or cancel student course enrollments.",
        icon: "enrollments",
        path: ADMIN_ROUTES.enrollments,
      },
      {
        title: "Certificates",
        description:
          "Review, issue, revoke and manage student certificates.",
        icon: "certificate",
        path: ADMIN_ROUTES.certificates,
      },
      {
        title: "Payments",
        description:
          "Review payment records, transactions and payment status.",
        icon: "payment",
        path: ADMIN_ROUTES.payments,
      },
      {
        title: "Blog Posts",
        description:
          "Create, edit, publish and remove platform blog content.",
        icon: "blog",
        path: ADMIN_ROUTES.blogs,
      },
      {
        title: "Reviews",
        description:
          "Moderate, approve, hide or delete course reviews.",
        icon: "reviews",
        path: ADMIN_ROUTES.reviews,
      },
      {
        title: "Contact Requests",
        description:
          "Read, reply, update and resolve user contact requests.",
        icon: "contact",
        path: ADMIN_ROUTES.contactRequests,
      },
    ],
    []
  );

  return (
    <div className="space-y-5 p-4 sm:p-5 lg:p-6">
      {/* Page heading */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-teal-500">
            Skillora administration
          </p>

          <h1
            className={`mt-1 text-xl font-bold tracking-tight sm:text-2xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Dashboard overview
          </h1>

          <p
            className={`mt-1 max-w-2xl text-xs leading-5 sm:text-sm ${mutedClass}`}
          >
            Monitor platform information and access every
            management module from one place.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={loadDashboard}
            disabled={loading}
            className={`inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
              isDark
                ? "border-white/10 text-slate-300 hover:border-teal-400/30 hover:text-teal-300"
                : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700"
            }`}
          >
            <AdminIcon
              type="refresh"
              className={`h-3.5 w-3.5 ${
                loading ? "animate-spin" : ""
              }`}
            />
            Refresh
          </button>

          <button
            type="button"
            onClick={() =>
              openCreatePage(ADMIN_ROUTES.courses)
            }
            className="inline-flex h-9 items-center gap-2 rounded-lg bg-teal-500 px-3 text-xs font-semibold text-slate-950 transition hover:bg-teal-400"
          >
            <AdminIcon type="plus" className="h-3.5 w-3.5" />
            Manage Course
          </button>
        </div>
      </section>

      {/* API error */}
      {error ? (
        <div
          className={`flex items-start justify-between gap-3 rounded-xl border px-4 py-3 ${
            isDark
              ? "border-red-400/20 bg-red-400/10 text-red-200"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          <div className="flex items-start gap-2">
            <AdminIcon
              type="alert"
              className="mt-0.5 h-4 w-4 shrink-0"
            />

            <p className="text-xs leading-5">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => setError("")}
            className="shrink-0 opacity-70 transition hover:opacity-100"
            aria-label="Close error"
          >
            <AdminIcon type="close" className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {/* Summary cards */}
      <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-8">
        {summaryCards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            icon={card.icon}
            loading={loading}
            isDark={isDark}
            onClick={() => navigate(card.path)}
          />
        ))}
      </section>

      {/* Quick CRUD management */}
      <section
        className={`overflow-hidden rounded-xl border ${panelClass}`}
      >
        <SectionHeader
          eyebrow="CRUD management"
          title="Quick management"
          isDark={isDark}
        />

        <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-5">
          {managementModules.map((module) => (
            <QuickManageCard
              key={module.title}
              title={module.title}
              description={module.description}
              icon={module.icon}
              isDark={isDark}
              onCreate={() => openCreatePage(module.path)}
              onManage={() => navigate(module.path)}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        {/* Pending courses */}
        <div
          className={`overflow-hidden rounded-xl border xl:col-span-2 ${panelClass}`}
        >
          <SectionHeader
            eyebrow="Course moderation"
            title="Pending course requests"
            actionLabel="View all"
            onAction={() => navigate(ADMIN_ROUTES.courses)}
            isDark={isDark}
          />

          {loading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-12 animate-pulse rounded-lg ${
                    isDark ? "bg-white/5" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          ) : pendingCourses.length === 0 ? (
            <EmptyState
              title="No pending courses"
              description="Submitted courses awaiting admin review will appear here."
              buttonLabel="Create Course"
              icon="courses"
              isDark={isDark}
              onButtonClick={() =>
                openCreatePage(ADMIN_ROUTES.courses)
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr
                    className={`border-b text-[11px] uppercase tracking-wide ${
                      isDark
                        ? "border-white/[0.08] text-slate-500"
                        : "border-slate-200 text-slate-500"
                    }`}
                  >
                    <th className="px-4 py-3 font-semibold">
                      Course
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Instructor
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Submitted
                    </th>
                    <th className="px-4 py-3 font-semibold">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pendingCourses.map((course) => {
                    const courseId =
                      course.id || course._id;

                    const rowLoading =
                      actionLoadingId === courseId;

                    return (
                      <tr
                        key={courseId}
                        className={`border-b last:border-b-0 ${
                          isDark
                            ? "border-white/[0.06] hover:bg-white/[0.025]"
                            : "border-slate-100 hover:bg-slate-50"
                        }`}
                      >
                        <td className="px-4 py-3">
                          <p
                            className={`max-w-[230px] truncate text-xs font-semibold ${
                              isDark
                                ? "text-white"
                                : "text-slate-900"
                            }`}
                          >
                            {course.title ||
                              course.courseName ||
                              "Untitled course"}
                          </p>

                          {course.category?.name ||
                          course.categoryName ? (
                            <p
                              className={`mt-0.5 text-[11px] ${mutedClass}`}
                            >
                              {course.category?.name ||
                                course.categoryName}
                            </p>
                          ) : null}
                        </td>

                        <td
                          className={`px-4 py-3 text-xs ${mutedClass}`}
                        >
                          {course.instructor?.name ||
                            course.instructorName ||
                            "Not assigned"}
                        </td>

                        <td
                          className={`px-4 py-3 text-xs ${mutedClass}`}
                        >
                          {course.submittedAt
                            ? new Date(
                                course.submittedAt
                              ).toLocaleDateString("en-BD")
                            : "—"}
                        </td>

                        <td className="px-4 py-3">
                          <StatusPill
                            status={course.status || "Pending"}
                            isDark={isDark}
                          />
                        </td>

                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                updateCourseStatus(
                                  courseId,
                                  "Approved"
                                )
                              }
                              disabled={rowLoading}
                              title="Approve course"
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isDark
                                  ? "text-emerald-300 hover:bg-emerald-400/10"
                                  : "text-emerald-700 hover:bg-emerald-50"
                              }`}
                            >
                              <AdminIcon
                                type="check"
                                className="h-3.5 w-3.5"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateCourseStatus(
                                  courseId,
                                  "Rejected"
                                )
                              }
                              disabled={rowLoading}
                              title="Reject course"
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isDark
                                  ? "text-amber-300 hover:bg-amber-400/10"
                                  : "text-amber-700 hover:bg-amber-50"
                              }`}
                            >
                              <AdminIcon
                                type="close"
                                className="h-3.5 w-3.5"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                openEditPage(
                                  ADMIN_ROUTES.courses,
                                  courseId
                                )
                              }
                              disabled={rowLoading}
                              title="Edit course"
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isDark
                                  ? "text-blue-300 hover:bg-blue-400/10"
                                  : "text-blue-700 hover:bg-blue-50"
                              }`}
                            >
                              <AdminIcon
                                type="edit"
                                className="h-3.5 w-3.5"
                              />
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteCourse(courseId)
                              }
                              disabled={rowLoading}
                              title="Delete course"
                              className={`flex h-8 w-8 items-center justify-center rounded-lg transition disabled:cursor-not-allowed disabled:opacity-50 ${
                                isDark
                                  ? "text-red-300 hover:bg-red-400/10"
                                  : "text-red-700 hover:bg-red-50"
                              }`}
                            >
                              <AdminIcon
                                type="trash"
                                className="h-3.5 w-3.5"
                              />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Activity logs */}
        <div
          className={`overflow-hidden rounded-xl border ${panelClass}`}
        >
          <SectionHeader
            eyebrow="System activity"
            title="Recent activity"
            actionLabel="View logs"
            onAction={() =>
              navigate(ADMIN_ROUTES.activityLogs)
            }
            isDark={isDark}
          />

          {loading ? (
            <div className="space-y-3 p-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className={`h-14 animate-pulse rounded-lg ${
                    isDark ? "bg-white/5" : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          ) : recentActivities.length === 0 ? (
            <EmptyState
              title="No activity recorded"
              description="Admin and platform activities will appear after the backend activity logger is connected."
              icon="activity"
              isDark={isDark}
            />
          ) : (
            <div className="divide-y divide-inherit">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id || activity._id}
                  className="flex gap-3 px-4 py-3"
                >
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                      isDark
                        ? "bg-white/5 text-teal-300"
                        : "bg-teal-50 text-teal-700"
                    }`}
                  >
                    <AdminIcon
                      type={activity.icon || "activity"}
                      className="h-3.5 w-3.5"
                    />
                  </div>

                  <div className="min-w-0">
                    <p
                      className={`truncate text-xs font-semibold ${
                        isDark
                          ? "text-white"
                          : "text-slate-900"
                      }`}
                    >
                      {activity.title || "System activity"}
                    </p>

                    {activity.description ? (
                      <p
                        className={`mt-0.5 line-clamp-2 text-[11px] leading-4 ${mutedClass}`}
                      >
                        {activity.description}
                      </p>
                    ) : null}

                    <p
                      className={`mt-1 text-[10px] ${mutedClass}`}
                    >
                      {activity.createdAt
                        ? new Date(
                            activity.createdAt
                          ).toLocaleString("en-BD")
                        : "—"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent enrollments */}
      <section
        className={`overflow-hidden rounded-xl border ${panelClass}`}
      >
        <SectionHeader
          eyebrow="Enrollment management"
          title="Recent enrollments"
          actionLabel="Manage enrollments"
          onAction={() =>
            navigate(ADMIN_ROUTES.enrollments)
          }
          isDark={isDark}
        />

        {loading ? (
          <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className={`h-24 animate-pulse rounded-lg ${
                  isDark ? "bg-white/5" : "bg-slate-100"
                }`}
              />
            ))}
          </div>
        ) : recentEnrollments.length === 0 ? (
          <EmptyState
            title="No enrollments found"
            description="New student enrollments will be displayed here after the enrollment API is connected."
            buttonLabel="Manage Enrollments"
            icon="enrollments"
            isDark={isDark}
            onButtonClick={() =>
              navigate(ADMIN_ROUTES.enrollments)
            }
          />
        ) : (
          <div className="grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-4">
            {recentEnrollments.map((enrollment) => {
              const enrollmentId =
                enrollment.id || enrollment._id;

              return (
                <div
                  key={enrollmentId}
                  className={`rounded-xl border p-3.5 ${
                    isDark
                      ? "border-white/[0.08] bg-white/[0.025]"
                      : "border-slate-200 bg-slate-50/60"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3
                        className={`truncate text-xs font-semibold ${
                          isDark
                            ? "text-white"
                            : "text-slate-900"
                        }`}
                      >
                        {enrollment.student?.name ||
                          enrollment.studentName ||
                          "Unknown student"}
                      </h3>

                      <p
                        className={`mt-1 truncate text-[11px] ${mutedClass}`}
                      >
                        {enrollment.course?.title ||
                          enrollment.courseName ||
                          "Unknown course"}
                      </p>
                    </div>

                    <StatusPill
                      status={enrollment.status}
                      isDark={isDark}
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span
                      className={`text-[10px] ${mutedClass}`}
                    >
                      Progress
                    </span>

                    <span
                      className={`text-[11px] font-semibold ${
                        isDark
                          ? "text-teal-300"
                          : "text-teal-700"
                      }`}
                    >
                      {Number(enrollment.progress || 0)}%
                    </span>
                  </div>

                  <div
                    className={`mt-1.5 h-1.5 overflow-hidden rounded-full ${
                      isDark ? "bg-white/10" : "bg-slate-200"
                    }`}
                  >
                    <div
                      className="h-full rounded-full bg-teal-500"
                      style={{
                        width: `${Math.min(
                          100,
                          Math.max(
                            0,
                            Number(enrollment.progress || 0)
                          )
                        )}%`,
                      }}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openEditPage(
                        ADMIN_ROUTES.enrollments,
                        enrollmentId
                      )
                    }
                    className={`mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-lg border py-1.5 text-[11px] font-medium transition ${
                      isDark
                        ? "border-white/10 text-slate-300 hover:border-teal-400/30 hover:text-teal-300"
                        : "border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700"
                    }`}
                  >
                    <AdminIcon
                      type="edit"
                      className="h-3 w-3"
                    />
                    View or edit
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;