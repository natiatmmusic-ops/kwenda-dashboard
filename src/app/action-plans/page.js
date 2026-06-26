import { ensureSchema, query } from "@/lib/db";
import SectionLabel from "@/components/SectionLabel";
import ActionPlansBoard from "@/components/ActionPlansBoard";

export const dynamic = "force-dynamic";

function mapRow(row) {
  return {
    id: row.id,
    category: row.category,
    title: row.title,
    owner: row.owner,
    dueDate: row.due_date
      ? new Date(row.due_date).toISOString().slice(0, 10)
      : "",
    status: row.status,
    priority: row.priority,
    notes: row.notes || "",
  };
}

export default async function ActionPlansPage() {
  await ensureSchema();
  const result = await query(
    `SELECT * FROM action_items ORDER BY due_date ASC NULLS LAST, id ASC`
  );
  const plans = result.rows.map(mapRow);

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
      <ActionPlansBoard initialPlans={plans} />
    </div>
  );
}
