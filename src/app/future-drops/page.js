import SectionLabel from "@/components/SectionLabel";
import FutureDropsTable from "@/components/FutureDropsTable";
import { futureDrops } from "@/data/sampleData";

export default function FutureDropsPage() {
  return (
    <div className="space-y-6">
      <SectionLabel tag="05.1" title="Future Drops" />
      <FutureDropsTable initialDrops={futureDrops} />
    </div>
  );
}
