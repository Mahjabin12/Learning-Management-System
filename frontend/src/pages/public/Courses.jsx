import { useState, useMemo } from "react";
import CourseCard from "../../components/common/CourseCard";
import { courses } from "../../data/dummyData";

const levels = ["Beginner", "Intermediate", "Advanced"];
const prices = ["Free", "Paid"];

function Courses() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(null);
  const [level, setLevel] = useState(null);
  const [price, setPrice] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const categories = [...new Set(courses.map((c) => c.category))];

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      // 🔥 SEARCH
      if (
        query &&
        !`${c.title} ${c.instructor} ${c.category}`
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        return false;
      }

      // 🔥 CATEGORY
      if (category && c.category !== category) return false;

      // 🔥 LEVEL
      if (level && c.level !== level) return false;

      // 💰 NORMALIZE PRICE (IMPORTANT FIX)
      const priceValue = c.basePrice ?? c.price ?? 0;

      // 🆓 FREE FILTER
      if (price === "Free" && priceValue > 0) return false;

      // 💰 PAID FILTER
      if (price === "Paid" && priceValue === 0) return false;

      return true;
    });
  }, [query, category, level, price]);

  const clear = () => {
    setCategory(null);
    setLevel(null);
    setPrice(null);
    setQuery("");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 animate-fadeIn">

      {/* HEADER */}
      <div className="mb-8 animate-slideDown">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Explore Courses
        </h1>
        <p className="mt-2 text-slate-500">
          {filtered.length} courses available
        </p>
      </div>

      {/* SEARCH */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses..."
          className="h-12 w-full rounded-full border px-4 text-sm outline-none"
        />

        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className="h-12 rounded-full border px-5 text-sm lg:hidden"
        >
          Filters
        </button>
      </div>

      {/* GRID */}
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">

        {/* SIDEBAR */}
        <aside className={`${filtersOpen ? "block" : "hidden lg:block"}`}>

          <div className="sticky top-20 space-y-6 rounded-2xl border bg-white p-5 shadow-sm">

            {(category || level || price || query) && (
              <button
                onClick={clear}
                className="text-xs text-blue-600 hover:underline"
              >
                Clear all
              </button>
            )}

            {/* CATEGORY */}
            <FilterGroup title="Category">
              {categories.map((c) => (
                <Pill
                  key={c}
                  active={category === c}
                  onClick={() =>
                    setCategory(category === c ? null : c)
                  }
                >
                  {c}
                </Pill>
              ))}
            </FilterGroup>

            {/* LEVEL */}
            <FilterGroup title="Level">
              {levels.map((l) => (
                <Pill
                  key={l}
                  active={level === l}
                  onClick={() =>
                    setLevel(level === l ? null : l)
                  }
                >
                  {l}
                </Pill>
              ))}
            </FilterGroup>

            {/* PRICE */}
            <FilterGroup title="Price">
              {prices.map((p) => (
                <Pill
                  key={p}
                  active={price === p}
                  onClick={() =>
                    setPrice(price === p ? null : p)
                  }
                >
                  {p}
                </Pill>
              ))}
            </FilterGroup>

          </div>
        </aside>

        {/* COURSES */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 animate-fadeInUp">

          {filtered.length > 0 ? (
            filtered.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))
          ) : (
            <p className="text-slate-500">No courses found 😢</p>
          )}

        </div>

      </div>
    </div>
  );
}

/* ---------------- UI COMPONENTS ---------------- */

function FilterGroup({ title, children }) {
  return (
    <div>
      <h4 className="mb-2 text-xs font-semibold uppercase text-slate-500">
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition
        ${active ? "bg-black text-white" : "hover:border-black"}
      `}
    >
      {children}
    </button>
  );
}

export default Courses;