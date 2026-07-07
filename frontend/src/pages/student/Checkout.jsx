import { Link } from "react-router-dom";
import { courses } from "../../data/dummyData";

function Checkout() {
  const items = courses.slice(0, 2);
  const total = items.reduce((sum, course) => sum + Number(course.price || 0), 0);

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">CHECKOUT</p>
        <h1 className="text-4xl font-black mt-2">Complete Enrollment</h1>
        <p className="text-slate-400 mt-3 mb-8">
          Add billing details and complete your course purchase.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          <form className="lg:col-span-2 rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 space-y-5">
            <h2 className="text-2xl font-bold">Billing Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
              />

              <input
                type="text"
                placeholder="Phone Number"
                className="px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
              />

              <input
                type="text"
                placeholder="Country"
                className="px-4 py-3 rounded-2xl bg-white/5 border border-teal-400/10 text-white placeholder:text-slate-500 outline-none focus:border-teal-400/50"
              />
            </div>

            <h2 className="text-2xl font-bold pt-4">Payment Method</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="rounded-2xl border border-teal-400/25 bg-teal-400/10 p-4 cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="mr-2" />
                Card Payment
              </label>

              <label className="rounded-2xl border border-white/10 bg-white/5 p-4 cursor-pointer">
                <input type="radio" name="payment" className="mr-2" />
                Mobile Banking
              </label>
            </div>

            <Link
              to="/student/order-complete"
              className="inline-block px-6 py-3 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition"
            >
              Confirm Order
            </Link>
          </form>

          <aside className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 h-fit">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="space-y-4 mt-6">
              {items.map((course) => (
                <div key={course.id} className="flex justify-between gap-4">
                  <span className="text-slate-400">{course.title}</span>
                  <span className="text-teal-400 font-semibold">
                    ${course.price}
                  </span>
                </div>
              ))}

              <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold">
                <span>Total</span>
                <span className="text-teal-400">${total}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default Checkout;