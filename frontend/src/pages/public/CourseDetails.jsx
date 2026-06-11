import { Link, useParams } from "react-router-dom";
import { courses } from "../../data/dummyData";
import CourseCard from "../../components/common/CourseCard";

function CourseDetails() {
  const { id } = useParams();
  const course = courses.find((item) => item.id === Number(id)) || courses[0];

  return (
    <main>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-sm text-blue-600 font-medium mb-4">
              Courses / {course.category}
            </p>

            <h1 className="text-4xl font-bold text-slate-950">
              {course.title}
            </h1>

            <p className="text-slate-600 mt-5 leading-7">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-5 mt-6 text-sm text-slate-600">
              <span>⭐ {course.rating}</span>
              <span>{course.students}+ students</span>
              <span>{course.level}</span>
              <span>{course.duration}</span>
            </div>

            <p className="mt-5 text-sm text-slate-500">
              Created by{" "}
              <span className="font-semibold text-slate-900">
                {course.instructor}
              </span>
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-5 h-fit">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-52 object-cover rounded-xl"
            />

            <div className="flex items-center gap-3 mt-5">
              <span className="text-3xl font-bold text-slate-950">
                ${course.price}
              </span>
              <span className="text-slate-400 line-through">
                ${course.oldPrice}
              </span>
            </div>

            <Link
              to="/cart"
              className="block text-center w-full mt-5 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
            >
              Add to Cart
            </Link>

            <Link
              to={`/learn/${course.id}`}
              className="block text-center w-full mt-3 py-3 border border-slate-300 rounded-lg hover:bg-slate-50"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-950">
            Course Description
          </h2>

          <p className="text-slate-600 leading-7 mt-4">
            This course is designed to help learners build practical skills
            through structured lessons, examples, and real project work. Each
            lesson is organized for gradual learning and better understanding.
          </p>

          <h2 className="text-2xl font-bold text-slate-950 mt-10">
            Course Curriculum
          </h2>

          <div className="border border-slate-200 rounded-2xl mt-5 overflow-hidden">
            {course.lessons.map((lesson, index) => (
              <div
                key={lesson}
                className="flex justify-between items-center px-5 py-4 border-b border-slate-100 last:border-b-0"
              >
                <span className="font-medium text-slate-800">
                  {index + 1}. {lesson}
                </span>
                <span className="text-sm text-slate-500">45 min</span>
              </div>
            ))}
          </div>
        </div>

        <aside className="border border-slate-200 rounded-2xl p-6 h-fit">
          <h3 className="text-xl font-bold text-slate-950">Course Includes</h3>

          <ul className="space-y-3 text-sm text-slate-600 mt-5">
            <li>✔ {course.lessons.length} lessons</li>
            <li>✔ Lifetime access</li>
            <li>✔ Learning progress tracking</li>
            <li>✔ Certificate after completion</li>
            <li>✔ Instructor support</li>
          </ul>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-slate-950 mb-6">
          Related Courses
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses
            .filter((item) => item.id !== course.id)
            .map((item) => (
              <CourseCard key={item.id} course={item} />
            ))}
        </div>
      </section>
    </main>
  );
}

export default CourseDetails;