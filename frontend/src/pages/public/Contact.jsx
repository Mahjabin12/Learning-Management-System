function Contact() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <p className="text-blue-600 font-semibold text-sm">CONTACT US</p>
        <h1 className="text-4xl font-bold text-slate-950 mt-3">
          Get in touch with Byway
        </h1>
        <p className="text-slate-500 mt-3">
          Send your query and our support team will respond soon.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <form className="border border-slate-200 rounded-2xl p-6 space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
          />

          <textarea
            rows="5"
            placeholder="Message"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg"
          ></textarea>

          <button
            type="button"
            className="px-6 py-3 bg-slate-950 text-white rounded-lg hover:bg-slate-800"
          >
            Send Message
          </button>
        </form>

        <div className="bg-slate-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-slate-950">
            Contact Information
          </h2>

          <div className="space-y-5 mt-6 text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Address:</span>{" "}
              Dhaka, Bangladesh
            </p>
            <p>
              <span className="font-semibold text-slate-900">Email:</span>{" "}
              support@byway.com
            </p>
            <p>
              <span className="font-semibold text-slate-900">Phone:</span>{" "}
              +880 1234 567890
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Contact;