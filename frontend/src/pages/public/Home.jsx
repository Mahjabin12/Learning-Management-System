import { Link } from "react-router-dom";
import CourseCard from "../../components/common/CourseCard";
import { categories, courses } from "../../data/dummyData";

function Home() {
  return (
    <main>
      <section className="bg-gradient-to-br from-white via-blue-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-blue-600 font-semibold text-sm mb-4">
              ONLINE LEARNING PLATFORM
            </p>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-950 leading-tight">
              Learn career-ready skills from expert-led courses
            </h1>

            <p className="text-lg text-slate-600 mt-6 leading-8">
              Build your future with flexible online courses, structured lessons,
              practical projects, and a personal learning dashboard.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="px-7 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Explore Courses
              </Link>

              <Link
                to="/signup"
                className="px-7 py-3 bg-white border border-slate-300 text-slate-900 rounded-lg font-medium hover:bg-slate-50"
              >
                Create Free Account
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-950">250+</h3>
                <p className="text-sm text-slate-500">Courses</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-950">15+</h3>
                <p className="text-sm text-slate-500">Instructors</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-950">2400+</h3>
                <p className="text-sm text-slate-500">Students</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-200 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-purple-200 rounded-full blur-2xl"></div>

            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1000"
              alt="Online learning"
              className="relative rounded-3xl shadow-2xl w-full h-[460px] object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-blue-600 font-semibold text-sm">CATEGORIES</p>
            <h2 className="text-3xl font-bold text-slate-950 mt-2">
              Explore popular categories
            </h2>
          </div>

          <Link to="/courses" className="text-blue-600 font-medium">
            View all
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="border border-slate-200 rounded-2xl p-6 hover:shadow-lg transition bg-white"
            >
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-5">
                📚
              </div>

              <h3 className="font-bold text-lg text-slate-950">
                {category.name}
              </h3>

              <p className="text-slate-500 text-sm mt-2">
                {category.courses} courses available
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-blue-600 font-semibold text-sm">
                FEATURED COURSES
              </p>
              <h2 className="text-3xl font-bold text-slate-950 mt-2">
                Start learning today
              </h2>
            </div>

            <Link to="/courses" className="text-blue-600 font-medium">
              Browse courses
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-slate-950 text-white rounded-3xl p-10 lg:p-14 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-blue-300 font-semibold text-sm">
              WHY CHOOSE BYWAY
            </p>

            <h2 className="text-3xl font-bold mt-3">
              Learn with structure, progress tracking, and secure access
            </h2>

            <p className="text-slate-300 mt-5 leading-7">
              Students can enroll in courses, track learning progress, complete
              lessons, and access their private learning dashboard after login.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-2xl p-5">
              <h3 className="font-bold">Structured Courses</h3>
              <p className="text-sm text-slate-300 mt-2">
                Step-by-step course curriculum.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <h3 className="font-bold">Student Dashboard</h3>
              <p className="text-sm text-slate-300 mt-2">
                Personal learning and profile access.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <h3 className="font-bold">Secure Role Access</h3>
              <p className="text-sm text-slate-300 mt-2">
                Separate student and admin system.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5">
              <h3 className="font-bold">Admin Control</h3>
              <p className="text-sm text-slate-300 mt-2">
                Manage courses, users, and revenue.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;