function Notifications() {
  const notifications = [
    ["Course completed", "You completed Canva Social Media Design.", "Certificate Pending"],
    ["New lesson available", "A new lesson was added to Figma UI Design.", "Open"],
    ["Certificate issued", "Your Figma certificate is ready to download.", "Completed"],
    ["Payment successful", "Your latest course purchase was completed.", "Resolved"],
  ];

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">NOTIFICATIONS</p>
        <h1 className="text-4xl font-black mt-2">Student Alerts</h1>
        <p className="text-slate-400 mt-3 mb-8">
          Track course updates, certificate status, and payment messages.
        </p>

        <div className="space-y-4">
          {notifications.map(([title, message, status]) => (
            <article
              key={title}
              className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div>
                <h2 className="font-bold">{title}</h2>
                <p className="text-slate-400 mt-2">{message}</p>
              </div>

              <span className="w-fit px-3 py-1 rounded-full text-xs bg-teal-400/10 text-teal-300 border border-teal-400/20">
                {status}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Notifications;