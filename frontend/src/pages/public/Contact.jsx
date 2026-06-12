function Contact() {
  return (
    <main className="bg-white min-h-screen">
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm">
            CONTACT US
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mt-3">
            Get in Touch with Byway
          </h1>

          <p className="text-slate-500 mt-4">
            Have questions about our courses? Contact us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="border rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Send Message
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full border p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full border p-3 rounded-lg"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full border p-3 rounded-lg"
              ></textarea>

              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
                Send Message
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-slate-50 rounded-2xl p-8 shadow-md">
            <h2 className="text-2xl font-bold mb-6">
              Contact Information
            </h2>

            <div className="space-y-5">
              <p>
                <strong>📍 Address:</strong>
                <br />
                Kumira, Sitakunda, Chattogram
              </p>

              <p>
                <strong>📧 Email:</strong>
                <br />
                support@byway.com
              </p>

              <p>
                <strong>📞 Phone:</strong>
                <br />
                +880 1234 567890
              </p>

              <p>
                <strong>🕒 Working Hours:</strong>
                <br />
                Sat - Thu, 9 AM - 5 PM
              </p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Our Location
          </h2>

          <div className="overflow-hidden rounded-2xl shadow-lg">
            <iframe
              title="IIUC Location"
              src="https://maps.google.com/maps?q=iiuc&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;