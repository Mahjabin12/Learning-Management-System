import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { courses } from "../../data/dummyData";

function CourseDetails() {
  const { id } = useParams();

  // 🔥 FIX: match string/number safely
  const course = courses.find((item) => item.id == id);

  const [tab, setTab] = useState("overview");
  const [openSection, setOpenSection] = useState(0);

  // ❗ if course not found
  if (!course) {
    return (
      <div className="p-10 text-center text-red-500 text-xl">
        Course not found 😢
      </div>
    );
  }

  // 🔥 FIX: price handling (UI/UX issue solved here)
  const price = course.basePrice ?? course.price ?? 0;
  const isFree = price === 0;

  const totalLessons = course.lessons?.length || 0;

  // 🔥 ENROLL FUNCTION
  const enroll = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    if (isFree) {
      alert(`Enrolled in FREE course: ${course.title}`);
    } else {
      alert(`Enrolled in $${price} course: ${course.title}`);
    }
  };

  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">
            <Link to="/courses" className="text-sm text-white/60 hover:text-white">
              ← All courses
            </Link>

            <span className="ml-3 bg-white/10 px-3 py-1 rounded-full text-xs">
              {course.category}
            </span>

            <h1 className="text-4xl font-bold mt-4">
              {course.title}
            </h1>

            <p className="text-white/70 mt-4">
              {course.description}
            </p>

            <div className="flex flex-wrap gap-5 mt-5 text-sm text-white/80">
              <span>⭐ {course.rating}</span>
              <span>👥 {course.students}+ students</span>
              <span>📚 {totalLessons} lessons</span>
              <span>⏱ {course.duration}</span>
              <span>🎓 {course.instructor}</span>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="bg-white text-black rounded-2xl shadow-xl overflow-hidden">

            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">

              {/* 💰 PRICE SHOW (UI/UX FIX) */}
              <div className="flex items-center justify-between">

                {isFree ? (
                  <span className="text-3xl font-bold text-green-600">
                    FREE
                  </span>
                ) : (
                  <span className="text-3xl font-bold">
                    ${price}
                  </span>
                )}

                {course.oldPrice && !isFree && (
                  <span className="line-through text-gray-400">
                    ${course.oldPrice}
                  </span>
                )}

              </div>

              {/* ENROLL BUTTON */}
              <button
                onClick={enroll}
                className={`w-full mt-4 text-white py-3 rounded-full transition ${
                  isFree
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isFree ? "Enroll Free" : "Enroll Now"}
              </button>

              <Link
                to="/cart"
                className="block text-center mt-3 border py-3 rounded-full hover:bg-gray-50"
              >
                Add to Cart
              </Link>

              <ul className="mt-4 text-sm text-gray-600 space-y-2">
                <li>✔ Full lifetime access</li>
                <li>✔ Certificate included</li>
                <li>
                  ✔ {isFree
                    ? "No payment required"
                    : "Instant access after payment"}
                </li>
              </ul>

            </div>
          </div>

        </div>
      </section>

      {/* TABS */}
      <div className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 flex gap-6 text-sm font-medium">

          {["overview", "curriculum", "instructor", "reviews"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-4 ${
                tab === t
                  ? "text-indigo-600 border-b-2 border-indigo-600"
                  : "text-gray-500"
              }`}
            >
              {t}
            </button>
          ))}

        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* OVERVIEW */}
        {tab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold">What you'll learn</h2>

            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {course.lessons?.map((l, i) => (
                <div key={i} className="border p-3 rounded-lg">
                  ✔ {l}
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mt-10">
              About this course
            </h2>

            <p className="text-gray-600 mt-3">
              {course.description}
            </p>
          </div>
        )}

        {/* CURRICULUM */}
        {tab === "curriculum" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Course Curriculum
            </h2>

            <div className="space-y-3">
              {[1, 2, 3].map((sec, i) => (
                <div key={i} className="border rounded-lg">

                  <button
                    onClick={() =>
                      setOpenSection(openSection === i ? null : i)
                    }
                    className="w-full flex justify-between p-4"
                  >
                    <span className="font-semibold">
                      Section {i + 1}
                    </span>
                    <span>▼</span>
                  </button>

                  {openSection === i && (
                    <div className="border-t p-4 space-y-2">
                      {course.lessons?.map((l, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span>{l}</span>
                          <span className="text-gray-500">45 min</span>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          </div>
        )}

        {/* INSTRUCTOR */}
        {tab === "instructor" && (
          <div>
            <h2 className="text-2xl font-bold">Instructor</h2>
            <p className="mt-3 text-gray-600">
              {course.instructor} is an experienced instructor in{" "}
              {course.category}.
            </p>
          </div>
        )}

        {/* REVIEWS */}
        {tab === "reviews" && (
          <div>
            <h2 className="text-2xl font-bold">Reviews</h2>
            <p className="mt-3 text-gray-500">
              Students love this course ⭐
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default CourseDetails;