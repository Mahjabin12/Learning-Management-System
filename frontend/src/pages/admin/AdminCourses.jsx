import { Link } from "react-router-dom";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { courses } from "../../data/dummyData";

function AdminCourses() {
  const columns = [
    {
      key: "title",
      label: "Course",
      render: (row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.thumbnail}
            alt={row.title}
            className="w-14 h-12 object-cover rounded-lg"
          />
          <div>
            <p className="font-semibold text-slate-900">{row.title}</p>
            <p className="text-xs text-slate-500">{row.category}</p>
          </div>
        </div>
      ),
    },
    { key: "instructor", label: "Instructor" },
    {
      key: "price",
      label: "Price",
      render: (row) => `$${row.price}`,
    },
    { key: "students", label: "Students" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/courses/edit/${row.id}`}
            className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs"
          >
            Edit
          </Link>

          <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs">
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Manage Courses"
        subtitle="Add, edit, publish, unpublish, and remove LMS courses."
        action={
          <Link
            to="/admin/courses/create"
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Course
          </Link>
        }
      />

      <DataTable columns={columns} data={courses} />
    </div>
  );
}

export default AdminCourses;