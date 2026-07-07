import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import StatCard from "../../components/admin/StatCard";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { orders } from "../../data/dummyData";

function useAdminTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "dark");

    syncTheme();
    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
}

function AdminRevenue() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const safeOrders = Array.isArray(orders) ? orders : [];
  const totalRevenue = safeOrders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  const headingClass = isDark ? "text-white" : "text-[#061311]";

  const chartCardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const chartBg = isDark
    ? "bg-[#07110f]/70 border-teal-400/10"
    : "bg-white/60 border-emerald-900/10";

  const columns = [
    { key: "id", label: "Order ID" },
    {
      key: "student",
      label: "Student",
      render: (row) => <span className={`font-semibold ${headingClass}`}>{row.student}</span>,
    },
    { key: "course", label: "Course" },
    {
      key: "amount",
      label: "Amount",
      render: (row) => <span className="text-teal-500 font-semibold">${row.amount}</span>,
    },
    { key: "date", label: "Date" },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Revenue and Orders"
        subtitle="Monitor payment status, course sales, instructor revenue, and platform earnings."
        action={
          <button className="px-5 py-2.5 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
            Export Revenue
          </button>
        }
      />

      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Revenue" value={`$${totalRevenue}`} note="+9.4% this month" />
        <StatCard title="Paid Orders" value="2" note="Completed payments" />
        <StatCard title="Pending Orders" value="1" note="Need follow-up" />
        <StatCard title="Refund Requests" value="0" note="No active refund" />
      </section>

      <section className={`rounded-3xl border backdrop-blur-xl p-6 mb-8 ${chartCardClass}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-teal-500">MONTHLY REVENUE</p>
            <h2 className={`text-2xl font-black mt-2 ${headingClass}`}>
              Course sales performance
            </h2>
          </div>
        </div>

        <div className={`h-72 rounded-2xl border flex items-end gap-4 p-6 ${chartBg}`}>
          {[40, 60, 80, 55, 90, 75, 100, 65].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col justify-end">
              <div
                className="rounded-t-2xl bg-teal-400 shadow-[0_0_24px_rgba(45,212,191,0.25)] hover:bg-white transition"
                style={{ height: `${height}%` }}
              />
            </div>
          ))}
        </div>
      </section>

      <DataTable columns={columns} data={safeOrders} />
    </div>
  );
}

export default AdminRevenue;