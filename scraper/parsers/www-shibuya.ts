// www-shibuya.jp 用パーサー（WWW / WWW X / WWWβ）
// 構造: article.column > .date(.day) + .info h3.title（タイトル＝アーティスト名）
import * as cheerio from "cheerio";
import { VenueResult } from "../lib/types";
import { toArtistEntries } from "../lib/types";

export function parseWwwShibuya(html: string, sourceUrl: string): VenueResult {
  const $ = cheerio.load(html);
  const events: VenueResult["events"] = [];

  // ページURL or ナビから現在の年月を取得
  // ナビのprevリンク例: /schedule/202602.php → 前月が202602 → 今月は202603
  const prevLink = $("a.pageLink[href*='/schedule/2']").first().attr("href") ?? "";
  const prevMatch = prevLink.match(/schedule\/(\d{4})(\d{2})\.php/);
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  if (prevMatch) {
    // 前月のリンクから今月を計算
    const prevYear = parseInt(prevMatch[1]);
    const prevMonth = parseInt(prevMatch[2]);
    if (prevMonth === 12) { year = prevYear + 1; month = 1; }
    else { year = prevYear; month = prevMonth + 1; }
  }

  $("article.column").each((_, el) => {
    const block = $(el);

    const dayStr = block.find(".date .day").text().trim();
    if (!dayStr) return;
    const day = parseInt(dayStr);
    if (isNaN(day)) return;

    const date = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    // タイトル（WWWはアーティスト名がタイトルになっていることが多い）
    const title = block.find(".info h3.title span").text().trim() ||
                  block.find(".info h3.title").text().trim();
    if (!title) return;

    events.push({ date, artists: toArtistEntries([title]) });
  });

  return {
    venue: "Shibuya WWW / WWW X",
    area: "Shibuya",
    source_url: sourceUrl,
    last_fetched_at: new Date().toISOString(),
    events,
  };
}
