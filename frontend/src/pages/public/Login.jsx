import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const role = formData.email === "admin@lms.com" ? "admin" : "student";

    login({
      name: role === "admin" ? "Admin User" : "Student User",
      email: formData.email,
      role,
    });

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/my-learning");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=900"
          alt="Login"
          className="rounded-3xl w-full h-[520px] object-cover shadow-lg"
        />
      </div>

      <div className="max-w-md w-full mx-auto">
        <p className="text-sm text-blue-600 font-semibold mb-3">
          WELCOME BACK
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Login to your account
        </h1>

        <p className="text-slate-500 mt-3 mb-8">
          Access your enrolled courses, learning progress, and dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6">
          Do not have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold">
            Create account
          </Link>
        </p>

        <div className="mt-6 p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
          <p>Student login: any email</p>
          <p>Admin login: admin@lms.com</p>
        </div>
      </div>
    </main>
  );
}

export default Login;