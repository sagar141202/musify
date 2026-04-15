import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { usePlayerStore } from "../state/playerStore";
import { colors, radius, spacing } from "../theme/tokens";

export function MiniPlayer() {
  const insets = useSafeAreaInsets();
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isLoading = usePlayerStore((state) => state.isLoading);
  const togglePlayback = usePlayerStore((state) => state.togglePlayback);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const openFullPlayer = usePlayerStore((state) => state.openFullPlayer);

  if (!currentTrack) {
    return null;
  }

  return (
    <BlurView intensity={28} tint="dark" style={[styles.wrap, { bottom: 62 + insets.bottom }]}>
      <Pressable accessibilityRole="button" accessibilityLabel="Open now playing" onPress={openFullPlayer} style={styles.content}>
        <Image source={{ uri: currentTrack.thumbnailUrl }} style={styles.art} contentFit="cover" />
        <View style={styles.meta}>
          <Text numberOfLines={1} style={styles.title}>
            {currentTrack.title}
          </Text>
          <Text numberOfLines={1} style={styles.artist}>
            {currentTrack.artist}
          </Text>
        </View>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={isPlaying ? "Pause" : "Play"} onPress={togglePlayback} style={styles.iconButton}>
        <Ionicons name={isLoading ? "hourglass" : isPlaying ? "pause" : "play"} size={22} color={colors.text} />
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Next track" onPress={nextTrack} style={styles.iconButton}>
        <Ionicons name="play-skip-forward" size={20} color={colors.text} />
      </Pressable>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: "absolute",
    left: spacing.md,
    right: spacing.md,
    zIndex: 20,
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.glass,
    padding: spacing.sm
  },
  content: {
    flex: 1,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  art: {
    width: 48,
    height: 48,
    borderRadius: radius.sm,
    backgroundColor: colors.elevated
  },
  meta: {
    flex: 1
  },
  title: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700"
  },
  artist: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 3
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.08)"
  }
});
