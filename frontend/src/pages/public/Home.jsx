import { Link } from "react-router-dom";
import CourseCard from "../../components/common/CourseCard";
import { categories, courses } from "../../data/dummyData";

const instructors = [
  {
    id: 1,
    name: "Mr. Danny Morison",
    role: "Web Developer",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Haley D. Richard",
    role: "Graphics Designer",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Lincoln Di Caprio",
    role: "Marketing Expert",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Kate Winslate",
    role: "Fashion Designer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=500&q=80",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Lincoln D. Costa",
    role: "Web Developer",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    text: "My mentor was an excellent guide throughout the course. The lessons were structured, simple, and helped me improve my practical learning experience.",
  },
  {
    id: 2,
    name: "Lince D. Costa",
    role: "Web Developer",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    text: "The platform provides a clean learning system. It helped me access courses, track progress, and understand lessons in a better way.",
  },
];

const blogs = [
  {
    id: 1,
    title: "Complete concepts broken down into clear sections",
    date: "June 20, 2026",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 2,
    title: "Hands dirty with hands-on exercises and practice",
    date: "June 18, 2026",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=700&q=80",
  },
  {
    id: 3,
    title: "We separate the science fiction from the facts",
    date: "June 15, 2026",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80",
  },
];

function Home() {
  const popularCourses = courses.slice(0, 4);

  return (
    <main className="overflow-hidden bg-[#061311] text-white">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#0f766e55,transparent_35%),radial-gradient(circle_at_top_right,#14b8a633,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-teal-400 font-semibold text-sm mb-5">
              Let's Join With Us
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              World's Leading{" "}
              <span className="text-teal-400">Machine Learning</span> Courses
            </h1>

            <p className="mt-6 max-w-xl text-sm sm:text-base text-slate-400 leading-7">
              Build practical skills through structured online courses. Learn
              machine learning, development, design, business, and technology
              from experienced instructors.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/signup"
                className="px-6 py-3 bg-teal-500 text-[#061311] rounded-md font-bold hover:bg-teal-400 transition"
              >
                Join Us Now
              </Link>

              <Link
                to="/courses"
                className="w-11 h-11 rounded-full border border-teal-400 text-teal-400 flex items-center justify-center hover:bg-teal-400 hover:text-[#061311] transition"
              >
                ▶
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-5 max-w-md">
              <div>
                <h3 className="text-2xl font-bold">250+</h3>
                <p className="text-xs text-slate-400">Courses</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">15+</h3>
                <p className="text-xs text-slate-400">Instructors</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold">2400+</h3>
                <p className="text-xs text-slate-400">Students</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[420px] sm:min-h-[520px]">
            <div className="absolute right-8 top-8 w-56 sm:w-72 h-72 sm:h-96 rounded-xl border-2 border-teal-400 p-2">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80"
                alt="Artificial intelligence course"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="absolute right-0 top-0 w-28 sm:w-36 h-28 sm:h-36 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=500&q=80"
                alt="AI learning"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute right-0 top-40 sm:top-52 w-32 sm:w-44 h-32 sm:h-44 rounded-xl overflow-hidden border border-teal-500 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=500&q=80"
                alt="Technology circuit"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-4 sm:left-12 bottom-14 w-28 sm:w-36 h-28 sm:h-36 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=80"
                alt="Digital circuit"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute left-0 top-48 sm:top-60 bg-teal-500 text-[#061311] rounded-xl p-4 shadow-xl">
              <div className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-xl mb-3">
                👥
              </div>
              <h3 className="font-bold text-sm">Top Rated</h3>
              <p className="text-xs">Instructors</p>
            </div>
          </div>
        </div>

        <div className="absolute left-0 right-0 bottom-0 h-24 bg-[#08251f] rounded-t-[100%]" />
      </section>

      {/* Categories */}
      <section className="relative bg-[#08251f] py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-400 font-semibold text-sm">Have a look</p>

          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
            Explore Our Top <span className="text-teal-400">Categories</span>
          </h2>

          <p className="max-w-2xl mx-auto text-slate-400 text-sm mt-4 leading-6">
            They are becoming more personalized, interactive, and engaging.
            Select a category and start learning today.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {categories.slice(0, 8).map((category) => (
              <Link
                to="/courses"
                key={category.id}
                className="bg-white/10 border border-white/10 rounded-xl p-6 hover:border-teal-400 hover:-translate-y-2 transition duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl mb-5">
                  {category.icon || "📚"}
                </div>

                <h3 className="font-bold text-lg">{category.name}</h3>

                <p className="text-sm text-slate-400 leading-6 mt-3">
                  {category.text || `${category.courses} courses available.`}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Preview Section */}
<section className="relative bg-[#061311] py-24">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#0f766e44,transparent_35%)]" />

  <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
    <div className="relative">
      <div className="border-2 border-teal-400 rounded-xl p-4 max-w-md mx-auto">
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80"
          alt="About Byway learning platform"
          className="rounded-lg w-full h-[360px] sm:h-[430px] object-cover"
        />
      </div>
    </div>

    <div>
      <p className="text-teal-400 font-semibold text-sm">About Us</p>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-3 leading-tight">
        Empowering Students Through{" "}
        <span className="text-teal-400">Smart Online Learning</span>
      </h2>

      <p className="text-slate-400 leading-7 mt-5 text-sm sm:text-base">
        Byway is a modern learning management platform designed to make online
        education simple, structured, and accessible. Students can explore
        courses, enroll in programs, track learning progress, and continue their
        lessons from a personal dashboard.
      </p>

      <div className="space-y-4 mt-8">
        {[
          {
            icon: "🎯",
            title: "Our Mission",
            text: "To provide flexible and career-focused learning for students.",
          },
          {
            icon: "📚",
            title: "Structured Learning",
            text: "Courses are organized with lessons, resources, and progress tracking.",
          },
          {
            icon: "🔐",
            title: "Secure LMS Access",
            text: "Students and admins get separate dashboards with role-based access.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex gap-4 bg-white/10 border border-white/10 rounded-xl p-5"
          >
            <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
              {item.icon}
            </div>

            <div>
              <h3 className="font-bold">{item.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          to="/about"
          className="px-6 py-3 bg-teal-500 text-[#061311] rounded-md font-bold hover:bg-teal-400 transition"
        >
          Learn More About Us
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

      {/* Popular Courses */}
      <section className="relative bg-[#08251f] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <p className="text-teal-400 font-semibold text-sm">
                Featured Courses
              </p>

              <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
                Start Learning <span className="text-teal-400">Today</span>
              </h2>
            </div>

            <Link to="/courses" className="text-teal-400 font-semibold">
              Browse courses →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Instructors */}
      <section className="relative bg-[#061311] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#0f766e44,transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative grid grid-cols-2 gap-6 max-w-md mx-auto">
            {instructors.map((instructor, index) => (
              <div
                key={instructor.id}
                className={`bg-white/10 border border-white/10 rounded-xl p-5 text-center hover:border-teal-400 transition ${
                  index === 2 ? "lg:-mt-2" : ""
                }`}
              >
                <img
                  src={instructor.img}
                  alt={instructor.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-teal-500/40"
                />

                <h3 className="font-bold mt-4 text-sm">{instructor.name}</h3>
                <p className="text-xs text-slate-400 mt-1">
                  {instructor.role}
                </p>

                <div className="flex justify-center gap-2 text-[10px] text-white mt-4">
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    f
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    in
                  </span>
                  <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                    x
                  </span>
                </div>
              </div>
            ))}

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-[#061311] rounded-xl p-4 text-center shadow-xl">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                👥
              </div>
              <p className="text-xs font-bold">
                Top Instructors <br /> in list
              </p>
            </div>
          </div>

          <div className="text-center lg:text-left">
            <p className="text-teal-400 font-semibold text-sm">Let's meet</p>

            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
              Our Top <span className="text-teal-400">Instructors</span>
            </h2>

            <p className="text-slate-400 leading-7 mt-5 text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
              Our instructors combine professional experience and practical
              teaching. They help students learn with real-world lessons,
              projects, and structured guidance.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-8 px-7 py-3 bg-teal-500 text-[#061311] rounded-md font-bold hover:bg-teal-400 transition"
            >
              See All Courses List
            </Link>
          </div>
        </div>
      </section>

      {/* Subscriber */}
      <section className="bg-[#061311] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white/10 border border-white/10 rounded-2xl p-8 grid md:grid-cols-3 gap-6 items-center">
            <div>
              <h2 className="text-xl font-bold">Become a Subscriber</h2>
              <p className="text-xs text-slate-400 mt-2">
                Get course updates and learning news.
              </p>
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-transparent border-b border-slate-500 px-2 py-3 outline-none text-white placeholder:text-slate-500 focus:border-teal-400"
            />

            <button
              type="button"
              className="md:justify-self-end px-6 py-3 bg-white text-[#061311] rounded-md font-bold hover:bg-teal-400 transition"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="relative bg-[#061311] py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,#0f766e33,transparent_30%),radial-gradient(circle_at_right,#14b8a622,transparent_30%)]" />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-400 font-semibold text-sm">Our reviews</p>

          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
            Students Experience <span className="text-teal-400">With Us</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm leading-6">
            Students can learn from anywhere and continue courses through their
            own learning dashboard.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-12 text-left max-w-5xl mx-auto">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="bg-white/10 border border-white/10 rounded-xl p-6"
              >
                <p className="text-5xl text-teal-400 leading-none">“</p>

                <p className="text-slate-300 leading-7 text-sm mt-2">
                  {item.text}
                </p>

                <div className="flex items-center justify-between gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-bold text-sm">{item.name}</h3>
                      <p className="text-xs text-slate-400">{item.role}</p>
                    </div>
                  </div>

                  <p className="text-yellow-400 text-sm">★★★★★</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blogs */}
      <section className="relative bg-[#061311] pb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-teal-400 font-semibold text-sm">Our Blog</p>

          <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
            Latest <span className="text-teal-400">News & Blogs</span>
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto mt-4 text-sm leading-6">
            Stay updated with course releases, learning tips, and modern
            education technology news.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white/10 border border-white/10 rounded-xl overflow-hidden hover:border-teal-400 transition"
              >
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <p className="text-xs text-teal-400">{blog.date}</p>

                  <h3 className="text-lg font-bold mt-3 leading-7">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-slate-400 mt-3 leading-6">
                    Discover how online learning platforms can improve student
                    progress and course management.
                  </p>

                  <Link
                    to="/courses"
                    className="inline-block text-teal-400 font-semibold mt-5 text-sm"
                  >
                    Read more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;