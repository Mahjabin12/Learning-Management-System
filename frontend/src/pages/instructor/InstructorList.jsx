import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { instructors } from "../../data/dummyData";

function InstructorList() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");

  useEffect(() => {
    const handleTheme = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    window.addEventListener("themechange", handleTheme);
    window.addEventListener("storage", handleTheme);

    return () => {
      window.removeEventListener("themechange", handleTheme);
      window.removeEventListener("storage", handleTheme);
    };
  }, []);

  const isDark = theme === "dark";

  const specialties = useMemo(() => {
    return [
      "All",
      ...new Set(instructors.map((item) => item.specialty)),
    ];
  }, []);

  const filteredInstructors = useMemo(() => {
    return instructors.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.role.toLowerCase().includes(search.toLowerCase()) ||
        item.specialty.toLowerCase().includes(search.toLowerCase());

      const matchSpecialty =
        specialty === "All" || item.specialty === specialty;

      return matchSearch && matchSpecialty;
    });
  }, [search, specialty]);

  const pageClass = isDark
    ? "bg-[#061311] text-white"
    : "bg-[#e8f3ee] text-[#061311]";

  const cardClass = isDark
    ? "bg-[#0b1f1b] border-white/10"
    : "bg-white/75 border-emerald-900/10 backdrop-blur-xl";

  const inputClass = isDark
    ? "bg-white/[0.07] border-white/10 text-white placeholder:text-white/40"
    : "bg-white/80 border-emerald-900/10 text-[#061311]";

  return (
    <main
      className={`min-h-screen transition-colors duration-500 ${pageClass}`}
    >
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10">

        {/* Hero Section */}

        <div
          className={`relative overflow-hidden rounded-[32px] border p-8 lg:p-12 mb-10 ${
            isDark
              ? "bg-[#071715] border-white/10"
              : "bg-[#f2faf6] border-emerald-900/10"
          }`}
        >
          <div
            className={`absolute inset-0 ${
              isDark
                ? "bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,.18),transparent_35%)]"
                : "bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,.18),transparent_35%)]"
            }`}
          />

          <div className="relative">
            <p className="uppercase tracking-[0.25em] text-sm font-bold text-teal-400">
              Skillora Mentors
            </p>

            <h1
              className={`mt-4 text-4xl lg:text-5xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Meet Our Expert Instructors
            </h1>

            <p
              className={`mt-5 max-w-3xl leading-8 ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              Learn from industry professionals with years of experience in
              UI/UX Design, Branding, Digital Marketing, Product Design,
              Development and Career Growth.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

              <div className={`${cardClass} rounded-2xl border p-5`}>
                <h2 className="text-3xl font-black text-teal-400">
                  {instructors.length}+
                </h2>

                <p className="mt-2 text-sm opacity-70">
                  Expert Instructors
                </p>
              </div>

              <div className={`${cardClass} rounded-2xl border p-5`}>
                <h2 className="text-3xl font-black text-teal-400">
                  4.9★
                </h2>

                <p className="mt-2 text-sm opacity-70">
                  Average Rating
                </p>
              </div>

              <div className={`${cardClass} rounded-2xl border p-5`}>
                <h2 className="text-3xl font-black text-teal-400">
                  10K+
                </h2>

                <p className="mt-2 text-sm opacity-70">
                  Students Mentored
                </p>
              </div>

              <div className={`${cardClass} rounded-2xl border p-5`}>
                <h2 className="text-3xl font-black text-teal-400">
                  50+
                </h2>

                <p className="mt-2 text-sm opacity-70">
                  Professional Courses
                </p>
              </div>

            </div>
          </div>
        </div>
                {/* Search & Filter */}

        <div className="grid gap-4 lg:grid-cols-[1fr_280px] mb-10">

          <input
            type="text"
            placeholder="Search instructor by name, role or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`h-14 rounded-2xl border px-5 outline-none transition focus:ring-2 focus:ring-teal-400 ${inputClass}`}
          />

          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className={`h-14 rounded-2xl border px-5 outline-none transition focus:ring-2 focus:ring-teal-400 ${inputClass}`}
          >
            {specialties.map((item) => (
              <option
                key={item}
                value={item}
                style={{
                  color: "#0f172a",
                  background: "#ffffff",
                }}
              >
                {item}
              </option>
            ))}
          </select>

        </div>

        {/* Result Header */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

          <div>
            <h2
              className={`text-2xl font-black ${
                isDark ? "text-white" : "text-[#061311]"
              }`}
            >
              Our Instructors
            </h2>

            <p
              className={`mt-1 ${
                isDark ? "text-white/60" : "text-slate-600"
              }`}
            >
              {filteredInstructors.length} instructor
              {filteredInstructors.length !== 1 && "s"} found
            </p>
          </div>

          <div
            className={`rounded-2xl border px-5 py-3 ${
              isDark
                ? "bg-[#0b1f1b] border-white/10"
                : "bg-white/75 border-emerald-900/10"
            }`}
          >
            <span className="text-teal-400 font-bold">
              Learn from industry professionals
            </span>
          </div>

        </div>

        {/* Instructor Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-7">
          {filteredInstructors.length > 0 ? (
  filteredInstructors.map((instructor) => (
    <Link
      key={instructor.id}
      to={`/instructors/${instructor.id}`}
      className={`group rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:border-teal-400 ${
        isDark
          ? "bg-[#0b1f1b] border-white/10"
          : "bg-white/75 border-emerald-900/10 backdrop-blur-xl"
      }`}
    >
      {/* Image */}

      <div className="pt-8 flex justify-center">
        <img
          src={instructor.image}
          alt={instructor.name}
          className="w-28 h-28 rounded-full object-cover border-4 border-teal-400 group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* Content */}

      <div className="p-6 text-center">

        <h2
          className={`text-xl font-black ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          {instructor.name}
        </h2>

        <p className="mt-2 text-teal-400 font-semibold">
          {instructor.role}
        </p>

        <p
          className={`text-sm mt-3 leading-6 ${
            isDark ? "text-white/60" : "text-slate-600"
          }`}
        >
          {instructor.specialty}
        </p>

        {/* Stats */}

        <div className="grid grid-cols-2 gap-3 mt-6">

          <div
            className={`rounded-xl p-3 ${
              isDark
                ? "bg-white/5"
                : "bg-slate-100"
            }`}
          >
            <p className="text-yellow-400 font-bold">
              ⭐ {instructor.rating}
            </p>

            <span
              className={`text-xs ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              Rating
            </span>
          </div>

          <div
            className={`rounded-xl p-3 ${
              isDark
                ? "bg-white/5"
                : "bg-slate-100"
            }`}
          >
            <p
              className={`font-bold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {instructor.students}+
            </p>

            <span
              className={`text-xs ${
                isDark ? "text-white/50" : "text-slate-500"
              }`}
            >
              Students
            </span>
          </div>

        </div>

        {/* Button */}

        <button className="mt-7 w-full rounded-xl bg-teal-400 text-[#061311] py-3 font-bold transition-all duration-300 hover:bg-teal-300 hover:scale-[1.02]">
          View Profile →
        </button>

      </div>
    </Link>
  ))
) : (
  <div
    className={`col-span-full rounded-3xl p-12 text-center border ${
      isDark
        ? "bg-[#0b1f1b] border-white/10"
        : "bg-white/80 border-emerald-900/10"
    }`}
  >
    <h2
      className={`text-2xl font-black ${
        isDark ? "text-white" : "text-slate-900"
      }`}
    >
      No Instructor Found
    </h2>

    <p
      className={`mt-3 ${
        isDark ? "text-white/60" : "text-slate-600"
      }`}
    >
      Try searching with another keyword or specialty.
    </p>
  </div>
)}
        </div>
      </section>
    </main>
  );
}

export default InstructorList;