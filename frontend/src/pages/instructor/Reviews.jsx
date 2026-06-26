function InstructorReviews() {
  const reviews = [
    ["Sarah Ahmed", "Figma UI Design Beginner", "Excellent course and clear explanation.", "5.0"],
    ["Mahin Khan", "Canva Social Media Design", "Very practical lessons for freelancing.", "4.8"],
    ["Nusrat Jahan", "UI/UX Portfolio Project", "Loved the project-based approach.", "4.9"],
  ];

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">
          STUDENT REVIEWS
        </p>

        <h1 className="text-4xl font-black mt-2">
          Course Reviews
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Read student feedback and improve your course quality.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {reviews.map(([student, course, comment, rating]) => (
            <article
              key={student}
              className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 hover:-translate-y-1 hover:border-teal-400/40 transition"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{student}</h2>
                <span className="text-teal-400 font-bold">⭐ {rating}</span>
              </div>

              <p className="text-sm text-teal-300 mt-2">{course}</p>

              <p className="text-slate-400 leading-7 mt-5">
                “{comment}”
              </p>

              <button className="mt-5 px-4 py-2 rounded-xl border border-teal-400/25 text-teal-300 hover:bg-teal-400/10 transition">
                Reply
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default InstructorReviews;