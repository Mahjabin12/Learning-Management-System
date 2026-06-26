import { Link } from "react-router-dom";

const instructors = [
  {
    id: 1,
    name: "Mr. Danny Morison",
    role: "Web Developer",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    id: 2,
    name: "Haley D. Richard",
    role: "Graphics Designer",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 3,
    name: "Lincoln Di Caprio",
    role: "Marketing Expert",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },
  {
    id: 4,
    name: "Kate Winslate",
    role: "Fashion Designer",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
  },
];

function TopInstructors() {
  return (
    <section className="relative bg-[#061311] py-24">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="bg-white/10 border border-white/10 rounded-xl p-5 text-center"
            >
              <img
                src={instructor.img}
                className="w-20 h-20 rounded-full mx-auto"
              />
              <h3 className="font-bold mt-4 text-sm">{instructor.name}</h3>
              <p className="text-xs text-slate-400">{instructor.role}</p>
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-extrabold">
            Our Top <span className="text-teal-400">Instructors</span>
          </h2>

          <p className="text-slate-400 mt-5">
            Learn from industry experts with real experience.
          </p>

          <Link
            to="/courses"
            className="inline-block mt-8 px-7 py-3 bg-teal-500 text-black rounded-md font-bold"
          >
            See All Courses
          </Link>
        </div>

      </div>
    </section>
  );
}

export default TopInstructors;