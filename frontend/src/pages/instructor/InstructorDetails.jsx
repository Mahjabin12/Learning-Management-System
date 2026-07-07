import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { instructors, courses } from "../../data/dummyData";
import CourseCard from "../../components/common/CourseCard";

function InstructorDetails() {
  const { id } = useParams();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const handleTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", handleTheme);
    window.addEventListener("storage", handleTheme);

    return () => {
      window.removeEventListener("themechange", handleTheme);
      window.removeEventListener("storage", handleTheme);
    };
  }, []);

  const isDark = theme === "dark";

  const instructor =
    instructors.find((item) => String(item.id) === id) || instructors[0];

  const instructorCourses = courses.filter(
    (course) => course.instructor === instructor.name
  );

  const pageClass = isDark
    ? "bg-[#061311] text-white"
    : "bg-[#e8f3ee] text-[#061311]";

  const heroClass = isDark
    ? "bg-[#071715] border-white/10"
    : "bg-[#f2faf6] border-emerald-900/10";

  const cardClass = isDark
    ? "bg-white/[0.05] border-white/10 backdrop-blur-xl"
    : "bg-white/75 border-emerald-900/10 backdrop-blur-xl shadow-lg";

  const mutedText = isDark
    ? "text-white/60"
    : "text-slate-600";

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${pageClass}`}
    >
      <section
        className={`border-b transition-colors duration-500 ${heroClass}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 grid lg:grid-cols-3 gap-12 items-center">

          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src={instructor.image}
                alt={instructor.name}
                className="w-64 h-64 lg:w-72 lg:h-72 rounded-3xl object-cover border-4 border-teal-400 shadow-[0_20px_60px_rgba(20,184,166,0.30)]"
              />

              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-teal-400 text-[#061311] px-6 py-2 rounded-full font-bold shadow-lg">
                ⭐ {instructor.rating}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">

            <span className="inline-flex items-center px-4 py-2 rounded-full bg-teal-400/20 text-teal-400 text-xs font-bold uppercase tracking-[0.2em]">
              Instructor Profile
            </span>

            <h1
              className={`text-4xl lg:text-5xl font-black mt-5 ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              {instructor.name}
            </h1>

            <p className="text-xl font-semibold text-teal-400 mt-3">
              {instructor.role}
            </p>

            <p className={`mt-6 leading-8 max-w-3xl ${mutedText}`}>
              {instructor.bio}
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">

              <div className={`rounded-2xl p-5 border ${cardClass}`}>
                <h3 className="text-3xl font-black text-teal-400">
                  ⭐ {instructor.rating}
                </h3>

                <p className={mutedText}>
                  Average Rating
                </p>
              </div>

              <div className={`rounded-2xl p-5 border ${cardClass}`}>
                <h3 className="text-3xl font-black text-teal-400">
                  {instructor.students}+
                </h3>

                <p className={mutedText}>
                  Students
                </p>
              </div>

              <div className={`rounded-2xl p-5 border ${cardClass}`}>
                <h3 className="text-3xl font-black text-teal-400">
                  {instructorCourses.length}
                </h3>

                <p className={mutedText}>
                  Courses
                </p>
              </div>

              <div className={`rounded-2xl p-5 border ${cardClass}`}>
                <h3 className="text-lg font-black text-teal-400">
                  {instructor.specialty}
                </h3>

                <p className={mutedText}>
                  Specialty
                </p>
              </div>

            </div>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/courses"
                className="px-8 py-3 rounded-xl bg-teal-400 text-[#061311] font-bold hover:scale-105 transition"
              >
                Browse Courses
              </Link>

              <Link
                to="/instructors"
                className={`px-8 py-3 rounded-xl border font-bold transition ${
                  isDark
                    ? "border-white/10 hover:bg-white/10"
                    : "border-slate-300 hover:bg-slate-100"
                }`}
              >
                Back to Instructors
              </Link>

            </div>

          </div>

        </div>
      </section>
            <section className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">

        {/* Left Content */}

        <div className="lg:col-span-2">

          <div className={`rounded-3xl border p-8 mb-8 ${cardClass}`}>

            <h2
              className={`text-3xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              About This Instructor
            </h2>

            <p className={`mt-6 leading-8 ${mutedText}`}>
              {instructor.name} believes that learning should always be practical,
              engaging, and career-oriented. Every lesson is designed to help
              students gain real-world experience instead of memorizing theory.
            </p>

            <p className={`mt-5 leading-8 ${mutedText}`}>
              Through hands-on projects, portfolio development, and real client
              workflows, students build confidence while mastering modern design
              and digital skills that employers actually value.
            </p>

          </div>

          <div className={`rounded-3xl border p-8 ${cardClass}`}>

            <h2
              className={`text-3xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Teaching Areas
            </h2>

            <div className="grid sm:grid-cols-2 gap-5 mt-8">

              {[
                instructor.specialty,
                "UI / UX Design",
                "Practical Projects",
                "Portfolio Building",
                "Career Preparation",
                "Industry Workflow",
                "Freelancing",
                "Creative Thinking",
              ].map((item) => (

                <div
                  key={item}
                  className={`rounded-2xl border p-5 transition hover:-translate-y-2 hover:border-teal-400 ${cardClass}`}
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center font-bold text-[#061311]">
                      ✓
                    </div>

                    <p
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-[#061311]"
                      }`}
                    >
                      {item}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Sidebar */}

        <aside>

          <div className={`sticky top-24 rounded-3xl border p-8 ${cardClass}`}>

            <h3
              className={`text-2xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Instructor Summary
            </h3>

            <div className="space-y-6 mt-8">

              <div>
                <p className="text-teal-400 text-sm uppercase font-bold">
                  Name
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  {instructor.name}
                </p>
              </div>

              <div>
                <p className="text-teal-400 text-sm uppercase font-bold">
                  Role
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  {instructor.role}
                </p>
              </div>

              <div>
                <p className="text-teal-400 text-sm uppercase font-bold">
                  Specialty
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  {instructor.specialty}
                </p>
              </div>

              <div>
                <p className="text-teal-400 text-sm uppercase font-bold">
                  Students
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  {instructor.students}+
                </p>
              </div>

              <div>
                <p className="text-teal-400 text-sm uppercase font-bold">
                  Courses
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  {instructorCourses.length}
                </p>
              </div>

              <div>
                <p className="text-teal-400 text-sm uppercase font-bold">
                  Rating
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    isDark ? "text-white" : "text-[#061311]"
                  }`}
                >
                  ⭐ {instructor.rating}
                </p>
              </div>

            </div>

          </div>

        </aside>

      </section>
            {/* Instructor Achievements */}

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="text-center mb-12">

          <span className="text-teal-400 uppercase tracking-[0.2em] text-sm font-bold">
            Achievements
          </span>

          <h2
            className={`text-4xl font-black mt-4 ${
              isDark ? "text-white" : "text-[#061311]"
            }`}
          >
            Professional Highlights
          </h2>

          <p className={`mt-4 max-w-2xl mx-auto ${mutedText}`}>
            Dedicated to delivering high-quality education through practical
            projects, real-world experience, and industry best practices.
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              title: "10+ Years",
              desc: "Industry Experience",
              icon: "💼",
            },
            {
              title: "500+",
              desc: "Happy Students",
              icon: "🎓",
            },
            {
              title: "4.9/5",
              desc: "Average Rating",
              icon: "⭐",
            },
            {
              title: "100%",
              desc: "Practical Learning",
              icon: "🚀",
            },
          ].map((item) => (

            <div
              key={item.title}
              className={`rounded-3xl border p-8 text-center transition-all duration-300 hover:-translate-y-3 hover:border-teal-400 ${cardClass}`}
            >

              <div className="text-5xl">
                {item.icon}
              </div>

              <h3 className="text-3xl font-black text-teal-400 mt-5">
                {item.title}
              </h3>

              <p className={`mt-3 ${mutedText}`}>
                {item.desc}
              </p>

            </div>

          ))}

        </div>

      </section>





      {/* Student Reviews */}

      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="text-center mb-12">

          <span className="text-teal-400 uppercase tracking-[0.2em] text-sm font-bold">
            Testimonials
          </span>

          <h2
            className={`text-4xl font-black mt-4 ${
              isDark ? "text-white" : "text-[#061311]"
            }`}
          >
            What Students Say
          </h2>

        </div>

        <div className="grid lg:grid-cols-3 gap-6">

          {[
            {
              name: "Sarah Ahmed",
              review:
                "One of the best instructors I have ever learned from. The teaching style is simple, practical, and inspiring.",
            },
            {
              name: "Rahim Islam",
              review:
                "Every lesson includes real-world examples and portfolio projects. Highly recommended for beginners.",
            },
            {
              name: "Nusrat Jahan",
              review:
                "Excellent communication, clear explanations, and industry-level guidance helped me improve my skills.",
            },
          ].map((item) => (

            <div
              key={item.name}
              className={`rounded-3xl border p-8 transition hover:-translate-y-2 ${cardClass}`}
            >

              <div className="text-yellow-400 text-xl">
                ⭐⭐⭐⭐⭐
              </div>

              <p className={`mt-6 leading-8 ${mutedText}`}>
                "{item.review}"
              </p>

              <h4
                className={`mt-8 font-bold ${
                  isDark ? "text-white" : "text-[#061311]"
                }`}
              >
                {item.name}
              </h4>

            </div>

          ))}

        </div>

      </section>
            {/* Courses by Instructor */}

      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-10">

          <div>

            <span className="text-teal-400 uppercase tracking-[0.2em] text-sm font-bold">
              Courses
            </span>

            <h2
              className={`text-4xl font-black mt-3 ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Courses by {instructor.name}
            </h2>

            <p className={`mt-3 ${mutedText}`}>
              Browse all available courses taught by this instructor.
            </p>

          </div>

          <Link
            to="/courses"
            className="inline-flex items-center justify-center px-7 py-3 rounded-xl bg-teal-400 text-[#061311] font-bold hover:scale-105 transition"
          >
            View All Courses →
          </Link>

        </div>

        {instructorCourses.length > 0 ? (

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">

            {instructorCourses.map((course) => (

              <div
                key={course.id}
                className="transition duration-300 hover:-translate-y-3 hover:scale-[1.02]"
              >
                <CourseCard course={course} />
              </div>

            ))}

          </div>

        ) : (

          <div
            className={`rounded-3xl border p-14 text-center ${cardClass}`}
          >

            <div className="text-6xl mb-5">
              📚
            </div>

            <h3
              className={`text-3xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              No Courses Available
            </h3>

            <p className={`mt-4 ${mutedText}`}>
              This instructor hasn't published any courses yet.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-8 px-7 py-3 rounded-xl bg-teal-400 text-[#061311] font-bold hover:scale-105 transition"
            >
              Browse Other Courses
            </Link>

          </div>

        )}

      </section>





     
    </main>
  );
}

export default InstructorDetails;