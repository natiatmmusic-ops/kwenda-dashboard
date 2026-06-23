"use client";

import { usePathname } from "next/navigation";
import { Search, Bell } from "lucide-react";

const titles = {
  "/": ["00", "Dashboard"],
  "/sales": ["01", "Sales"],
  "/social-media": ["02", "Social Media"],
  "/calendar": ["03", "Calendar"],
  "/action-plans": ["04", "Action Plans"],
  "/future-drops": ["05", "Future Drops"],
  "/settings": ["06", "Settings"],
};

export default function Topbar() {
  const pathname = usePathname();
  const [tag, title] = titles[pathname] || ["--", "KWENDA"];
  const today = new Date("2026-06-22");
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="border-b border-ink/10 bg-bone/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-[1400px] mx-auto w-full px-8 py-5 flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-xs text-fog">{tag}</span>
          <h1 className="font-display text-2xl uppercase tracking-wide">{title}</h1>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs text-ash hidden md:inline">{dateStr}</span>
          <button className="focus-ring p-2 rounded-sm hover:bg-charcoal/5">
            <Search size={17} strokeWidth={1.75} />
          </button>
          <button className="focus-ring p-2 rounded-sm hover:bg-charcoal/5 relative">
            <Bell size={17} strokeWidth={1.75} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-tag" />
          </button>
          <div className="w-8 h-8 rounded-full bg-ink text-bone flex items-center justify-center font-mono text-[11px]">
            KW
          </div>
        </div>
      </div>
    </header>
  );
}
