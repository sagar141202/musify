import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { formatDuration } from "../lib/format";
import { usePlayerStore } from "../state/playerStore";
import { colors, radius, spacing } from "../theme/tokens";

export function FullPlayerModal() {
  const insets = useSafeAreaInsets();
  const currentTrack = usePlayerStore((state) => state.currentTrack);
  const visible = usePlayerStore((state) => state.isFullPlayerOpen);
  const close = usePlayerStore((state) => state.closeFullPlayer);
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const isLoading = usePlayerStore((state) => state.isLoading);
  const togglePlayback = usePlayerStore((state) => state.togglePlayback);
  const nextTrack = usePlayerStore((state) => state.nextTrack);
  const positionMs = usePlayerStore((state) => state.positionMs);
  const durationMs = usePlayerStore((state) => state.durationMs);

  if (!currentTrack) {
    return null;
  }

  const progress = durationMs > 0 ? Math.min(positionMs / durationMs, 1) : 0;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={close}>
      <View style={styles.screen}>
        <Image source={{ uri: currentTrack.thumbnailUrl }} style={StyleSheet.absoluteFillObject} contentFit="cover" blurRadius={44} />
        <LinearGradient colors={["rgba(0,0,0,0.62)", "#0A0A0A"]} style={StyleSheet.absoluteFillObject} />
        <View style={[styles.content, { paddingTop: insets.top + spacing.sm, paddingBottom: insets.bottom + spacing.lg }]}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close full player" onPress={close} style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.headerText}>Now Playing</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Track options" style={styles.headerButton}>
              <Ionicons name="ellipsis-horizontal" size={22} color={colors.text} />
            </Pressable>
          </View>

          <Image source={{ uri: currentTrack.thumbnailUrl }} style={styles.heroArt} contentFit="cover" />

          <View style={styles.trackInfo}>
            <Text numberOfLines={2} style={styles.trackTitle}>
              {currentTrack.title}
            </Text>
            <Text numberOfLines={1} style={styles.trackArtist}>
              {currentTrack.artist}
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.time}>{formatDuration(positionMs)}</Text>
            <Text style={styles.time}>-{formatDuration(Math.max(durationMs - positionMs, 0))}</Text>
          </View>

          <View style={styles.controls}>
            <Pressable accessibilityRole="button" accessibilityLabel="Shuffle" style={styles.secondaryButton}>
              <Ionicons name="shuffle" size={22} color={colors.muted} />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Previous track" style={styles.controlButton}>
              <Ionicons name="play-skip-back" size={28} color={colors.text} />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel={isPlaying ? "Pause" : "Play"} onPress={togglePlayback} style={styles.playButton}>
              <Ionicons name={isLoading ? "hourglass" : isPlaying ? "pause" : "play"} size={34} color={colors.bg} />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Next track" onPress={nextTrack} style={styles.controlButton}>
              <Ionicons name="play-skip-forward" size={28} color={colors.text} />
            </Pressable>
            <Pressable accessibilityRole="button" accessibilityLabel="Repeat" style={styles.secondaryButton}>
              <Ionicons name="repeat" size={22} color={colors.muted} />
            </Pressable>
          </View>

          <BlurView intensity={20} tint="dark" style={styles.actions}>
            {["Download", "Lyrics", "Queue", "Timer"].map((label) => (
              <Pressable key={label} accessibilityRole="button" accessibilityLabel={label} style={styles.actionButton}>
                <Text style={styles.actionText}>{label}</Text>
              </Pressable>
            ))}
          </BlurView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    justifyContent: "space-between"
  },
  handle: {
    width: 42,
    height: 5,
    alignSelf: "center",
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.24)"
  },
  header: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  headerButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  heroArt: {
    width: "100%",
    aspectRatio: 1,
    maxHeight: 340,
    alignSelf: "center",
    borderRadius: radius.lg,
    backgroundColor: colors.elevated,
    shadowColor: colors.accent,
    shadowOpacity: 0.36,
    shadowRadius: 24
  },
  trackInfo: {
    gap: spacing.xs
  },
  trackTitle: {
    color: colors.text,
    fontSize: 32,
    fontWeight: "500"
  },
  trackArtist: {
    color: colors.accent,
    fontSize: 16,
    fontWeight: "700"
  },
  progressTrack: {
    height: 6,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.18)",
    overflow: "hidden"
  },
  progressFill: {
    height: "100%",
    borderRadius: radius.pill,
    backgroundColor: colors.accent
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -spacing.md
  },
  time: {
    color: colors.muted,
    fontSize: 12,
    fontVariant: ["tabular-nums"]
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  secondaryButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center"
  },
  controlButton: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.08)"
  },
  playButton: {
    width: 76,
    height: 76,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.pill,
    backgroundColor: colors.accent
  },
  actions: {
    minHeight: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "hidden",
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border
  },
  actionButton: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: spacing.sm
  },
  actionText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "800"
  }
});
