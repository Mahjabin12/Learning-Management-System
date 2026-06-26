import { Link } from "react-router-dom";
import { courses, enrollments } from "../../data/dummyData";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const learningCourses = courses.slice(0, 3);
  const recentEnrollments = enrollments.slice(0, 4);

  const quickLinks = [
    { title: "My Learning", text: "Continue enrolled courses", path: "/student/my-learning", icon: "📚" },
    { title: "Cart", text: "Review selected courses", path: "/student/cart", icon: "🛒" },
    { title: "Wishlist", text: "Saved courses", path: "/student/wishlist", icon: "♡" },
    { title: "Certificates", text: "Download certificates", path: "/student/certificates", icon: "🏆" },
    { title: "Notifications", text: "Course and certificate alerts", path: "/student/notifications", icon: "🔔" },
    { title: "Profile", text: "Student personal details", path: "/student/profile", icon: "👤" },
    { title: "Settings", text: "Password and preferences", path: "/student/settings", icon: "⚙" },
    { title: "Explore Courses", text: "Find new skill courses", path: "/courses", icon: "✦" },
  ];

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6 lg:p-8 shadow-[0_22px_60px_rgba(0,0,0,0.18)]">
        <p className="text-sm font-semibold text-teal-500">STUDENT DASHBOARD</p>

        <h1 className="text-4xl lg:text-5xl font-black mt-3 text-[var(--student-heading)]">
          Welcome back,{" "}
          <span className="text-teal-500">{user?.name || "Student"}</span>
        </h1>

        <p className="text-[var(--student-muted)] mt-4 max-w-2xl leading-7">
          Continue learning, manage your cart, track certificates, view
          notifications, and control your profile from one place.
        </p>

        <div className="flex flex-wrap gap-3 mt-7">
          <Link
            to="/student/my-learning"
            className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
          >
            Continue Learning
          </Link>

          <Link
            to="/courses"
            className="px-6 py-3 rounded-full border border-teal-400/30 text-teal-500 hover:bg-teal-400/10 transition"
          >
            Explore Courses
          </Link>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          ["Enrolled Courses", "6", "2 active this week"],
          ["Completed", "3", "Certificates available"],
          ["Learning Hours", "42h", "+8h this month"],
          ["Wishlist", "5", "Saved courses"],
        ].map(([title, value, note]) => (
          <div
            key={title}
            className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6 hover:-translate-y-1 hover:border-teal-400/40 hover:shadow-[0_0_38px_rgba(45,212,191,0.14)] transition"
          >
            <p className="text-sm text-[var(--student-muted)]">{title}</p>
            <h2 className="text-4xl font-black text-teal-500 mt-3">{value}</h2>
            <p className="text-xs text-teal-500 mt-2">{note}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6">
        <p className="text-sm font-semibold text-teal-500">STUDENT CONTROL CENTER</p>
        <h2 className="text-2xl font-bold mt-2 mb-6 text-[var(--student-heading)]">
          Quick Access
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className="group rounded-3xl border border-[var(--student-border)] bg-[var(--student-soft)] p-5 hover:-translate-y-1 hover:border-teal-400/40 hover:bg-teal-400/5 hover:shadow-[0_0_35px_rgba(45,212,191,0.14)] transition"
            >
              <div className="w-12 h-12 rounded-full bg-white text-[#061311] flex items-center justify-center text-xl shadow-sm group-hover:bg-teal-400 transition">
                {item.icon}
              </div>

              <h3 className="text-lg font-bold mt-5 text-[var(--student-heading)] group-hover:text-teal-500 transition">
                {item.title}
              </h3>

              <p className="text-sm text-[var(--student-muted)] mt-2">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm font-semibold text-teal-500">CURRENT LEARNING</p>
              <h2 className="text-2xl font-bold mt-2 text-[var(--student-heading)]">
                Continue your courses
              </h2>
            </div>

            <Link to="/student/my-learning" className="text-sm text-teal-500 hover:text-white">
              View all →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {learningCourses.map((course) => (
              <article
                key={course.id}
                className="rounded-2xl border border-[var(--student-border)] bg-[var(--student-soft)] p-4 hover:border-teal-400/25 hover:bg-teal-400/5 transition"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-36 object-cover rounded-xl border border-teal-400/20"
                />

                <h3 className="font-bold mt-4 text-[var(--student-heading)]">{course.title}</h3>
                <p className="text-sm text-[var(--student-muted)] mt-1">{course.category}</p>

                <div className="mt-4">
                  <div className="flex justify-between text-xs text-[var(--student-muted)] mb-2">
                    <span>Progress</span>
                    <span>64%</span>
                  </div>
                  <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                    <div className="h-full w-[64%] bg-teal-400 rounded-full" />
                  </div>
                </div>

                <Link
                  to={`/student/learning/${course.id}`}
                  className="inline-block mt-4 px-4 py-2 rounded-xl bg-teal-400 text-[#061311] text-sm font-bold hover:bg-white transition"
                >
                  Resume
                </Link>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6">
          <p className="text-sm font-semibold text-teal-500">RECENT ACTIVITY</p>
          <h2 className="text-2xl font-bold mt-2 mb-6 text-[var(--student-heading)]">
            Learning updates
          </h2>

          <div className="space-y-4">
            {recentEnrollments.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--student-border)] bg-[var(--student-soft)] p-4"
              >
                <h3 className="font-semibold text-[var(--student-heading)]">{item.course}</h3>
                <p className="text-sm text-[var(--student-muted)] mt-1">
                  Progress: {item.progress}
                </p>
                <p className="text-xs text-teal-500 mt-2">{item.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;