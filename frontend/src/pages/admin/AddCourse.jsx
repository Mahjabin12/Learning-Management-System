import { useNavigate } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";

function AddCourse() {
  const navigate = useNavigate();

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <div className="flex justify-between items-start mb-6">
        <AdminPageHeader
          title="Course Review"
          subtitle="Review instructor submitted courses before publishing."
        />

        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 rounded-xl border border-teal-400/30 text-teal-400 hover:bg-teal-400/10"
        >
          ← Back
        </button>
      </div>


      <div className="rounded-3xl border border-teal-400/15 bg-white/[0.05] p-6">

        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">
            Course Information
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Instructor submitted details are shown below.
          </p>
        </div>


        <div className="grid md:grid-cols-2 gap-5">


          <div>
            <label className="text-sm text-slate-300">
              Course Title
            </label>

            <input
              readOnly
              placeholder="Instructor course title"
              className="w-full mt-2 h-12 rounded-xl px-4 bg-[#132824] border border-teal-400/15 text-white"
            />
          </div>


          <div>
            <label className="text-sm text-slate-300">
              Instructor
            </label>

            <input
              readOnly
              placeholder="Instructor name"
              className="w-full mt-2 h-12 rounded-xl px-4 bg-[#132824] border border-teal-400/15 text-white"
            />
          </div>


          <div>
            <label className="text-sm text-slate-300">
              Category
            </label>

            <input
              readOnly
              placeholder="Category"
              className="w-full mt-2 h-12 rounded-xl px-4 bg-[#132824] border border-teal-400/15 text-white"
            />
          </div>


          <div>
            <label className="text-sm text-slate-300">
              Price
            </label>

            <input
              readOnly
              placeholder="Course price"
              className="w-full mt-2 h-12 rounded-xl px-4 bg-[#132824] border border-teal-400/15 text-white"
            />
          </div>


        </div>


        <div className="mt-5">

          <label className="text-sm text-slate-300">
            Description
          </label>

          <textarea
            readOnly
            rows="5"
            placeholder="Course description"
            className="w-full mt-2 rounded-xl p-4 bg-[#132824] border border-teal-400/15 text-white"
          />

        </div>


        <div className="mt-6 flex flex-wrap gap-3">

          <button
            className="
            px-6 py-3 rounded-xl
            bg-teal-400
            text-[#061311]
            font-bold
            "
          >
            ✓ Approve Course
          </button>


          <button
            className="
            px-6 py-3 rounded-xl
            bg-yellow-500/10
            border border-yellow-400/20
            text-yellow-400
            font-semibold
            "
          >
            Request Change
          </button>


          <button
            className="
            px-6 py-3 rounded-xl
            bg-red-500/10
            border border-red-400/20
            text-red-400
            font-semibold
            "
          >
            Reject
          </button>


          <button
            className="
            px-6 py-3 rounded-xl
            border border-teal-400/20
            text-teal-300
            "
          >
            Message Instructor
          </button>


        </div>


      </div>

    </div>
  );
}

export default AddCourse; 