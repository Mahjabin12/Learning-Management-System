import { Link } from "react-router-dom";

function ResetSuccess() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900"
          alt="Reset Success"
          className="rounded-3xl w-full h-[520px] object-cover shadow-lg"
        />
      </div>

      <div className="max-w-md w-full mx-auto text-center md:text-left">
        <div className="w-20 h-20 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-4xl mx-auto md:mx-0 mb-6">
          ✓
        </div>

        <p className="text-sm text-blue-600 font-semibold mb-3">
          PASSWORD UPDATED
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Password reset successful
        </h1>

        <p className="text-slate-500 mt-3 mb-8">
          Your password has been reset successfully. You can now login to your
          account and continue learning.
        </p>

        <Link
          to="/login"
          className="inline-block w-full text-center py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}

export default ResetSuccess;