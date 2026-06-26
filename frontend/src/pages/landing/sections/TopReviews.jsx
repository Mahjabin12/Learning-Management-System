const testimonials = [
  {
    id: 1,
    name: "Lincoln D. Costa",
    role: "Web Developer",
    text: "Great learning platform with structured courses.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  },
  {
    id: 2,
    name: "Lince D. Costa",
    role: "Web Developer",
    text: "Very helpful for skill development.",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a",
  },
];

function Reviews() {
  return (
    <section className="relative bg-[#061311] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center">

        <h2 className="text-3xl font-extrabold">
          Students Experience
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
          {testimonials.map((item) => (
            <div key={item.id} className="bg-white/10 p-6 rounded-xl">
              <p className="text-slate-300">{item.text}</p>
              <div className="mt-4 flex items-center gap-3">
                <img src={item.img} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-xs text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Reviews;