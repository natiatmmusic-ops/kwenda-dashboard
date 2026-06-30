import { ensureSchema, query } from "@/lib/db";
import SectionLabel from "@/components/SectionLabel";
import MonthCalendar from "@/components/MonthCalendar";
import { calendarEvents } from "@/data/sampleData";

export const dynamic = "force-dynamic";

export default async function CalendarPage() {
  await ensureSchema();
  const result = await query(
    `SELECT * FROM action_items WHERE due_date IS NOT NULL ORDER BY due_date ASC`
  );

  const taskEvents = result.rows.map((row) => ({
    id: `task-${row.id}`,
    date: row.due_date ? new Date(row.due_date).toISOString().slice(0, 10) : "",
    title: `${row.title} (${row.owner || "Unassigned"})`,
    type: "task",
  }));

  const allEvents = [...calendarEvents, ...taskEvents];

  return (
    <div className="space-y-6">
      <SectionLabel
        tag="03.1"
        title="Planning Calendar"
        action={
          <span className="text-[11px] font-mono text-fog">
            Photoshoots · Drops · Content Days · Pop-ups · Sale Campaigns · Action Plan Tasks
          </span>
        }
      />
      <MonthCalendar initialEvents={allEvents} />
    </div>
  );
}
