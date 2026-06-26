import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";

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

function AdminSettings() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const cardClass = isDark
    ? "bg-white/[0.06] border-teal-400/15 shadow-[0_22px_60px_rgba(0,0,0,0.25)]"
    : "bg-white/80 border-emerald-900/10 shadow-[0_18px_45px_rgba(6,19,17,0.08)]";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const labelClass = isDark ? "text-slate-300" : "text-slate-700";

  const inputClass = isDark
    ? "bg-white/5 border-teal-400/10 text-white placeholder:text-slate-500 focus:border-teal-400/50 focus:ring-teal-400/15"
    : "bg-white/80 border-emerald-900/10 text-[#061311] placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-emerald-500/15";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Settings"
        subtitle="Manage platform identity, admin security, website contact, landing settings, and system configuration."
      />

      <div className="grid xl:grid-cols-2 gap-8">
        <section className={`rounded-3xl border backdrop-blur-xl p-6 ${cardClass}`}>
          <p className="text-sm font-semibold text-teal-500">WEBSITE SETTINGS</p>
          <h2 className={`text-2xl font-black mt-2 mb-5 ${headingClass}`}>
            Platform Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                Platform Name
              </label>
              <input
                type="text"
                defaultValue="Byway"
                className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                Support Email
              </label>
              <input
                type="email"
                defaultValue="support@byway.com"
                className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-semibold mb-2 ${labelClass}`}>
                Address
              </label>
              <input
                type="text"
                defaultValue="Dhaka, Bangladesh"
                className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
              />
            </div>

            <button className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
              Save Settings
            </button>
          </div>
        </section>

        <section className={`rounded-3xl border backdrop-blur-xl p-6 ${cardClass}`}>
          <p className="text-sm font-semibold text-teal-500">ADMIN SECURITY</p>
          <h2 className={`text-2xl font-black mt-2 mb-5 ${headingClass}`}>
            Password and Access
          </h2>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />

            <input
              type="password"
              placeholder="New Password"
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />

            <input
              type="password"
              placeholder="Confirm New Password"
              className={`w-full border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />

            <button className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
              Update Password
            </button>
          </div>
        </section>

        <section className={`xl:col-span-2 rounded-3xl border backdrop-blur-xl p-6 ${cardClass}`}>
          <p className="text-sm font-semibold text-teal-500">LANDING PAGE CONTROL</p>
          <h2 className={`text-2xl font-black mt-2 mb-5 ${headingClass}`}>
            Homepage Content Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              defaultValue="Learn Creative Design Skills For Career Growth"
              className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />

            <input
              type="text"
              defaultValue="Design, marketing, portfolio, and career skills"
              className={`border rounded-2xl px-4 py-3 outline-none focus:ring-2 transition ${inputClass}`}
            />
          </div>

          <textarea
            rows="4"
            defaultValue="Build practical skills in Figma, Canva, Adobe tools, web design, logo design, product design, and digital marketing."
            className={`w-full border rounded-2xl px-4 py-3 mt-4 outline-none focus:ring-2 transition ${inputClass}`}
          />

          <button className="mt-5 px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
            Update Landing Content
          </button>
        </section>
      </div>
    </div>
  );
}

export default AdminSettings;