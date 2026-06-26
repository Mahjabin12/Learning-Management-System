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

    const email = formData.email.trim().toLowerCase();

    let role = "student";
    let name = "Student User";
    let redirectPath = "/student/dashboard";

    if (email === "admin@lms.com") {
      role = "admin";
      name = "Admin";
      redirectPath = "/admin/dashboard";
    } else if (email === "ins@lms.com") {
      role = "instructor";
      name = "Instructor";
      redirectPath = "/instructor/dashboard";
    }

    login({
      name,
      email,
      role,
    });

    navigate(redirectPath);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-600 transition"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 grid md:grid-cols-2 gap-12 items-center">
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=900"
              alt="Login"
              className="rounded-3xl w-full h-[520px] object-cover shadow-lg"
            />
          </div>

          <div className="max-w-md w-full mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <p className="text-sm text-teal-600 font-bold mb-3">
              WELCOME BACK
            </p>

            <h1 className="text-3xl font-extrabold text-slate-950">
              Login to your account
            </h1>

            <p className="text-slate-500 mt-3 mb-8 leading-6">
              Access your courses, dashboard, learning progress, and account
              tools.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />

              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-sm text-teal-600 font-semibold hover:text-teal-700 transition"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-teal-500 text-[#061311] font-bold rounded-xl hover:bg-teal-400 hover:-translate-y-0.5 transition duration-300 shadow-[0_12px_30px_rgba(20,184,166,0.25)]"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-slate-600 mt-6 text-center">
              Do not have an account?{" "}
              <Link
                to="/signup"
                className="text-teal-600 font-bold hover:text-teal-700 transition"
              >
                Create account
              </Link>
            </p>

            <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 space-y-1">
              <p>
                <span className="font-semibold text-slate-900">
                  Student login:
                </span>{" "}
                any email
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Instructor login:
                </span>{" "}
                ins@lms.com
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Admin login:
                </span>{" "}
                admin@lms.com
              </p>

              <p>
                <span className="font-semibold text-slate-900">
                  Password:
                </span>{" "}
                anything
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;