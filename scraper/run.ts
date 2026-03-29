import { runAll } from "./lib/runner";

// コマンドライン引数で絞り込み可能
// 例: npx ts-node scraper/run.ts shimokita-shelter shinjuku-loft
const args = process.argv.slice(2);
const filterIds = args.length > 0 ? args : undefined;

runAll(filterIds).catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
