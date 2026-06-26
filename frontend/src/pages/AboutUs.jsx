function AboutUs() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-16">
      <section className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-blue-600 font-semibold text-sm">ABOUT BYWAY</p>

          <h1 className="text-4xl font-bold text-slate-950 mt-3">
            A modern LMS for structured online learning
          </h1>

          <p className="text-slate-600 leading-7 mt-5">
            Byway is a learning management platform where students can explore
            courses, enroll in learning programs, track progress, and complete
            structured lessons. The system also provides an admin dashboard for
            managing courses, users, enrollments, payments, and announcements.
          </p>
        </div>

        <img
          src="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=900"
          alt="About Byway"
          className="rounded-3xl shadow-lg w-full h-[420px] object-cover"
        />
      </section>
    </main>
  );
}

export default AboutUs;