function StatCard({ title, value, note }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <p className="text-sm text-slate-500">{title}</p>
      <h2 className="text-3xl font-bold text-slate-950 mt-2">{value}</h2>
      {note && <p className="text-xs text-slate-400 mt-2">{note}</p>}
    </div>
  );
}

export default StatCard;