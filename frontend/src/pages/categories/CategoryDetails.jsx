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
    career:
      "Canva is useful for freelancers, content creators, marketers and beginners.",
  },

  "Adobe Creative Suite": {
    intro:
      "Adobe Creative Suite includes Photoshop, Illustrator and XD for professional graphic design, branding and UI design.",
    uses: [
      "Photo editing",
      "Logo design",
      "Poster design",
      "Brand identity",
      "UI Design",
      "Print design",
    ],
    career:
      "Useful for Graphic Designers, Branding Experts and Agencies.",
  },

  "UI/UX Design": {
    intro:
      "UI/UX Design focuses on building beautiful and user-friendly digital products.",
    uses: [
      "Wireframing",
      "User Flow",
      "Prototyping",
      "UX Research",
      "Mobile App Design",
      "Website Design",
    ],
    career:
      "Perfect for Product Designers, UI Designers and UX Researchers.",
  },

  "Web Design": {
    intro:
      "Web Design teaches responsive website layouts, typography, color systems and modern design principles.",
    uses: [
      "Landing Pages",
      "Portfolio Websites",
      "Business Websites",
      "Responsive Design",
      "Website Layout",
      "Creative UI",
    ],
    career:
      "Useful for Freelancers and Frontend Designers.",
  },

  "Logo & Branding": {
    intro:
      "Logo & Branding is all about creating visual identities for businesses.",
    uses: [
      "Logo Design",
      "Brand Identity",
      "Typography",
      "Business Cards",
      "Color Systems",
      "Brand Guidelines",
    ],
    career:
      "Perfect for Brand Designers and Freelancers.",
  },

  "Product Design": {
    intro:
      "Product Design solves user problems through digital experiences.",
    uses: [
      "User Flow",
      "Dashboard Design",
      "Product Thinking",
      "Research",
      "Usability",
      "MVP Design",
    ],
    career:
      "Excellent for Startup Designers and Product Teams.",
  },

  "Digital Marketing": {
    intro:
      "Digital Marketing teaches SEO, Paid Ads, Social Media and Content Marketing.",
    uses: [
      "SEO",
      "Facebook Ads",
      "Google Ads",
      "Email Marketing",
      "Analytics",
      "Content Strategy",
    ],
    career:
      "Great for Entrepreneurs, Freelancers and Marketers.",
  },

  "Career Growth": {
    intro:
      "Career Growth helps students build portfolios and freelance careers.",
    uses: [
      "Portfolio",
      "Freelancing",
      "LinkedIn",
      "Client Communication",
      "Pricing",
      "Interview Preparation",
    ],
    career:
      "Useful for beginners and job seekers.",
  },
};

function CategoryDetails() {
  const { id } = useParams();

  const category =
    categories.find((item) => String(item.id) === String(id)) ||
    categories[0];

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

  return (
    <main className="bg-slate-50 min-h-screen">

      {/* Hero Section */}

      <section className="relative overflow-hidden bg-[#070b18] text-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#06b6d430,transparent_30%),radial-gradient(circle_at_80%_70%,#2563eb30,transparent_30%)]"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">

          <Link
            to="/categories"
            className="text-cyan-400 hover:underline text-sm"
          >
            ← Back to Categories
          </Link>

          <div className="flex flex-col md:flex-row md:items-center gap-6 mt-8">

            <div className="w-24 h-24 rounded-3xl bg-white/10 border border-white/10 flex items-center justify-center text-5xl">
              {category.icon || "📚"}
            </div>

            <div>

              <span className="inline-flex px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs uppercase tracking-wider">
                Skill Category
              </span>

              <h1 className="text-4xl md:text-5xl font-bold mt-4">
                {category.name}
              </h1>

              <p className="text-slate-300 mt-5 max-w-3xl leading-7">
                {tutorial.intro}
              </p>

            </div>

          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-10">

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="text-3xl font-bold text-cyan-400">
                {categoryCourses.length}
              </h3>
              <p className="text-slate-400 mt-2 text-sm">
                Available Courses
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="text-3xl font-bold text-cyan-400">
                100%
              </h3>
              <p className="text-slate-400 mt-2 text-sm">
                Practical Learning
              </p>
            </div>

            <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
              <h3 className="text-3xl font-bold text-cyan-400">
                Career
              </h3>
              <p className="text-slate-400 mt-2 text-sm">
                Industry Ready Skills
              </p>
            </div>

          </div>

        </div>

      </section>
            {/* Main Content */}

      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[2fr_380px] gap-10">

        {/* Left Content */}

        <div className="space-y-8">

          {/* About */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <p className="text-cyan-600 font-semibold uppercase tracking-widest text-sm">
              About This Skill
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              What is {category.name}?
            </h2>

            <p className="mt-6 text-slate-600 leading-8">
              {tutorial.intro}
            </p>

          </div>

          {/* Learn */}

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">

            <p className="text-cyan-600 font-semibold uppercase tracking-widest text-sm">
              Skills
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mt-2">
              What You'll Learn
            </h2>

            <div className="grid sm:grid-cols-2 gap-5 mt-8">

              {tutorial.uses.map((item) => (

                <div
                  key={item}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-cyan-400 hover:bg-cyan-50 hover:-translate-y-1 transition-all duration-300"
                >

                  <div className="w-12 h-12 rounded-xl bg-cyan-100 flex items-center justify-center text-xl mb-4">
                    ✔
                  </div>

                  <h3 className="font-semibold text-slate-900">
                    {item}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    Learn this skill through structured lessons and practical projects.
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* Career */}

          <div className="rounded-3xl bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-white shadow-xl">

            <p className="uppercase tracking-widest text-sm text-cyan-100">
              Career Opportunity
            </p>

            <h2 className="text-3xl font-bold mt-3">
              Build Your Future
            </h2>

            <p className="mt-5 leading-8 text-cyan-50">
              {tutorial.career}
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mt-8">

              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">
                  Freelance
                </h3>

                <p className="text-sm mt-2 text-cyan-100">
                  Work with international clients.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">
                  Full-Time
                </h3>

                <p className="text-sm mt-2 text-cyan-100">
                  Get hired by companies.
                </p>
              </div>

              <div className="bg-white/10 rounded-2xl p-5">
                <h3 className="text-2xl font-bold">
                  Portfolio
                </h3>

                <p className="text-sm mt-2 text-cyan-100">
                  Build impressive real projects.
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Sidebar */}

        <aside>

          <div className="sticky top-24 rounded-3xl bg-white border border-slate-200 shadow-lg p-7">

            <h3 className="text-2xl font-bold text-slate-900">
              Category Summary
            </h3>

            <div className="space-y-5 mt-7">

              <div className="flex justify-between">
                <span className="text-slate-500">Category</span>
                <span className="font-semibold">{category.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Courses</span>
                <span className="font-semibold">
                  {categoryCourses.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Level</span>
                <span className="font-semibold">
                  Beginner → Advanced
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">Certificate</span>
                <span className="font-semibold text-green-600">
                  Included
                </span>
              </div>

            </div>

            <Link
              to="/courses"
              className="block mt-8 text-center rounded-xl bg-slate-900 py-3 text-white font-semibold hover:bg-cyan-600 transition"
            >
              Browse All Courses
            </Link>

          </div>

        </aside>

      </section>
            {/* Available Courses */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>

            <p className="text-cyan-600 font-semibold uppercase tracking-widest text-sm">
              Courses
            </p>

            <h2 className="text-4xl font-bold text-slate-900 mt-2">
              Available {category.name} Courses
            </h2>

            <p className="text-slate-500 mt-3">
              Start learning with our carefully selected courses for this
              category.
            </p>

          </div>

          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-cyan-600 font-semibold hover:gap-3 transition-all"
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

          <div className="rounded-3xl border border-dashed border-slate-300 bg-white py-20 text-center">

            <div className="text-6xl mb-5">
              📚
            </div>

            <h3 className="text-3xl font-bold text-slate-900">
              No Courses Available
            </h3>

            <p className="text-slate-500 mt-4 max-w-lg mx-auto">
              Courses for this category will be added soon. Explore other
              categories or browse all available courses.
            </p>

            <Link
              to="/courses"
              className="inline-block mt-8 px-8 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
            >
              Browse All Courses
            </Link>

          </div>

        )}

      </section>

      {/* CTA */}

      <section className="bg-slate-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20 text-center">

          <h2 className="text-4xl font-bold">
            Ready to Master {category.name}?
          </h2>

          <p className="text-slate-300 mt-5 max-w-2xl mx-auto leading-8">
            Build practical skills through real projects, expert guidance,
            certificates and career-focused learning.
          </p>

          <div className="flex flex-wrap justify-center gap-5 mt-10">

            <Link
              to="/courses"
              className="px-8 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 font-semibold transition"
            >
              Explore Courses
            </Link>

            <Link
              to="/categories"
              className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition"
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