import { useAuth } from "../../context/AuthContext";

function AdminTopbar() {
  const { user } = useAuth();

  return (
    <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h2 className="font-semibold text-slate-950">Admin Dashboard</h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-950">{user?.name}</p>
          <p className="text-xs text-slate-500">{user?.email}</p>
        </div>

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </div>
  );
}

export default AdminTopbar;