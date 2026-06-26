import { Link } from "react-router-dom";
import { instructors } from "../../data/dummyData";

function InstructorList() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-blue-600 font-semibold text-sm">INSTRUCTORS</p>

        <h1 className="text-4xl font-bold text-slate-950 mt-2">
          Meet Our Expert Instructors
        </h1>

        <p className="text-slate-500 mt-3 max-w-2xl">
          Learn from experienced mentors in design, digital marketing, branding,
          product design, and career growth.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {instructors.map((instructor) => (
          <Link
            key={instructor.id}
            to={`/instructors/${instructor.id}`}
            className="border border-slate-200 rounded-2xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition"
          >
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-slate-100"
            />

            <div className="text-center mt-5">
              <h2 className="text-lg font-bold text-slate-950">
                {instructor.name}
              </h2>

              <p className="text-sm text-blue-600 font-semibold mt-1">
                {instructor.role}
              </p>

              <p className="text-sm text-slate-500 mt-2">
                {instructor.specialty}
              </p>

              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-slate-600">
                <span>⭐ {instructor.rating}</span>
                <span>{instructor.students}+ students</span>
              </div>

              <p className="text-blue-600 font-semibold text-sm mt-5">
                View Profile →
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default InstructorList;