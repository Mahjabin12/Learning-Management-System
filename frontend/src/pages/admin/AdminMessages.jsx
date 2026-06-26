import { useEffect, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import DataTable from "../../components/admin/DataTable";
import StatusBadge from "../../components/admin/StatusBadge";
import { messages } from "../../data/dummyData";

function useAdminTheme() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    const syncTheme = () => setTheme(localStorage.getItem("theme") || "dark");

    syncTheme();
    window.addEventListener("themechange", syncTheme);
    window.addEventListener("storage", syncTheme);

    return () => {
      window.removeEventListener("themechange", syncTheme);
      window.removeEventListener("storage", syncTheme);
    };
  }, []);

  return theme;
}

function AdminMessages() {
  const theme = useAdminTheme();
  const isDark = theme === "dark";

  const headingClass = isDark ? "text-white" : "text-[#061311]";
  const mutedClass = isDark ? "text-slate-400" : "text-slate-600";

  const safeMessages = Array.isArray(messages) ? messages : [];

  const columns = [
    {
      key: "sender",
      label: "Sender",
      render: (row) => <span className={`font-semibold ${headingClass}`}>{row.sender}</span>,
    },
    {
      key: "subject",
      label: "Subject",
      render: (row) => <span className="text-teal-500 font-semibold">{row.subject}</span>,
    },
    {
      key: "message",
      label: "Message",
      render: (row) => <span className={mutedClass}>{row.message}</span>,
    },
    {
      key: "date",
      label: "Date",
      render: (row) => <span className={mutedClass}>{row.date}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "action",
      label: "Action",
      render: () => (
        <button className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-400 text-[#061311] hover:bg-white transition">
          Reply
        </button>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <AdminPageHeader
        title="Messages"
        subtitle="View student messages, instructor requests, support tickets, and communication records."
        action={
          <button className="px-5 py-2.5 rounded-full bg-teal-400 text-[#061311] font-bold hover:bg-white transition">
            New Message
          </button>
        }
      />

      <DataTable columns={columns} data={safeMessages} />
    </div>
  );
}

export default AdminMessages;