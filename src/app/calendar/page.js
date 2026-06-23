import SectionLabel from "@/components/SectionLabel";
import MonthCalendar from "@/components/MonthCalendar";
import { calendarEvents } from "@/data/sampleData";

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <SectionLabel
        tag="03.1"
        title="Planning Calendar"
        action={
          <span className="text-[11px] font-mono text-fog">
            Photoshoots · Drops · Content Days · Pop-ups · Sale Campaigns
          </span>
        }
      />
      <MonthCalendar initialEvents={calendarEvents} />
    </div>
  );
}
