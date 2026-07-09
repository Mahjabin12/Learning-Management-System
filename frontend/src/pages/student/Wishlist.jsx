import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Wishlist() {
  const { user } = useAuth();

  const [wishlist, setWishlist] = useState([]);
  const [cartCourseIds, setCartCourseIds] = useState([]);
  const [message, setMessage] = useState("");

  const userIdentity =
    user?._id ||
    user?.id ||
    user?.email ||
    "current-user";

  const wishlistStorageKey = useMemo(
    () => `skillora_wishlist_${userIdentity}`,
    [userIdentity]
  );

  const cartStorageKey = useMemo(
    () => `skillora_cart_${userIdentity}`,
    [userIdentity]
  );

  useEffect(() => {
    loadWishlist();
    loadCart();
  }, [wishlistStorageKey, cartStorageKey]);

  const getCourseId = (course) => {
    return course?._id || course?.id || course?.slug;
  };

  const loadWishlist = () => {
    try {
      const savedWishlist = localStorage.getItem(
        wishlistStorageKey
      );

      const parsedWishlist = savedWishlist
        ? JSON.parse(savedWishlist)
        : [];

      setWishlist(
        Array.isArray(parsedWishlist)
          ? parsedWishlist
          : []
      );
    } catch (error) {
      console.error("Could not load wishlist:", error);
      setWishlist([]);
    }
  };

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem(
        cartStorageKey
      );

      const parsedCart = savedCart
        ? JSON.parse(savedCart)
        : [];

      const cartIds = Array.isArray(parsedCart)
        ? parsedCart
            .map((course) => getCourseId(course))
            .filter(Boolean)
        : [];

      setCartCourseIds(cartIds);
    } catch (error) {
      console.error("Could not load cart:", error);
      setCartCourseIds([]);
    }
  };

  const handleAddToCart = (course) => {
    const courseId = getCourseId(course);

    if (!courseId) {
      setMessage("This course could not be added.");
      return;
    }

    try {
      const savedCart = localStorage.getItem(
        cartStorageKey
      );

      const currentCart = savedCart
        ? JSON.parse(savedCart)
        : [];

      const validCart = Array.isArray(currentCart)
        ? currentCart
        : [];

      const alreadyAdded = validCart.some(
        (cartCourse) =>
          getCourseId(cartCourse) === courseId
      );

      if (alreadyAdded) {
        setMessage(
          `"${course.title}" is already in your cart.`
        );
        return;
      }

      const updatedCart = [...validCart, course];

      localStorage.setItem(
        cartStorageKey,
        JSON.stringify(updatedCart)
      );

      setCartCourseIds((currentIds) => [
        ...currentIds,
        courseId,
      ]);

      setMessage(
        `"${course.title}" was added to your cart.`
      );

      window.dispatchEvent(
        new CustomEvent("skillora-cart-updated", {
          detail: {
            cart: updatedCart,
            count: updatedCart.length,
          },
        })
      );
    } catch (error) {
      console.error("Could not add to cart:", error);
      setMessage("Course could not be added to cart.");
    }
  };

  const handleRemoveFromWishlist = (course) => {
    const courseId = getCourseId(course);

    const updatedWishlist = wishlist.filter(
      (wishlistCourse) =>
        getCourseId(wishlistCourse) !== courseId
    );

    setWishlist(updatedWishlist);

    localStorage.setItem(
      wishlistStorageKey,
      JSON.stringify(updatedWishlist)
    );

    setMessage(
      `"${course.title}" was removed from your wishlist.`
    );

    window.dispatchEvent(
      new CustomEvent("skillora-wishlist-updated", {
        detail: {
          wishlist: updatedWishlist,
          count: updatedWishlist.length,
        },
      })
    );
  };

  const formatPrice = (course) => {
    const price = Number(course?.price || 0);

    if (price === 0) {
      return "Free";
    }

    const currency =
      course?.currency === "BDT" ? "৳" : "$";

    return `${currency}${price.toLocaleString()}`;
  };

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Page heading */}
      <section className="relative overflow-hidden rounded-[26px] border border-[var(--student-border)] bg-[var(--student-card)] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] backdrop-blur-xl sm:p-6 lg:p-7">
        <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl" />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-teal-500 sm:text-[11px]">
              My Wishlist
            </p>

            <h1 className="mt-2 text-2xl font-black text-[var(--student-heading)] sm:text-3xl">
              Saved Courses
            </h1>

            <p className="mt-2 max-w-xl text-[12px] leading-5 text-[var(--student-muted)] sm:text-[13px]">
              Review the courses you saved and add them to
              your cart when you are ready to enroll.
            </p>
          </div>

          <div className="flex h-12 min-w-[120px] items-center justify-center gap-2 rounded-2xl border border-[var(--student-border)] bg-[var(--student-soft)] px-4">
            <HeartIcon />

            <span className="text-sm font-black text-teal-500">
              {wishlist.length}
            </span>

            <span className="text-[11px] font-semibold text-[var(--student-muted)]">
              Saved
            </span>
          </div>
        </div>
      </section>

      {/* Success or information message */}
      {message && (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-teal-400/20 bg-teal-400/10 px-4 py-3">
          <p className="text-[12px] font-semibold text-teal-500">
            {message}
          </p>

          <button
            type="button"
            onClick={() => setMessage("")}
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-teal-500 transition hover:bg-teal-400/10"
            aria-label="Close message"
          >
            <CloseIcon />
          </button>
        </div>
      )}

      {/* Wishlist courses */}
      {wishlist.length > 0 ? (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {wishlist.map((course) => {
            const courseId = getCourseId(course);
            const coursePath =
              course?.slug || courseId;

            const alreadyInCart =
              cartCourseIds.includes(courseId);

            return (
              <article
                key={courseId}
                className="group overflow-hidden rounded-[22px] border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-teal-400/30 hover:shadow-[0_18px_42px_rgba(45,212,191,0.09)]"
              >
                {/* Thumbnail */}
                <Link
                  to={`/courses/${coursePath}`}
                  className="block overflow-hidden"
                >
                  {course?.thumbnail ? (
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-40 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-40 w-full items-center justify-center bg-[var(--student-soft)] text-teal-500">
                      <CourseIcon />
                    </div>
                  )}
                </Link>

                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] font-black uppercase tracking-[0.12em] text-teal-500">
                        {course?.category ||
                          "Online Course"}
                      </p>

                      <Link
                        to={`/courses/${coursePath}`}
                        className="mt-2 block"
                      >
                        <h2 className="line-clamp-2 text-[14px] font-black leading-5 text-[var(--student-heading)] transition group-hover:text-teal-500">
                          {course?.title ||
                            "Untitled Course"}
                        </h2>
                      </Link>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveFromWishlist(course)
                      }
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-red-400/15 bg-red-400/[0.07] text-red-400 transition hover:border-red-400/30 hover:bg-red-400/15"
                      aria-label="Remove from wishlist"
                      title="Remove from wishlist"
                    >
                      <TrashIcon />
                    </button>
                  </div>

                  {course?.instructor && (
                    <p className="mt-2 truncate text-[10px] text-[var(--student-muted)]">
                      By {course.instructor}
                    </p>
                  )}

                  <div className="mt-4 flex items-center justify-between gap-3 border-t border-[var(--student-border)] pt-4">
                    <span className="text-[16px] font-black text-teal-500">
                      {formatPrice(course)}
                    </span>

                    {course?.rating && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-[var(--student-muted)]">
                        <StarIcon />
                        {course.rating}
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      to={`/courses/${coursePath}`}
                      className="flex min-h-[38px] items-center justify-center rounded-xl border border-[var(--student-border)] bg-[var(--student-soft)] px-3 text-[11px] font-black text-[var(--student-heading)] transition hover:border-teal-400/30 hover:text-teal-500"
                    >
                      View Course
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleAddToCart(course)
                      }
                      disabled={alreadyInCart}
                      className={`flex min-h-[38px] items-center justify-center gap-1.5 rounded-xl px-3 text-[11px] font-black transition ${
                        alreadyInCart
                          ? "cursor-not-allowed bg-teal-400/10 text-teal-500"
                          : "bg-teal-400 text-[#061311] hover:bg-teal-300"
                      }`}
                    >
                      {alreadyInCart ? (
                        <>
                          <CheckIcon />
                          Added
                        </>
                      ) : (
                        <>
                          <CartIcon />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      ) : (
        <EmptyWishlist />
      )}
    </div>
  );
}

function EmptyWishlist() {
  return (
    <section className="rounded-[26px] border border-dashed border-[var(--student-border)] bg-[var(--student-card)] px-5 py-14 text-center backdrop-blur-xl sm:py-20">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-400/10 text-teal-500">
        <LargeHeartIcon />
      </div>

      <h2 className="mt-5 text-lg font-black text-[var(--student-heading)] sm:text-xl">
        Your wishlist is empty
      </h2>

      <p className="mx-auto mt-2 max-w-md text-[12px] leading-5 text-[var(--student-muted)] sm:text-[13px]">
        Courses you save from the course page will appear
        here. No demo courses are currently displayed.
      </p>

      <Link
        to="/courses"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-2.5 text-[12px] font-black text-[#061311] transition hover:-translate-y-0.5 hover:bg-teal-300"
      >
        Explore Courses
        <ArrowIcon />
      </Link>
    </section>
  );
}

function HeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-teal-500"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  );
}

function LargeHeartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4h2l2.1 10.1a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L20 7H6" />
      <circle cx="9" cy="20" r="1" />
      <circle cx="18" cy="20" r="1" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="M7 7l1 14h8l1-14" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3 w-3 text-amber-400"
      fill="currentColor"
    >
      <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2-4.6-4.4 6.3-.9L12 2.8Z" />
    </svg>
  );
}

function CourseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export default Wishlist;