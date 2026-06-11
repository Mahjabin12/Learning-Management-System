import { useParams } from "react-router-dom";
import { courses } from "../../data/dummyData";

function Learning() {
  const { courseId } = useParams();
  const course =
    courses.find((item) => item.id === Number(courseId)) || courses[0];

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-4 gap-8">
      <section className="lg:col-span-3">
        <div className="bg-slate-950 h-[430px] rounded-2xl flex items-center justify-center text-white text-6xl">
          ▶
        </div>

        <h1 className="text-3xl font-bold text-slate-950 mt-8">
          {course.title}
        </h1>

        <p className="text-slate-600 mt-4 leading-7">{course.description}</p>

        <div className="mt-8 border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-950">
            Current Lesson Notes
          </h2>

          <p className="text-slate-600 mt-3 leading-7">
            Watch the lesson carefully, take notes, and complete the practice
            task before moving to the next lesson.
          </p>
        </div>
      </section>

      <aside className="border border-slate-200 rounded-2xl p-6 h-fit">
        <h2 className="text-xl font-bold text-slate-950">Course Lessons</h2>

        <div className="w-full h-3 bg-slate-200 rounded-full mt-5">
          <div className="w-1/2 h-3 bg-blue-600 rounded-full"></div>
        </div>

        <p className="text-sm text-slate-500 mt-2">50% completed</p>

        <div className="space-y-3 mt-6">
          {course.lessons.map((lesson, index) => (
            <button
              key={lesson}
              className="w-full text-left border border-slate-200 rounded-lg px-4 py-3 hover:bg-slate-50 text-sm"
            >
              {index + 1}. {lesson}
            </button>
          ))}
        </div>
      </aside>
    </main>
  );
}

export default Learning;