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
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [draft, setDraft] = useState({
    category: categories[0],
    title: "",
    owner: "",
    dueDate: "",
    status: "Not Started",
    priority: "Medium",
    notes: "",
  });

  const visible =
    activeCategory === "All" ? plans : plans.filter((p) => p.category === activeCategory);

  async function addPlan(e) {
    e.preventDefault();
    if (!draft.title || !draft.owner || !draft.dueDate) return;

    setSaving(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/action-items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to add item");

      setPlans((prev) => [...prev, data.item]);
      setDraft({
        category: categories[0],
        title: "",
        owner: "",
        dueDate: "",
        status: "Not Started",
        priority: "Medium",
        notes: "",
      });
      setShowForm(false);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function cycleStatus(id) {
    const current = plans.find((p) => p.id === id);
    if (!current) return;

    const newStatus = statuses[(statuses.indexOf(current.status) + 1) % statuses.length];

    setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));

    try {
      const res = await fetch("/api/action-items", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
    } catch (err) {
      setPlans((prev) => prev.map((p) => (p.id === id ? { ...p, status: current.status } : p)));
      setErrorMsg(err.message);
    }
  }

  async function deletePlan(id) {
    if (!window.confirm("Delete this item? This can't be undone.")) return;

    const previous = plans;
    setPlans((prev) => prev.filter((p) => p.id !== id));

    try {
      const res = await fetch(`/api/action-items?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete item");
    } catch (err) {
      setPlans(previous);
      setErrorMsg(err.message);
    }
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

      {errorMsg && (
        <p className="text-[12px] text-red-600 font-mono">⚠ {errorMsg}</p>
      )}

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
          <div className="flex flex-col gap-1 col-span-6">
            <label className="text-[11px] font-mono text-fog uppercase">Notes</label>
            <textarea
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
              placeholder="Optional notes"
              rows={2}
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="col-span-6 focus-ring py-2 bg-ink text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:bg-charcoal disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add to Plan"}
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
              <th className="py-3 px-5 font-medium">Notes</th>
              <th className="py-3 px-5 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {visible.map((p) => (
              <tr key={p.id} className="hairline hover:bg-charcoal/[0.02]">
                <td className="py-3 px-5 text-[11px] font-mono text-fog uppercase">{p.category}</td>
                <td className="py-3 px-5 font-medium">{p.title}</td>
                <td className="py-3 px-5
