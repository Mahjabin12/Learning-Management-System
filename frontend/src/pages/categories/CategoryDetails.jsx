import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { categories, courses } from "../../data/dummyData";
import CourseCard from "../../components/common/CourseCard";

const categoryTutorials = {
  "Figma Design": {
    intro:
      "Figma is a modern design tool used for UI design, website design, mobile app design, wireframing, prototyping, and design systems. It works directly in the browser and allows designers to collaborate in real time.",
    uses: [
      "Design mobile app screens",
      "Create website layouts",
      "Build wireframes and prototypes",
      "Create reusable components",
      "Design dashboards and SaaS products",
      "Prepare portfolio case studies",
    ],
    career:
      "Figma is useful for UI/UX designers, web designers, product designers, freelance designers, and anyone who wants to design digital products professionally.",
  },

  "Canva Design": {
    intro:
      "Canva is an easy-to-use design platform for creating social media posts, presentations, posters, banners, brand kits, and marketing materials.",
    uses: [
      "Create social media posts",
      "Design business presentations",
      "Make posters and flyers",
      "Create brand kits",
      "Design thumbnails and ads",
      "Prepare marketing content",
    ],
    career: "Canva is useful for freelancers, content creators, marketers and beginners.",
  },

  "Adobe Creative Suite": {
    intro:
      "Adobe Creative Suite includes Photoshop, Illustrator and XD for professional graphic design, branding and UI design.",
    uses: ["Photo editing", "Logo design", "Poster design", "Brand identity", "UI Design", "Print design"],
    career: "Useful for Graphic Designers, Branding Experts and Agencies.",
  },

  "UI/UX Design": {
    intro: "UI/UX Design focuses on building beautiful and user-friendly digital products.",
    uses: ["Wireframing", "User Flow", "Prototyping", "UX Research", "Mobile App Design", "Website Design"],
    career: "Perfect for Product Designers, UI Designers and UX Researchers.",
  },

  "Web Design": {
    intro: "Web Design teaches responsive website layouts, typography, color systems and modern design principles.",
    uses: ["Landing Pages", "Portfolio Websites", "Business Websites", "Responsive Design", "Website Layout", "Creative UI"],
    career: "Useful for Freelancers and Frontend Designers.",
  },

  "Logo & Branding": {
    intro: "Logo & Branding is all about creating visual identities for businesses.",
    uses: ["Logo Design", "Brand Identity", "Typography", "Business Cards", "Color Systems", "Brand Guidelines"],
    career: "Perfect for Brand Designers and Freelancers.",
  },

  "Product Design": {
    intro: "Product Design solves user problems through digital experiences.",
    uses: ["User Flow", "Dashboard Design", "Product Thinking", "Research", "Usability", "MVP Design"],
    career: "Excellent for Startup Designers and Product Teams.",
  },

  "Digital Marketing": {
    intro: "Digital Marketing teaches SEO, Paid Ads, Social Media and Content Marketing.",
    uses: ["SEO", "Facebook Ads", "Google Ads", "Email Marketing", "Analytics", "Content Strategy"],
    career: "Great for Entrepreneurs, Freelancers and Marketers.",
  },

  "Career Growth": {
    intro: "Career Growth helps students build portfolios and freelance careers.",
    uses: ["Portfolio", "Freelancing", "LinkedIn", "Client Communication", "Pricing", "Interview Preparation"],
    career: "Useful for beginners and job seekers.",
  },
};

function CategoryDetails() {
  const { id } = useParams();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "dark");

    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  const isDark = theme === "dark";

  const category =
    categories.find((item) => String(item.id) === String(id)) || categories[0];

  const tutorial = categoryTutorials[category.name] || {
    intro:
      "Learn practical skills through structured lessons and real-world projects.",
    uses: [
      "Practical Learning",
      "Real Projects",
      "Professional Workflow",
      "Portfolio",
      "Freelancing",
      "Career Skills",
    ],
    career:
      "This skill helps learners grow professionally and build a successful career.",
  };

  const categoryCourses = courses.filter(
    (course) => course.category === category.name
  );

  // ⬇️ same theme tokens as Hero.jsx / CourseDetails.jsx
  const pageClass = isDark
    ? "bg-[#061311] text-white"
    : "bg-[#e8f3ee] text-[#061311]";

  const mutedText = isDark ? "text-white/60" : "text-slate-600";

  const cardClass = isDark
    ? "bg-white/[0.055] border-white/10 backdrop-blur-xl"
    : "bg-white/75 border-emerald-900/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(6,19,17,0.08)]";

  const softCardClass = isDark
    ? "bg-white/[0.045] border-white/10 hover:bg-teal-400/10"
    : "bg-white/70 border-emerald-900/10 hover:bg-teal-50";

  const titleClass = isDark ? "text-white" : "text-[#061311]";
  const accent = isDark ? "text-teal-400" : "text-teal-600";

  return (
    <main className={`min-h-screen transition-colors duration-500 ${pageClass}`}>
      {/* Hero Section */}
      <section
        className={`relative overflow-hidden border-b ${
          isDark ? "border-white/10" : "border-emerald-900/10"
        }`}
      >
        <div
          className={`absolute inset-0 pointer-events-none ${
            isDark
              ? "bg-[radial-gradient(circle_at_20%_20%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(20,184,166,0.14),transparent_30%)]"
              : "bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.20),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(16,185,129,0.13),transparent_30%)]"
          }`}
        />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14 sm:py-16">
          <Link
            to="/categories"
            className={`text-sm font-semibold transition ${
              isDark
                ? "text-teal-300 hover:text-teal-200"
                : "text-teal-700 hover:text-teal-800"
            }`}
          >
            ← Back to Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-8">
            <div
              className={`w-24 h-24 rounded-3xl border flex items-center justify-center text-5xl ${
                isDark ? "bg-white/10 border-white/10" : "bg-white/70 border-emerald-900/10"
              }`}
            >
              {category.icon || "📚"}
            </div>

            <div>
              <span className="inline-flex px-3 py-1 rounded-full bg-teal-400/15 border border-teal-300/25 text-teal-300 text-xs uppercase tracking-wider font-bold">
                Skill Category
              </span>

              <h1 className={`text-4xl md:text-5xl font-black mt-4 ${titleClass}`}>
                {category.name}
              </h1>

              <p className={`mt-5 max-w-3xl leading-7 ${mutedText}`}>
                {tutorial.intro}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-10">
            <div className={`rounded-2xl border p-5 ${cardClass}`}>
              <h3 className="text-3xl font-black text-teal-400">
                {categoryCourses.length}
              </h3>
              <p className={`mt-2 text-sm ${mutedText}`}>Available Courses</p>
            </div>

            <div className={`rounded-2xl border p-5 ${cardClass}`}>
              <h3 className="text-3xl font-black text-teal-400">100%</h3>
              <p className={`mt-2 text-sm ${mutedText}`}>Practical Learning</p>
            </div>

            <div className={`rounded-2xl border p-5 ${cardClass}`}>
              <h3 className="text-3xl font-black text-teal-400">Career</h3>
              <p className={`mt-2 text-sm ${mutedText}`}>Industry Ready Skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-[2fr_380px] gap-10">
        {/* Left Content */}
        <div className="space-y-8">
          {/* About */}
          <div className={`rounded-3xl border p-8 ${cardClass}`}>
            <p className={`font-semibold uppercase tracking-widest text-sm ${accent}`}>
              About This Skill
            </p>

            <h2 className={`text-3xl font-black mt-2 ${titleClass}`}>
              What is {category.name}?
            </h2>

            <p className={`mt-6 leading-8 ${mutedText}`}>{tutorial.intro}</p>
          </div>

          {/* Learn */}
          <div className={`rounded-3xl border p-8 ${cardClass}`}>
            <p className={`font-semibold uppercase tracking-widest text-sm ${accent}`}>
              Skills
            </p>

            <h2 className={`text-3xl font-black mt-2 ${titleClass}`}>
              What You&apos;ll Learn
            </h2>

            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              {tutorial.uses.map((item) => (
                <div
                  key={item}
                  className={`rounded-2xl border p-5 hover:-translate-y-1 hover:border-teal-300/40 transition-all duration-300 ${softCardClass}`}
                >
                  <div className="w-12 h-12 rounded-xl bg-teal-400/15 border border-teal-300/25 flex items-center justify-center text-xl mb-4 text-teal-300">
                    ✔
                  </div>

                  <h3 className={`font-semibold ${titleClass}`}>{item}</h3>

                  <p className={`text-sm mt-2 leading-6 ${mutedText}`}>
                    Learn this skill through structured lessons and practical projects.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Career */}
          <div
            className={`rounded-3xl p-8 text-white shadow-xl ${
              isDark
                ? "bg-gradient-to-r from-teal-500/90 to-emerald-700/90"
                : "bg-gradient-to-r from-teal-500 to-emerald-600"
            }`}
          >
            <p className="uppercase tracking-widest text-sm text-teal-100">
              Career Opportunity
            </p>

            <h2 className="text-3xl font-black mt-3">Build Your Future</h2>

            <p className="mt-5 leading-8 text-teal-50">{tutorial.career}</p>

            <div className="grid sm:grid-cols-3 gap-5 mt-8">
              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-2xl font-black">Freelance</h3>
                <p className="text-sm mt-2 text-teal-100">
                  Work with international clients.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-2xl font-black">Full-Time</h3>
                <p className="text-sm mt-2 text-teal-100">
                  Get hired by companies.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-2xl font-black">Portfolio</h3>
                <p className="text-sm mt-2 text-teal-100">
                  Build impressive real projects.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside>
          <div className={`sticky top-24 rounded-3xl border p-7 ${cardClass}`}>
            <h3 className={`text-2xl font-black ${titleClass}`}>
              Category Summary
            </h3>

            <div className="space-y-5 mt-7">
              <div className="flex justify-between">
                <span className={mutedText}>Category</span>
                <span className={`font-semibold ${titleClass}`}>{category.name}</span>
              </div>

              <div className="flex justify-between">
                <span className={mutedText}>Courses</span>
                <span className={`font-semibold ${titleClass}`}>
                  {categoryCourses.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className={mutedText}>Level</span>
                <span className={`font-semibold ${titleClass}`}>
                  Beginner → Advanced
                </span>
              </div>

              <div className="flex justify-between">
                <span className={mutedText}>Certificate</span>
                <span className="font-semibold text-teal-400">Included</span>
              </div>
            </div>

            <Link
              to="/courses"
              className="block mt-8 text-center rounded-xl bg-teal-400 py-3 text-[#061311] font-black hover:bg-white hover:-translate-y-1 transition-all duration-300"
            >
              Browse All Courses
            </Link>
          </div>
        </aside>
      </section>

      {/* Available Courses */}
      <section className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <p className={`font-semibold uppercase tracking-widest text-sm ${accent}`}>
              Courses
            </p>

            <h2 className={`text-4xl font-black mt-2 ${titleClass}`}>
              Available {category.name} Courses
            </h2>

            <p className={`mt-3 ${mutedText}`}>
              Start learning with our carefully selected courses for this category.
            </p>
          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-teal-400 font-semibold hover:gap-3 transition-all"
          >
            View All Courses →
          </Link>
        </div>

        {categoryCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {categoryCourses.map((course) => (
              <div
                key={course.id}
                className="transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`rounded-3xl border border-dashed py-20 text-center ${
              isDark ? "border-white/15" : "border-slate-300"
            } ${cardClass}`}
          >
            <div className="text-6xl mb-5">📚</div>

            <h3 className={`text-3xl font-black ${titleClass}`}>
              No Courses Available
            </h3>

            <p className={`mt-4 max-w-lg mx-auto ${mutedText}`}>
              Courses for this category will be added soon. Explore other
              categories or browse all available courses.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-8 px-8 py-3 rounded-xl bg-teal-400 text-[#061311] font-black hover:bg-white transition"
            >
              Browse All Courses
            </Link>
          </div>
        )}
      </section>

      {/* CTA */}
      <section
        className={`border-t ${
          isDark ? "bg-[#061311] border-white/10" : "bg-[#e8f3ee] border-emerald-900/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className={`text-4xl font-black ${titleClass}`}>
            Ready to Master {category.name}?
          </h2>

          <p className={`mt-5 max-w-2xl mx-auto leading-8 ${mutedText}`}>
            Build practical skills through real projects, expert guidance,
            certificates and career-focused learning.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">
            <Link
              to="/courses"
              className="px-8 py-3 rounded-xl bg-teal-400 text-[#061311] font-black hover:bg-white hover:-translate-y-1 transition-all duration-300"
            >
              Explore Courses
            </Link>

            <Link
              to="/categories"
              className={`px-8 py-3 rounded-xl border font-black transition-all duration-300 ${
                isDark
                  ? "border-white/10 text-white/80 hover:bg-white hover:text-[#061311]"
                  : "border-emerald-900/10 text-[#061311] hover:bg-[#061311] hover:text-white"
              }`}
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default CategoryDetails;