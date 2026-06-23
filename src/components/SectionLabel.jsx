export default function SectionLabel({ tag, title, action }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-baseline gap-2">
        <span className="font-mono text-[10px] text-fog tracking-widest2">{tag}</span>
        <h2 className="font-display text-lg uppercase tracking-wide">{title}</h2>
      </div>
      {action}
    </div>
  );
}
