"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Live } from "@/app/types";
import LiveCard from "./LiveCard";

function LiveGridInner({ livesByDate, dates }: { livesByDate: Record<string, Live[]>; dates: string[] }) {
  const searchParams = useSearchParams();
  const selected = searchParams.get("date") ?? dates[0];
  const lives = livesByDate[selected] ?? [];

  if (lives.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-white/20">
        <p className="text-sm uppercase tracking-[0.3em]">No events scheduled</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-6 py-8">
      {lives.map((live) => (
        <LiveCard key={live.id} live={live} />
      ))}
    </div>
  );
}

export default function LiveGrid({ livesByDate, dates }: { livesByDate: Record<string, Live[]>; dates: string[] }) {
  return (
    <Suspense>
      <LiveGridInner livesByDate={livesByDate} dates={dates} />
    </Suspense>
  );
}
