import { Link } from "react-router-dom";
import { courses } from "../../data/dummyData";

function Cart() {
  const cartItems = courses.slice(0, 2);
  const subtotal = cartItems.reduce(
    (sum, course) => sum + Number(course.price || 0),
    0
  );

  return (
    <div>
      <p className="text-sm font-semibold text-teal-500">SHOPPING CART</p>
      <h1 className="text-4xl font-black mt-2 text-[var(--student-heading)]">
        Your Cart
      </h1>
      <p className="text-[var(--student-muted)] mt-3 mb-8">
        Review selected courses before checkout.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-5">
          {cartItems.map((course) => (
            <article
              key={course.id}
              className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-5 flex flex-col md:flex-row gap-5"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full md:w-48 h-36 object-cover rounded-2xl border border-teal-400/20"
              />

              <div className="flex-1">
                <h2 className="text-xl font-bold text-[var(--student-heading)]">
                  {course.title}
                </h2>
                <p className="text-[var(--student-muted)] mt-2">{course.category}</p>
                <p className="text-sm text-[var(--student-muted)] mt-2">
                  Instructor: {course.instructor}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <span className="text-2xl font-black text-teal-500">
                    ${course.price}
                  </span>

                  <button className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 border border-red-400/20 hover:bg-red-500/20 transition">
                    Remove
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="rounded-3xl border border-[var(--student-border)] bg-[var(--student-card)] backdrop-blur-xl p-6 h-fit">
          <h2 className="text-2xl font-bold text-[var(--student-heading)]">
            Order Summary
          </h2>

          <div className="space-y-4 mt-6 text-[var(--student-muted)]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Discount</span>
              <span>$0</span>
            </div>

            <div className="border-t border-[var(--student-border)] pt-4 flex justify-between text-[var(--student-heading)] font-bold">
              <span>Total</span>
              <span className="text-teal-500">${subtotal}</span>
            </div>
          </div>

          <Link
            to="/student/checkout"
            className="block text-center mt-6 px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;