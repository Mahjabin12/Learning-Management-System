import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const [enrollments, setEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [learningHours, setLearningHours] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const userIdentity =
    user?._id ||
    user?.id ||
    user?.email ||
    "current-user";

  const enrollmentStorageKey = useMemo(
    () => `skillora_enrollments_${userIdentity}`,
    [userIdentity]
  );

  const certificateStorageKey = useMemo(
    () => `skillora_certificates_${userIdentity}`,
    [userIdentity]
  );

  const learningHoursStorageKey = useMemo(
    () => `skillora_learning_hours_${userIdentity}`,
    [userIdentity]
  );

  const streakStorageKey = useMemo(
    () => `skillora_learning_streak_${userIdentity}`,
    [userIdentity]
  );

  const userName =
    user?.name ||
    user?.fullName ||
    user?.displayName ||
    "Skillora User";

  useEffect(() => {
    const loadDashboardData = () => {
      setIsLoading(true);

      try {
        const savedEnrollments = localStorage.getItem(
          enrollmentStorageKey
        );

        const parsedEnrollments = savedEnrollments
          ? JSON.parse(savedEnrollments)
          : [];

        setEnrollments(
          Array.isArray(parsedEnrollments)
            ? parsedEnrollments
            : []
        );

        const savedCertificates = localStorage.getItem(
          certificateStorageKey
        );

        const parsedCertificates = savedCertificates
          ? JSON.parse(savedCertificates)
          : [];

        setCertificates(
          Array.isArray(parsedCertificates)
            ? parsedCertificates
            : []
        );

        const savedLearningHours = Number(
          localStorage.getItem(learningHoursStorageKey) || 0
        );

        const savedStreak = Number(
          localStorage.getItem(streakStorageKey) || 0
        );

        setLearningHours(
          Number.isFinite(savedLearningHours)
            ? savedLearningHours
            : 0
        );

        setCurrentStreak(
          Number.isFinite(savedStreak)
            ? savedStreak
            : 0
        );
      } catch (error) {
        console.error(
          "Could not load dashboard data:",
          error
        );

        setEnrollments([]);
        setCertificates([]);
        setLearningHours(0);
        setCurrentStreak(0);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();

    const handleDashboardUpdate = () => {
      loadDashboardData();
    };

    window.addEventListener(
      "storage",
      handleDashboardUpdate
    );

    window.addEventListener(
      "skillora-enrollment-updated",
      handleDashboardUpdate
    );

    window.addEventListener(
      "skillora-progress-updated",
      handleDashboardUpdate
    );

    window.addEventListener(
      "skillora-certificate-updated",
      handleDashboardUpdate
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleDashboardUpdate
      );

      window.removeEventListener(
        "skillora-enrollment-updated",
        handleDashboardUpdate
      );

      window.removeEventListener(
        "skillora-progress-updated",
        handleDashboardUpdate
      );

      window.removeEventListener(
        "skillora-certificate-updated",
        handleDashboardUpdate
      );
    };
  }, [
    enrollmentStorageKey,
    certificateStorageKey,
    learningHoursStorageKey,
    streakStorageKey,
  ]);

  const getCourseId = (item) => {
    return (
      item?.courseId ||
      item?.course?._id ||
      item?.course?.id ||
      item?._id ||
      item?.id ||
      item?.slug
    );
  };

  const getCourseData = (item) => {
    return item?.course || item;
  };

  const getProgressValue = (item) => {
    const rawProgress =
      item?.progressPercentage ??
      item?.progress ??
      item?.course?.progressPercentage ??
      item?.course?.progress ??
      0;

    const numericProgress =
      typeof rawProgress === "string"
        ? Number(rawProgress.replace("%", ""))
        : Number(rawProgress);

    if (!Number.isFinite(numericProgress)) {
      return 0;
    }

    return Math.min(
      100,
      Math.max(0, numericProgress)
    );
  };

  const isCompletedCourse = (item) => {
    const status = String(
      item?.status ||
        item?.course?.status ||
        ""
    ).toLowerCase();

    return (
      status === "completed" ||
      getProgressValue(item) >= 100
    );
  };

  const activeEnrollments = enrollments.filter(
    (item) => !isCompletedCourse(item)
  );

  const completedEnrollments = enrollments.filter(
    isCompletedCourse
  );

  const currentCourses = [...activeEnrollments]
    .sort((a, b) => {
      const firstDate = new Date(
        a?.updatedAt ||
          a?.lastAccessedAt ||
          a?.enrolledAt ||
          0
      ).getTime();

      const secondDate = new Date(
        b?.updatedAt ||
          b?.lastAccessedAt ||
          b?.enrolledAt ||
          0
      ).getTime();

      return secondDate - firstDate;
    })
    .slice(0, 3);

  const recentActivities = [...enrollments]
    .sort((a, b) => {
      const firstDate = new Date(
        a?.updatedAt ||
          a?.lastAccessedAt ||
          a?.enrolledAt ||
          0
      ).getTime();

      const secondDate = new Date(
        b?.updatedAt ||
          b?.lastAccessedAt ||
          b?.enrolledAt ||
          0
      ).getTime();

      return secondDate - firstDate;
    })
    .slice(0, 5);

  const dashboardStats = [
    {
      title: "Enrolled Courses",
      value: enrollments.length,
      note:
        activeEnrollments.length > 0
          ? `${activeEnrollments.length} currently active`
          : "No active courses",
      icon: <BookIcon />,
    },
    {
      title: "Completed",
      value: completedEnrollments.length,
      note:
        certificates.length > 0
          ? `${certificates.length} certificate available`
          : "No certificate yet",
      icon: <CompletedIcon />,
    },
    {
      title: "Learning Hours",
      value: `${learningHours}h`,
      note:
        learningHours > 0
          ? "Total learning time"
          : "Start a course to track time",
      icon: <ClockIcon />,
    },
    {
      title: "Current Streak",
      value: currentStreak,
      note:
        currentStreak > 0
          ? `${currentStreak} day learning streak`
          : "No active streak",
      icon: <StreakIcon />,
    },
  ];

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Welcome */}
      <section className="relative overflow-hidden rounded-[26px] border border-[var(--student-border)] bg-[var(--student-card)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-teal-500 sm:text-[11px]">
              Learning Overview
            </p>

            <h1 className="mt-2 text-2xl font-black leading-tight text-[var(--student-heading)] sm:text-3xl lg:text-[34px]">
              Welcome back,{" "}
              <span className="text-teal-500">
                {userName}
              </span>
            </h1>

            <p className="mt-3 max-w-xl text-[12px] leading-5 text-[var(--student-muted)] sm:text-[13px]">
              Continue your enrolled courses and monitor
              your actual learning progress from one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {activeEnrollments.length > 0 && (
              <Link
                to="/student/my-learning"
                className="rounded-xl bg-teal-400 px-5 py-2.5 text-[12px] font-black text-[#061311] transition hover:-translate-y-0.5 hover:bg-teal-300"
              >
                Continue Learning
              </Link>
            )}

            <Link
              to="/courses"
              className="rounded-xl border border-teal-400/25 px-5 py-2.5 text-[12px] font-black text-teal-500 transition hover:-translate-y-0.5 hover:bg-teal-400/10"
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {dashboardStats.map((item) => (
          <article
            key={item.title}
            className="rounded-[22px] border border-[var(--student-border)] bg-[var(--student-card)] p-4 backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-teal-400/30 hover:shadow-[0_16px_35px_rgba(45,212,191,0.08)] sm:p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold text-[var(--student-muted)] sm:text-[11px]">
                  {item.title}
                </p>

                <h2 className="mt-2 text-2xl font-black leading-none text-teal-500 sm:text-3xl">
                  {item.value}
                </h2>
              </div>

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-500">
                {item.icon}
              </div>
            </div>

            <p className="mt-3 text-[9px] font-semibold leading-4 text-teal-500/90 sm:text-[10px]">
              {item.note}
            </p>
          </article>
        ))}
      </section>

      {enrollments.length > 0 ? (
        <section className="grid gap-5 xl:grid-cols-[1.5fr_0.85fr]">
          {/* Active courses */}
          <article className="rounded-[26px] border border-[var(--student-border)] bg-[var(--student-card)] p-5 backdrop-blur-xl sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.16em] text-teal-500">
                  Current Learning
                </p>

                <h2 className="mt-1.5 text-lg font-black text-[var(--student-heading)] sm:text-xl">
                  Continue your courses
                </h2>
              </div>

              <Link
                to="/student/my-learning"
                className="text-[11px] font-bold text-teal-500 transition hover:text-teal-400"
              >
                View all →
              </Link>
            </div>

            {currentCourses.length > 0 ? (
              <div className="mt-5 space-y-4">
                {currentCourses.map((enrollment) => {
                  const course =
                    getCourseData(enrollment);

                  const courseId =
                    getCourseId(enrollment);

                  const progress =
                    getProgressValue(enrollment);

                  return (
                    <article
                      key={courseId}
                      className="grid gap-4 rounded-[20px] border border-[var(--student-border)] bg-[var(--student-soft)] p-4 transition hover:border-teal-400/25 md:grid-cols-[170px_minmax(0,1fr)]"
                    >
                      {course?.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={
                            course?.title ||
                            "Course thumbnail"
                          }
                          className="h-32 w-full rounded-2xl object-cover md:h-full"
                        />
                      ) : (
                        <div className="flex h-32 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-500 md:h-full">
                          <CourseIcon />
                        </div>
                      )}

                      <div className="flex min-w-0 flex-col justify-center">
                        <p className="text-[9px] font-black uppercase tracking-[0.12em] text-teal-500">
                          {course?.category ||
                            "Online Course"}
                        </p>

                        <h3 className="mt-2 line-clamp-2 text-[14px] font-black leading-5 text-[var(--student-heading)] sm:text-[15px]">
                          {course?.title ||
                            "Untitled Course"}
                        </h3>

                        {course?.instructor && (
                          <p className="mt-1 text-[10px] text-[var(--student-muted)]">
                            By {course.instructor}
                          </p>
                        )}

                        <div className="mt-4">
                          <div className="mb-2 flex items-center justify-between text-[10px] font-semibold text-[var(--student-muted)]">
                            <span>Course progress</span>

                            <span className="text-teal-500">
                              {progress}%
                            </span>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-black/10">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-teal-300 to-teal-500 transition-all duration-500"
                              style={{
                                width: `${progress}%`,
                              }}
                            />
                          </div>
                        </div>

                        <div className="mt-4">
                          <Link
                            to={`/student/learning/${courseId}`}
                            className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-4 py-2 text-[11px] font-black text-[#061311] transition hover:bg-teal-300"
                          >
                            Resume Course
                            <ArrowIcon />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <SmallEmptyState
                title="No active course"
                text="Your enrolled courses are already completed."
              />
            )}
          </article>

          {/* Recent activity */}
          <article className="rounded-[26px] border border-[var(--student-border)] bg-[var(--student-card)] p-5 backdrop-blur-xl sm:p-6">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-teal-500">
              Recent Activity
            </p>

            <h2 className="mt-1.5 text-lg font-black text-[var(--student-heading)] sm:text-xl">
              Learning updates
            </h2>

            <div className="mt-5 space-y-3">
              {recentActivities.map(
                (enrollment, index) => {
                  const course =
                    getCourseData(enrollment);

                  const courseId =
                    getCourseId(enrollment) ||
                    index;

                  const progress =
                    getProgressValue(enrollment);

                  const completed =
                    isCompletedCourse(enrollment);

                  return (
                    <div
                      key={courseId}
                      className="flex items-start gap-3 rounded-2xl border border-[var(--student-border)] bg-[var(--student-soft)] p-3.5"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-500">
                        {completed ? (
                          <CompletedIcon />
                        ) : (
                          <ActivityIcon />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="line-clamp-2 text-[12px] font-black leading-5 text-[var(--student-heading)]">
                          {course?.title ||
                            "Course activity"}
                        </h3>

                        <p className="mt-1 text-[10px] text-[var(--student-muted)]">
                          Progress: {progress}%
                        </p>

                        <p className="mt-1.5 text-[9px] font-bold text-teal-500">
                          {completed
                            ? "Course completed"
                            : "Learning in progress"}
                        </p>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </article>
        </section>
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
}

function EmptyDashboard() {
  return (
    <section className="rounded-[26px] border border-dashed border-[var(--student-border)] bg-[var(--student-card)] px-5 py-14 text-center backdrop-blur-xl sm:py-20">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-500">
        <CourseIcon />
      </div>

      <h2 className="mt-5 text-lg font-black text-[var(--student-heading)] sm:text-xl">
        No enrolled courses yet
      </h2>

      <p className="mx-auto mt-2 max-w-md text-[12px] leading-5 text-[var(--student-muted)] sm:text-[13px]">
        Courses will appear here after the user completes
        enrollment. No demo course is currently displayed.
      </p>

      <Link
        to="/courses"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-2.5 text-[12px] font-black text-[#061311] transition hover:-translate-y-0.5 hover:bg-teal-300"
      >
        Explore Courses
        <ArrowIcon />
      </Link>
    </section>
  );
}

function SmallEmptyState({ title, text }) {
  return (
    <div className="mt-5 rounded-2xl border border-dashed border-[var(--student-border)] bg-[var(--student-soft)] px-5 py-9 text-center">
      <p className="text-sm font-black text-[var(--student-heading)]">
        {title}
      </p>

      <p className="mt-2 text-[11px] leading-5 text-[var(--student-muted)]">
        {text}
      </p>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-5 sm:space-y-6">
      <div className="h-48 animate-pulse rounded-[26px] border border-[var(--student-border)] bg-[var(--student-card)]" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-[22px] border border-[var(--student-border)] bg-[var(--student-card)]"
          />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.5fr_0.85fr]">
        <div className="h-96 animate-pulse rounded-[26px] border border-[var(--student-border)] bg-[var(--student-card)]" />

        <div className="h-96 animate-pulse rounded-[26px] border border-[var(--student-border)] bg-[var(--student-card)]" />
      </div>
    </div>
  );
}

function BookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    </svg>
  );
}

function CompletedIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.5 2.5L16 9" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function StreakIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c4 0 7-2.8 7-7 0-3-1.5-5.3-4.2-8.2-.3 2.2-1.2 3.8-2.8 5.2.2-3.6-1.5-6.7-4.8-10C7.5 6 5 8.9 5 13.5 5 18.3 8 22 12 22Z" />
    </svg>
  );
}

function ActivityIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12h3l2-5 4 10 2-5h5" />
    </svg>
  );
}

function CourseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export default Dashboard;