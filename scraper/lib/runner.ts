import fs from "fs";
import path from "path";
import { fetchHtml } from "./fetcher";
import { venues, VenueConfig } from "../venues.config";
import { parseLoftPrj } from "../parsers/loft-prj";
import { parseWwwShibuya } from "../parsers/www-shibuya";
import { parseKoenjiHigh } from "../parsers/koenji-high";
import { parseLiveholic } from "../parsers/liveholic";
import { parseAntiknock } from "../parsers/antiknock";
import { parseLiquidroom } from "../parsers/liquidroom";
import { notImplemented } from "../parsers/base";
import { VenueResult } from "./types";

const OUTPUT_DIR = path.join(__dirname, "../output");
const ERROR_LOG  = path.join(__dirname, "../output/errors.log");

function log(msg: string) {
  const line = `[${new Date().toISOString()}] ${msg}`;
  fs.appendFileSync(ERROR_LOG, line + "\n", "utf-8");
  console.error(msg);
}

async function runParser(config: VenueConfig, html: string): Promise<VenueResult> {
  switch (config.parser) {
    case "loft-prj":
      return parseLoftPrj(html, config.url, { venue: config.venue, area: config.area });
    case "www-shibuya":
      return parseWwwShibuya(html, config.url);
    case "koenji-high":
      return parseKoenjiHigh(html, config.url);
    case "liveholic":
      return parseLiveholic(html, config.url);
    case "antiknock":
      return parseAntiknock(html, config.url);
    case "liquidroom":
      return parseLiquidroom(html, config.url);
    default:
      return notImplemented(config.venue, config.area, config.url);
  }
}

async function processVenue(config: VenueConfig): Promise<void> {
  console.log(`\n[${config.id}] Fetching: ${config.url}`);

  try {
    const html = await fetchHtml(config.url);
    const result = await runParser(config, html);

    const outPath = path.join(OUTPUT_DIR, `${config.id}.json`);
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf-8");

    const count = result.events.length;
    console.log(`  ✓ Saved ${count} event(s) → ${path.basename(outPath)}`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    log(`[${config.id}] FAILED: ${message}`);
    console.log(`  ✗ Failed: ${message}`);

    const outPath = path.join(OUTPUT_DIR, `${config.id}.json`);
    if (!fs.existsSync(outPath)) {
      const fallback: VenueResult = {
        venue: config.venue,
        area: config.area,
        source_url: config.url,
        last_fetched_at: new Date().toISOString(),
        events: [],
      };
      fs.writeFileSync(outPath, JSON.stringify(fallback, null, 2), "utf-8");
    }
  }
}

export async function runAll(filterIds?: string[]): Promise<void> {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  // エラーログをリセット
  fs.writeFileSync(ERROR_LOG, "", "utf-8");

  const targets = filterIds
    ? venues.filter((v) => filterIds.includes(v.id))
    : venues;

  console.log(`\n=== Tokyo Live Scraper ===`);
  console.log(`Target: ${targets.length} venue(s)`);

  for (const venue of targets) {
    await processVenue(venue);
    await new Promise((r) => setTimeout(r, 1500));
  }

  console.log(`\n=== Done ===`);
}
