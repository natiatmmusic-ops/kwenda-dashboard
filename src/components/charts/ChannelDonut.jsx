"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { salesByChannel } from "@/data/sampleData";

const COLORS = ["#0B0B0C", "#C9C8C3"];

export default function ChannelDonut() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={salesByChannel}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={95}
          paddingAngle={2}
        >
          {salesByChannel.map((entry, i) => (
            <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: "#0B0B0C",
            border: "none",
            borderRadius: 2,
            fontFamily: "var(--font-mono)",
            fontSize: 12,
          }}
          itemStyle={{ color: "#F4F3EF" }}
        />
        <Legend
          wrapperStyle={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#54545A" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
