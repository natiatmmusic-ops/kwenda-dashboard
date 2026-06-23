import SectionLabel from "@/components/SectionLabel";
import ActionPlansBoard from "@/components/ActionPlansBoard";
import { actionPlans } from "@/data/sampleData";

export default function ActionPlansPage() {
  return (
    <div className="space-y-6">
      <SectionLabel
        tag="04.1"
        title="Action Plans"
        action={
          <span className="text-[11px] font-mono text-fog">
            Weekly · Sales · Marketing · Content · Future Drops
          </span>
        }
      />
      <ActionPlansBoard initialPlans={actionPlans} />
    </div>
  );
}
