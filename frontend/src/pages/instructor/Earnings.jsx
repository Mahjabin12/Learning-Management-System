function InstructorEarnings() {
  const payments = [
    ["Figma UI Design Beginner", "$860", "Paid"],
    ["Canva Social Media Design", "$540", "Paid"],
    ["UI/UX Portfolio Project", "$420", "Pending"],
    ["Logo Branding Essentials", "$300", "Paid"],
  ];

  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">
          INSTRUCTOR EARNINGS
        </p>

        <h1 className="text-4xl font-black mt-2">
          Earnings Overview
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Track course revenue, pending payouts, and monthly income.
        </p>

        <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          {[
            ["Total Earnings", "$4,820"],
            ["This Month", "$1,240"],
            ["Pending Payout", "$420"],
            ["Paid Courses", "12"],
          ].map(([title, value]) => (
            <div
              key={title}
              className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6"
            >
              <p className="text-sm text-slate-400">{title}</p>
              <h2 className="text-4xl font-black text-teal-400 mt-3">
                {value}
              </h2>
            </div>
          ))}
        </section>

        <div className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Monthly Earnings
          </h2>

          <div className="h-72 rounded-2xl bg-white/5 border border-teal-400/10 flex items-end gap-4 p-6">
            {[40, 55, 78, 62, 95, 70, 100, 82].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-teal-400 rounded-t-2xl shadow-[0_0_24px_rgba(45,212,191,0.25)]"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl">
          <table className="w-full text-sm">
            <thead className="border-b border-teal-400/10 text-slate-400">
              <tr>
                <th className="px-5 py-4 text-left">Course</th>
                <th className="px-5 py-4 text-left">Amount</th>
                <th className="px-5 py-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map(([course, amount, status]) => (
                <tr
                  key={course}
                  className="border-b border-white/5 hover:bg-teal-400/5"
                >
                  <td className="px-5 py-4 font-semibold">{course}</td>
                  <td className="px-5 py-4 text-teal-400 font-bold">{amount}</td>
                  <td className="px-5 py-4">
                    <span className="px-3 py-1 rounded-full text-xs bg-teal-400/10 text-teal-300 border border-teal-400/20">
                      {status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

export default InstructorEarnings;