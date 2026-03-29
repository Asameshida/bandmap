// liveholic.jp 用パーサー
// 構造: dl#YYYYMM > dt#YYYYMMDD > dd > p.detail（アーティスト名カンマ区切り）
import * as cheerio from "cheerio";
import { VenueResult } from "../lib/types";
import { toArtistEntries } from "../lib/types";

export function parseLiveholic(html: string, sourceUrl: string): VenueResult {
  const $ = cheerio.load(html);
  const events: VenueResult["events"] = [];

  // dt#YYYYMMDD が日付ブロック
  $("dt[id]").each((_, dtEl) => {
    const dtId = $(dtEl).attr("id") ?? "";
    const dateMatch = dtId.match(/^(\d{4})(\d{2})(\d{2})$/);
    if (!dateMatch) return;
    const date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;

    // ddが続くイベント詳細
    $(dtEl).nextUntil("dt", "dd").each((_, ddEl) => {
      const detail = $(ddEl).find("p.detail").first().text().trim();
      if (!detail) return;

      // "Artist A / Artist B / and more..." のような形式
      const names = detail
        .split(/\/|,|、/)
        .map(s => s.trim())
        .filter(s => s && s !== "and more..." && s !== "and more" && s.length > 0);

      if (names.length > 0) {
        events.push({ date, artists: toArtistEntries(names) });
      }
    });
  });

  return {
    venue: "Shimokitazawa LIVEHOLIC",
    area: "Shimokitazawa",
    source_url: sourceUrl,
    last_fetched_at: new Date().toISOString(),
    events,
  };
}
