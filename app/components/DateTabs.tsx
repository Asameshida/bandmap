"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const DAY_JA = ["日", "月", "火", "水", "木", "金", "土"];

function DateTabsInner({ dates, liveCounts }: { dates: string[]; liveCounts: Record<string, number> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selected = searchParams.get("date") ?? dates[0];

  return (
    <div className="flex overflow-x-auto no-scrollbar">
      {dates.map((date, i) => {
        const d = new Date(date);
        const dayJa = DAY_JA[d.getDay()];
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const isActive = date === selected;
        const count = liveCounts[date] ?? 0;
        const isToday = i === 0;
        const isSat = d.getDay() === 6;
        const isSun = d.getDay() === 0;

        return (
          <button
            key={date}
            onClick={() => router.push(`?date=${date}`)}
            className="relative flex flex-col items-center px-5 py-3 min-w-[72px] transition-all duration-150"
            style={{
              background: isActive ? "var(--accent)" : "transparent",
              color: isActive ? "#fff" : isSun ? "#c0392b" : isSat ? "#4a90d9" : "#888",
              borderRight: "1px solid #1a1a1a",
            }}
          >
            <span className="text-[9px] font-black uppercase tracking-[0.2em] mb-0.5">
              {isToday ? "TODAY" : dayJa}
            </span>
            <span className="text-2xl font-black leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              {day}
            </span>
            <span className="text-[9px] mt-0.5" style={{ color: isActive ? "rgba(255,255,255,0.6)" : "#444" }}>
              {month}/{String(day).padStart(2, "0")}
            </span>
            {count > 0 && (
              <span className="text-[9px] font-bold mt-1"
                style={{ color: isActive ? "rgba(255,255,255,0.8)" : "var(--accent)" }}>
                {count}件
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function DateTabs({ dates, liveCounts }: { dates: string[]; liveCounts: Record<string, number> }) {
  return (
    <Suspense>
      <DateTabsInner dates={dates} liveCounts={liveCounts} />
    </Suspense>
  );
}
