import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
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

    login({
      name: formData.name,
      email: formData.email,
      role: "student",
    });

    navigate("/my-learning");
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
          alt="Signup"
          className="rounded-3xl w-full h-[520px] object-cover shadow-lg"
        />
      </div>

      <div className="max-w-md w-full mx-auto">
        <p className="text-sm text-blue-600 font-semibold mb-3">
          CREATE ACCOUNT
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Create your learning account
        </h1>

        <p className="text-slate-500 mt-3 mb-8">
          Join Byway and start learning from professional online courses.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
            Create Account
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Signup;