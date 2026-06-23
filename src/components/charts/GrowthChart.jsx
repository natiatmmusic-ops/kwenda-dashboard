"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { weeklyGrowth } from "@/data/sampleData";

export default function GrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={weeklyGrowth} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid stroke="#0B0B0C" strokeOpacity={0.06} vertical={false} />
        <XAxis
          dataKey="week"
          axisLine={false}
          tickLine={false}
          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "#8A8A8E" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontFamily: "var(--font-mono)", fontSize: 11, fill: "#8A8A8E" }}
          tickFormatter={(v) => `${v / 1000}k`}
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
        <Legend wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#54545A" }} />
        <Line type="monotone" dataKey="tiktok" stroke="#0B0B0C" strokeWidth={2} dot={{ r: 3 }} name="TikTok Views" />
        <Line type="monotone" dataKey="instagram" stroke="#FF5A1F" strokeWidth={2} dot={{ r: 3 }} name="IG Followers" />
        <Line type="monotone" dataKey="visits" stroke="#8A8A8E" strokeWidth={2} dot={{ r: 3 }} name="Website Visits" />
      </LineChart>
    </ResponsiveContainer>
  );
}
