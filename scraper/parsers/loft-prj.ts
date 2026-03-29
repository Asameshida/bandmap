// loft-prj.co.jp 系サイト用パーサー
// 対象: Shimokitazawa SHELTER / Shinjuku LOFT
import * as cheerio from "cheerio";
import { VenueResult } from "../lib/types";
import { toArtistEntries } from "../lib/types";

type LoftVenueConfig = {
  venue: string;
  area: string;
};

export function parseLoftPrj(
  html: string,
  sourceUrl: string,
  config: LoftVenueConfig
): VenueResult {
  const $ = cheerio.load(html);
  const events: VenueResult["events"] = [];

  $(".column").each((_, el) => {
    const block = $(el);

    const year  = block.find("time .year").text().trim();
    const month = block.find("time .month").text().trim().padStart(2, "0");
    const day   = block.find("time .day").text().trim().padStart(2, "0");
    if (!year || !month || !day) return;
    const date = `${year}-${month}-${day}`;

    const names: string[] = [];
    block.find(".artist_tag li").each((_, a) => {
      const name = $(a).text().trim();
      if (name && name !== "...") names.push(name);
    });

    if (names.length > 0) {
      events.push({ date, artists: toArtistEntries(names) });
    }
  });

  return {
    venue: config.venue,
    area: config.area,
    source_url: sourceUrl,
    last_fetched_at: new Date().toISOString(),
    events,
  };
}
