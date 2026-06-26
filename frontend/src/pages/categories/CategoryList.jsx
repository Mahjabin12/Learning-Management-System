import { Link } from "react-router-dom";
import { categories } from "../../data/dummyData";

function CategoryList() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-blue-600 font-semibold text-sm">CATEGORIES</p>

        <h1 className="text-4xl font-bold text-slate-950 mt-2">
          Explore Skill Categories
        </h1>

        <p className="text-slate-500 mt-3 max-w-2xl">
          Choose a category to understand what the skill is, what you can do
          with it, and which courses are available for learning.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.id}`}
            className="border border-slate-200 rounded-2xl p-6 bg-white hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl mb-5">
              {category.icon || "📚"}
            </div>

            <h2 className="text-xl font-bold text-slate-950">
              {category.name}
            </h2>

            <p className="text-sm text-slate-500 leading-6 mt-3">
              {category.text || "Explore courses and tutorials in this category."}
            </p>

            <p className="text-blue-600 font-semibold text-sm mt-5">
              View details →
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default CategoryList;