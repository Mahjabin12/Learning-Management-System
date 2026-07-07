function InstructorSettings() {
  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">
          INSTRUCTOR SETTINGS
        </p>

        <h1 className="text-4xl font-black mt-2">
          Profile Settings
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Update instructor profile, teaching information, and account security.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              Profile Information
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                defaultValue="Instructor"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none"
              />

              <input
                type="email"
                defaultValue="ins@lms.com"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none"
              />

              <input
                type="text"
                defaultValue="Creative Design Instructor"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none"
              />

              <textarea
                rows="4"
                defaultValue="I teach practical design and digital skills for career growth."
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white outline-none"
              />

              <button className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
                Save Profile
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold mb-5">
              Security
            </h2>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current password"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none"
              />

              <input
                type="password"
                placeholder="New password"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none"
              />

              <input
                type="password"
                placeholder="Confirm password"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none"
              />

              <button className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
                Update Password
              </button>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default InstructorSettings;