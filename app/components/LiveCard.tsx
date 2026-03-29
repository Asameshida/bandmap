"use client";

import Image from "next/image";
import { useState } from "react";
import { Live } from "@/app/types";
import { getYouTubeVideoId, getYouTubeThumbnail, getYouTubeUrl } from "@/app/lib/artistMedia";

function ArtistCard({ artist, live }: { artist: string; live: Live }) {
  const [imgError, setImgError] = useState(false);

  const youtubeId = getYouTubeVideoId(artist);
  const imgSrc = youtubeId
    ? getYouTubeThumbnail(youtubeId)
    : (live.imageUrl || `https://unavatar.io/twitter/${encodeURIComponent(artist)}`);
  const linkUrl = youtubeId ? getYouTubeUrl(youtubeId) : live.ticketUrl || live.sourceUrl || null;

  const cardContent = (
    <div className="group cursor-pointer" style={{ fontFamily: "inherit" }}>
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-zinc-900"
        style={{ aspectRatio: "4/3", border: "1px solid #1e1e1e" }}>
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
            style={{ background: "linear-gradient(135deg, #141414, #1c1c1c)" }}>
            <span className="font-black select-none"
              style={{ fontSize: "3rem", color: "#2a2a2a", fontFamily: "'Bebas Neue', sans-serif" }}>
              {artist.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        {/* Bottom gradient */}
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)" }} />

        {/* Time badge */}
        {live.openTime && (
          <div className="absolute top-2 left-2 text-[10px] font-bold px-1.5 py-0.5 tracking-wider"
            style={{ background: "var(--accent)", color: "#fff" }}>
            {live.openTime}
          </div>
        )}

        {/* YouTube badge */}
        {youtubeId && (
          <div className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 tracking-wider"
            style={{ background: "#ff0000", color: "#fff" }}>
            ▶ YT
          </div>
        )}
      </div>

      {/* Info */}
      <div className="pt-2 pb-1">
        <p className="font-black text-sm leading-tight truncate"
          style={{ color: "var(--foreground)", letterSpacing: "-0.01em" }}>
          {artist}
        </p>
        <p className="text-xs mt-0.5 truncate" style={{ color: "#555" }}>
          {live.area}&nbsp;·&nbsp;{live.venue}
        </p>
      </div>
    </div>
  );

  if (linkUrl) {
    return (
      <a href={linkUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {cardContent}
      </a>
    );
  }
  return cardContent;
}

export default function LiveCard({ live }: { live: Live }) {
  return (
    <>
      {live.artists.map((artist) => (
        <ArtistCard key={`${live.id}-${artist}`} artist={artist} live={live} />
      ))}
    </>
  );
}
