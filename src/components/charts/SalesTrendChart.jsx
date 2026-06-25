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
} from "recharts";

export default function SalesTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
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
        <Bar dataKey="revenue" fill="#0B0B0C" name="Revenue" radius={[2, 2, 0, 0]} />
        <Line
          type="monotone"
          dataKey="revenue"
          stroke="#FF5A1F"
          strokeWidth={2}
          dot={false}
          legendType="none"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
