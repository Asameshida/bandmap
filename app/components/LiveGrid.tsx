"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Live } from "@/app/types";
import LiveCard from "./LiveCard";
import ArtistModal from "./ArtistModal";

function LiveGridInner({ livesByDate, dates }: { livesByDate: Record<string, Live[]>; dates: string[] }) {
  const searchParams = useSearchParams();
  const selected = searchParams.get("date") ?? dates[0];
  const lives = livesByDate[selected] ?? [];

  const [modalData, setModalData] = useState<{ artist: string; live: Live } | null>(null);

  if (lives.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32"
        style={{ color: "var(--text-muted)" }}>
        <p className="text-sm uppercase tracking-[0.3em]">No events scheduled</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-8">
        {lives.map((live) => (
          <LiveCard
            key={live.id}
            live={live}
            onSelect={(artist, live) => setModalData({ artist, live })}
          />
        ))}
      </div>

      {modalData && (
        <ArtistModal
          artist={modalData.artist}
          live={modalData.live}
          onClose={() => setModalData(null)}
        />
      )}
    </>
  );
}

export default function LiveGrid({ livesByDate, dates }: { livesByDate: Record<string, Live[]>; dates: string[] }) {
  return (
    <Suspense>
      <LiveGridInner livesByDate={livesByDate} dates={dates} />
    </Suspense>
  );
}
