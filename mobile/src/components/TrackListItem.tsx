import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { formatDuration } from "../lib/format";
import { usePlayerStore } from "../state/playerStore";
import { colors, radius, spacing } from "../theme/tokens";
import { Track } from "../types/music";

type TrackListItemProps = {
  track: Track;
  queue: Track[];
};

export function TrackListItem({ track, queue }: TrackListItemProps) {
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const playTrack = usePlayerStore((state) => state.playTrack);
  const isActive = currentTrack?.videoId === track.videoId;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Play ${track.title} by ${track.artist}`}
      onPress={() => playTrack(track, queue)}
      style={[styles.container, isActive && styles.activeContainer]}
    >
      <Image source={{ uri: track.thumbnailUrl }} style={styles.art} contentFit="cover" />
      <View style={styles.meta}>
        <Text numberOfLines={1} style={[styles.title, isActive && styles.activeText]}>
          {track.title}
        </Text>
        <Text numberOfLines={1} style={styles.artist}>
          {track.artist}
        </Text>
      </View>
      <Text style={styles.duration}>{formatDuration(track.durationMs)}</Text>
      <Pressable accessibilityRole="button" accessibilityLabel={`Open menu for ${track.title}`} style={styles.menuButton}>
        <Ionicons name="ellipsis-vertical" size={18} color={colors.muted} />
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.md,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm
  },
  activeContainer: {
    backgroundColor: "rgba(29,185,84,0.1)",
    borderLeftWidth: 3,
    borderLeftColor: colors.accent
  },
  art: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.elevated
  },
  meta: {
    flex: 1,
    gap: 3
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700"
  },
  activeText: {
    color: colors.accent
  },
  artist: {
    color: colors.muted,
    fontSize: 14
  },
  duration: {
    color: colors.faint,
    fontSize: 12,
    minWidth: 38,
    textAlign: "right"
  },
  menuButton: {
    width: 36,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  }
});
