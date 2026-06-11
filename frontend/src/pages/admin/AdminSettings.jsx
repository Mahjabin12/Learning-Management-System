import AdminPageHeader from "../../components/admin/AdminPageHeader";

function AdminSettings() {
  return (
    <div>
      <AdminPageHeader
        title="Settings"
        subtitle="Manage admin profile, website settings, payment, and platform configuration."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-5">
            Website Settings
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              defaultValue="Byway"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />

            <input
              type="email"
              defaultValue="support@byway.com"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />

            <input
              type="text"
              defaultValue="Dhaka, Bangladesh"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />

            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
              Save Settings
            </button>
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-slate-950 mb-5">
            Admin Security
          </h2>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full border border-slate-300 rounded-lg px-4 py-3"
            />

            <button className="px-6 py-3 bg-slate-950 text-white rounded-lg">
              Update Password
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminSettings;