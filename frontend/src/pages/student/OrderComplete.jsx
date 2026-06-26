import { Link } from "react-router-dom";

function OrderComplete() {
  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-16 flex items-center justify-center">
      <section className="max-w-2xl w-full text-center rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-8 shadow-[0_22px_60px_rgba(0,0,0,0.25)]">
        <div className="w-24 h-24 rounded-full bg-teal-400 text-[#061311] flex items-center justify-center text-5xl font-black mx-auto">
          ✓
        </div>

        <p className="text-sm font-semibold text-teal-400 mt-8">
          ORDER COMPLETE
        </p>

        <h1 className="text-4xl font-black mt-3">
          You are enrolled successfully
        </h1>

        <p className="text-slate-400 mt-4 leading-7">
          Your course access is now active. Continue learning from your student
          dashboard.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <Link
            to="/student/my-learning"
            className="px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
          >
            Go to My Learning
          </Link>

          <Link
            to="/courses"
            className="px-6 py-3 rounded-full border border-teal-400/30 text-teal-300 hover:bg-teal-400/10 transition"
          >
            Explore More Courses
          </Link>
        </div>
      </section>
    </main>
  );
}

export default OrderComplete;