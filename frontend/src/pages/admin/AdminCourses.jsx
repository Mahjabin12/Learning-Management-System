import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { getCourses, getCategories } from "../../services/adminApi";

function useAdminTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    const syncTheme = () =>
      setTheme(localStorage.getItem("theme") || "dark");

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
}

function FilterDropdown({ value, options, onChange, isDark }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`flex h-12 w-full items-center justify-between rounded-xl
          border px-4 text-sm font-medium outline-none transition ${
            isDark
              ? "border-teal-400/15 bg-[#132824] text-slate-200 hover:border-teal-400/40"
              : "border-slate-200 bg-white text-slate-700 hover:border-teal-500/50"
          }`}
      >
        <span>{value}</span>

        <svg
          className={`h-4 w-4 transition-transform ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full z-50 mt-2 max-h-60 w-full
            overflow-y-auto rounded-xl border p-1 shadow-2xl ${
              isDark
                ? "border-teal-400/20 bg-[#0d201c]"
                : "border-slate-200 bg-white"
            }`}
        >
          {options.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={`w-full rounded-lg px-3 py-2.5 text-left text-sm
                transition ${
                  value === option
                    ? "bg-teal-400 font-semibold text-[#061311]"
                    : isDark
                      ? "text-slate-300 hover:bg-white/[0.07] hover:text-white"
                      : "text-slate-700 hover:bg-teal-50"
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminCourses() {
  const isDark = useAdminTheme() === "dark";

  const [courses, setCourses] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories,setCategories]=useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");

  const headingClass = isDark ? "text-white" : "text-[#071713]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-500";

const loadCourses = async () => {

try{

const courseRes = await getCourses();

const categoryRes = await getCategories();


setCourses(
courseRes.data.courses || []
);


setCategories(
categoryRes.data.categories || []
);


}
catch(error){

console.log(
"Courses load error",
error
);

}

finally{
setLoading(false);
}

};

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategoryList(res.data.categories || []);
    } catch (error) {
      console.log("Categories load error", error);
    }
  };

  useEffect(() => {
    loadCourses();
    loadCategories();
  }, []);

  const categoryOptions = useMemo(
()=>[
"All Categories",
...categories.map(
(item)=>item.name
)
],
[categories]
);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();

    return courses.filter((course) => {
      const matchesSearch =
        !query ||
        course.title?.toLowerCase().includes(query) ||
        course.instructor?.toLowerCase().includes(query);

      const matchesCategory =
        category === "All Categories" || course.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category, courses]);

  const totalLearners = courses.reduce(
    (total, course) => total + Number(course.students || 0),
    0
  );

  const columns = [
    {
      key: "title",
      label: "Course",
      render: (row) => (
        <div className="flex min-w-[270px] items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={row.thumbnail}
              alt={row.title}
              className="h-12 w-16 rounded-lg border border-teal-400/15 object-cover"
            />
            <span className="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-teal-400 ring-2 ring-[#10231f]" />
          </div>

          <div>
            <p className={`text-sm font-semibold ${headingClass}`}>
              {row.title}
            </p>
            <p className={`mt-1 text-xs ${mutedClass}`}>{row.category}</p>
          </div>
        </div>
      ),
    },
    {
      key: "instructor",
      label: "Instructor",
      render: (row) => (
        <span className={`text-sm ${mutedClass}`}>{row.instructor}</span>
      ),
    },
    {
      key: "price",
      label: "Price",
      render: (row) => (
        <span className="text-sm font-semibold text-teal-400">
          ${row.price}
        </span>
      ),
    },
    {
      key: "students",
      label: "Students",
      render: (row) => (
        <span className={`text-sm ${mutedClass}`}>
          {Number(row.students || 0).toLocaleString()} learners
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status || "Draft"} />,
    },
    {
      key: "publishedAt",
      label: "Published On",
      render: (row) => (
        <span className={`text-sm ${mutedClass}`}>
          {row.publishedAt
            ? new Date(row.publishedAt).toLocaleString()
            : "—"}
        </span>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex min-w-[100px] flex-wrap gap-2">
          <Link
            to={`/admin/courses/${row.id}`}
            className="rounded-lg bg-teal-400 px-3 py-2 text-xs font-bold
              text-[#061311] transition hover:bg-teal-300"
          >
            View
          </Link>
        </div>
      ),
    },
  ];

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      highlight: true,
    },
    {
      label: "Published",
      value: courses.filter((course) => course.status === "Published").length,
    },
    {
      label: "Categories",
      value: categoryList.length,
    },
    {
      label: "Total Learners",
      value: `${totalLearners.toLocaleString()}+`,
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-400">
            Admin Panel
          </p>

          <h1
            className={`text-3xl font-black tracking-tight sm:text-4xl ${headingClass}`}
          >
            Manage Courses
          </h1>

          <p className={`mt-2 max-w-2xl text-sm leading-6 ${mutedClass}`}>
            View courses published by instructors across the Skillora LMS.
          </p>
        </div>
      </div>

      <section
        className={`relative z-20 mb-7 rounded-2xl border p-4 sm:p-5 ${
          isDark
            ? "border-teal-400/15 bg-white/[0.055]"
            : "border-slate-200 bg-white shadow-sm"
        }`}
      >
        <div className="grid gap-3 md:grid-cols-3">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by course or instructor"
            className={`h-12 rounded-xl border px-4 text-sm outline-none
              transition md:col-span-2 ${
                isDark
                  ? "border-teal-400/15 bg-[#132824] text-white placeholder:text-slate-500 focus:border-teal-400/50"
                  : "border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:border-teal-500"
              }`}
          />

          <FilterDropdown
            value={category}
            options={categories}
            onChange={setCategory}
            isDark={isDark}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-teal-400/10 pt-5 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label}>
              <p className={`text-xs font-medium ${mutedClass}`}>
                {item.label}
              </p>
              <p
                className={`mt-1 text-xl font-black sm:text-2xl ${
                  item.highlight ? "text-teal-400" : headingClass
                }`}
              >
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="relative z-10">
        {loading ? (
          <p className={mutedClass}>Loading courses...</p>
        ) : (
          <DataTable columns={columns} data={filteredCourses} />
        )}
      </div>
    </div>
  );
}

export default AdminCourses;