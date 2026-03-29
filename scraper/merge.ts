// scraper/output/*.json を読み込んで data/lives.json に変換する
import fs from "fs";
import path from "path";

const OUTPUT_DIR = path.join(__dirname, "output");
const DATA_FILE  = path.join(__dirname, "../data/lives.json");

type ArtistEntry = { name: string; original_order: number };
type ScraperEvent = { date: string; artists: ArtistEntry[] };
type ScraperResult = {
  venue: string;
  area: string;
  source_url: string;
  events: ScraperEvent[];
};

type LiveEntry = {
  id: string;
  date: string;
  eventTitle: string;
  venue: string;
  venueId: string;
  area: string;
  openTime: string;
  startTime: string;
  artists: string[];
  imageUrl: string;
  ticketUrl: string;
  sourceUrl: string;
};

const files = fs.readdirSync(OUTPUT_DIR).filter(f => f.endsWith(".json") && f !== "errors.log");

const lives: LiveEntry[] = [];
let idCounter = 0;

for (const file of files) {
  const raw = fs.readFileSync(path.join(OUTPUT_DIR, file), "utf-8");
  const data: ScraperResult = JSON.parse(raw);
  if (!data.events || data.events.length === 0) continue;

  const venueId = file.replace(".json", "");

  for (const event of data.events) {
    if (!event.date || !event.artists || event.artists.length === 0) continue;
    idCounter++;
    lives.push({
      id: String(idCounter),
      date: event.date,
      eventTitle: "",
      venue: data.venue,
      venueId,
      area: data.area,
      openTime: "",
      startTime: "",
      artists: event.artists.map(a => a.name),
      imageUrl: "",
      ticketUrl: "",
      sourceUrl: data.source_url,
    });
  }
}

// 日付順にソート
lives.sort((a, b) => a.date.localeCompare(b.date));

fs.writeFileSync(DATA_FILE, JSON.stringify(lives, null, 2), "utf-8");
console.log(`✓ Merged ${lives.length} events from ${files.length} venues → data/lives.json`);
