export type Track = {
  videoId: string;
  title: string;
  artist: string;
  album?: string;
  durationMs: number;
  thumbnailUrl: string;
  streamUrl?: string;
};

export type Category = {
  id: string;
  title: string;
  colors: [string, string];
};
