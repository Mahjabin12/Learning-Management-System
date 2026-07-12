import AdminPageHeader from "../../components/admin/AdminPageHeader";

function AdminBlog() {

  return (

    <div className="p-6">

      <AdminPageHeader

        title="Blog Management"

        subtitle="Create, manage and publish educational content."

        action={
          <button
            className="
            px-5 py-2.5
            rounded-xl
            bg-teal-400
            text-[#061311]
            font-semibold
            text-sm
            hover:bg-teal-300
            transition
            "
          >
            Add Blog
          </button>
        }

      />


      <div
        className="
        rounded-2xl
        border
        border-white/10
        bg-white/[0.03]
        p-10
        text-center
        "
      >

        <h3 className="text-xl font-bold text-white">
          No Blog Posts
        </h3>


        <p className="text-slate-400 mt-2">
          Blog posts will appear here after connecting database.
        </p>


      </div>


    </div>

  );

}


export default AdminBlog;