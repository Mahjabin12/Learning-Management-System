function Settings() {
  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">SETTINGS</p>
        <h1 className="text-4xl font-black mt-2">Account Settings</h1>
        <p className="text-slate-400 mt-3 mb-8">
          Manage password, notification preferences, and learning settings.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <section className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold mb-5">Security</h2>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none"
              />

              <input
                type="password"
                placeholder="New Password"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none"
              />

              <button className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
                Update Password
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6">
            <h2 className="text-2xl font-bold mb-5">Preferences</h2>

            <div className="space-y-4">
              {[
                "Email notifications",
                "Course progress reminders",
                "Certificate updates",
                "Promotional course updates",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 p-4"
                >
                  <span className="text-slate-300">{item}</span>
                  <input type="checkbox" defaultChecked className="accent-teal-400" />
                </label>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Settings;