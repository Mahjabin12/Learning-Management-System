import { courses } from "../../data/dummyData";

function Certificates() {
  const completedCourses = courses.slice(0, 3);

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">CERTIFICATES</p>
        <h1 className="text-4xl font-black mt-2">My Certificates</h1>
        <p className="text-slate-400 mt-3 mb-8">
          View and download certificates after admin approval.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {completedCourses.map((course, index) => (
            <article
              key={course.id}
              className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 hover:-translate-y-1 hover:border-teal-400/40 transition"
            >
              <div className="rounded-2xl border border-teal-400/25 bg-[radial-gradient(circle_at_top_right,rgba(45,212,191,0.16),transparent_35%),#07110f] p-6 text-center">
                <p className="text-sm text-teal-300">Certificate of Completion</p>
                <h2 className="text-2xl font-black mt-5">{course.title}</h2>
                <p className="text-slate-400 mt-3">
                  Awarded to Student User
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs border ${
                    index === 0
                      ? "bg-teal-400/10 text-teal-300 border-teal-400/20"
                      : "bg-yellow-400/10 text-yellow-300 border-yellow-400/20"
                  }`}
                >
                  {index === 0 ? "Issued" : "Pending Approval"}
                </span>

                <button className="px-4 py-2 rounded-xl bg-teal-400 text-[#061311] text-sm font-bold hover:bg-white transition">
                  Download
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Certificates;