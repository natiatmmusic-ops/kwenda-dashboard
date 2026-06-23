export function StatusBadge({ status, styles }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-wide ${
        styles[status] || "bg-mist text-ink"
      }`}
    >
      {status}
    </span>
  );
}

export function PriorityBadge({ priority, styles }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-sm border text-[10px] font-mono uppercase tracking-wide ${
        styles[priority] || "border-mist text-ash"
      }`}
    >
      {priority}
    </span>
  );
}
