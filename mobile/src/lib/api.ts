import axios from "axios";

import { Track } from "../types/music";

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:8000",
  timeout: 10000
});

type BackendTrack = {
  videoId?: string;
  video_id?: string;
  title: string;
  artist: string;
  album?: string | null;
  duration_ms?: number | null;
  thumbnail_url?: string | null;
};

export async function searchTracks(query: string): Promise<Track[]> {
  const response = await api.get<BackendTrack[]>("/search", {
    params: { q: query, limit: 20 }
  });

  return response.data.map((track) => ({
    videoId: track.videoId ?? track.video_id ?? "",
    title: track.title,
    artist: track.artist,
    album: track.album ?? undefined,
    durationMs: track.duration_ms ?? 0,
    thumbnailUrl: track.thumbnail_url ?? "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop"
  }));
}

export async function getStreamUrl(videoId: string): Promise<string | null> {
  if (videoId.startsWith("mock-")) {
    return null;
  }

  const response = await api.get<{ stream_url: string }>(`/stream/${videoId}`);
  return response.data.stream_url;
}
