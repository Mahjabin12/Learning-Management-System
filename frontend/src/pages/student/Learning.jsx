import { useParams } from "react-router-dom";
import { courses } from "../../data/dummyData";

function Learning() {
  const { courseId } = useParams();
  const course =
    courses.find((item) => String(item.id) === courseId) || courses[0];

  const lessons = course.lessons || [
    "Introduction",
    "Tools and workflow",
    "Practical project",
    "Final task",
  ];

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <p className="text-sm font-semibold text-teal-400">COURSE PLAYER</p>
          <h1 className="text-4xl font-black mt-2">{course.title}</h1>
          <p className="text-slate-400 mt-3 mb-8">{course.description}</p>

          <div className="rounded-3xl border border-teal-400/15 bg-black/40 backdrop-blur-xl p-4">
            <div className="aspect-video rounded-2xl bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.18),transparent_35%),#020807] border border-teal-400/15 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-teal-400 text-[#061311] font-black hover:bg-white transition">
                ▶
              </button>
            </div>
          </div>

          <section className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 mt-8">
            <h2 className="text-2xl font-bold">Lesson Notes</h2>
            <p className="text-slate-400 leading-7 mt-4">
              This lesson focuses on practical workflow, project-based learning,
              and real-world application. Follow the lesson, complete the tasks,
              and update your progress.
            </p>
          </section>
        </div>

        <aside className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 h-fit">
          <p className="text-sm font-semibold text-teal-400">CURRICULUM</p>
          <h2 className="text-2xl font-bold mt-2 mb-5">Course Lessons</h2>

          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <button
                key={`${lesson}-${index}`}
                type="button"
                className={`w-full text-left rounded-2xl border p-4 transition ${
                  index === 0
                    ? "border-teal-400/40 bg-teal-400/10 text-teal-300"
                    : "border-white/5 bg-white/5 text-slate-300 hover:border-teal-400/25 hover:bg-teal-400/5"
                }`}
              >
                <span className="text-sm">
                  {index + 1}. {lesson}
                </span>
              </button>
            ))}
          </div>

          <button className="w-full mt-6 px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
            Mark as Complete
          </button>
        </aside>
      </section>
    </main>
  );
}

export default Learning;