import { messages } from "../../data/dummyData";

function InstructorMessages() {
  return (
    <main className="min-h-screen bg-[#061311] text-white px-6 py-12">
      <section className="max-w-7xl mx-auto">
        <p className="text-sm font-semibold text-teal-400">
          INSTRUCTOR INBOX
        </p>

        <h1 className="text-4xl font-black mt-2">
          Messages
        </h1>

        <p className="text-slate-400 mt-3 mb-8">
          Respond to student questions, support requests, and admin notices.
        </p>

        <div className="grid lg:grid-cols-3 gap-6">
          {messages.map((message) => (
            <article
              key={message.id}
              className="rounded-3xl border border-teal-400/15 bg-white/[0.06] backdrop-blur-xl p-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{message.sender}</h2>
                <span className="text-xs text-slate-400">{message.date}</span>
              </div>

              <p className="text-teal-300 font-semibold mt-3">
                {message.subject}
              </p>

              <p className="text-slate-400 mt-4 leading-7">
                {message.message}
              </p>

              <button className="mt-5 px-4 py-2 rounded-xl bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
                Reply
              </button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default InstructorMessages;