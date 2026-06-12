import { Link } from "react-router-dom";

function Home() {
  const categories = [
    { id: 1, icon: "🎨", title: "Graphic Design", text: "Learn visual design, branding, layout, color, and creative digital graphics." },
    { id: 2, icon: "💻", title: "Development", text: "Build websites, applications, and modern software using practical tools." },
    { id: 3, icon: "🧠", title: "AI & Machine Learning", text: "Explore artificial intelligence, machine learning, and data-driven systems." },
    { id: 4, icon: "💼", title: "Business", text: "Master strategy, management, entrepreneurship, and business growth." },
    { id: 5, icon: "📷", title: "Photography", text: "Learn camera skills, editing, composition, and creative visual storytelling." },
    { id: 6, icon: "🧪", title: "Science & Technology", text: "Understand modern technology, innovation, research, and applied science." },
    { id: 7, icon: "📊", title: "Data Science", text: "Analyze data, create visualizations, and build practical data projects." },
    { id: 8, icon: "📢", title: "Marketing", text: "Learn branding, digital campaigns, social media, and market strategy." },
  ];

  const instructors = [
    { id: 1, name: "Ronald Richards", role: "Machine Learning Instructor", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500" },
    { id: 2, name: "Jenny Wilson", role: "Data Science Mentor", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500" },
    { id: 3, name: "Wade Warren", role: "Software Engineer", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500" },
    { id: 4, name: "Kristin Watson", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500" },
  ];

  const blogs = [
    { id: 1, title: "Complete course platform for online learning", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700", date: "June 20, 2026" },
    { id: 2, title: "How AI is changing digital education", img: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=700", date: "June 18, 2026" },
    { id: 3, title: "Why students need structured course progress", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=700", date: "June 15, 2026" },
  ];

  return (
    <main className="min-h-screen overflow-hidden bg-[#061311] text-white">
      {/* Hero */}
      <section className="relative px-6 pt-20 pb-28 md:pt-28 md:pb-36">
        <div className="max-w-7xl mx-auto grid gap-16 lg:grid-cols-2 items-center relative">
          <div>
            <p className="text-teal-400 font-semibold mb-5">Let's Join With Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
              World's Leading <span className="text-teal-400">Machine Learning</span> Courses
            </h1>
            <p className="mt-5 text-slate-300 max-w-xl leading-7">
              Build practical skills through structured online courses. Learn machine learning, development, design, business, and technology from experienced instructors.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="px-6 py-3 bg-teal-500 text-[#061311] rounded-md font-bold hover:bg-teal-400 transition">Join Us Now</Link>
              <Link to="/courses" className="w-11 h-11 rounded-full border border-teal-400 text-teal-400 flex items-center justify-center hover:bg-teal-400 hover:text-[#061311] transition">▶</Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 sm:grid-cols-3">
              <div>
                <h3 className="text-2xl font-bold text-slate-50">250+</h3>
                <p className="text-sm text-slate-400">Courses</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-50">15+</h3>
                <p className="text-sm text-slate-400">Instructors</p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-50">2400+</h3>
                <p className="text-sm text-slate-400">Students</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[500px]">
            <div className="absolute right-10 top-6 w-64 h-80 rounded-xl border-2 border-teal-400 p-2">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900" alt="AI robot" className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="absolute right-0 top-0 w-32 h-32 rounded-xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=500" alt="AI brain" className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-0 top-44 w-40 h-40 rounded-xl overflow-hidden border border-teal-500 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1639322537228-f710d846310a?w=500" alt="Technology" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-10 bottom-20 w-36 h-36 rounded-xl overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=500" alt="Circuit" className="w-full h-full object-cover" />
            </div>

            <div className="absolute left-0 top-56 bg-teal-500 text-[#061311] rounded-xl p-5 shadow-xl">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl mb-3">👥</div>
              <h3 className="font-bold">Top Rated</h3>
              <p className="text-sm">Instructors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-6 md:px-0 max-w-7xl mx-auto text-center">
        <p className="text-teal-400 font-semibold">Have a look</p>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-3">
          Explore Our Top <span className="text-teal-400">Categories</span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto mt-4">
          Choose from multiple categories and start learning with structured courses designed for modern students.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
          {categories.map((c) => (
            <div key={c.id} className="bg-white/10 border border-white/10 rounded-xl p-6 hover:border-teal-400 hover:-translate-y-2 transition duration-300">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-2xl mb-5">{c.icon}</div>
              <h3 className="text-xl font-bold">{c.title}</h3>
              <p className="text-sm text-slate-400 leading-6 mt-3">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Offer + Instructors + Blogs sections */}
      {/* You can copy the earlier dark home sections here with same responsive Tailwind classes */}
    </main>
  );
}

export default Home;