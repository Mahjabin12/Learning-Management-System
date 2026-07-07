function InstructorAddCourse() {
  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">
          SUBMIT COURSE
        </p>

        <h1 className="text-4xl font-black mt-2">
          Add New Course
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Submit a new course for admin approval. Once approved, it will appear
          on the course page.
        </p>

        <form className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder="Course title"
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
            />

            <select className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50">
              <option>Figma Design</option>
              <option>Canva Design</option>
              <option>UI/UX Design</option>
              <option>Digital Marketing</option>
              <option>Logo & Branding</option>
            </select>

            <input
              type="number"
              placeholder="Price"
              className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
            />

            <select className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none focus:border-teal-400/50">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <input
            type="text"
            placeholder="Thumbnail URL"
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
          />

          <textarea
            rows="5"
            placeholder="Course description"
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
          />

          <textarea
            rows="4"
            placeholder="Lessons / curriculum"
            className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
          />

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
            >
              Submit for Approval
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded-full border border-teal-400/30 text-teal-300 hover:bg-teal-400/10 transition"
            >
              Save Draft
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default InstructorAddCourse;