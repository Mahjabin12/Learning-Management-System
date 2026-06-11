import AdminPageHeader from "../../components/admin/AdminPageHeader";

function AddCourse() {
  return (
    <div>
      <AdminPageHeader
        title="Add New Course"
        subtitle="Create a new course with title, category, price, thumbnail, and lessons."
      />

      <form className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold mb-2">
              Course Title
            </label>
            <input
              type="text"
              placeholder="Enter course title"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Category</label>
            <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
              <option>Web Development</option>
              <option>UI/UX Design</option>
              <option>Digital Marketing</option>
              <option>Data Science</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Instructor
            </label>
            <input
              type="text"
              placeholder="Instructor name"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Price</label>
            <input
              type="number"
              placeholder="Course price"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Level</label>
            <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Status</label>
            <select className="w-full border border-slate-300 rounded-lg px-4 py-3">
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Thumbnail URL
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="w-full border border-slate-300 rounded-lg px-4 py-3"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Course Description
          </label>
          <textarea
            rows="5"
            placeholder="Write course description"
            className="w-full border border-slate-300 rounded-lg px-4 py-3"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">
            Course Lessons
          </label>
          <textarea
            rows="4"
            placeholder="Write lessons line by line"
            className="w-full border border-slate-300 rounded-lg px-4 py-3"
          ></textarea>
        </div>

        <button
          type="button"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Create Course
        </button>
      </form>
    </div>
  );
}

export default AddCourse;