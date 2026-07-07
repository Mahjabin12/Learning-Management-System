import { Link, useParams } from "react-router-dom";
import { blogs } from "../../data/dummyData";

function BlogDetails() {
  const { id } = useParams();

  const blog = blogs.find((item) => String(item.id) === id) || blogs[0];

  const relatedBlogs = blogs
    .filter((item) => item.id !== blog.id)
    .slice(0, 3);

  return (
    <main>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-14 text-center">
          <p className="text-sm text-blue-600 font-semibold">
            BLOG / {blog.date}
          </p>

          <h1 className="text-4xl sm:text-5xl font-bold text-slate-950 mt-4 leading-tight">
            {blog.title}
          </h1>

          <p className="text-slate-500 mt-5 max-w-3xl mx-auto leading-7">
            {blog.description}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[420px] object-cover rounded-3xl shadow-lg"
        />

        <article className="mt-10 text-slate-600 leading-8 space-y-6">
          <p>
            Online learning is becoming an important part of modern skill
            development. Learners now want practical courses that help them
            understand real tools, build portfolio projects, and apply their
            knowledge in real-world work.
          </p>

          <p>
            At Byway, learners can explore creative skills such as Figma,
            Canva, Adobe tools, UI/UX design, branding, web design, product
            design, and digital marketing. These skills are useful for
            freelancing, job preparation, business growth, and personal career
            development.
          </p>

          <p>
            A strong learning path should include clear lessons, guided
            projects, practice tasks, and career-focused direction. This helps
            students move from basic understanding to confident practical
            application.
          </p>
        </article>

        <div className="mt-10">
          <Link
            to="/blogs"
            className="inline-block px-6 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            ← Back to Blogs
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-slate-950 mb-6">
          Related Blogs
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedBlogs.map((item) => (
            <article
              key={item.id}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />

              <div className="p-6">
                <p className="text-sm text-blue-600 font-semibold">
                  {item.date}
                </p>

                <h3 className="text-lg font-bold text-slate-950 mt-3 leading-7">
                  {item.title}
                </h3>

                <p className="text-slate-500 text-sm leading-6 mt-3">
                  {item.description}
                </p>

                <Link
                  to={`/blogs/${item.id}`}
                  className="inline-block mt-5 text-blue-600 font-semibold text-sm"
                >
                  Read more →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BlogDetails;