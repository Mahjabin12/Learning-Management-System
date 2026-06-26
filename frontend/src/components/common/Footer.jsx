import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#050b0a] text-white pt-20">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[320px] bg-[#0e2d28] rounded-[100%] opacity-60" />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-14">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-5">
              <div className="w-9 h-9 rounded-full bg-[#18d6c3] flex items-center justify-center text-[#061311] font-black">
                B
              </div>
              <span className="text-2xl font-extrabold">Byway</span>
            </Link>

            <p className="text-sm text-white/55 leading-7 max-w-sm">
              Byway helps learners build practical design and digital marketing
              skills through real-world courses, portfolio projects, and career
              growth guidance.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5">Quick Links</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/" className="hover:text-[#18d6c3]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#18d6c3]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#18d6c3]">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="hover:text-[#18d6c3]">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#18d6c3]">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5">Popular Skills</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/courses" className="hover:text-[#18d6c3]">
                  Figma Design
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#18d6c3]">
                  Canva Design
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#18d6c3]">
                  Adobe Photoshop
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#18d6c3]">
                  Logo & Branding
                </Link>
              </li>
              <li>
                <Link to="/courses" className="hover:text-[#18d6c3]">
                  Digital Marketing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-5">Support</h3>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/contact" className="hover:text-[#18d6c3]">
                  Help & FAQ
                </Link>
              </li>
              <li>
                <Link to="/forgot-password" className="hover:text-[#18d6c3]">
                  Forgot Password
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#18d6c3]">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#18d6c3]">
                  Create Account
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-6">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#18d6c3] hover:text-[#061311]"
              >
                f
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#18d6c3] hover:text-[#061311]"
              >
                in
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#18d6c3] hover:text-[#061311]"
              >
                ig
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/45">
          <p>© 2026 Byway. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-[#18d6c3]">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#18d6c3]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;