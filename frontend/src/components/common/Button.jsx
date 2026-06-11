function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}) {
  const baseClass =
    "inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    dark: "bg-slate-950 text-white hover:bg-slate-800",
    outline: "border border-slate-300 text-slate-800 hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;