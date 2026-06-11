import StatCard from "../../components/admin/StatCard";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { courses, enrollments, orders, users } from "../../data/dummyData";

function AdminDashboard() {
  const recentOrderColumns = [
    { key: "id", label: "Order ID" },
    { key: "student", label: "Student" },
    { key: "course", label: "Course" },
    {
      key: "amount",
      label: "Amount",
      render: (row) => `$${row.amount}`,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div>
      <AdminPageHeader
        title="Dashboard Overview"
        subtitle="Monitor LMS users, courses, enrollments, orders, and revenue."
      />

      <section className="grid md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Students" value={users.length} note="Active learners" />
        <StatCard title="Total Courses" value={courses.length} note="Published and draft" />
        <StatCard title="Enrollments" value={enrollments.length} note="All course enrollments" />
        <StatCard title="Revenue" value="$18,500" note="Estimated monthly revenue" />
      </section>

      <section className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-5">
            Revenue Analytics
          </h2>

          <div className="h-64 bg-slate-50 rounded-xl flex items-end gap-4 p-6">
            {[45, 75, 55, 90, 65, 100, 80].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-blue-600 rounded-t-lg"
                style={{ height: `${height}%` }}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-5">
            Course Sales
          </h2>

          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-slate-800">
                    {course.title}
                  </span>
                  <span>{course.students}</span>
                </div>

                <div className="w-full h-3 bg-slate-200 rounded-full">
                  <div
                    className="h-3 bg-blue-600 rounded-full"
                    style={{ width: `${Math.min(course.students / 25, 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-950 mb-5">
          Recent Orders
        </h2>

        <DataTable columns={recentOrderColumns} data={orders} />
      </section>
    </div>
  );
}

export default AdminDashboard;