import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetPassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");

    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    navigate("/reset-success");
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=900"
          alt="Reset Password"
          className="rounded-3xl w-full h-[520px] object-cover shadow-lg"
        />
      </div>

      <div className="max-w-md w-full mx-auto">
        <p className="text-sm text-blue-600 font-semibold mb-3">
          RESET PASSWORD
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Create a new password
        </h1>

        <p className="text-slate-500 mt-3 mb-8">
          Enter your new password and confirm it to complete the password reset
          process.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="password"
            type="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Reset Password
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6">
          Remember your account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default ResetPassword;