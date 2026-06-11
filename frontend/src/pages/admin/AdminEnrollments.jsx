import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { enrollments } from "../../data/dummyData";

function AdminEnrollments() {
  const columns = [
    { key: "id", label: "Enrollment ID" },
    { key: "student", label: "Student" },
    { key: "course", label: "Course" },
    { key: "progress", label: "Progress" },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Enrollments"
        subtitle="Track student course enrollments and learning progress."
      />

      <DataTable columns={columns} data={enrollments} />
    </div>
  );
}

export default AdminEnrollments;