export function GlassCard({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass-card ${hover ? "hover:shadow-xl hover:-translate-y-1" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
