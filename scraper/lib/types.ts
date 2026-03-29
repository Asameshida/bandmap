// アーティスト1人分のデータ
export type ArtistEntry = {
  name: string;
  original_order: number;       // スクレイプした順番（変えない）
  display_priority: number | null;  // 手動でソート順を上書きしたい場合
  trend_score: number | null;   // 将来の人気スコア（今はnull）
  youtube_video_id: string;     // YouTubeのビデオID（今は空）
  thumbnail_url: string;        // サムネイルURL（今は空）
};

// 1イベント（1日・1会場）のデータ
export type VenueEvent = {
  date: string;           // "YYYY-MM-DD"
  artists: ArtistEntry[];
};

// 1会場分の出力データ
export type VenueResult = {
  venue: string;
  area: string;
  source_url: string;
  last_fetched_at: string;  // ISO 8601形式
  events: VenueEvent[];
};

// 各パーサーが実装すべきインターフェース
export type Parser = (html: string, sourceUrl: string) => VenueResult;

// アーティスト名の文字列配列 → ArtistEntry配列に変換するヘルパー
export function toArtistEntries(names: string[]): ArtistEntry[] {
  return names.map((name, i) => ({
    name,
    original_order: i + 1,
    display_priority: null,
    trend_score: null,
    youtube_video_id: "",
    thumbnail_url: "",
  }));
}
