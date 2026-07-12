import { useState } from "react";
import { X, Plus } from "lucide-react";

function AdminBlog() {
  const [showForm, setShowForm] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const emptyForm = {
    title: "",
    category: "",
    description: "",
    image: "",
    date: "",
    readTime: "5 min read",
    content: "",
  };

  const [formData, setFormData] = useState(emptyForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert("Title and Category is required");
      return;
    }

    const newBlog = {
      id: Date.now(),
      ...formData,
    };

    setBlogs((prev) => [newBlog, ...prev]);
    setFormData(emptyForm);
    setShowForm(false);
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    setBlogs((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6">
      {/* ================= Page Header ================= */}

      <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Management</h1>
          <p className="text-slate-400 mt-1 text-sm">
            Create, manage and publish educational content.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="
          inline-flex items-center gap-2
          px-5 py-2.5
          rounded-xl
          bg-teal-400
          text-[#061311]
          font-semibold
          text-sm
          hover:bg-teal-300
          transition
          cursor-pointer
          "
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* ================= Blog List / Empty State ================= */}

      {blogs.length === 0 ? (
        <div
          className="
          rounded-2xl
          border
          border-white/10
          bg-white/[0.03]
          p-10
          text-center
          "
        >
          <h3 className="text-xl font-bold text-white">No Blog Posts</h3>

          <p className="text-slate-400 mt-2">
            Blog posts will appear here after connecting database.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}

              <div className="p-5">
                <span className="inline-block px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 text-xs font-semibold">
                  {item.category}
                </span>

                <h3 className="mt-3 text-lg font-bold text-white line-clamp-1">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    {item.date} {item.readTime && `• ${item.readTime}`}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-400 hover:text-red-300 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= Add Blog Form Modal ================= */}

      {showForm && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleCancel}
          />

          {/* Form Card */}
          <div
            className="
            relative
            w-full
            max-w-2xl
            max-h-[90vh]
            overflow-y-auto
            rounded-2xl
            border
            border-white/10
            bg-[#0b1512]
            p-6
            sm:p-8
            "
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Add New Blog</h2>

              <button
                type="button"
                onClick={handleCancel}
                className="text-slate-400 hover:text-white transition cursor-pointer"
              >
                <X size={22} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category (badge on hero) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g. Web Development"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-teal-400"
                />
              </div>

              {/* Title (H1) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. 10 Tips to Learn Web Development Fast"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-teal-400"
                />
              </div>

              {/* Description (hero paragraph) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Short Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Short summary shown under the title and on blog cards"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-teal-400 resize-none"
                />
              </div>

              {/* Date + Read Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none focus:border-teal-400 [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleChange}
                    placeholder="e.g. 5 min read"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              {/* Image URL (Featured Image) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-teal-400"
                />

                {formData.image && (
                  <img
                    src={formData.image}
                    alt="preview"
                    className="mt-3 w-full h-40 object-cover rounded-xl border border-white/10"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
              </div>

              {/* Content (main article body) */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Blog Content
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  rows={8}
                  placeholder="Write the full blog article here..."
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white placeholder:text-slate-500 outline-none focus:border-teal-400 resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-slate-300 hover:bg-white/5 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-teal-400 text-[#061311] font-semibold hover:bg-teal-300 transition cursor-pointer"
                >
                  Publish Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminBlog;