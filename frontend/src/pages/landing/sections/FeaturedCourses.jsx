import { Link } from "react-router-dom";
import CourseCard from "../../../components/common/CourseCard";
import { courses } from "../../../data/dummyData";

function FeaturedCourses() {
  const popularCourses = courses.slice(0, 4);

  return (
    <section className="relative bg-[#08251f] py-20">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <p className="text-teal-400 font-semibold text-sm">
              Featured Courses
            </p>
            <h2 className="text-3xl font-extrabold mt-3">
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
  );
}

export default FeaturedCourses;