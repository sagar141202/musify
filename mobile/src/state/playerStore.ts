import { Audio, AVPlaybackStatus } from "expo-av";
import { create } from "zustand";

import { mockTracks } from "../data/mockTracks";
import { getStreamUrl } from "../lib/api";
import { Track } from "../types/music";

type PlayerState = {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  isLoading: boolean;
  isFullPlayerOpen: boolean;
  positionMs: number;
  durationMs: number;
  sound: Audio.Sound | null;
  playTrack: (track: Track, queue?: Track[]) => Promise<void>;
  togglePlayback: () => Promise<void>;
  nextTrack: () => Promise<void>;
  openFullPlayer: () => void;
  closeFullPlayer: () => void;
};

function handleStatus(status: AVPlaybackStatus, set: (state: Partial<PlayerState>) => void) {
  if (!status.isLoaded) {
    return;
  }

  set({
    isPlaying: status.isPlaying,
    positionMs: status.positionMillis,
    durationMs: status.durationMillis ?? 0,
    isLoading: false
  });
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: mockTracks,
  isPlaying: false,
  isLoading: false,
  isFullPlayerOpen: false,
  positionMs: 0,
  durationMs: 0,
  sound: null,

  playTrack: async (track, queue = mockTracks) => {
    const existing = get().sound;
    set({ isLoading: true, currentTrack: track, queue, positionMs: 0, durationMs: track.durationMs });

    if (existing) {
      await existing.unloadAsync();
    }

    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true
    });

    const streamUrl = (await getStreamUrl(track.videoId)) ?? track.streamUrl;
    if (!streamUrl) {
      set({ isLoading: false, isPlaying: false });
      return;
    }

    const { sound } = await Audio.Sound.createAsync(
      { uri: streamUrl },
      { shouldPlay: true, progressUpdateIntervalMillis: 500 },
      (status) => handleStatus(status, set)
    );

    set({ sound, isPlaying: true, isLoading: false });
  },

  togglePlayback: async () => {
    const { sound, isPlaying } = get();
    if (!sound) {
      const firstTrack = get().queue[0] ?? mockTracks[0];
      await get().playTrack(firstTrack);
      return;
    }

    if (isPlaying) {
      await sound.pauseAsync();
      set({ isPlaying: false });
    } else {
      await sound.playAsync();
      set({ isPlaying: true });
    }
  },

  nextTrack: async () => {
    const { currentTrack, queue } = get();
    const activeQueue = queue.length > 0 ? queue : mockTracks;
    const currentIndex = activeQueue.findIndex((track) => track.videoId === currentTrack?.videoId);
    const next = activeQueue[(currentIndex + 1) % activeQueue.length] ?? activeQueue[0];
    await get().playTrack(next, activeQueue);
  },

  openFullPlayer: () => set({ isFullPlayerOpen: true }),
  closeFullPlayer: () => set({ isFullPlayerOpen: false })
}));
