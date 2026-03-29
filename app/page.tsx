import { getWeekDates, getLivesByDate } from "@/app/lib/getLives";
import DateTabs from "@/app/components/DateTabs";
import LiveGrid from "@/app/components/LiveGrid";

export default function Home() {
  const dates = getWeekDates();

  const livesByDate: Record<string, ReturnType<typeof getLivesByDate>> = {};
  const liveCounts: Record<string, number> = {};
  for (const date of dates) {
    const lives = getLivesByDate(date);
    livesByDate[date] = lives;
    liveCounts[date] = lives.length;
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>

      {/* Header */}
      <header className="relative overflow-hidden header-dots" style={{ borderBottom: "2px solid #222" }}>
        {/* Red slash accent */}
        <div className="absolute top-0 left-0 w-2 h-full" style={{ background: "var(--accent)" }} />
        <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #e8003d, transparent 70%)" }} />

        <div className="px-8 pt-10 pb-8 max-w-screen-xl mx-auto">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase px-2 py-1"
              style={{ background: "var(--accent)", color: "#fff" }}>
              TOKYO
            </span>
            <span className="text-xs tracking-widest uppercase" style={{ color: "#555" }}>
              Underground Live Guide
            </span>
          </div>

          {/* Main title */}
          <h1 className="font-black tracking-tighter leading-none uppercase"
            style={{ fontSize: "clamp(1rem, 3.3vw, 2.3rem)", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "-0.02em" }}>
            <span style={{ color: "var(--foreground)" }}>LIVE</span>
            <span style={{ color: "var(--accent)", marginLeft: "0.15em" }}>MAP</span>
          </h1>

          {/* Subtitle bar */}
          <div className="flex items-center gap-4 mt-4">
            <div className="h-px flex-1" style={{ background: "#333" }} />
            <p className="text-xs tracking-widest uppercase whitespace-nowrap" style={{ color: "#666" }}>
              都内ライブ会場 週間スケジュール
            </p>
            <div className="h-px flex-1" style={{ background: "#333" }} />
          </div>
        </div>
      </header>

      {/* Sticky Date Tabs */}
      <div className="sticky top-0 z-20 max-w-screen-xl mx-auto"
        style={{ background: "rgba(14,14,14,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e1e1e" }}>
        <DateTabs dates={dates} liveCounts={liveCounts} />
      </div>

      {/* Live Grid */}
      <div className="max-w-screen-xl mx-auto px-4">
        <LiveGrid livesByDate={livesByDate} dates={dates} />
      </div>

      {/* Footer */}
      <footer className="mt-16 py-8 px-8 text-center text-xs uppercase tracking-widest"
        style={{ borderTop: "1px solid #1a1a1a", color: "#444" }}>
        TOKYO LIVE MAP &nbsp;/&nbsp; {new Date().getFullYear()}
      </footer>
    </div>
  );
}
