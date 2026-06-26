import { Link } from "react-router-dom";

function About() {
  return (
    <section className="relative bg-[#061311] py-24">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#0f766e44,transparent_35%)]" />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE PART */}
        <div className="relative">
          <div className="border-2 border-teal-400 rounded-xl p-4 max-w-md mx-auto">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80"
              alt="About LMS"
              className="rounded-lg w-full h-[360px] sm:h-[430px] object-cover"
            />
          </div>
        </div>

        {/* TEXT PART */}
        <div>
          <p className="text-teal-400 font-semibold text-sm">About Us</p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 leading-tight">
            Empowering Students Through{" "}
            <span className="text-teal-400">Smart Online Learning</span>
          </h2>

          <p className="text-slate-400 leading-7 mt-5 text-sm sm:text-base">
            Our LMS is designed to make online education simple, structured,
            and accessible. Students can explore courses, enroll, and track progress easily.
          </p>

          {/* FEATURES */}
          <div className="space-y-4 mt-8">

            <div className="flex gap-4 bg-white/10 border border-white/10 rounded-xl p-5">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                🎯
              </div>
              <div>
                <h3 className="font-bold">Our Mission</h3>
                <p className="text-sm text-slate-400 mt-1">
                  To provide flexible and career-focused learning.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white/10 border border-white/10 rounded-xl p-5">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                📚
              </div>
              <div>
                <h3 className="font-bold">Structured Learning</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Courses with lessons and progress tracking.
                </p>
              </div>
            </div>

            <div className="flex gap-4 bg-white/10 border border-white/10 rounded-xl p-5">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                🔐
              </div>
              <div>
                <h3 className="font-bold">Secure Access</h3>
                <p className="text-sm text-slate-400 mt-1">
                  Role-based dashboards for students and admins.
                </p>
              </div>
            </div>

          </div>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/about"
              className="px-6 py-3 bg-teal-500 text-[#061311] rounded-md font-bold hover:bg-teal-400 transition"
            >
              Learn More
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 border border-teal-500 text-teal-400 rounded-md font-bold hover:bg-teal-500 hover:text-[#061311] transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}

export default About;
