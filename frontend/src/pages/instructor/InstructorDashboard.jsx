import { Link } from "react-router-dom";
import { courses, enrollments, messages } from "../../data/dummyData";

function InstructorDashboard() {
  const instructorCourses = courses.slice(0, 4);
  const totalStudents = instructorCourses.reduce(
    (sum, course) => sum + Number(course.students || 0),
    0
  );

  const recentEnrollments = enrollments.slice(0, 4);
  const recentMessages = messages.slice(0, 3);

  const quickLinks = [
    {
      title: "My Courses",
      text: "Manage published and pending courses",
      path: "/instructor/my-courses",
      icon: "📚",
    },
    {
      title: "Add Course",
      text: "Submit new course for admin approval",
      path: "/instructor/courses/add",
      icon: "+",
    },
    {
      title: "Students",
      text: "Track enrolled students",
      path: "/instructor/students",
      icon: "👥",
    },
    {
      title: "Earnings",
      text: "View payouts and sales",
      path: "/instructor/earnings",
      icon: "$",
    },
    {
      title: "Reviews",
      text: "Read course feedback",
      path: "/instructor/reviews",
      icon: "★",
    },
    {
      title: "Messages",
      text: "Reply to student messages",
      path: "/instructor/messages",
      icon: "✉",
    },
    {
      title: "Settings",
      text: "Update instructor profile",
      path: "/instructor/settings",
      icon: "⚙",
    },
    {
      title: "Explore Courses",
      text: "View public course page",
      path: "/courses",
      icon: "✦",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl p-6 lg:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-teal-500">
              INSTRUCTOR DASHBOARD
            </p>

            <h1 className="text-4xl lg:text-5xl font-black mt-3 text-[var(--instructor-heading)]">
              Welcome back, <span className="text-teal-500">Instructor</span>
            </h1>

            <p className="text-[var(--instructor-muted)] mt-4 max-w-2xl leading-7">
              Manage your courses, students, earnings, reviews, messages, and
              profile from one instructor control center.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/instructor/courses/add"
              className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
            >
              Add New Course
            </Link>

            <Link
              to="/instructor/my-courses"
              className="px-6 py-3 rounded-full border border-teal-400/30 text-teal-500 hover:bg-teal-400/10 transition"
            >
              My Courses
            </Link>
          </div>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          ["Total Courses", instructorCourses.length, "+2 this month"],
          ["Total Students", `${totalStudents}+`, "+18% growth"],
          ["Total Earnings", "$4,820", "+9.4% this month"],
          ["Pending Reviews", "6", "Need response"],
        ].map(([title, value, note]) => (
          <div
            key={title}
            className="rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl p-6 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-[0_0_38px_rgba(45,212,191,0.14)] transition"
          >
            <p className="text-sm text-[var(--instructor-muted)]">{title}</p>

            <h2 className="text-4xl font-black text-teal-500 mt-3">
              {value}
            </h2>

            <p className="text-xs text-teal-500 mt-2">{note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl p-6">
        <p className="text-sm font-semibold text-teal-500">
          INSTRUCTOR CONTROL CENTER
        </p>

        <h2 className="text-2xl font-bold mt-2 mb-6 text-[var(--instructor-heading)]">
          Quick Access
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="group rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-soft)] p-5 hover:-translate-y-1 hover:border-teal-400/40 hover:bg-teal-400/5 hover:shadow-[0_0_35px_rgba(45,212,191,0.14)] transition"
            >
              <div className="w-12 h-12 rounded-full bg-white text-[#061311] flex items-center justify-center text-xl font-black shadow-sm group-hover:bg-teal-400 transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold mt-5 text-[var(--instructor-heading)] group-hover:text-teal-500 transition">
                {item.title}
              </h3>

              <p className="text-sm text-[var(--instructor-muted)] mt-2">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-teal-500">
                COURSE PERFORMANCE
              </p>

              <h2 className="text-2xl font-bold mt-2 text-[var(--instructor-heading)]">
                Your active courses
              </h2>
            </div>

            <Link
              to="/instructor/my-courses"
              className="text-sm text-teal-500 hover:text-white"
            >
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {instructorCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-2xl border border-[var(--instructor-border)] bg-[var(--instructor-soft)] p-4 hover:border-teal-400/25 hover:bg-teal-400/5 transition"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-36 object-cover rounded-xl border border-teal-400/20"
                />

                <h3 className="font-bold mt-4 text-[var(--instructor-heading)]">
                  {course.title}
                </h3>

                <p className="text-sm text-[var(--instructor-muted)] mt-1">
                  {course.students}+ students · ⭐ {course.rating}
                </p>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-[var(--instructor-muted)] mb-2">
                    <span>Completion</span>
                    <span>68%</span>
                  </div>

                  <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                    <div className="h-full w-[68%] bg-teal-400 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl p-6">
          <p className="text-sm font-semibold text-teal-500">
            RECENT ACTIVITY
          </p>

          <h2 className="text-2xl font-bold mt-2 mb-6 text-[var(--instructor-heading)]">
            Student updates
          </h2>

          <div className="space-y-4">
            {recentEnrollments.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--instructor-border)] bg-[var(--instructor-soft)] p-4"
              >
                <h3 className="font-semibold text-[var(--instructor-heading)]">
                  {item.student}
                </h3>

                <p className="text-sm text-[var(--instructor-muted)] mt-1">
                  {item.course}
                </p>

                <p className="text-xs text-teal-500 mt-2">
                  Progress: {item.progress}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-sm font-semibold text-teal-500">MESSAGES</p>

            <h2 className="text-2xl font-bold mt-2 text-[var(--instructor-heading)]">
              Recent messages
            </h2>
          </div>

          <Link
            to="/instructor/messages"
            className="text-sm text-teal-500 hover:text-white"
          >
            Open inbox →
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {recentMessages.map((message) => (
            <div
              key={message.id}
              className="rounded-2xl border border-[var(--instructor-border)] bg-[var(--instructor-soft)] p-4"
            >
              <h3 className="font-semibold text-[var(--instructor-heading)]">
                {message.sender}
              </h3>

              <p className="text-sm text-teal-500 mt-1">{message.subject}</p>

              <p className="text-sm text-[var(--instructor-muted)] mt-2 line-clamp-2">
                {message.message}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default InstructorDashboard;