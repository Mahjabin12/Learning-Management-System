import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/adminApi";

const MAX_LEARNING_POINTS = 6;

// Icon field form e nai — sob category te ekta default icon use hobe,
// admin ke type kore dite hobe na. Backend / model e default set kora
// thakle eta na o lagte pare, but frontend fallback hisebe rakhlam.
const DEFAULT_ICON = "📚";

// emptyForm.skills array (dynamic list) — comma separated string na,
// karon CategoryDetails e "What You'll Learn" e 6 ta alada box thake,
// tai 6 ta alada point hisebei input newa hocche.
//
// "courses" field form e nai — eta actual course upload theke backend
// automatically count kore dey, admin manually type korbe na.
const emptyForm = {
  name: "",
  description: "",
  skills: [""],
  career: "",
  level: "",
  certificate: true,
  status: "Active",
};

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  // --- Load categories from backend ---

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await getCategories();
      setCategories(res.data.categories || []);
    } catch (error) {
      console.log("CATEGORY LOAD ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openAddModal = () => {
    setEditId(null);
    setFormData(emptyForm);
    setErrors({});
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      description: item.description,
      skills: item.skills && item.skills.length > 0 ? item.skills : [""],
      career: item.career,
      level: item.level,
      certificate: item.certificate,
      status: item.status,
    });
    setErrors({});
    setShowModal(true);
  };

  // --- Learning point (skills) helpers ---

  const updateLearningPoint = (index, value) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const addLearningPoint = () => {
    if (formData.skills.length >= MAX_LEARNING_POINTS) return;
    setFormData({ ...formData, skills: [...formData.skills, ""] });
  };

  const removeLearningPoint = (index) => {
    const updated = formData.skills.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      skills: updated.length > 0 ? updated : [""],
    });
  };

  // --- Validation ---
  // Ei field gula direct CategoryDetails page e show hoy, tai required:
  // description -> "What is X?", skills -> "What You'll Learn" (6 box),
  // career -> "Career Opportunity"

  const validateForm = () => {
    const newErrors = {};
    const cleanSkills = formData.skills.map((s) => s.trim()).filter(Boolean);

    if (!formData.name.trim()) newErrors.name = "Category name is required";

    if (!formData.description.trim())
      newErrors.description =
        "Required — this shows as the 'What is [Category]?' text";

    if (cleanSkills.length === 0)
      newErrors.skills =
        "Add at least 1 learning point — these fill the 'What You'll Learn' boxes";

    if (!formData.career.trim())
      newErrors.career =
        "Required — this shows in the 'Career Opportunity' section";

    if (!formData.level.trim())
      newErrors.level = "Required — shown in Category Summary";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Save (Create / Update) via backend ---

  const saveCategory = async () => {
    if (!validateForm()) return;

    const data = {
      name: formData.name,
      description: formData.description,
      skills: formData.skills.map((s) => s.trim()).filter(Boolean),
      career: formData.career,
      level: formData.level,
      certificate: formData.certificate,
      status: formData.status,
    };

    try {
      if (editId) {
        await updateCategory(editId, data);
      } else {
        await createCategory(data);
      }

      await loadCategories();
      setShowModal(false);
      setFormData(emptyForm);
      setErrors({});
    } catch (error) {
      console.log("CATEGORY SAVE ERROR", error);
    }
  };

  // --- Delete via backend ---
  // Naam "deleteCategory" already imported API function er jonno use hoye
  // gecche, tai local handler ta "handleDeleteCategory" rakhlam.

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      await loadCategories();
    } catch (error) {
      console.log("CATEGORY DELETE ERROR", error);
    }
  };

  const inputClass = `
    w-full
    h-11
    rounded-xl
    bg-[#18342e]
    border
    border-[#28594e]
    px-4
    text-sm
    text-white
    outline-none
    focus:border-teal-400
  `;

  const errorClass = "text-xs text-red-400 mt-1.5";

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Categories"
        subtitle="Manage course categories, learning details and classification."
        action={
          <button
            onClick={openAddModal}
            className="px-5 py-2.5 rounded-xl bg-teal-400 text-[#061311] text-sm font-semibold"
          >
            Add Category
          </button>
        }
      />

      <div className="grid md:grid-cols-3 gap-5 mt-6 mb-8">
        <div className="rounded-2xl bg-[#102823] border border-[#24564c] p-5">
          <p className="text-xs text-slate-400">Total Categories</p>
          <h2 className="text-2xl font-black text-white mt-2">
            {categories.length}
          </h2>
        </div>

        <div className="rounded-2xl bg-[#102823] border border-[#24564c] p-5">
          <p className="text-xs text-slate-400">Active Categories</p>
          <h2 className="text-2xl font-black text-teal-400 mt-2">
            {categories.filter((item) => item.status === "Active").length}
          </h2>
        </div>

        <div className="rounded-2xl bg-[#102823] border border-[#24564c] p-5">
          <p className="text-xs text-slate-400">Total Courses</p>
          <h2 className="text-2xl font-black text-white mt-2">
            {categories.reduce((sum, item) => sum + (item.courses || 0), 0)}
          </h2>
        </div>
      </div>

      {/* Category List */}
      <section className="rounded-2xl bg-[#102823] border border-[#24564c] p-5">
        <h2 className="text-lg font-bold text-white mb-5">Category List</h2>

        {loading ? (
          <p className="text-slate-400 text-sm">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-slate-400 text-sm">
            No categories yet. Click "Add Category" to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {categories.map((item) => (
              <div
                key={item._id}
                className="rounded-xl bg-[#18342e] border border-[#28594e] p-5 flex justify-between gap-5"
              >
                <div className="flex-1">
                  <h3 className="text-white font-bold text-base">
                    {item.icon || DEFAULT_ICON} {item.name}
                  </h3>

                  <p className="text-sm text-slate-400 mt-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-3 py-1 rounded-full bg-teal-400/10 text-teal-400 text-xs">
                      Courses: {item.courses || 0}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-white/5 text-slate-300 text-xs">
                      {item.level}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-green-400/10 text-green-400 text-xs">
                      {item.certificate
                        ? "Certificate Available"
                        : "No Certificate"}
                    </span>
                  </div>

                  <div className="mt-3">
                    <p className="text-xs text-slate-400">
                      What You'll Learn ({(item.skills || []).length}/
                      {MAX_LEARNING_POINTS}):
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {(item.skills || []).map((skill, i) => (
                        <span
                          key={i}
                          className="text-xs text-slate-200 bg-[#102823] border border-[#28594e] px-2 py-1 rounded-lg"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="px-3 py-2 rounded-lg bg-teal-400 text-[#061311] text-xs font-bold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteCategory(item._id)}
                    className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 text-xs font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#102823] border border-[#24564c] p-6">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-5 top-4 text-2xl text-slate-400 hover:text-white"
            >
              ×
            </button>

            <h2 className="text-xl font-bold text-white mb-1">
              {editId ? "Edit Category" : "Add New Category"}
            </h2>

            <p className="text-xs text-slate-400 mb-6">
              Every field below maps directly to the public category page —
              fill all of them so it displays properly.
            </p>

            {/* Basic Info */}
            <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold mb-3">
              Basic Info
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <input
                  placeholder="Category Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                />
                {errors.name && <p className={errorClass}>{errors.name}</p>}
              </div>

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className={inputClass}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>

              <label className="flex items-center gap-3 text-sm text-slate-300 h-11">
                <input
                  type="checkbox"
                  checked={formData.certificate}
                  onChange={(e) =>
                    setFormData({ ...formData, certificate: e.target.checked })
                  }
                  className="accent-teal-400"
                />
                Certificate Available
              </label>
            </div>

            {/* About / Description */}
            <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold mt-6 mb-3">
              About This Category — "What is {formData.name || "___"}?"
            </p>

            <div>
              <textarea
                placeholder="Explain what this category / skill is about..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full h-24 rounded-xl bg-[#18342e] border border-[#28594e] px-4 py-3 text-sm text-white outline-none"
              />
              {errors.description && (
                <p className={errorClass}>{errors.description}</p>
              )}
            </div>

            {/* What You'll Learn */}
            <div className="flex items-center justify-between mt-6 mb-3">
              <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold">
                What You'll Learn ({formData.skills.length}/
                {MAX_LEARNING_POINTS} boxes)
              </p>

              <button
                type="button"
                onClick={addLearningPoint}
                disabled={formData.skills.length >= MAX_LEARNING_POINTS}
                className="text-xs font-bold text-teal-400 disabled:text-slate-600"
              >
                + Add Point
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {formData.skills.map((point, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    placeholder={`Learning point ${index + 1} (e.g. Wireframing)`}
                    value={point}
                    onChange={(e) =>
                      updateLearningPoint(index, e.target.value)
                    }
                    className={inputClass}
                  />

                  {formData.skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLearningPoint(index)}
                      className="w-9 h-9 flex-shrink-0 rounded-lg bg-red-500/10 text-red-400 text-sm font-bold"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors.skills && <p className={errorClass}>{errors.skills}</p>}

            {/* Career */}
            <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold mt-6 mb-3">
              Career Opportunity
            </p>

            <div>
              <input
                placeholder="e.g. Perfect for Product Designers, UI Designers and UX Researchers."
                value={formData.career}
                onChange={(e) =>
                  setFormData({ ...formData, career: e.target.value })
                }
                className={inputClass}
              />
              {errors.career && <p className={errorClass}>{errors.career}</p>}
            </div>

            {/* Category Summary */}
            <p className="text-xs uppercase tracking-widest text-teal-400 font-semibold mt-6 mb-3">
              Category Summary
            </p>
            <p className="text-xs text-slate-500 mb-3">
              Course count isn't set here — it's fetched automatically from
              the courses uploaded under this category.
            </p>

            <div>
              <input
                placeholder="Level (e.g. Beginner → Advanced)"
                value={formData.level}
                onChange={(e) =>
                  setFormData({ ...formData, level: e.target.value })
                }
                className={inputClass}
              />
              {errors.level && <p className={errorClass}>{errors.level}</p>}
            </div>

            <button
              onClick={saveCategory}
              className="w-full mt-6 py-3 rounded-xl bg-teal-400 text-[#061311] font-bold text-sm"
            >
              {editId ? "Update Category" : "Save Category"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;