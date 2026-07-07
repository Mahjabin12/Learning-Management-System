import { Link } from "react-router-dom";
import { courses } from "../../data/dummyData";

function Wishlist() {
  const wishlist = courses.slice(2, 6);

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">WISHLIST</p>
        <h1 className="text-4xl font-black mt-2">Saved Courses</h1>
        <p className="text-slate-400 mt-3 mb-8">
          Keep track of courses you want to enroll in later.
        </p>

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {wishlist.map((course) => (
            <article
              key={course.id}
              className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-5 hover:-translate-y-1 hover:border-teal-400/40 transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-2xl border border-teal-400/20"
              />

              <h2 className="font-bold mt-4">{course.title}</h2>
              <p className="text-sm text-slate-400 mt-2">{course.category}</p>

              <div className="flex items-center justify-between mt-5">
                <span className="text-teal-400 font-black">
                  ${course.price}
                </span>

                <Link
                  to={`/courses/${course.id}`}
                  className="px-3 py-2 rounded-xl bg-teal-400 text-[#061311] text-xs font-bold hover:bg-white transition"
                >
                  View
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Wishlist;