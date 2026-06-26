import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function VerifyCode() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "your email";

  const [code, setCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/reset-password", {
      state: {
        email,
      },
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-2 gap-12 items-center">
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=900"
          alt="Verify Code"
          className="rounded-3xl w-full h-[520px] object-cover shadow-lg"
        />
      </div>

      <div className="max-w-md w-full mx-auto">
        <p className="text-sm text-blue-600 font-semibold mb-3">
          VERIFY CODE
        </p>

        <h1 className="text-3xl font-bold text-slate-950">
          Enter verification code
        </h1>

        <p className="text-slate-500 mt-3 mb-8">
          We sent a demo verification code to{" "}
          <span className="font-semibold text-slate-800">{email}</span>.
          Enter any 6-digit code to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
            minLength={6}
            maxLength={6}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-[0.35em]"
          />

          <button
            type="submit"
            className="w-full py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Verify Code
          </button>
        </form>

        <p className="text-sm text-slate-600 mt-6">
          Did not receive code?{" "}
          <Link to="/forgot-password" className="text-blue-600 font-semibold">
            Try again
          </Link>
        </p>
      </div>
    </main>
  );
}

export default VerifyCode;