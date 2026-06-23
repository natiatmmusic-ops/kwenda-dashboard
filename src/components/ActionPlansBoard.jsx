"use client";

import { useState } from "react";
import { StatusBadge, PriorityBadge } from "@/components/Badge";
import { statusStyles, priorityStyles } from "@/data/sampleData";

const categories = [
  "Weekly Action Plan",
  "Sales Plan",
  "Marketing Plan",
  "Content Plan",
  "Future Drop Plan",
];

const statuses = ["Not Started", "In Progress", "Done"];
const priorities = ["Low", "Medium", "High"];

export default function ActionPlansBoard({ initialPlans }) {
  const [plans, setPlans] = useState(initialPlans);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    category: categories[0],
    title: "",
    owner: "",
    dueDate: "",
    status: "Not Started",
    priority: "Medium",
  });

  const visible =
    activeCategory === "All" ? plans : plans.filter((p) => p.category === activeCategory);

  function addPlan(e) {
    e.preventDefault();
    if (!draft.title || !draft.owner || !draft.dueDate) return;
    setPlans((prev) => [...prev, { id: Date.now(), ...draft }]);
    setDraft({
      category: categories[0],
      title: "",
      owner: "",
      dueDate: "",
      status: "Not Started",
      priority: "Medium",
    });
    setShowForm(false);
  }

  function cycleStatus(id) {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: statuses[(statuses.indexOf(p.status) + 1) % statuses.length] }
          : p
      )
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setActiveCategory("All")}
            className={`focus-ring px-3 py-1.5 text-[11px] font-mono uppercase rounded-sm border ${
              activeCategory === "All" ? "bg-ink text-bone border-ink" : "border-mist text-ash"
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`focus-ring px-3 py-1.5 text-[11px] font-mono uppercase rounded-sm border ${
                activeCategory === c ? "bg-ink text-bone border-ink" : "border-mist text-ash"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="focus-ring px-4 py-2 bg-tag text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:opacity-90"
        >
          {showForm ? "Close" : "+ New Plan Item"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addPlan} className="card p-5 grid grid-cols-6 gap-3 items-end shadow-card">
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-[11px] font-mono text-fog uppercase">Plan Type</label>
            <select
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-[11px] font-mono text-fog uppercase">Title</label>
            <input
              required
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
              placeholder="What needs doing"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Owner</label>
            <input
              required
              value={draft.owner}
              onChange={(e) => setDraft({ ...draft, owner: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
              placeholder="Name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Due Date</label>
            <input
              required
              type="date"
              value={draft.dueDate}
              onChange={(e) => setDraft({ ...draft, dueDate: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Status</label>
            <select
              value={draft.status}
              onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Priority</label>
            <select
              value={draft.priority}
              onChange={(e) => setDraft({ ...draft, priority: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            >
              {priorities.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="col-span-6 focus-ring py-2 bg-ink text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:bg-charcoal"
          >
            Add to Plan
          </button>
        </form>
      )}

      <div className="card shadow-card overflow-hidden">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="text-left text-[11px] font-mono uppercase text-fog hairline">
              <th className="py-3 px-5 font-medium">Plan</th>
              <th className="py-3 px-5 font-medium">Title</th>
              <th className="py-3 px-5 font-medium">Owner</th>
              <th className="py-3 px-5 font-medium">Due</th>
              <th className="py-3 px-5 font-medium">Status</th>
              <th className="py-3 px-5 font-medium">Priority</th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id} className="hairline hover:bg-charcoal/[0.02]">
                <td className="py-3 px-5 text-[11px] font-mono text-fog uppercase">{p.category}</td>
                <td className="py-3 px-5 font-medium">{p.title}</td>
                <td className="py-3 px-5 text-ash">{p.owner}</td>
                <td className="py-3 px-5 font-mono text-ash">{p.dueDate}</td>
                <td className="py-3 px-5">
                  <button onClick={() => cycleStatus(p.id)} className="focus-ring">
                    <StatusBadge status={p.status} styles={statusStyles} />
                  </button>
                </td>
                <td className="py-3 px-5">
                  <PriorityBadge priority={p.priority} styles={priorityStyles} />
                </td>
              </tr>
            ))}
            {visible.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 px-5 text-center text-ash text-[13px]">
                  No items in this plan yet. Add one above.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-fog font-mono">Tip: click a status badge to cycle it.</p>
    </div>
  );
}
