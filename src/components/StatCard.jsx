export default function StatCard({ tag, label, value, sub, accent = false }) {
  return (
    <div className="card p-5 flex flex-col gap-2 shadow-card">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-fog tracking-widest2">{tag}</span>
      </div>
      <div className={`font-display text-3xl leading-none ${accent ? "text-tag" : "text-ink"}`}>
        {value}
      </div>
      <div className="text-[12px] uppercase tracking-wide text-ash">{label}</div>
      {sub && <div className="text-[11px] text-fog font-mono">{sub}</div>}
    </div>
  );
}
