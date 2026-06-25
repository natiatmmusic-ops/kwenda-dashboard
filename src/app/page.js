import { ensureSchema, query } from "@/lib/db";
import { calculateStats, calculateMonthlyTrend } from "@/lib/stats";
import StatCard from "@/components/StatCard";
import SectionLabel from "@/components/SectionLabel";
import { StatusBadge, PriorityBadge } from "@/components/Badge";
import SalesTrendChart from "@/components/charts/SalesTrendChart";
import GrowthChart from "@/components/charts/GrowthChart";
import {
  socialSummary,
  actionPlans,
  futureDrops,
  calendarEvents,
  eventTypeStyles,
  statusStyles,
  priorityStyles,
} from "@/data/sampleData";

export default async function DashboardPage() {
  await ensureSchema();
  const result = await query(`SELECT * FROM orders ORDER BY created_at DESC`);
const stats = calculateStats(result.rows);  const upcoming = actionPlans
    .filter((p) => p.status !== "Done")
    .slice(0, 4);

  const nextEvents = calendarEvents.slice(0, 4);
  const nextDrop = futureDrops[0];

  return (
    <div className="space-y-10">
      <section>
        <SectionLabel tag="00.1" title="This Month, At a Glance" />
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            tag="TOTAL SALES"
            label="This Month"
            value={`$${stats.thisMonthRevenue.toLocaleString()}`}
            sub={`${stats.monthOverMonthChange >= 0 ? "+" : ""}${stats.monthOverMonthChange}% vs last month`}
            accent
          />
          <StatCard
            tag="ORDERS"
            label="Total Orders"
            value={stats.totalOrders}
            sub={`AOV $${stats.averageOrderValue}`}
          />
          <StatCard
            tag="IG FOLLOWERS"
            label="Instagram"
            value={socialSummary.instagramFollowers.toLocaleString()}
            sub={`+${socialSummary.followerGrowthThisWeek}% this week`}
          />
          <StatCard
            tag="ENGAGEMENT"
            label="Avg. Engagement Rate"
            value={`${socialSummary.engagementRate}%`}
            sub="Across IG + TikTok"
          />
        </div>
      </section>

      <section className="grid grid-cols-3 gap-5">
        <div className="card p-6 col-span-2 shadow-card">
          <SectionLabel tag="01" title="Sales Trend — 6 Months" />
<SalesTrendChart data={trend} />        </div>
        <div className="card p-6 shadow-card">
          <SectionLabel tag="05" title="Next Drop" />
          <div className="space-y-3">
            <div className="font-display text-xl">{nextDrop?.name}</div>
            <div className="text-xs text-ash font-mono">{nextDrop?.productType}</div>
            <div className="hairline pt-3 space-y-2 text-[13px]">
              <div className="flex justify-between">
                <span className="text-ash">Launch date</span>
                <span className="font-mono">{nextDrop?.plannedDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ash">Inventory</span>
                <StatusBadge status={nextDrop?.inventoryStatus} styles={statusStyles} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ash">Marketing</span>
                <StatusBadge status={nextDrop?.marketingStatus} styles={statusStyles} />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-ash">Launch</span>
                <StatusBadge status={nextDrop?.launchStatus} styles={statusStyles} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-5">
        <div className="card p-6 col-span-2 shadow-card">
          <SectionLabel tag="02" title="Weekly Growth — IG / TikTok / Visits" />
          <GrowthChart />
        </div>
        <div className="card p-6 shadow-card">
          <SectionLabel tag="03" title="Upcoming on Calendar" />
          <ul className="space-y-3">
            {nextEvents.map((e) => (
              <li key={e.id} className="flex items-start gap-3">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${eventTypeStyles[e.type].dot}`} />
                <div>
                  <div className="text-[13px] font-medium leading-tight">{e.title}</div>
                  <div className="text-[11px] font-mono text-fog">{e.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card p-6 shadow-card">
        <SectionLabel tag="04" title="Action Plans — Needs Attention" />
        <div className="grid grid-cols-2 gap-3">
          {upcoming.map((p) => (
            <div key={p.id} className="hairline pt-3 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-mono text-fog uppercase">{p.category}</div>
                <div className="text-[14px] font-medium">{p.title}</div>
                <div className="text-[11px] text-ash mt-0.5">
                  {p.owner} · due {p.dueDate}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <StatusBadge status={p.status} styles={statusStyles} />
                <PriorityBadge priority={p.priority} styles={priorityStyles} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
