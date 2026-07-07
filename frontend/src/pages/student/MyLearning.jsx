import { Link } from "react-router-dom";
import { courses } from "../../data/dummyData";

function MyLearning() {
  const enrolledCourses = courses.slice(0, 6);
  const progressList = [72, 48, 100, 35, 86, 22];

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-semibold text-teal-500">MY LEARNING</p>
          <h1 className="text-4xl font-black mt-2 text-[var(--student-heading)]">
            My Courses
          </h1>
          <p className="text-[var(--student-muted)] mt-3">
            Continue lessons, track progress, and complete your skill roadmap.
          </p>
        </div>

        <Link
          to="/courses"
          className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
        >
          Explore More
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {enrolledCourses.map((course, index) => {
          const progress = progressList[index] || 50;

          return (
            <article
              key={course.id}
              className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-5 hover:-translate-y-1 hover:border-teal-400/40 transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-44 object-cover rounded-2xl border border-teal-400/20"
              />

              <div className="mt-5">
                <span className="text-xs px-3 py-1 rounded-full bg-teal-400/10 text-teal-500 border border-teal-400/20">
                  {progress === 100 ? "Completed" : "In Progress"}
                </span>

                <h2 className="text-xl font-bold mt-4 text-[var(--student-heading)]">
                  {course.title}
                </h2>
                <p className="text-sm text-[var(--student-muted)] mt-2">
                  {course.category}
                </p>

                <div className="mt-5">
                  <div className="flex justify-between text-xs text-[var(--student-muted)] mb-2">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>

                  <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-teal-400"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <Link
                  to={`/student/learning/${course.id}`}
                  className="inline-block mt-5 px-4 py-2 rounded-xl bg-teal-400 text-[#061311] text-sm font-bold hover:bg-white transition"
                >
                  {progress === 100 ? "Review Course" : "Continue"}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default MyLearning;