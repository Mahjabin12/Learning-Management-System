import { useNavigate } from "react-router-dom";
import { courses } from "../../data/dummyData";

function Checkout() {
  const navigate = useNavigate();
  const cartItems = courses.slice(0, 3);
  const total = cartItems.reduce((sum, course) => sum + course.price, 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/order-complete");
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-950">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8 mt-8">
        <section className="lg:col-span-2 space-y-8">
          <div className="border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-950 mb-5">
              Personal Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                placeholder="First Name"
              />

              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                placeholder="Last Name"
              />

              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                placeholder="Email"
              />

              <input
                className="border border-slate-300 rounded-lg px-4 py-3"
                placeholder="Phone"
              />
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-950 mb-5">
              Payment Method
            </h2>

            <div className="space-y-3">
              <label className="flex items-center gap-2">
                <input type="radio" name="payment" defaultChecked />
                Card Payment
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="payment" />
                Mobile Banking
              </label>
            </div>

            <input
              className="border border-slate-300 rounded-lg px-4 py-3 w-full mt-5"
              placeholder="Card Number"
            />
          </div>
        </section>

        <aside className="border border-slate-200 rounded-2xl p-6 h-fit">
          <h2 className="text-xl font-bold text-slate-950">Order Summary</h2>

          <div className="space-y-4 mt-5">
            {cartItems.map((course) => (
              <div key={course.id} className="flex gap-3">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-16 h-14 object-cover rounded-lg"
                />

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-500">${course.price}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 mt-5 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            type="submit"
            className="w-full mt-6 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Complete Payment
          </button>
        </aside>
      </form>
    </main>
  );
}

export default Checkout;