import { getWeekDates, getLivesByDate } from "@/app/lib/getLives";
import DateTabs from "@/app/components/DateTabs";
import LiveGrid from "@/app/components/LiveGrid";

export default function Home() {
  const dates = getWeekDates();

  const livesByDate: Record<string, ReturnType<typeof getLivesByDate>> = {};
  const artistCounts: Record<string, number> = {};
  for (const date of dates) {
    const lives = getLivesByDate(date);
    livesByDate[date] = lives;
    artistCounts[date] = lives.reduce((sum, l) => sum + l.artists.length, 0);
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>

      {/* Top accent stripe */}
      <div className="h-1 w-full" style={{
        background: "linear-gradient(90deg, var(--orange) 0%, var(--teal) 50%, var(--sky) 100%)"
      }} />

      {/* Header */}
      <header className="relative overflow-hidden header-grid"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>

        <div className="px-8 pt-8 pb-6 max-w-screen-xl mx-auto">
          {/* Tags row */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-black tracking-[0.35em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: "var(--orange)", color: "#fff" }}>
              TOKYO
            </span>
            <span className="text-[10px] font-black tracking-[0.35em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: "var(--teal)", color: "#fff" }}>
              LIVE
            </span>
            <span className="text-[10px] font-black tracking-[0.35em] uppercase px-2.5 py-1 rounded-full"
              style={{ background: "var(--sky)", color: "#fff" }}>
              UNDERGROUND
            </span>
          </div>

          {/* Main title */}
          <div className="flex items-baseline gap-4">
            <h1 className="font-black leading-none uppercase"
              style={{
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                fontFamily: "'Bebas Neue', sans-serif",
                letterSpacing: "0.02em",
                color: "var(--text)"
              }}>
              OTOMATCH
            </h1>
            <span className="font-black"
              style={{
                fontSize: "clamp(1rem, 2.5vw, 1.6rem)",
                color: "var(--text-muted)",
                fontFamily: "'Noto Sans JP', sans-serif",
                letterSpacing: "0.08em"
              }}>
              オトマチ
            </span>
          </div>

          {/* Subtitle bar */}
          <div className="flex items-center gap-3 mt-3">
            <div className="h-px flex-1" style={{ background: "var(--border)" }} />
            <p className="text-[11px] tracking-widest uppercase whitespace-nowrap font-bold"
              style={{ color: "var(--text-muted)" }}>
              都内ライブ会場 週間スケジュール
            </p>
            <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          </div>
        </div>
      </header>

      {/* Sticky Date Tabs */}
      <div className="sticky top-0 z-20 max-w-screen-xl mx-auto w-full"
        style={{
          background: "rgba(245,240,232,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)"
        }}>
        <DateTabs dates={dates} artistCounts={artistCounts} />
      </div>

      {/* Live Grid */}
      <div className="max-w-screen-xl mx-auto px-4">
        <LiveGrid livesByDate={livesByDate} dates={dates} />
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 px-8 text-center text-xs uppercase tracking-widest"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}>
        OTOMATCH &nbsp;/&nbsp; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
