"use client";

import { useMemo, useState } from "react";
import { eventTypeStyles } from "@/data/sampleData";

function buildMonthGrid(year, month) {
  const firstDay = new Date(year, month, 1);
  const startWeekday = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function fmt(year, month, day) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export default function MonthCalendar({ initialEvents }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState(initialEvents);
  const [draft, setDraft] = useState({ date: "", title: "", type: "content" });
  const [showForm, setShowForm] = useState(false);

  const cells = useMemo(() => buildMonthGrid(year, month), [year, month]);
  const monthLabel = new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const eventsByDate = useMemo(() => {
    const map = {};
    events.forEach((e) => {
      map[e.date] = map[e.date] ? [...map[e.date], e] : [e];
    });
    return map;
  }, [events]);

  function goToPrevMonth() {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else {
      setMonth((m) => m - 1);
    }
  }

  function goToNextMonth() {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else {
      setMonth((m) => m + 1);
    }
  }

  function goToToday() {
    setYear(today.getFullYear());
    setMonth(today.getMonth());
  }

  function addEvent(e) {
    e.preventDefault();
    if (!draft.date || !draft.title) return;
    setEvents((prev) => [
      ...prev,
      { id: Date.now(), date: draft.date, title: draft.title, type: draft.type },
    ]);
    setDraft({ date: "", title: "", type: "content" });
    setShowForm(false);
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={goToPrevMonth}
            className="focus-ring px-3 py-1.5 border border-mist rounded-sm text-[13px] font-mono hover:bg-charcoal/[0.03]"
            aria-label="Previous month"
          >
            ←
          </button>
          <div className="font-display text-xl uppercase tracking-wide min-w-[200px] text-center">
            {monthLabel}
          </div>
          <button
            onClick={goToNextMonth}
            className="focus-ring px-3 py-1.5 border border-mist rounded-sm text-[13px] font-mono hover:bg-charcoal/[0.03]"
            aria-label="Next month"
          >
            →
          </button>
          <button
            onClick={goToToday}
            className="focus-ring px-3 py-1.5 border border-mist rounded-sm text-[11px] font-mono uppercase text-ash hover:bg-charcoal/[0.03]"
          >
            Today
          </button>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="focus-ring px-4 py-2 bg-ink text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:bg-charcoal transition-colors"
        >
          {showForm ? "Close" : "+ Add Planned Item"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={addEvent}
          className="card p-5 grid grid-cols-4 gap-3 items-end shadow-card"
        >
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Date</label>
            <input
              type="date"
              required
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            />
          </div>
          <div className="flex flex-col gap-1 col-span-2">
            <label className="text-[11px] font-mono text-fog uppercase">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Photoshoot — Drop 05"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-mono text-fog uppercase">Type</label>
            <select
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value })}
              className="focus-ring border border-mist rounded-sm px-3 py-2 text-[13px]"
            >
              {Object.entries(eventTypeStyles).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="col-span-4 focus-ring py-2 bg-tag text-bone text-[12px] uppercase tracking-wide font-mono rounded-sm hover:opacity-90"
          >
            Save to Calendar
          </button>
        </form>
      )}

      <div className="card p-5 shadow-card">
        <div className="grid grid-cols-7 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="text-center text-[11px] font-mono text-fog uppercase py-2">
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-ink/5">
          {cells.map((day, i) => {
            const dateStr = day ? fmt(year, month, day) : null;
            const dayEvents = dateStr ? eventsByDate[dateStr] || [] : [];
            return (
              <div
                key={i}
                className={`min-h-[100px] bg-bone p-2 ${day ? "" : "bg-bone/40"}`}
              >
                {day && (
                  <>
                    <div className="text-[12px] font-mono text-ash mb-1">{day}</div>
                    <div className="space-y-1">
                      {dayEvents.map((ev) => (
                        <div
                          key={ev.id}
                          className="flex items-start gap-1.5 bg-paper border border-ink/10 rounded-sm px-1.5 py-1"
                          title={ev.title}
                        >
                          <span
                            className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${eventTypeStyles[ev.type]?.dot}`}
                          />
                          <span className="text-[10.5px] leading-tight">{ev.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {Object.entries(eventTypeStyles).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2 text-[12px] text-ash">
            <span className={`w-2 h-2 rounded-full ${val.dot}`} />
            {val.label}
          </div>
        ))}
      </div>
    </div>
  );
}
