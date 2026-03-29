// YouTube video IDs for known artists
const artistYouTube: Record<string, string> = {
  "yosugala": "ft8-gn79Z9A",
  "Bentham": "Z7XgIM-dSk8",
  "エレクトリックリボン": "IrPqpMGG3Jo",
  "Broken By The Scream": "EFJMfalgArs",
  "まねきケチャ": "YPK23Sa9q5Y",
  "Dios": "a9PeA1QAptA",
  "UNLIMITS": "4HzRoARUJKs",
};

// Area → color mapping
export const AREA_COLORS: Record<string, { bg: string; text: string }> = {
  "Shibuya":    { bg: "#fff7ed", text: "#ea580c" },
  "Shimokita":  { bg: "#f0fdf4", text: "#16a34a" },
  "Shinjuku":   { bg: "#eff6ff", text: "#2563eb" },
  "Koenji":     { bg: "#fdf4ff", text: "#9333ea" },
  "Ebisu":      { bg: "#fef2f2", text: "#dc2626" },
  "Ikebukuro":  { bg: "#f0f9ff", text: "#0284c7" },
  "Akasaka":    { bg: "#fff1f2", text: "#e11d48" },
  "Takadanobaba": { bg: "#fefce8", text: "#ca8a04" },
  "Roppongi":   { bg: "#f5f3ff", text: "#7c3aed" },
};

export function getAreaStyle(area: string): { bg: string; text: string } {
  return AREA_COLORS[area] ?? { bg: "#f5f0e8", text: "#7a6f65" };
}

export function getYouTubeVideoId(artist: string): string | null {
  return artistYouTube[artist] ?? null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeSearchUrl(artist: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(artist)}`;
}

export function getSpotifySearchUrl(artist: string): string {
  return `https://open.spotify.com/search/${encodeURIComponent(artist)}`;
}

export function getXSearchUrl(artist: string): string {
  return `https://x.com/search?q=${encodeURIComponent(artist)}&f=user`;
}
