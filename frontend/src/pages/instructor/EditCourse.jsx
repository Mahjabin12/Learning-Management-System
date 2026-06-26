import { useParams } from "react-router-dom";
import { courses } from "../../data/dummyData";

function InstructorEditCourse() {
  const { id } = useParams();
  const course = courses.find((item) => String(item.id) === id) || courses[0];

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">
          EDIT COURSE
        </p>

        <h1 className="text-4xl font-black mt-2">
          Edit Course
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Update your course details. Major changes may require admin approval.
        </p>

        <form className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              defaultValue={course.title}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50"
            />

            <input
              type="text"
              defaultValue={course.category}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50"
            />

            <input
              type="number"
              defaultValue={course.price}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50"
            />

            <input
              type="text"
              defaultValue={course.level}
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50"
            />
          </div>

          <input
            type="text"
            defaultValue={course.thumbnail}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50"
          />

          <textarea
            rows="5"
            defaultValue={course.description}
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50"
          />

          <button
            type="button"
            className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
          >
            Submit Update
          </button>
        </form>
      </section>
    </main>
  );
}

export default InstructorEditCourse;