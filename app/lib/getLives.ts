import livesData from "@/data/lives.json";
import { Live } from "@/app/types";

export function getWeekDates(): string[] {
  const today = new Date();
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });
}

export function getLivesByDate(date: string): Live[] {
  return (livesData as Live[]).filter((live) => live.date === date);
}
