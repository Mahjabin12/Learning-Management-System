import CourseCard from "../../components/common/CourseCard";
import { courses } from "../../data/dummyData";

function CourseList() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-blue-600 font-semibold text-sm">COURSES</p>

        <h1 className="text-4xl font-bold text-slate-950 mt-2">
          Browse Online Courses
        </h1>

        <p className="text-slate-500 mt-3">
          Choose a course and start learning from expert-led lessons.
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="border border-slate-200 rounded-2xl p-6 h-fit">
          <h2 className="font-bold text-lg mb-5">Filter Courses</h2>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Category</h3>

            {[
              "Figma Design",
              "Canva Design",
              "Adobe Creative Suite",
              "UI/UX Design",
              "Web Design",
              "Logo & Branding",
              "Product Design",
              "Digital Marketing",
            ].map((category) => (
              <label
                key={category}
                className="block text-sm text-slate-600 mb-2"
              >
                <input type="checkbox" className="mr-2" />
                {category}
              </label>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="font-semibold mb-3">Level</h3>

            {["Beginner", "Intermediate", "Advanced"].map((level) => (
              <label
                key={level}
                className="block text-sm text-slate-600 mb-2"
              >
                <input type="checkbox" className="mr-2" />
                {level}
              </label>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Price</h3>

            <label className="block text-sm text-slate-600 mb-2">
              <input type="checkbox" className="mr-2" />
              Paid
            </label>

            <label className="block text-sm text-slate-600">
              <input type="checkbox" className="mr-2" />
              Free
            </label>
          </div>
        </aside>

        <section className="lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <p className="text-slate-500">{courses.length} courses found</p>

            <select className="border border-slate-300 rounded-lg px-4 py-2 text-sm">
              <option>Sort by latest</option>
              <option>Price low to high</option>
              <option>Price high to low</option>
            </select>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default CourseList;