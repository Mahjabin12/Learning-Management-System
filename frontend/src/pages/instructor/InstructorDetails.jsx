import { Link, useParams } from "react-router-dom";
import { instructors, courses } from "../../data/dummyData";
import CourseCard from "../../components/common/CourseCard";

function InstructorDetails() {
  const { id } = useParams();

  const instructor =
    instructors.find((item) => String(item.id) === id) || instructors[0];

  const instructorCourses = courses.filter(
    (course) => course.instructor === instructor.name
  );

  return (
    <main>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-1">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-64 h-64 rounded-3xl object-cover shadow-lg mx-auto lg:mx-0"
            />
          </div>

          <div className="lg:col-span-2">
            <p className="text-blue-600 font-semibold text-sm">
              INSTRUCTOR PROFILE
            </p>

            <h1 className="text-4xl font-bold text-slate-950 mt-3">
              {instructor.name}
            </h1>

            <p className="text-xl text-blue-600 font-semibold mt-3">
              {instructor.role}
            </p>

            <p className="text-slate-600 leading-7 mt-5">
              {instructor.bio}
            </p>

            <div className="flex flex-wrap gap-5 mt-6 text-sm text-slate-600">
              <span>⭐ {instructor.rating} rating</span>
              <span>{instructor.students}+ students</span>
              <span>{instructor.specialty}</span>
              <span>{instructorCourses.length} courses</span>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/courses"
                className="px-6 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
              >
                Browse Courses
              </Link>

              <Link
                to="/instructors"
                className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-100"
              >
                Back to Instructors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-950">
            About This Instructor
          </h2>

          <p className="text-slate-600 leading-7 mt-4">
            {instructor.name} teaches practical and career-focused lessons to
            help students build real-world skills. The teaching style focuses on
            clear explanation, hands-on projects, portfolio development, and
            professional workflow.
          </p>

          <h2 className="text-2xl font-bold text-slate-950 mt-10">
            Teaching Areas
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            {[
              instructor.specialty,
              "Practical projects",
              "Portfolio building",
              "Career-focused learning",
            ].map((item) => (
              <div
                key={item}
                className="border border-slate-200 rounded-xl p-4 bg-white"
              >
                <p className="text-slate-700 font-medium">✔ {item}</p>
              </div>
            ))}
          </div>
        </div>

        <aside className="border border-slate-200 rounded-2xl p-6 h-fit bg-white">
          <h3 className="text-xl font-bold text-slate-950">
            Instructor Summary
          </h3>

          <div className="space-y-4 mt-5 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Name:</span>{" "}
              {instructor.name}
            </p>

            <p>
              <span className="font-semibold text-slate-900">Role:</span>{" "}
              {instructor.role}
            </p>

            <p>
              <span className="font-semibold text-slate-900">Specialty:</span>{" "}
              {instructor.specialty}
            </p>

            <p>
              <span className="font-semibold text-slate-900">Rating:</span>{" "}
              {instructor.rating}
            </p>

            <p>
              <span className="font-semibold text-slate-900">Students:</span>{" "}
              {instructor.students}+
            </p>
          </div>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Courses by {instructor.name}
            </h2>

            <p className="text-slate-500 mt-2">
              Explore available courses from this instructor.
            </p>
          </div>

          <Link to="/courses" className="text-blue-600 font-semibold">
            View all courses →
          </Link>
        </div>

        {instructorCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructorCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50">
            <p className="text-slate-600">
              No courses are available from this instructor yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default InstructorDetails;