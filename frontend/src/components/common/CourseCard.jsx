import { Link } from "react-router-dom";

function CourseCard({ course }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition">
      <img
        src={course.thumbnail}
        alt={course.title}
        className="w-full h-44 object-cover"
      />

      <div className="p-5">
        <p className="text-xs font-semibold text-blue-600">
          {course.category}
        </p>

        <h3 className="mt-2 text-lg font-bold text-slate-950 line-clamp-2">
          {course.title}
        </h3>

        <p className="text-sm text-slate-500 mt-2">By {course.instructor}</p>

        <div className="flex items-center gap-2 mt-3 text-sm">
          <span className="text-yellow-500">★★★★★</span>
          <span className="text-slate-600">{course.rating}</span>
          <span className="text-slate-400">({course.students})</span>
        </div>

        <div className="flex items-center justify-between mt-5">
          <div>
            <span className="text-xl font-bold text-slate-950">
              ${course.price}
            </span>
            <span className="text-sm text-slate-400 line-through ml-2">
              ${course.oldPrice}
            </span>
          </div>

          <Link
            to={`/courses/${course.id}`}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;