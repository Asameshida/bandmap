import { VenueResult } from "../lib/types";

// パーサー未実装の会場用（空データを返す）
export function notImplemented(venue: string, area: string, sourceUrl: string): VenueResult {
  return {
    venue,
    area,
    source_url: sourceUrl,
    last_fetched_at: new Date().toISOString(),
    events: [],
  };
}

// 日付文字列を "YYYY-MM-DD" に正規化するヘルパー
// 例: "4/1(火)" → "2026-04-01"
export function normalizeDate(raw: string, baseYear: number = new Date().getFullYear()): string | null {
  const full = raw.match(/(\d{4})[./\-](\d{1,2})[./\-](\d{1,2})/);
  if (full) {
    const [, y, m, d] = full;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const short =
    raw.match(/(\d{1,2})[/.](\d{1,2})/) ||
    raw.match(/(\d{1,2})月(\d{1,2})日/);
  if (short) {
    const [, m, d] = short;
    return `${baseYear}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  return null;
}
