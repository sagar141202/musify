import { Category, Track } from "../types/music";

const previewUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

export const mockTracks: Track[] = [
  {
    videoId: "mock-001",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    durationMs: 244000,
    thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop",
    streamUrl: previewUrl
  },
  {
    videoId: "mock-002",
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    durationMs: 268000,
    thumbnailUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop",
    streamUrl: previewUrl
  },
  {
    videoId: "mock-003",
    title: "Blinding Lights",
    artist: "The Weeknd",
    album: "After Hours",
    durationMs: 200000,
    thumbnailUrl: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&auto=format&fit=crop",
    streamUrl: previewUrl
  },
  {
    videoId: "mock-004",
    title: "Pasoori",
    artist: "Ali Sethi, Shae Gill",
    album: "Coke Studio",
    durationMs: 224000,
    thumbnailUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop",
    streamUrl: previewUrl
  },
  {
    videoId: "mock-005",
    title: "Nights",
    artist: "Frank Ocean",
    album: "Blonde",
    durationMs: 307000,
    thumbnailUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop",
    streamUrl: previewUrl
  },
  {
    videoId: "mock-006",
    title: "Aaj Ki Raat",
    artist: "Sachin-Jigar, Madhubanti Bagchi",
    album: "Stree 2",
    durationMs: 228000,
    thumbnailUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&auto=format&fit=crop",
    streamUrl: previewUrl
  }
];

export const browseCategories: Category[] = [
  { id: "bollywood", title: "Bollywood", colors: ["#F97316", "#DB2777"] },
  { id: "pop", title: "English Pop", colors: ["#06B6D4", "#2563EB"] },
  { id: "lofi", title: "Lo-fi", colors: ["#14B8A6", "#84CC16"] },
  { id: "hiphop", title: "Hip-hop", colors: ["#EF4444", "#7C3AED"] },
  { id: "classical", title: "Classical", colors: ["#F59E0B", "#64748B"] },
  { id: "punjabi", title: "Punjabi", colors: ["#22C55E", "#FACC15"] },
  { id: "rock", title: "Rock", colors: ["#DC2626", "#111827"] },
  { id: "electronic", title: "Electronic", colors: ["#8B5CF6", "#06B6D4"] }
];
