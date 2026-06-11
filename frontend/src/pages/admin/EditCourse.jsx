import { useParams } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import { courses } from "../../data/dummyData";

function EditCourse() {
  const { id } = useParams();
  const course = courses.find((item) => item.id === Number(id)) || courses[0];

  return (
    <div>
      <AdminPageHeader
        title="Edit Course"
        subtitle="Update course information, price, status, and curriculum."
      />

      <form className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Course Title
            </label>
            <input
              type="text"
              defaultValue={course.title}
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <input
              type="text"
              defaultValue={course.category}
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Instructor
            </label>
            <input
              type="text"
              defaultValue={course.instructor}
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Price</label>
            <input
              type="number"
              defaultValue={course.price}
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Thumbnail URL
          </label>
          <input
            type="text"
            defaultValue={course.thumbnail}
            className="w-full border border-slate-300 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Course Description
          </label>
          <textarea
            rows="5"
            defaultValue={course.description}
            className="w-full border border-slate-300 rounded-lg px-4 py-3"
          ></textarea>
        </div>

        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Update Course
        </button>
      </form>
    </div>
  );
}

export default EditCourse;