function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <p className="text-sm font-semibold text-blue-600">ADMIN PANEL</p>
        <h1 className="text-3xl font-bold text-slate-950 mt-2">{title}</h1>
        {subtitle && <p className="text-slate-500 mt-2">{subtitle}</p>}
      </div>

      {action && <div>{action}</div>}
    </div>
  );
}

export default AdminPageHeader;