import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050807] text-white">
      {/* Decorative wave background */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 88C210 150 395 168 610 162C840 156 1030 110 1210 88C1325 74 1400 78 1440 86V0H0V88Z"
          fill="#0d211d"
          opacity="0.95"
        />
        <path
          d="M0 150C245 210 500 226 760 210C990 196 1210 145 1440 126V0H0V150Z"
          fill="#103b34"
          opacity="0.45"
        />
        <path
          d="M0 120C330 188 690 208 1040 176C1210 160 1350 128 1440 114V0H0V120Z"
          fill="#07110f"
          opacity="0.75"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-14">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-3xl font-extrabold text-teal-400">
              Byway
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              A modern learning platform for online courses, student progress
              tracking, and admin control.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Quick Links</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-teal-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-teal-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-teal-400 transition">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-teal-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Support</h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>Forum Support</li>
              <li>Help & FAQ</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold text-white">Contact</h3>

            <address className="not-italic mt-5 space-y-3 text-sm text-slate-400">
              <p>Dhaka, Bangladesh</p>
              <p>support@byway.com</p>
              <p>+880 1234 567890</p>
            </address>

            <div className="flex gap-3 mt-6">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
                f
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-500 text-sm font-bold">
                i
              </span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-sm font-bold">
                x
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 py-5 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} All rights reserved by Byway
      </div>
    </footer>
  );
}

export default Footer;