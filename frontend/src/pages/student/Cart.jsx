import { Link } from "react-router-dom";
import { courses } from "../../data/dummyData";

function Cart() {
  const cartItems = courses.slice(0, 3);
  const subtotal = cartItems.reduce((sum, course) => sum + course.price, 0);
  const discount = 20;
  const total = subtotal - discount;

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-950">Shopping Cart</h1>
      <p className="text-slate-500 mt-2">{cartItems.length} courses in cart</p>

      <div className="grid lg:grid-cols-3 gap-8 mt-8">
        <section className="lg:col-span-2 space-y-4">
          {cartItems.map((course) => (
            <div
              key={course.id}
              className="border border-slate-200 rounded-2xl p-4 flex gap-4"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-40 h-28 object-cover rounded-xl"
              />

              <div className="flex-1">
                <h3 className="font-bold text-slate-950">{course.title}</h3>
                <p className="text-sm text-slate-500 mt-1">
                  By {course.instructor}
                </p>
                <p className="text-sm text-yellow-500 mt-2">
                  ★★★★★ {course.rating}
                </p>
              </div>

              <div className="font-bold text-slate-950">${course.price}</div>
            </div>
          ))}
        </section>

        <aside className="border border-slate-200 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-slate-950">Order Details</h2>

          <div className="space-y-3 mt-5 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Subtotal</span>
              <span>${subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">Discount</span>
              <span>-${discount}</span>
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block text-center w-full mt-6 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Cart;