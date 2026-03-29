// antiknock.net 用パーサー
// 構造: URLから日付リスト取得 → 各日ページの .pickup_sub からアーティスト名取得
import * as cheerio from "cheerio";
import { VenueResult } from "../lib/types";
import { toArtistEntries } from "../lib/types";

export function parseAntiknock(html: string, sourceUrl: string): VenueResult {
  const $ = cheerio.load(html);
  const events: VenueResult["events"] = [];

  // ピックアップカードから日付とアーティスト取得（一覧ページのみ）
  $(".pickup_card").each((_, el) => {
    const block = $(el);

    const monthStr = block.find(".pickup_month").text().replace("/", "").trim();
    const dayStr = block.find(".pickup_day").text().trim();
    const link = block.find("a.pickup_link").attr("href") ?? "";
    const yearMatch = link.match(/schedule\/(\d{4})\d{4}/);
    const year = yearMatch ? yearMatch[1] : String(new Date().getFullYear());

    if (!monthStr || !dayStr) return;
    const date = `${year}-${monthStr.padStart(2, "0")}-${dayStr.padStart(2, "0")}`;

    const subText = block.find(".pickup_sub").text().trim();
    if (!subText) return;

    // "Artist A / Artist B / ..." or "Artist A, Artist B"
    const names = subText
      .split(/\/|,|、/)
      .map(s => s.trim().replace(/…$/, "").trim())
      .filter(s => s.length > 0);

    if (names.length > 0) {
      events.push({ date, artists: toArtistEntries(names) });
    }
  });

  return {
    venue: "Shinjuku ANTIKNOCK",
    area: "Shinjuku",
    source_url: sourceUrl,
    last_fetched_at: new Date().toISOString(),
    events,
  };
}
