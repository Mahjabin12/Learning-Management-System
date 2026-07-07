import { enrollments } from "../../data/dummyData";

function InstructorStudents() {
  return (
    <div>
      <p className="text-sm font-semibold text-teal-500">STUDENT TRACKING</p>

      <h1 className="text-4xl font-black mt-2 text-[var(--instructor-heading)]">
        My Students
      </h1>

      <p className="text-[var(--instructor-muted)] mt-3 mb-8">
        Track enrolled students, course progress, and completion status.
      </p>

      <div className="overflow-x-auto rounded-3xl border border-[var(--instructor-border)] bg-[var(--instructor-card)] backdrop-blur-xl">
        <table className="w-full text-sm">
          <thead className="border-b border-[var(--instructor-border)]">
            <tr className="text-left text-[var(--instructor-muted)]">
              <th className="px-5 py-4">Student</th>
              <th className="px-5 py-4">Course</th>
              <th className="px-5 py-4">Progress</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((item) => (
              <tr
                key={item.id}
                className="border-b border-[var(--instructor-border)] hover:bg-teal-400/5 transition"
              >
                <td className="px-5 py-4 font-semibold text-[var(--instructor-heading)]">
                  {item.student}
                </td>

                <td className="px-5 py-4 text-[var(--instructor-muted)]">
                  {item.course}
                </td>

                <td className="px-5 py-4">
                  <div className="min-w-[150px]">
                    <div className="flex justify-between text-xs text-[var(--instructor-muted)] mb-2">
                      <span>Progress</span>
                      <span>{item.progress}</span>
                    </div>

                    <div className="h-2 rounded-full bg-black/10 overflow-hidden">
                      <div
                        className="h-full bg-teal-400 rounded-full"
                        style={{ width: item.progress }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-[var(--instructor-muted)]">
                  {item.date}
                </td>

                <td className="px-5 py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-teal-400/10 text-teal-500 border border-teal-400/20">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InstructorStudents;