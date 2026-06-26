import { Link } from "react-router-dom";

const blogs = [
  {
    id: 1,
    title: "Clear structured learning system",
    date: "June 20, 2026",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
  },
  {
    id: 2,
    title: "Hands-on practice improves skills",
    date: "June 18, 2026",
    img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769",
  },
  {
    id: 3,
    title: "Modern education trends",
    date: "June 15, 2026",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  },
];

function Blogs() {
  return (
    <section className="bg-[#061311] pb-24">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-extrabold">Latest Blogs</h2>

        <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white/10 rounded-xl overflow-hidden">
              <img src={blog.img} className="w-full h-56 object-cover" />

              <div className="p-6">
                <p className="text-teal-400 text-xs">{blog.date}</p>
                <h3 className="font-bold mt-2">{blog.title}</h3>

                <Link to="/courses" className="text-teal-400 mt-4 inline-block">
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Blogs;
