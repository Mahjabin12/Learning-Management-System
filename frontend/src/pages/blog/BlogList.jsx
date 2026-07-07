import { Link } from "react-router-dom";
import { blogs } from "../../data/dummyData";

function BlogList() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-blue-600 font-semibold text-sm">BLOGS</p>

        <h1 className="text-4xl font-bold text-slate-950 mt-2">
          Latest News & Articles
        </h1>

        <p className="text-slate-500 mt-3">
          Read learning tips, design career guides, and updates from Byway.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">
              <p className="text-sm text-blue-600 font-semibold">
                {blog.date}
              </p>

              <h2 className="text-xl font-bold text-slate-950 mt-3 leading-7">
                {blog.title}
              </h2>

              <p className="text-slate-500 text-sm leading-6 mt-3">
                {blog.description}
              </p>

              <Link
                to={`/blogs/${blog.id}`}
                className="inline-block mt-5 text-blue-600 font-semibold text-sm"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default BlogList;