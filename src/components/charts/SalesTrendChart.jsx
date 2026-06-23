"use client";

import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { monthlySalesTrend } from "@/data/sampleData";

export default function SalesTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={monthlySalesTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#0B0B0C" strokeOpacity={0.06} vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "#8A8A8E" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "#8A8A8E" }}
          tickFormatter={(v) => `$${v / 1000}k`}
        />
        <Tooltip
          contentStyle={{
            background: "#0B0B0C",
            border: "none",
            borderRadius: 2,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
          labelStyle={{ color: "#8A8A8E" }}
          itemStyle={{ color: "#F4F3EF" }}
        />
        <Legend
          wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#54545A" }}
        />
        <Bar dataKey="kiosk" stackId="a" fill="#C9C8C3" name="Kiosk" radius={[2, 2, 0, 0]} />
        <Bar dataKey="online" stackId="a" fill="#0B0B0C" name="Online" radius={[2, 2, 0, 0]} />
        <Line
          type="monotone"
          dataKey="online"
          stroke="#FF5A1F"
          strokeWidth={2}
          dot={false}
          legendType="none"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
