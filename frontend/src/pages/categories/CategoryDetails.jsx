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
      "Canva is an easy-to-use design platform for creating social media posts, presentations, posters, banners, brand kits, and marketing materials without advanced design software knowledge.",
    uses: [
      "Create social media posts",
      "Design business presentations",
      "Make posters and flyers",
      "Create brand kits",
      "Design thumbnails and ads",
      "Prepare client-ready marketing content",
    ],
    career:
      "Canva is useful for freelancers, social media managers, small business owners, content creators, and beginner graphic designers.",
  },

  "Adobe Creative Suite": {
    intro:
      "Adobe Creative Suite includes professional tools like Photoshop, Illustrator, XD, and InDesign. These tools are widely used in graphic design, branding, photo editing, UI design, and print design.",
    uses: [
      "Edit and retouch photos",
      "Create professional graphics",
      "Design logos and brand assets",
      "Create posters and marketing materials",
      "Design UI layouts",
      "Prepare print-ready files",
    ],
    career:
      "Adobe skills are useful for graphic designers, brand designers, photo editors, creative professionals, and agency-based designers.",
  },

  "UI/UX Design": {
    intro:
      "UI/UX Design focuses on creating digital products that are easy to use, visually clean, and user-friendly. UI is about the interface, while UX is about the overall user experience.",
    uses: [
      "Design user-friendly apps",
      "Create website user flows",
      "Plan wireframes and prototypes",
      "Conduct basic UX research",
      "Build portfolio case studies",
      "Improve product usability",
    ],
    career:
      "UI/UX Design is useful for product designers, app designers, web designers, UX researchers, and anyone interested in digital product careers.",
  },

  "Web Design": {
    intro:
      "Web Design is the process of designing modern websites, landing pages, portfolios, and business pages. It focuses on layout, typography, color, responsiveness, and user experience.",
    uses: [
      "Design landing pages",
      "Create portfolio websites",
      "Design business websites",
      "Plan responsive layouts",
      "Prepare website wireframes",
      "Work with developers effectively",
    ],
    career:
      "Web Design is useful for freelance designers, frontend learners, UI designers, and creative professionals who want to build client websites.",
  },

  "Logo & Branding": {
    intro:
      "Logo and branding focus on creating a visual identity for a business. It includes logo design, color palette, typography, brand guidelines, and consistent visual communication.",
    uses: [
      "Create professional logos",
      "Build brand identity systems",
      "Choose brand colors and fonts",
      "Design business cards and brand assets",
      "Prepare brand guideline documents",
      "Create client-ready branding projects",
    ],
    career:
      "Logo and branding skills are useful for graphic designers, brand identity designers, freelancers, and creative agency professionals.",
  },

  "Product Design": {
    intro:
      "Product Design is about solving real user problems through digital products. It includes product thinking, user flows, wireframes, prototypes, MVP design, and usability testing.",
    uses: [
      "Design digital products",
      "Create MVP concepts",
      "Plan user flows",
      "Design product dashboards",
      "Improve product usability",
      "Work with product and development teams",
    ],
    career:
      "Product Design is useful for UI/UX designers, startup designers, product teams, and designers who want to work on real digital products.",
  },

  "Digital Marketing": {
    intro:
      "Digital Marketing is the process of promoting products, services, or brands online using social media, SEO, content marketing, paid ads, email marketing, and analytics.",
    uses: [
      "Promote brands online",
      "Run social media campaigns",
      "Create content strategy",
      "Learn SEO basics",
      "Understand ads and analytics",
      "Grow business or freelance services",
    ],
    career:
      "Digital Marketing is useful for marketers, designers, freelancers, entrepreneurs, content creators, and anyone who wants to grow online.",
  },

  "Career Growth": {
    intro:
      "Career Growth focuses on turning skills into real opportunities. It includes portfolio building, freelancing, client communication, pricing, job preparation, and personal branding.",
    uses: [
      "Build a strong portfolio",
      "Prepare for freelance work",
      "Learn client communication",
      "Understand pricing basics",
      "Improve LinkedIn and Behance presence",
      "Prepare for design jobs",
    ],
    career:
      "Career Growth is useful for students, beginner freelancers, job seekers, designers, and anyone who wants to turn skills into income or career progress.",
  },
};

function CategoryDetails() {
  const { id } = useParams();

  const category =
    categories.find((item) => String(item.id) === id) || categories[0];

  const tutorial = categoryTutorials[category.name] || {
    intro:
      "This category helps learners build practical skills through structured tutorials, real examples, and career-focused learning.",
    uses: [
      "Learn practical concepts",
      "Build real projects",
      "Improve portfolio quality",
      "Understand professional workflow",
      "Use the skill for freelancing or jobs",
    ],
    career:
      "This skill can help learners grow in freelancing, job preparation, personal projects, and professional career development.",
  };

  const categoryCourses = courses.filter(
    (course) => course.category === category.name
  );

  return (
    <main>
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-14">
          <p className="text-blue-600 font-semibold text-sm">
            CATEGORY DETAILS
          </p>

          <div className="flex items-center gap-4 mt-4">
            <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-3xl">
              {category.icon || "📚"}
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-950">
                {category.name}
              </h1>

              <p className="text-slate-500 mt-2">
                Learn what this skill is and how it can help your career.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-slate-950">
            What is {category.name}?
          </h2>

          <p className="text-slate-600 leading-7 mt-4">
            {tutorial.intro}
          </p>

          <h2 className="text-2xl font-bold text-slate-950 mt-10">
            What can you do with {category.name}?
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            {tutorial.uses.map((item) => (
              <div
                key={item}
                className="border border-slate-200 rounded-xl p-4 bg-white"
              >
                <p className="text-slate-700 font-medium">✔ {item}</p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold text-slate-950 mt-10">
            Career use
          </h2>

          <p className="text-slate-600 leading-7 mt-4">
            {tutorial.career}
          </p>
        </div>

        <aside className="border border-slate-200 rounded-2xl p-6 h-fit bg-white">
          <h3 className="text-xl font-bold text-slate-950">
            Category Summary
          </h3>

          <div className="space-y-4 mt-5 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Category:</span>{" "}
              {category.name}
            </p>

            <p>
              <span className="font-semibold text-slate-900">
                Available Courses:
              </span>{" "}
              {categoryCourses.length}
            </p>

            <p>
              <span className="font-semibold text-slate-900">Best for:</span>{" "}
              Beginners and career-focused learners
            </p>
          </div>

          <Link
            to="/courses"
            className="block text-center w-full mt-6 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Browse All Courses
          </Link>
        </aside>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-950">
              Available {category.name} Courses
            </h2>

            <p className="text-slate-500 mt-2">
              Start learning this skill from the courses below.
            </p>
          </div>

          <Link
            to="/courses"
            className="text-blue-600 font-semibold"
          >
            View all courses →
          </Link>
        </div>

        {categoryCourses.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl p-8 bg-slate-50">
            <p className="text-slate-600">
              No courses are available in this category yet.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

export default CategoryDetails;