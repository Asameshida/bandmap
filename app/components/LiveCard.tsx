"use client";

import Image from "next/image";
import { useState } from "react";
import { Live } from "@/app/types";
import { getYouTubeVideoId, getYouTubeThumbnail, getAreaStyle } from "@/app/lib/artistMedia";

interface ArtistCardProps {
  artist: string;
  live: Live;
  onSelect: (artist: string, live: Live) => void;
}

function ArtistCard({ artist, live, onSelect }: ArtistCardProps) {
  const [imgError, setImgError] = useState(false);
  const videoId = getYouTubeVideoId(artist);
  const areaStyle = getAreaStyle(live.area);

  const imgSrc = videoId
    ? getYouTubeThumbnail(videoId)
    : (live.imageUrl || `https://unavatar.io/twitter/${encodeURIComponent(artist)}`);

  return (
    <button
      className="live-card text-left w-full rounded-xl overflow-hidden"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        cursor: "pointer",
      }}
      onClick={() => onSelect(artist, live)}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden group"
        style={{ aspectRatio: "4/3", background: "#f0ece6" }}>
        {!imgError ? (
          <Image
            src={imgSrc}
            alt={artist}
            fill
            className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
            onError={() => setImgError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #f0ece6, #e8e2d8)" }}>
            <span className="font-black select-none"
              style={{ fontSize: "3.5rem", color: "var(--border)", fontFamily: "'Bebas Neue', sans-serif" }}>
              {artist.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Bottom gradient */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)" }} />

        {/* Time badge */}
        {live.openTime && (
          <div className="absolute top-2 left-2 text-[10px] font-black px-2 py-0.5 rounded-full tracking-wider"
            style={{ background: "var(--orange)", color: "#fff" }}>
            {live.openTime}
          </div>
        )}

        {/* YouTube badge */}
        {videoId && (
          <div className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,0,0,0.9)", color: "#fff" }}>
            ▶
          </div>
        )}
      </div>

      {/* Info */}
      <div className="px-3 pt-2.5 pb-2.5">
        <p className="font-black text-sm leading-snug line-clamp-1"
          style={{ color: "var(--text)", letterSpacing: "-0.01em" }}>
          {artist}
        </p>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: areaStyle.bg, color: areaStyle.text }}>
            {live.area}
          </span>
          <span className="text-[11px] truncate" style={{ color: "var(--text-muted)" }}>
            {live.venue}
          </span>
        </div>
      </div>
    </button>
  );
}

interface LiveCardProps {
  live: Live;
  onSelect: (artist: string, live: Live) => void;
}

export default function LiveCard({ live, onSelect }: LiveCardProps) {
  return (
    <>
      {live.artists.map((artist) => (
        <ArtistCard key={`${live.id}-${artist}`} artist={artist} live={live} onSelect={onSelect} />
      ))}
    </>
  );
}
