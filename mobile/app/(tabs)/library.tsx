import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { mockTracks } from "../../src/data/mockTracks";
import { colors, radius, spacing } from "../../src/theme/tokens";

const libraryRows = [
  { icon: "heart" as const, title: "Liked Songs", detail: "0 tracks" },
  { icon: "download" as const, title: "Downloaded", detail: "Offline library ready" },
  { icon: "time" as const, title: "Recently Played", detail: `${mockTracks.length} demo tracks` },
  { icon: "albums" as const, title: "Playlists", detail: "Create mixes in the next step" }
];

export default function LibraryScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}>
      <Text style={styles.title}>Library</Text>
      <View style={styles.filterRow}>
        {["All", "Playlists", "Artists", "Albums"].map((filter) => (
          <View key={filter} style={[styles.filter, filter === "All" && styles.activeFilter]}>
            <Text style={[styles.filterText, filter === "All" && styles.activeFilterText]}>{filter}</Text>
          </View>
        ))}
      </View>
      <View style={styles.rows}>
        {libraryRows.map((row) => (
          <View key={row.title} style={styles.row}>
            <View style={styles.rowIcon}>
              <Ionicons name={row.icon} size={22} color={colors.accent} />
            </View>
            <View style={styles.rowCopy}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.rowDetail}>{row.detail}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.faint} />
          </View>
        ))}
      </View>
    </ScrollView>
  );
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
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900"
  },
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginTop: spacing.lg
  },
  filter: {
    minHeight: 40,
    justifyContent: "center",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.elevated
  },
  activeFilter: {
    backgroundColor: colors.accent
  },
  filterText: {
    color: colors.muted,
    fontWeight: "800"
  },
  activeFilterText: {
    color: colors.bg
  },
  rows: {
    gap: spacing.md,
    marginTop: spacing.xl
  },
  row: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.md
  },
  rowIcon: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius.md,
    backgroundColor: "rgba(29,185,84,0.12)"
  },
  rowCopy: {
    flex: 1,
    gap: 3
  },
  rowTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  rowDetail: {
    color: colors.muted,
    fontSize: 13
  }
});
