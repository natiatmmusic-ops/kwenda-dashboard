"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/Badge";
import { statusStyles } from "@/data/sampleData";

const inventoryOptions = ["Sourcing", "In Production", "Ready"];
const marketingOptions = ["Not Started", "In Progress", "Ready"];
const launchOptions = ["Planning", "Scheduled", "Live"];

function cycle(value, options) {
  return options[(options.indexOf(value) + 1) % options.length];
}

export default function FutureDropsTable({ initialDrops }) {
  const [drops, setDrops] = useState(initialDrops);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    name: "",
    productType: "",
    plannedDate: "",
    photoshootDate: "",
    inventoryStatus: "Sourcing",
    marketingStatus: "Not Started",
    launchStatus: "Planning",
  });

  function updateField(id, field, options) {
    setDrops((prev) =>
      prev.map((d) => (d.id === id ? { ...d, [field]: cycle(d[field], options) } : d))
    );
  }

  function addDrop(e) {
    e.preventDefault();
    if (!draft.name || !draft.plannedDate) return;
    setDrops((prev) => [...prev, { id: Date.now(), ...draft }]);
    setDraft({
      name: "",
      productType: "",
      plannedDate: "",
      photoshootDate: "",
      inventoryStatus: "Sourcing",
      marketingStatus: "Not Started",
      launchStatus: "Planning",
    });
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm((s) => !s)}
          className="focus-ring px-4 py-2 bg-tag text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:opacity-90"
        >
          {showForm ? "Close" : "+ New Drop"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={addDrop} className="card p-5 grid grid-cols-4 gap-3 items-end shadow-card">
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-[11px] font-mono text-fog uppercase">Drop Name</label>
            <input
              required
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
              placeholder="e.g. Drop 06 — Slate"
            />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-[11px] font-mono text-fog uppercase">Product Type</label>
            <input
              value={draft.productType}
              onChange={(e) => setDraft({ ...draft, productType: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
              placeholder="e.g. Outerwear"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Planned Date</label>
            <input
              required
              type="date"
              value={draft.plannedDate}
              onChange={(e) => setDraft({ ...draft, plannedDate: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Photoshoot Date</label>
            <input
              type="date"
              value={draft.photoshootDate}
              onChange={(e) => setDraft({ ...draft, photoshootDate: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            />
          </div>
          <button
            type="submit"
            className="col-span-4 focus-ring py-2 bg-ink text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:bg-charcoal"
          >
            Add Drop
          </button>
        </form>
      )}

      <div className="card shadow-card overflow-hidden overflow-x-auto">
        <table className="w-full text-[13px] min-w-[900px]">
          <thead>
            <tr className="text-left text-[11px] font-mono uppercase text-fog hairline">
              <th className="py-3 px-5 font-medium">Drop Name</th>
              <th className="py-3 px-5 font-medium">Product Type</th>
              <th className="py-3 px-5 font-medium">Planned Date</th>
              <th className="py-3 px-5 font-medium">Photoshoot Date</th>
              <th className="py-3 px-5 font-medium">Inventory</th>
              <th className="py-3 px-5 font-medium">Marketing</th>
              <th className="py-3 px-5 font-medium">Launch</th>
            </tr>
          </thead>
          <tbody>
            {drops.map((d) => (
              <tr key={d.id} className="hairline hover:bg-charcoal/[0.02]">
                <td className="py-3 px-5 font-medium font-display tracking-wide">{d.name}</td>
                <td className="py-3 px-5 text-ash">{d.productType}</td>
                <td className="py-3 px-5 font-mono text-ash">{d.plannedDate}</td>
                <td className="py-3 px-5 font-mono text-ash">{d.photoshootDate || "—"}</td>
                <td className="py-3 px-5">
                  <button
                    className="focus-ring"
                    onClick={() => updateField(d.id, "inventoryStatus", inventoryOptions)}
                  >
                    <StatusBadge status={d.inventoryStatus} styles={statusStyles} />
                  </button>
                </td>
                <td className="py-3 px-5">
                  <button
                    className="focus-ring"
                    onClick={() => updateField(d.id, "marketingStatus", marketingOptions)}
                  >
                    <StatusBadge status={d.marketingStatus} styles={statusStyles} />
                  </button>
                </td>
                <td className="py-3 px-5">
                  <button
                    className="focus-ring"
                    onClick={() => updateField(d.id, "launchStatus", launchOptions)}
                  >
                    <StatusBadge status={d.launchStatus} styles={statusStyles} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-fog font-mono">Tip: click any status badge to advance it.</p>
    </div>
  );
}
