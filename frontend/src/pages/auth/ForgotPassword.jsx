import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/verify-code", {
      state: {
        email,
      },
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
          alt="Forgot Password"
          className="rounded-3xl w-full h-[520px] object-cover shadow-lg"
        />
      </div>

      <div className="max-w-md w-full mx-auto">
        <p className="text-sm text-blue-600 font-semibold mb-3">
          PASSWORD RECOVERY
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Forgot your password?
        </h1>

        <p className="text-slate-500 mt-3 mb-8">
          Enter your email address. We will send you a verification code to
          reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Send Code
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;