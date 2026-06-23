"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  TrendingUp,
  Hash,
  CalendarDays,
  ListChecks,
  Shirt,
  Settings,
} from "lucide-react";

const nav = [
  { tag: "00", label: "Dashboard", href: "/", icon: LayoutGrid },
  { tag: "01", label: "Sales", href: "/sales", icon: TrendingUp },
  { tag: "02", label: "Social Media", href: "/social-media", icon: Hash },
  { tag: "03", label: "Calendar", href: "/calendar", icon: CalendarDays },
  { tag: "04", label: "Action Plans", href: "/action-plans", icon: ListChecks },
  { tag: "05", label: "Future Drops", href: "/future-drops", icon: Shirt },
  { tag: "06", label: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[252px] shrink-0 bg-ink text-bone flex flex-col">
      <div className="px-6 py-7">
        <div className="font-display text-2xl tracking-widest2 uppercase">Kwenda</div>
        <div className="font-mono text-[10px] text-fog mt-1 tracking-widest2">
          BRAND OPS — FW26
        </div>
      </div>

      <div className="stitch mx-6 opacity-30" />

      <nav className="flex-1 px-3 py-6 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`focus-ring group flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors ${
                active ? "bg-bone text-ink" : "text-mist hover:bg-charcoal hover:text-bone"
              }`}
            >
              <span className="font-mono text-[10px] text-fog w-4">{item.tag}</span>
              <Icon size={16} strokeWidth={1.75} />
              <span className="text-[13px] uppercase tracking-wide font-medium">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 stitch opacity-30 mb-5" />
      <div className="px-6 pb-7 font-mono text-[10px] text-fog leading-relaxed">
        KWENDA STUDIO<br />
        EST. 2021 — NO. 0421
      </div>
    </aside>
  );
}
