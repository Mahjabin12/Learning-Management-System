import { Link } from "react-router-dom";
import { courses } from "../../data/dummyData";

function MyLearning() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-blue-600 font-semibold text-sm">MY LEARNING</p>
        <h1 className="text-4xl font-bold text-slate-950 mt-2">
          My Enrolled Courses
        </h1>
        <p className="text-slate-500 mt-3">
          Continue your courses and track your learning progress.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {courses.slice(0, 3).map((course, index) => (
          <div
            key={course.id}
            className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="h-44 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="font-bold text-lg text-slate-950">
                {course.title}
              </h3>

              <p className="text-sm text-slate-500 mt-2">
                Instructor: {course.instructor}
              </p>

              <div className="mt-5">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-600">Progress</span>
                  <span className="font-semibold">
                    {[65, 40, 100][index]}%
                  </span>
                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full">
                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{ width: `${[65, 40, 100][index]}%` }}
                  ></div>
                </div>
              </div>

              <Link
                to={`/learn/${course.id}`}
                className="block text-center mt-5 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
              >
                Continue Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default MyLearning;