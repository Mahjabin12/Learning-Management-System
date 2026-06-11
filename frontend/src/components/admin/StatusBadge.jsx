function StatusBadge({ status }) {
  const statusClass = {
    Published: "bg-green-100 text-green-700",
    Draft: "bg-yellow-100 text-yellow-700",
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-700",
    Paid: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    Completed: "bg-blue-100 text-blue-700",
    "In Progress": "bg-purple-100 text-purple-700",
    Open: "bg-yellow-100 text-yellow-700",
    Resolved: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        statusClass[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;