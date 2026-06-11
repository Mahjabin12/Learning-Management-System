import { useAuth } from "../../context/AuthContext";
import { enrollments, orders } from "../../data/dummyData";

function Profile() {
  const { user } = useAuth();

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-4 gap-8">
        <aside className="border border-slate-200 rounded-2xl p-6 h-fit">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold mx-auto">
            {user?.name?.charAt(0) || "S"}
          </div>

          <h2 className="text-center font-bold text-xl mt-4">{user?.name}</h2>
          <p className="text-center text-sm text-slate-500">{user?.email}</p>
          <p className="text-center text-sm text-blue-600 font-semibold mt-2">
            {user?.role}
          </p>
        </aside>

        <section className="lg:col-span-3 space-y-8">
          <div className="border border-slate-200 rounded-2xl p-6">
            <h1 className="text-2xl font-bold text-slate-950 mb-6">
              Profile Information
            </h1>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                defaultValue={user?.name}
              />

              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                defaultValue={user?.email}
              />

              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                defaultValue="+880 1234 567890"
              />

              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                defaultValue="Dhaka, Bangladesh"
              />
            </div>

            <button className="mt-6 px-6 py-3 bg-slate-950 text-white rounded-lg">
              Save Changes
            </button>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-950 mb-5">
              Recent Enrollments
            </h2>

            <div className="space-y-4">
              {enrollments.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-slate-100 pb-4 last:border-b-0"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.course}
                    </h3>
                    <p className="text-sm text-slate-500">
                      Progress: {item.progress}
                    </p>
                  </div>

                  <span className="text-sm font-semibold text-blue-600">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-950 mb-5">
              Purchase History
            </h2>

            <div className="space-y-4">
              {orders.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-slate-100 pb-4 last:border-b-0"
                >
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.course}
                    </h3>
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </div>

                  <span className="font-bold">${item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Profile;