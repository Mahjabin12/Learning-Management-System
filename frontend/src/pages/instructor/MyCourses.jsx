import { Link } from "react-router-dom";
import { courses } from "../../data/dummyData";

function MyCourses() {
  const instructorCourses = courses.slice(0, 6);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-semibold text-teal-500">
            INSTRUCTOR COURSES
          </p>

          <h1 className="text-4xl font-black mt-2 text-[var(--instructor-heading)]">
            My Courses
          </h1>

          <p className="text-[var(--instructor-muted)] mt-3">
            Manage your published, draft, and pending approval courses.
          </p>
        </div>

        <Link
          to="/instructor/courses/add"
          className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
        >
          Add Course
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {instructorCourses.map((course) => (
          <article
            key={course.id}
            className="rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl p-5 hover:-translate-y-1 hover:border-teal-400/40 transition"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-44 object-cover rounded-2xl border border-teal-400/20"
            />

            <div className="mt-5">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs px-3 py-1 rounded-full bg-teal-400/10 text-teal-500 border border-teal-400/20">
                  {course.status || "Published"}
                </span>

                <span className="text-sm text-[var(--instructor-muted)]">
                  {course.students}+ students
                </span>
              </div>

              <h2 className="text-xl font-bold mt-4 text-[var(--instructor-heading)]">
                {course.title}
              </h2>

              <p className="text-sm text-[var(--instructor-muted)] mt-2">
                {course.category}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <Link
                  to={`/instructor/courses/edit/${course.id}`}
                  className="px-4 py-2 rounded-xl bg-teal-400 text-[#061311] text-sm font-bold hover:bg-white transition"
                >
                  Edit
                </Link>

                <button className="px-4 py-2 rounded-xl border border-teal-400/25 text-teal-500 text-sm hover:bg-teal-400/10 transition">
                  Analytics
                </button>

                <button className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-400/20 text-sm hover:bg-red-500/20 transition">
                  Remove
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default MyCourses;