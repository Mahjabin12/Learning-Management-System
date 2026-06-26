import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <p className="text-sm font-semibold text-teal-500">PROFILE</p>
      <h1 className="text-4xl font-black mt-2 text-[var(--student-heading)]">
        My Profile
      </h1>
      <p className="text-[var(--student-muted)] mt-3 mb-8">
        Manage your student profile and learning identity.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <aside className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6 text-center h-fit">
          <div className="w-24 h-24 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center text-4xl font-black mx-auto">
            S
          </div>

          <h2 className="text-2xl font-bold mt-5 text-[var(--student-heading)]">
            {user?.name || "Student User"}
          </h2>

          <p className="text-[var(--student-muted)] mt-2">
            {user?.email || "student@lms.com"}
          </p>

          <span className="inline-block mt-4 px-3 py-1 rounded-full bg-teal-400/10 text-teal-500 border border-teal-400/20 text-xs">
            Active Student
          </span>
        </aside>

        <form className="lg:col-span-2 rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              defaultValue={user?.name || "Student User"}
              className="px-4 py-3 rounded-2xl bg-[var(--student-input)] border border-[var(--student-border)] text-[var(--student-heading)] outline-none"
            />

            <input
              type="email"
              defaultValue={user?.email || "student@lms.com"}
              className="px-4 py-3 rounded-2xl bg-[var(--student-input)] border border-[var(--student-border)] text-[var(--student-heading)] outline-none"
            />

            <input
              type="text"
              defaultValue="Dhaka, Bangladesh"
              className="px-4 py-3 rounded-2xl bg-[var(--student-input)] border border-[var(--student-border)] text-[var(--student-heading)] outline-none"
            />

            <input
              type="text"
              defaultValue="Design learner"
              className="px-4 py-3 rounded-2xl bg-[var(--student-input)] border border-[var(--student-border)] text-[var(--student-heading)] outline-none"
            />
          </div>

          <textarea
            rows="4"
            defaultValue="I am learning design and digital skills for career growth."
            className="w-full px-4 py-3 rounded-2xl bg-[var(--student-input)] border border-[var(--student-border)] text-[var(--student-heading)] outline-none"
          />

          <button
            type="button"
            className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;