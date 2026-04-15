import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { mockTracks } from "../../src/data/mockTracks";
import { usePlayerStore } from "../../src/state/playerStore";
import { colors, radius, spacing } from "../../src/theme/tokens";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const playTrack = usePlayerStore((state) => state.playTrack);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}>
      <Text style={styles.eyebrow}>Good evening, Sagar</Text>
      <Text style={styles.title}>Your music, no interruptions.</Text>

      <LinearGradient colors={["#1DB954", "#06B6D4"]} style={styles.dailyMix}>
        <View style={styles.dailyCopy}>
          <Text style={styles.dailyLabel}>Daily Mix</Text>
          <Text style={styles.dailyTitle}>Warm starts for tonight</Text>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Play daily mix" onPress={() => playTrack(mockTracks[0], mockTracks)} style={styles.playPill}>
          <Text style={styles.playText}>Play</Text>
        </Pressable>
      </LinearGradient>

      <Section title="Recently played" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
        {mockTracks.slice(0, 5).map((track) => (
          <Pressable key={track.videoId} accessibilityRole="button" accessibilityLabel={`Play ${track.title}`} onPress={() => playTrack(track, mockTracks)} style={styles.card}>
            <Image source={{ uri: track.thumbnailUrl }} style={styles.cardArt} contentFit="cover" />
            <Text numberOfLines={1} style={styles.cardTitle}>
              {track.title}
            </Text>
            <Text numberOfLines={1} style={styles.cardArtist}>
              {track.artist}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <Section title="Jump back in" />
      <View style={styles.stack}>
        {mockTracks.slice(2, 6).map((track) => (
          <Pressable key={track.videoId} onPress={() => playTrack(track, mockTracks)} style={styles.jumpItem}>
            <Image source={{ uri: track.thumbnailUrl }} style={styles.jumpArt} contentFit="cover" />
            <View style={styles.jumpCopy}>
              <Text numberOfLines={1} style={styles.jumpTitle}>
                {track.title}
              </Text>
              <Text numberOfLines={1} style={styles.jumpArtist}>
                {track.artist}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

function Section({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 180
  },
  eyebrow: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700"
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "800",
    marginTop: spacing.xs
  },
  dailyMix: {
    minHeight: 148,
    borderRadius: radius.lg,
    marginTop: spacing.xl,
    padding: spacing.lg,
    justifyContent: "space-between"
  },
  dailyCopy: {
    gap: spacing.xs
  },
  dailyLabel: {
    color: "rgba(255,255,255,0.76)",
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5
  },
  dailyTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  playPill: {
    alignSelf: "flex-start",
    minHeight: 44,
    borderRadius: radius.pill,
    backgroundColor: colors.text,
    paddingHorizontal: spacing.lg,
    justifyContent: "center"
  },
  playText: {
    color: colors.bg,
    fontWeight: "900"
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    marginTop: spacing.xl,
    marginBottom: spacing.md
  },
  horizontalList: {
    gap: spacing.md,
    paddingRight: spacing.lg
  },
  card: {
    width: 138,
    gap: spacing.sm
  },
  cardArt: {
    width: 138,
    height: 138,
    borderRadius: radius.lg,
    backgroundColor: colors.elevated
  },
  cardTitle: {
    color: colors.text,
    fontWeight: "800",
    fontSize: 14
  },
  cardArtist: {
    color: colors.muted,
    fontSize: 13
  },
  stack: {
    gap: spacing.sm
  },
  jumpItem: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surface
  },
  jumpArt: {
    width: 56,
    height: 56,
    borderRadius: radius.sm
  },
  jumpCopy: {
    flex: 1
  },
  jumpTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "800"
  },
  jumpArtist: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 3
  }
});
