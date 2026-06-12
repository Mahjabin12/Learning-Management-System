import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { user, isLoggedIn, logout } = useAuth();

  const navClass = ({ isActive }) =>
    isActive
      ? "text-teal-400 font-semibold"
      : "text-white hover:text-teal-400";

  return (
    <header className="sticky top-0 z-50 bg-[#061311] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-teal-400">
          Byway
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink to="/" className={navClass}>Home</NavLink>
          <NavLink to="/courses" className={navClass}>Courses</NavLink>

          {!isLoggedIn && <>
            <NavLink to="/about" className={navClass}>About</NavLink>
            <NavLink to="/contact" className={navClass}>Contact</NavLink>
          </>}

          {isLoggedIn && user?.role === "student" && <>
            <NavLink to="/my-learning" className={navClass}>My Learning</NavLink>
            <NavLink to="/cart" className={navClass}>Cart</NavLink>
            <NavLink to="/profile" className={navClass}>Profile</NavLink>
          </>}

          {isLoggedIn && user?.role === "admin" && (
            <NavLink to="/admin" className={navClass}>Admin Dashboard</NavLink>
          )}
        </nav>

        <div className="hidden lg:block flex-1">
          <input
            type="text"
            placeholder="Search courses"
            className="w-full max-w-md px-4 py-2 border border-white/20 rounded-full text-sm bg-white/5 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>

        <div className="ml-auto flex items-center gap-3 text-sm">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="px-4 py-2 border border-white/50  text-white rounded-full hover:bg-white/30">Login</Link>
              <Link to="/signup" className="px-4 py-2 bg-teal-600 text-white rounded-full hover:bg-teal-400">Sign Up</Link>
            </>
          ) : (
            <>
              <span className="hidden sm:block text-white">{user?.name}</span>
              <button onClick={logout} className="px-4 py-2 bg-teal-500 text-black rounded-full hover:bg-teal-300">Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;