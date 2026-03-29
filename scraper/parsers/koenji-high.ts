// koenji-high.com 用パーサー
// 構造: span#y{year} + span#m{month} で年月取得、.daynum で日付、LINE UP td で出演者
import * as cheerio from "cheerio";
import { VenueResult } from "../lib/types";
import { toArtistEntries } from "../lib/types";

export function parseKoenjiHigh(html: string, sourceUrl: string): VenueResult {
  const $ = cheerio.load(html);
  const events: VenueResult["events"] = [];

  // 年月を取得: <span id="y2026">, <span id="m3">
  const yearSpan = $("span[id^='y']").first();
  const monthSpan = $("span[id^='m']").first();
  const yearMatch = (yearSpan.attr("id") ?? "").match(/y(\d{4})/);
  const monthMatch = (monthSpan.attr("id") ?? "").match(/m(\d{1,2})/);
  const year = yearMatch ? yearMatch[1] : String(new Date().getFullYear());
  const month = monthMatch ? monthMatch[1].padStart(2, "0") : String(new Date().getMonth() + 1).padStart(2, "0");

  // 各イベント: .eventlist
  $(".eventlist").each((_, el) => {
    const block = $(el);

    const dayStr = block.find(".daynum").text().trim();
    if (!dayStr) return;
    const day = parseInt(dayStr);
    if (isNaN(day)) return;

    const date = `${year}-${month}-${String(day).padStart(2, "0")}`;

    // LINE UP のtd内テキストを分割してアーティスト名取得
    const lineupTd = block.find("th:contains('LINE UP')").next("td");
    const lineupHtml = lineupTd.html() ?? "";
    const names = lineupHtml
      .split(/<br\s*\/?>/i)
      .map(s => $(`<span>${s}</span>`).text().trim())
      .filter(s => s && !["Act", "Support", "DJ", "VJ", "Guest", "O.A"].some(kw => s.startsWith(kw)));

    if (names.length > 0) {
      events.push({ date, artists: toArtistEntries(names) });
    }
  });

  return {
    venue: "Koenji HIGH",
    area: "Koenji",
    source_url: sourceUrl,
    last_fetched_at: new Date().toISOString(),
    events,
  };
}
