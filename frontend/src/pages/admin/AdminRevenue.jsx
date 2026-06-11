import AdminPageHeader from "../../components/admin/AdminPageHeader";
import StatCard from "../../components/admin/StatCard";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { orders } from "../../data/dummyData";

function AdminRevenue() {
  const columns = [
    { key: "id", label: "Order ID" },
    { key: "student", label: "Student" },
    { key: "course", label: "Course" },
    {
      key: "amount",
      label: "Amount",
      render: (row) => `$${row.amount}`,
    },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div>
      <AdminPageHeader
        title="Revenue and Orders"
        subtitle="Monitor payment status, course sales, and platform revenue."
      />

      <section className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Revenue" value={`$${totalRevenue}`} />
        <StatCard title="Paid Orders" value="2" />
        <StatCard title="Pending Orders" value="1" />
        <StatCard title="Refund Requests" value="0" />
      </section>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-950 mb-5">
          Monthly Revenue
        </h2>

        <div className="h-64 bg-slate-50 rounded-xl flex items-end gap-4 p-6">
          {[40, 60, 80, 55, 90, 75, 100, 65].map((height, index) => (
            <div
              key={index}
              className="flex-1 bg-blue-600 rounded-t-lg"
              style={{ height: `${height}%` }}
            ></div>
          ))}
        </div>
      </div>

      <DataTable columns={columns} data={orders} />
    </div>
  );
}

export default AdminRevenue;