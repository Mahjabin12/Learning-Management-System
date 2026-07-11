import { Link, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import CourseCard from "../../components/common/CourseCard";

const API_URL = "http://127.0.0.1:5000/api/courses";

function CourseDetails() {
  const { id } = useParams();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [tab, setTab] = useState("overview");
  const [openSection, setOpenSection] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // ⬇️ backend-driven state (same pattern as CourseList.jsx)
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [allCourses, setAllCourses] = useState([]); // used for "Related Courses"
  const [reviews, setReviews] = useState([]); // real reviews for this course

  useEffect(() => {
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "dark");
    };

    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 450);
    };

    window.addEventListener("themechange", handleThemeChange);
    window.addEventListener("storage", handleThemeChange);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("themechange", handleThemeChange);
      window.removeEventListener("storage", handleThemeChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ⬇️ fetch single course whenever the URL id changes
  useEffect(() => {
    loadCourse();
  }, [id]);

  const loadCourse = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await axios.get(`${API_URL}/${id}`);

      const data = res.data.course || res.data;
      setCourse(data);
    } catch (err) {
      console.error(err);
      setError(true);
      setCourse(null);
    } finally {
      setLoading(false);
    }
  };

  // ⬇️ fetch all courses once, for the "Related Courses" section
  useEffect(() => {
    const loadAllCourses = async () => {
      try {
        const res = await axios.get(API_URL);
        const data = Array.isArray(res.data) ? res.data : res.data.courses || [];
        setAllCourses(data);
      } catch (err) {
        console.error(err);
        setAllCourses([]);
      }
    };

    loadAllCourses();
  }, []);

  // ⬇️ fetch reviews for this course whenever it loads
  useEffect(() => {
    if (!course?._id) return;

    const loadReviews = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:5000/api/reviews/course/${course._id}`
        );
        setReviews(res.data.reviews || []);
      } catch (err) {
        console.error(err);
        setReviews([]);
      }
    };

    loadReviews();
  }, [course?._id]);

  const isDark = theme === "dark";

  // instructor can arrive as a populated object ({ _id, name }) or a plain string —
  // this handles either case safely
  const instructorName =
    course?.instructor && typeof course.instructor === "object"
      ? course.instructor.name
      : course?.instructor || "Expert Instructor";

  const price = Number(course?.basePrice ?? course?.price ?? 0);
  const isFree = price === 0;
  const lessons = course?.lessons || [];
  const totalLessons = lessons.length;

  const relatedCourses = useMemo(() => {
    if (!course) return [];

    return allCourses
      .filter((item) => item._id !== course._id && item.category === course.category)
      .slice(0, 4);
  }, [allCourses, course]);

  const tabs = ["overview", "curriculum", "instructor", "reviews"];

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

  // ⬇️ loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center text-2xl font-bold ${
          isDark ? "text-teal-400" : "text-teal-600"
        }`}
      >
        Loading Course...
      </div>
    );
  }

  // ⬇️ error / not-found state
  if (error || !course) {
    return (
      <main
        className={`min-h-screen flex items-center justify-center px-6 ${pageClass}`}
      >
        <div
          className={`max-w-md w-full text-center rounded-3xl border p-8 ${cardClass}`}
        >
          <h1 className="text-3xl font-black text-red-400">
            Course not found
          </h1>

          <p className={`mt-3 ${mutedText}`}>
            The course you are looking for is not available.
          </p>

          <Link
            to="/courses"
            className="inline-flex mt-6 px-6 py-3 rounded-xl bg-teal-400 text-[#061311] font-black hover:bg-white hover:-translate-y-1 transition-all duration-300"
          >
            Back to Courses
          </Link>
        </div>
      </main>
    );
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEnroll = () => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please login first!");
      window.location.href = "/login";
      return;
    }

    alert(
      isFree
        ? `Enrolled in FREE course: ${course.title}`
        : `Enrolled in $${price} course: ${course.title}`
    );
  };

  return (
    <main
      className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${pageClass}`}
    >
      <div
        className={`absolute inset-0 pointer-events-none ${
          isDark
            ? "bg-[radial-gradient(circle_at_18%_18%,rgba(45,212,191,0.18),transparent_28%),radial-gradient(circle_at_85%_70%,rgba(20,184,166,0.14),transparent_28%)]"
            : "bg-[radial-gradient(circle_at_18%_18%,rgba(20,184,166,0.20),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(16,185,129,0.13),transparent_30%)]"
        }`}
      />

      <section
        className={`relative overflow-hidden border-b ${
          isDark ? "border-white/10" : "border-emerald-900/10"
        }`}
      >
        <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 grid lg:grid-cols-3 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/courses"
                className={`text-sm font-semibold transition ${
                  isDark
                    ? "text-white/65 hover:text-teal-300"
                    : "text-slate-600 hover:text-teal-700"
                }`}
              >
                ← All Courses
              </Link>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${
                  isDark
                    ? "bg-white/[0.07] border-white/10 text-teal-300"
                    : "bg-white/70 border-emerald-900/10 text-teal-700"
                }`}
              >
                {course.category}
              </span>

              <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-400/15 border border-teal-300/25 text-teal-300">
                {isFree ? "Free Course" : "Premium Course"}
              </span>
            </div>

            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-black mt-5 leading-tight ${titleClass}`}
            >
              {course.title}
            </h1>

            <p className={`mt-5 leading-7 max-w-3xl ${mutedText}`}>
              {course.description}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-8">
              <InfoStat label="Rating" value={`⭐ ${course.rating || 4.8}`} isDark={isDark} />
              <InfoStat label="Students" value={`👥 ${course.students || 0}+`} isDark={isDark} />
              <InfoStat label="Lessons" value={`📚 ${totalLessons}`} isDark={isDark} />
              <InfoStat label="Duration" value={`⏱ ${course.duration || "6 Weeks"}`} isDark={isDark} />
              <InfoStat label="Instructor" value={`🎓 ${instructorName}`} isDark={isDark} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24">
            <div
              className={`overflow-hidden rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-teal-300/45 hover:shadow-[0_0_45px_rgba(45,212,191,0.16)] ${cardClass}`}
            >
              <div className="relative">
                <img
                  src={course.image || course.thumbnail}
                  alt={course.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/600x400/0f2b26/2dd4bf?text=Course+Image";
                  }}
                  className="w-full h-56 sm:h-64 lg:h-52 object-cover"
                />

                <div className="absolute top-4 left-4 bg-[#061311]/80 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur">
                  {course.category}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  {isFree ? (
                    <span className="text-3xl font-black text-teal-400">
                      FREE
                    </span>
                  ) : (
                    <span className={`text-3xl font-black ${titleClass}`}>
                      ${price}
                    </span>
                  )}

                  {course.oldPrice && !isFree && (
                    <span className={`line-through ${mutedText}`}>
                      ${course.oldPrice}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleEnroll}
                  className="w-full mt-5 py-3 rounded-xl bg-teal-400 text-[#061311] font-black hover:bg-white hover:-translate-y-1 shadow-[0_18px_35px_rgba(45,212,191,0.22)] transition-all duration-300"
                >
                  {isFree ? "Enroll Free" : "Enroll Now"}
                </button>

                <Link
                  to="/student/cart"
                  className={`block text-center mt-3 py-3 rounded-xl font-black border transition-all duration-300 ${
                    isDark
                      ? "border-white/10 text-white/80 hover:bg-white hover:text-[#061311]"
                      : "border-emerald-900/10 text-[#061311] hover:bg-[#061311] hover:text-white"
                  }`}
                >
                  Add to Cart
                </Link>

                <Link
                  to={`/student/learning/${course._id}`}
                  className={`block text-center mt-3 py-3 rounded-xl font-black border transition-all duration-300 ${
                    isDark
                      ? "border-teal-300/30 text-teal-300 hover:bg-teal-400 hover:text-[#061311]"
                      : "border-teal-500/35 text-teal-700 hover:bg-teal-400 hover:text-[#061311]"
                  }`}
                >
                  Start Learning
                </Link>

                <ul className={`mt-5 text-sm space-y-3 ${mutedText}`}>
                  <li>✔ Full lifetime access</li>
                  <li>✔ Certificate included</li>
                  <li>✔ Learn anytime, anywhere</li>
                  <li>
                    ✔ {isFree ? "No payment required" : "Instant access after payment"}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        className={`sticky top-14 z-30 border-b backdrop-blur-xl ${
          isDark
            ? "bg-[#061311]/85 border-white/10"
            : "bg-[#e8f3ee]/85 border-emerald-900/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex gap-5 sm:gap-6 overflow-x-auto scrollbar-hide">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTab(item)}
              className={`py-4 capitalize text-sm font-black whitespace-nowrap border-b-2 transition-all duration-300 ${
                tab === item
                  ? "text-teal-400 border-teal-400"
                  : isDark
                  ? "text-white/50 border-transparent hover:text-white"
                  : "text-slate-500 border-transparent hover:text-[#061311]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-12">
        {tab === "overview" && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div
              className={`lg:col-span-2 rounded-3xl border p-5 sm:p-7 transition-all duration-300 hover:border-teal-300/35 hover:shadow-[0_0_40px_rgba(45,212,191,0.12)] ${cardClass}`}
            >
              <h2 className={`text-2xl font-black ${titleClass}`}>
                What you&apos;ll learn
              </h2>

              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                {lessons.map((lesson, index) => (
                  <div
                    key={`${lesson}-${index}`}
                    className={`rounded-2xl p-4 border text-sm font-semibold transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/40 ${softCardClass} ${mutedText}`}
                  >
                    <span className="text-teal-400 font-black">✔</span>{" "}
                    {lesson}
                  </div>
                ))}
              </div>

              <h2 className={`text-2xl font-black mt-10 ${titleClass}`}>
                About this course
              </h2>

              <p className={`mt-4 leading-7 ${mutedText}`}>
                This course is designed to help learners build practical
                creative and digital skills through structured lessons, examples,
                and project-focused practice. Each lesson is organized for
                gradual learning and better portfolio development.
              </p>
            </div>

            <div
              className={`rounded-3xl border p-5 sm:p-7 h-fit transition-all duration-300 hover:border-teal-300/35 hover:shadow-[0_0_40px_rgba(45,212,191,0.12)] ${cardClass}`}
            >
              <h3 className={`text-xl font-black ${titleClass}`}>
                Course Includes
              </h3>

              <div className={`mt-5 space-y-3 text-sm ${mutedText}`}>
                <p>📚 {totalLessons} lessons</p>
                <p>⏱ {course.duration || "6 Weeks"}</p>
                <p>🎓 Certificate</p>
                <p>🔒 Lifetime access</p>
                <p>💬 Instructor support</p>
              </div>
            </div>
          </div>
        )}

        {tab === "curriculum" && (
          <div
            className={`rounded-3xl border p-5 sm:p-7 transition-all duration-300 ${cardClass}`}
          >
            <h2 className={`text-2xl font-black mb-5 ${titleClass}`}>
              Course Curriculum
            </h2>

            <div className="space-y-4">
              {[1, 2, 3].map((section, index) => (
                <div
                  key={section}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isDark ? "border-white/10" : "border-emerald-900/10"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenSection(openSection === index ? null : index)
                    }
                    className={`w-full flex justify-between items-center gap-4 p-5 text-left transition ${
                      isDark
                        ? "bg-white/[0.045] hover:bg-teal-400/10"
                        : "bg-white/70 hover:bg-teal-50"
                    }`}
                  >
                    <span className={`font-black ${titleClass}`}>
                      Section {index + 1}: Course Module
                    </span>

                    <span className="text-teal-400 font-black">
                      {openSection === index ? "▲" : "▼"}
                    </span>
                  </button>

                  {openSection === index && (
                    <div className="p-5 space-y-3">
                      {lessons.map((lesson, lessonIndex) => (
                        <div
                          key={`${lesson}-${lessonIndex}`}
                          className={`flex justify-between gap-4 text-sm border-b pb-3 last:border-b-0 ${
                            isDark
                              ? "border-white/10 text-white/65"
                              : "border-emerald-900/10 text-slate-600"
                          }`}
                        >
                          <span>▶ {lesson}</span>
                          <span className={mutedText}>45 min</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "instructor" && (
          <div
            className={`rounded-3xl border p-5 sm:p-7 transition-all duration-300 ${cardClass}`}
          >
            <h2 className={`text-2xl font-black ${titleClass}`}>Instructor</h2>

            <div className="mt-5 flex flex-col sm:flex-row gap-5 items-start">
              <div className="w-20 h-20 rounded-full bg-teal-400/15 flex items-center justify-center text-3xl border border-teal-300/25">
                🎓
              </div>

              <div>
                <h3 className={`text-xl font-black ${titleClass}`}>
                  {instructorName}
                </h3>

                <p className={`mt-2 leading-7 ${mutedText}`}>
                  {instructorName} is an experienced
                  mentor in {course.category}. This course is designed with
                  practical lessons, clear explanations, and structured learning
                  modules for Skillora learners.
                </p>
              </div>
            </div>
          </div>
        )}

        {tab === "reviews" && (
          <div
            className={`rounded-3xl border p-5 sm:p-7 transition-all duration-300 ${cardClass}`}
          >
            <h2 className={`text-2xl font-black ${titleClass}`}>
              Student Reviews
            </h2>

            <div className="grid md:grid-cols-3 gap-5 mt-6">
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <div
                    key={review._id}
                    className={`rounded-2xl p-5 border transition-all duration-300 hover:-translate-y-2 hover:border-teal-300/40 hover:shadow-[0_0_35px_rgba(45,212,191,0.12)] ${softCardClass}`}
                  >
                    <p className="text-yellow-400">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </p>
                    <p className={`mt-3 ${mutedText}`}>
                      {review.comment || "No comment provided."}
                    </p>
                    <p className={`text-sm mt-4 ${mutedText}`}>
                      {review.student?.name || "Student"}
                    </p>
                  </div>
                ))
              ) : (
                <p className={`col-span-full text-sm ${mutedText}`}>
                  No reviews yet for this course.
                </p>
              )}
            </div>
          </div>
        )}
      </section>

      <section className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-14">
        <h2 className={`text-2xl font-black mb-6 ${titleClass}`}>
          Related Courses
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedCourses.length > 0 ? (
            relatedCourses.map((item) => (
              <div
                key={item._id}
                className="transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02]"
              >
                <CourseCard course={item} />
              </div>
            ))
          ) : (
            <p className={`col-span-full text-sm ${mutedText}`}>
              No related courses found.
            </p>
          )}
        </div>
      </section>

      {showScrollButton && (
        <button
          type="button"
          onClick={scrollToTop}
          className={`fixed bottom-6 right-5 sm:right-7 z-50 w-12 h-12 rounded-full flex items-center justify-center font-black border transition-all duration-300 hover:-translate-y-1 hover:scale-110 ${
            isDark
              ? "bg-teal-400 text-[#061311] border-teal-300 shadow-[0_0_35px_rgba(45,212,191,0.35)]"
              : "bg-[#061311] text-white border-[#061311] shadow-[0_18px_35px_rgba(6,19,17,0.22)]"
          }`}
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </main>
  );
}

function InfoStat({ label, value, isDark }) {
  return (
    <div
      className={`rounded-2xl p-4 border transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/40 hover:shadow-[0_0_30px_rgba(45,212,191,0.12)] ${
        isDark
          ? "bg-white/[0.055] border-white/10"
          : "bg-white/70 border-emerald-900/10"
      }`}
    >
      <p className={isDark ? "text-xs text-white/45" : "text-xs text-slate-500"}>
        {label}
      </p>

      <h3
        className={`font-black mt-1 text-sm ${
          isDark ? "text-white" : "text-[#061311]"
        }`}
      >
        {value}
      </h3>
    </div>
  );
}

export default CourseDetails;