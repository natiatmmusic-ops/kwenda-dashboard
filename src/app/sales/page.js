import { ensureSchema, query } from "@/lib/db";
import { calculateStats, calculateMonthlyTrend } from "@/lib/stats";
import StatCard from "@/components/StatCard";
import SectionLabel from "@/components/SectionLabel";
import SalesTrendChart from "@/components/charts/SalesTrendChart";
import ChannelDonut from "@/components/charts/ChannelDonut";
import { topProducts } from "@/data/sampleData";

export const dynamic = "force-dynamic";

export default async function SalesPage() {
  await ensureSchema();
const result = await query(`SELECT * FROM orders ORDER BY created_at DESC`);
const stats = calculateStats(result.rows);
const trend = calculateMonthlyTrend(result.rows);
  return (
    <div className="space-y-10">
      <section>
        <SectionLabel tag="01.1" title="Sales Overview" />
        <div className="grid grid-cols-4 gap-4">
          <StatCard
            tag="TOTAL SALES"
            label="This Month"
            value={`$${stats.thisMonthRevenue.toLocaleString()}`}
            sub={`${stats.monthOverMonthChange >= 0 ? "+" : ""}${stats.monthOverMonthChange}% MoM`}
            accent
          />
          <StatCard
            tag="ONLINE"
            label="Online Sales"
            value="—"
            sub="Channel tracking not set up yet"
          />
          <StatCard
            tag="KIOSK"
            label="Kiosk Sales"
            value="—"
            sub="Channel tracking not set up yet"
          />
          <StatCard tag="ORDERS" label="Total Orders" value={stats.totalOrders} />
        </div>
      </section>
      <section className="grid grid-cols-2 gap-4">
        <StatCard
          tag="AOV"
          label="Average Order Value"
          value={`$${stats.averageOrderValue}`}
        />
        <StatCard
          tag="BEST SELLER"
          label="Top Product This Month"
          value="—"
          sub="Product-level tracking not set up yet"
        />
      </section>
      <section className="grid grid-cols-3 gap-5">
        <div className="card p-6 col-span-2 shadow-card">
          <SectionLabel tag="01.2" title="Sales Trend — 6 Months" />
<SalesTrendChart data={trend} />        </div>
        <div className="card p-6 shadow-card">
          <SectionLabel tag="01.3" title="Channel Split" />
          <ChannelDonut />
        </div>
      </section>
      <section className="card p-6 shadow-card">
        <SectionLabel tag="01.4" title="Top Products" />
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-mono uppercase text-fog hairline pb-2">
              <th className="py-3 font-medium">Product</th>
              <th className="py-3 font-medium">Units Sold</th>
              <th className="py-3 font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {topProducts.map((p) => (
              <tr key={p.name} className="hairline">
                <td className="py-3 font-medium">{p.name}</td>
                <td className="py-3 font-mono text-ash">{p.units}</td>
                <td className="py-3 font-mono">${p.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
