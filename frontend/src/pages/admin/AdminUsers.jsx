import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { users } from "../../data/dummyData";

function AdminUsers() {
  const columns = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "enrolledCourses", label: "Courses" },
    { key: "joined", label: "Joined" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs">
            View
          </button>
          <button className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs">
            Block
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Manage Users"
        subtitle="View students, admins, user status, and course access."
      />

      <DataTable columns={columns} data={users} />
    </div>
  );
}

export default AdminUsers;