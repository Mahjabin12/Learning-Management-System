import { Link } from "react-router-dom";

function OrderComplete() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 text-center">
      <div className="w-28 h-28 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white text-6xl">
        ✓
      </div>

      <h1 className="text-4xl font-bold text-slate-950 mt-8">
        Order Complete
      </h1>

      <p className="text-slate-500 mt-3">
        Your enrollment is successful. You can now start learning from your
        dashboard.
      </p>

      <Link
        to="/my-learning"
        className="inline-block mt-8 px-7 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
      >
        Go to My Learning
      </Link>
    </main>
  );
}

export default OrderComplete;