// YouTube video IDs for known artists
// Thumbnail: https://img.youtube.com/vi/{id}/hqdefault.jpg
const artistYouTube: Record<string, string> = {
  "yosugala": "ft8-gn79Z9A",
  "Bentham": "Z7XgIM-dSk8",
  "エレクトリックリボン": "IrPqpMGG3Jo",
  "Broken By The Scream": "EFJMfalgArs",
  "まねきケチャ": "YPK23Sa9q5Y",
  "Dios": "a9PeA1QAptA",
  "UNLIMITS": "4HzRoARUJKs",
};

export function getYouTubeVideoId(artist: string): string | null {
  return artistYouTube[artist] ?? null;
}

export function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}
