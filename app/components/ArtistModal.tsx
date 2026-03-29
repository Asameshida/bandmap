"use client";

import { useEffect } from "react";
import { Live } from "@/app/types";
import {
  getYouTubeVideoId,
  getYouTubeUrl,
  getYouTubeSearchUrl,
  getSpotifySearchUrl,
  getXSearchUrl,
  getAreaStyle,
} from "@/app/lib/artistMedia";

interface Props {
  artist: string;
  live: Live;
  onClose: () => void;
}

export default function ArtistModal({ artist, live, onClose }: Props) {
  const videoId = getYouTubeVideoId(artist);
  const areaStyle = getAreaStyle(live.area);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(26,22,18,0.65)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl rounded-2xl overflow-hidden"
        style={{
          background: "var(--surface)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.25)",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top accent */}
        <div className="h-1 w-full" style={{
          background: "linear-gradient(90deg, var(--orange) 0%, var(--teal) 50%, var(--sky) 100%)"
        }} />

        {/* Header */}
        <div className="px-6 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2
                className="font-black leading-tight"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 2rem)",
                  fontFamily: "'Bebas Neue', 'Noto Sans JP', sans-serif",
                  color: "var(--text)",
                  letterSpacing: "0.02em",
                }}
              >
                {artist}
              </h2>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: areaStyle.bg, color: areaStyle.text }}
                >
                  {live.area}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {live.venue}
                </span>
                {live.openTime && (
                  <span
                    className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: "var(--orange-pale)", color: "var(--orange)" }}
                  >
                    OPEN {live.openTime}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold transition-colors"
              style={{
                background: "var(--bg)",
                color: "var(--text-muted)",
                border: "1px solid var(--border)",
              }}
              aria-label="閉じる"
            >
              ×
            </button>
          </div>
        </div>

        {/* YouTube embed / placeholder */}
        <div style={{ background: "#000" }}>
          {videoId ? (
            <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={`${artist} - YouTube`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                }}
              />
            </div>
          ) : (
            <div
              className="flex flex-col items-center justify-center gap-4"
              style={{
                aspectRatio: "16/9",
                background: "linear-gradient(135deg, #1a1612, #2a2420)",
              }}
            >
              <span
                className="font-black"
                style={{
                  fontSize: "5rem",
                  color: "rgba(255,255,255,0.06)",
                  fontFamily: "'Bebas Neue', sans-serif",
                }}
              >
                {artist.charAt(0).toUpperCase()}
              </span>
              <a
                href={getYouTubeSearchUrl(artist)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full transition-opacity hover:opacity-80"
                style={{ background: "#ff0000", color: "#fff" }}
              >
                ▶ YouTubeで検索
              </a>
            </div>
          )}
        </div>

        {/* Links */}
        <div className="px-6 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-3"
            style={{ color: "var(--text-muted)" }}>
            配信 / SNS
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={videoId ? getYouTubeUrl(videoId) : getYouTubeSearchUrl(artist)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-opacity hover:opacity-75"
              style={{ borderColor: "#ff0000", color: "#ff0000", background: "transparent" }}
            >
              <span>▶</span> YouTube
            </a>
            <a
              href={getSpotifySearchUrl(artist)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-opacity hover:opacity-75"
              style={{ borderColor: "#1db954", color: "#1db954", background: "transparent" }}
            >
              <span>♪</span> Spotify
            </a>
            <a
              href={getXSearchUrl(artist)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-opacity hover:opacity-75"
              style={{ borderColor: "var(--text)", color: "var(--text)", background: "transparent" }}
            >
              𝕏 X / Twitter
            </a>
            {live.ticketUrl && (
              <a
                href={live.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-opacity hover:opacity-75"
                style={{ background: "var(--orange)", color: "#fff" }}
              >
                🎫 チケット
              </a>
            )}
            {live.sourceUrl && (
              <a
                href={live.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border transition-opacity hover:opacity-75"
                style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
              >
                会場サイト
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
