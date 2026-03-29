// liquidroom.net 用パーサー
// 構造: article > time（日付：日のみ）+ h2（アーティスト名）
import * as cheerio from "cheerio";
import { VenueResult } from "../lib/types";
import { toArtistEntries } from "../lib/types";

export function parseLiquidroom(html: string, sourceUrl: string): VenueResult {
  const $ = cheerio.load(html);
  const events: VenueResult["events"] = [];

  // 年月を th.f1B "2026.03" から取得
  const monthHeader = $("th.f1B").first().text().trim();
  const mhMatch = monthHeader.match(/(\d{4})\.(\d{2})/);
  const year = mhMatch ? mhMatch[1] : String(new Date().getFullYear());
  const month = mhMatch ? mhMatch[2] : String(new Date().getMonth() + 1).padStart(2, "0");

  $("article").each((_, el) => {
    const block = $(el);

    // 日付: <time>01<small>SUN</small></time> → "01"だけ取る
    const timeEl = block.find("time");
    const dayStr = timeEl.clone().children().remove().end().text().trim();
    if (!dayStr) return;
    const date = `${year}-${month}-${dayStr.padStart(2, "0")}`;

    // アーティスト名: h2
    const name = block.find("h2").text().trim();
    if (!name) return;

    events.push({ date, artists: toArtistEntries([name]) });
  });

  return {
    venue: "Ebisu LIQUIDROOM",
    area: "Ebisu",
    source_url: sourceUrl,
    last_fetched_at: new Date().toISOString(),
    events,
  };
}
