import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { announcements } from "../../data/dummyData";

function AdminAnnouncements() {
  const columns = [
    { key: "title", label: "Title" },
    { key: "audience", label: "Audience" },
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
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs">
            Edit
          </button>
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
        title="Announcements"
        subtitle="Create and manage announcements for students and platform users."
        action={
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            New Announcement
          </button>
        }
      />

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-950 mb-5">
          Create Announcement
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Announcement title"
            className="border border-slate-300 rounded-lg px-4 py-3"
          />

          <select className="border border-slate-300 rounded-lg px-4 py-3">
            <option>All Students</option>
            <option>All Users</option>
            <option>Specific Course Students</option>
          </select>
        </div>

        <textarea
          rows="4"
          placeholder="Write announcement"
          className="w-full border border-slate-300 rounded-lg px-4 py-3 mt-4"
        ></textarea>

        <button className="mt-4 px-6 py-3 bg-slate-950 text-white rounded-lg">
          Publish
        </button>
      </div>

      <DataTable columns={columns} data={announcements} />
    </div>
  );
}

export default AdminAnnouncements;