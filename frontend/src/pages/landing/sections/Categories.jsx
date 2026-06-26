import { Link } from "react-router-dom";
import { categories } from "../../../data/dummyData";

function Categories() {
  return (
    <section className="relative bg-[#08251f] py-20 lg:py-24 text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f766e2e,transparent_42%)]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <p className="text-teal-400 font-semibold text-sm">Have a look</p>

        <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
          Explore Our Top <span className="text-teal-400">Categories</span>
        </h2>

        <p className="max-w-2xl mx-auto text-slate-400 text-sm mt-4 leading-6">
          Learn creative and career-focused skills through structured courses.
          Choose a category and start building real-world skills today.
        </p>

        <div className="mt-7">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-teal-400/50 text-teal-400 text-sm font-semibold hover:bg-teal-400 hover:text-[#061311] hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] transition duration-300"
          >
            Explore Categories
            <span>→</span>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mt-12 text-left">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              to={`/categories/${category.id}`}
              key={category.id}
              className={`group relative overflow-hidden rounded-xl p-[1px] transition duration-500 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(45,212,191,0.35)] ${
                index === 1
                  ? "bg-teal-400 shadow-[0_0_35px_rgba(45,212,191,0.30)]"
                  : "bg-white/10 hover:bg-gradient-to-r hover:from-teal-400 hover:via-cyan-300 hover:to-teal-500"
              }`}
            >
              <div
                className={`relative h-full min-h-[190px] rounded-xl p-5 sm:p-6 transition duration-500 ${
                  index === 1
                    ? "bg-teal-500 text-[#061311]"
                    : "bg-[#142824]/95 group-hover:bg-[#071d19]/95"
                }`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_top_left,rgba(45,212,191,0.25),transparent_35%)]" />

                <div
                  className={`relative w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-5 transition duration-300 ${
                    index === 1
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white group-hover:bg-teal-400 group-hover:text-[#061311] group-hover:shadow-[0_0_22px_rgba(45,212,191,0.55)]"
                  }`}
                >
                  {category.icon || "📚"}
                </div>

                <h3
                  className={`relative font-bold text-base tracking-tight ${
                    index === 1 ? "text-white" : "text-white"
                  }`}
                >
                  {category.name}
                </h3>

                <p
                  className={`relative text-xs leading-6 mt-3 ${
                    index === 1
                      ? "text-white/85"
                      : "text-slate-400 group-hover:text-slate-300"
                  }`}
                >
                  {category.text || `${category.courses} courses available.`}
                </p>

                <span className="absolute right-4 bottom-4 w-2 h-2 rounded-full bg-teal-400 opacity-0 group-hover:opacity-100 transition duration-300 shadow-[0_0_15px_rgba(45,212,191,0.8)]" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Categories;