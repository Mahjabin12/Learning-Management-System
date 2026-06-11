import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { messages } from "../../data/dummyData";

function AdminMessages() {
  const columns = [
    { key: "sender", label: "Sender" },
    { key: "subject", label: "Subject" },
    { key: "message", label: "Message" },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs">
          Reply
        </button>
      ),
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Messages"
        subtitle="View student messages, support requests, and communication records."
      />

      <DataTable columns={columns} data={messages} />
    </div>
  );
}

export default AdminMessages;