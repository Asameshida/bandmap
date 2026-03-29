// 全会場の設定リスト
// parser: 使用するパーサーの識別名
// status: "active" = 実装済み / "pending" = パーサー未実装

export type VenueConfig = {
  id: string;
  venue: string;
  area: string;
  url: string;
  parser: string;
  status: "active" | "pending";
};

export const venues: VenueConfig[] = [
  // ── Shinjuku ──────────────────────────────────────────
  {
    id: "zepp-shinjuku",
    venue: "Zepp Shinjuku",
    area: "Shinjuku",
    url: "https://www.zepp.co.jp/hall/shinjuku/",
    parser: "zepp",
    status: "pending",
  },
  {
    id: "shinjuku-loft",
    venue: "Shinjuku LOFT",
    area: "Shinjuku",
    url: "http://www.loft-prj.co.jp/schedule/loft",
    parser: "loft-prj",
    status: "active",
  },
  {
    id: "shinjuku-reny",
    venue: "Shinjuku ReNY",
    area: "Shinjuku",
    url: "https://ruido.org/reny/schedule/",
    parser: "ruido",
    status: "pending",
  },
  {
    id: "shinjuku-marz",
    venue: "Shinjuku MARZ",
    area: "Shinjuku",
    url: "http://www.marz.jp/schedule/",
    parser: "marz",
    status: "pending",
  },
  {
    id: "shinjuku-antiknock",
    venue: "Shinjuku ANTIKNOCK",
    area: "Shinjuku",
    url: "https://www.antiknock.net/schedule/",
    parser: "antiknock",
    status: "active",
  },
  {
    id: "zirco-tokyo",
    venue: "Zirco Tokyo",
    area: "Shinjuku / Kabukicho",
    url: "https://zirco-tokyo.jp/schedule/",
    parser: "zirco",
    status: "pending",
  },
  {
    id: "shinjuku-marble",
    venue: "Shinjuku Marble",
    area: "Shinjuku",
    url: "http://shinjuku-marble.com/schedule/",
    parser: "marble",
    status: "pending",
  },

  // ── Shibuya ───────────────────────────────────────────
  {
    id: "spotify-o-east",
    venue: "Spotify O-EAST / O-WEST",
    area: "Shibuya",
    url: "https://shibuya-o.com/",
    parser: "shibuya-o",
    status: "pending",
  },
  {
    id: "shibuya-quattro",
    venue: "Shibuya CLUB QUATTRO",
    area: "Shibuya",
    url: "https://www.club-quattro.com/shibuya/schedule/",
    parser: "quattro",
    status: "pending",
  },
  {
    id: "shibuya-www",
    venue: "Shibuya WWW / WWW X",
    area: "Shibuya",
    url: "https://www-shibuya.jp/schedule/",
    parser: "www-shibuya",
    status: "active",
  },

  {
    id: "shibuya-chelsea",
    venue: "Shibuya Chelsea Hotel",
    area: "Shibuya",
    url: "http://www.chelseahotel.jp/schedule.html",
    parser: "chelsea",
    status: "pending",
  },
  {
    id: "shibuya-eggman",
    venue: "Shibuya EGGMAN",
    area: "Shibuya",
    url: "http://eggman.jp/day-schedule/",
    parser: "eggman",
    status: "pending",
  },
  {
    id: "shibuya-lamama",
    venue: "Shibuya La.mama",
    area: "Shibuya",
    url: "http://www.lamama.net/schedule/",
    parser: "lamama",
    status: "pending",
  },
  {
    id: "shibuya-kinmirai",
    venue: "Shibuya Kinmirai Kaikan",
    area: "Shibuya",
    url: "https://kinmiraikaikan.com/schedule/",
    parser: "kinmirai",
    status: "pending",
  },

  // ── Shimokitazawa ─────────────────────────────────────
  {
    id: "shimokita-shelter",
    venue: "Shimokitazawa SHELTER",
    area: "Shimokitazawa",
    url: "http://www.loft-prj.co.jp/schedule/shelter",
    parser: "loft-prj",
    status: "active",
  },
  {
    id: "shimokita-que",
    venue: "Shimokitazawa CLUB Que",
    area: "Shimokitazawa",
    url: "http://www.ukproject.com/que/schedule/",
    parser: "ukproject",
    status: "pending",
  },
  {
    id: "shimokita-251",
    venue: "Shimokitazawa 251",
    area: "Shimokitazawa",
    url: "http://www.club251.co.jp/schedule/",
    parser: "club251",
    status: "pending",
  },
  {
    id: "shimokita-mosaic",
    venue: "Shimokitazawa MOSAiC",
    area: "Shimokitazawa",
    url: "http://mu-seum.co.jp/schedule.html",
    parser: "mosaic",
    status: "pending",
  },
  {
    id: "shimokita-shangrila",
    venue: "Shimokitazawa Shangri-La",
    area: "Shimokitazawa",
    url: "https://www.shan-gri-la.jp/tokyo/schedule/",
    parser: "shangrila",
    status: "pending",
  },
  {
    id: "shimokita-liveholic",
    venue: "Shimokitazawa LIVEHOLIC",
    area: "Shimokitazawa",
    url: "https://liveholic.jp/schedule/",
    parser: "liveholic",
    status: "active",
  },

  // ── Other Areas ───────────────────────────────────────
  {
    id: "ebisu-liquidroom",
    venue: "Ebisu LIQUIDROOM",
    area: "Ebisu",
    url: "https://www.liquidroom.net/schedule",
    parser: "liquidroom",
    status: "active",
  },
  {
    id: "daikanyama-unit",
    venue: "Daikanyama UNIT",
    area: "Daikanyama",
    url: "https://www.unit-tokyo.com/schedule/",
    parser: "unit",
    status: "pending",
  },
  {
    id: "akasaka-reny-alpha",
    venue: "Akasaka ReNY alpha",
    area: "Akasaka",
    url: "https://ruido.org/akakasareny/schedule/",
    parser: "ruido",
    status: "pending",
  },
  {
    id: "ex-theater-roppongi",
    venue: "EX THEATER ROPPONGI",
    area: "Roppongi",
    url: "https://www.tv-asahi.co.jp/ex-theater/schedule/",
    parser: "ex-theater",
    status: "pending",
  },
  {
    id: "ikebukuro-harevutai",
    venue: "Ikebukuro harevutai",
    area: "Ikebukuro",
    url: "https://harevutai.com/schedule/",
    parser: "harevutai",
    status: "pending",
  },
  {
    id: "takadanobaba-phase",
    venue: "Takadanobaba CLUB PHASE",
    area: "Takadanobaba",
    url: "http://www.club-phase.com/schedule/",
    parser: "phase",
    status: "pending",
  },

  // ── Koenji ────────────────────────────────────────────
  {
    id: "koenji-high",
    venue: "Koenji HIGH",
    area: "Koenji",
    url: "http://koenji-high.com/schedule/",
    parser: "koenji-high",
    status: "active",
  },
  {
    id: "koenji-roots",
    venue: "Koenji CLUB ROOTS!",
    area: "Koenji",
    url: "http://www.mur-roots.jp/schedule/index.html",
    parser: "roots",
    status: "pending",
  },
  {
    id: "showboat",
    venue: "ShowBoat",
    area: "Koenji",
    url: "http://www.showboat1993.com/schedule",
    parser: "showboat",
    status: "pending",
  },
  {
    id: "jirokichi",
    venue: "Live Music JIROKICHI",
    area: "Koenji",
    url: "https://jirokichi.net/schedule/",
    parser: "jirokichi",
    status: "pending",
  },
  {
    id: "ufoclub",
    venue: "U.F.O.CLUB",
    area: "Koenji",
    url: "http://www.ufoclub.jp/schedule/",
    parser: "ufoclub",
    status: "pending",
  },

  // ── Shindaita ─────────────────────────────────────────
  {
    id: "fever",
    venue: "FEVER",
    area: "Shindaita",
    url: "https://www.fever-tokyo.com/schedule/",
    parser: "fever",
    status: "pending",
  },
];
