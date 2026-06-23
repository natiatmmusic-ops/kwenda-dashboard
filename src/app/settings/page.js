import SectionLabel from "@/components/SectionLabel";

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-2xl">
      <SectionLabel tag="06.1" title="Brand Settings" />

      <div className="card p-6 shadow-card space-y-4">
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-mono text-fog uppercase">Brand Name</label>
          <input
            defaultValue="KWENDA"
            className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-mono text-fog uppercase">Season</label>
          <input
            defaultValue="FW26"
            className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[11px] font-mono text-fog uppercase">Currency</label>
          <select className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]">
            <option>USD ($)</option>
            <option>EUR (€)</option>
            <option>GBP (£)</option>
          </select>
        </div>
        <button className="focus-ring px-4 py-2 bg-ink text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:bg-charcoal">
          Save Changes
        </button>
      </div>

      <div className="card p-6 shadow-card space-y-3">
        <h3 className="font-display text-sm uppercase tracking-wide mb-2">Team Members</h3>
        {["Amara — Founder", "Devon — Operations", "Priya — Marketing", "Jonas — Content"].map(
          (m) => (
            <div key={m} className="hairline pt-2 text-[13px] text-ash">
              {m}
            </div>
          )
        )}
      </div>

      <p className="text-[11px] text-fog font-mono">
        This dashboard currently runs on sample data. Connect a database or API to make it live.
      </p>
    </div>
  );
}
