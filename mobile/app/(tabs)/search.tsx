import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SearchBar } from "../../src/components/SearchBar";
import { TrackListItem } from "../../src/components/TrackListItem";
import { browseCategories, mockTracks } from "../../src/data/mockTracks";
import { useSearch } from "../../src/hooks/useSearch";
import { colors, radius, spacing } from "../../src/theme/tokens";

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState("");
  const search = useSearch(query);
  const results = useMemo(() => (query.trim().length > 1 ? search.data ?? [] : []), [query, search.data]);

  return (
    <ScrollView style={styles.screen} keyboardShouldPersistTaps="handled" contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}>
      <Text style={styles.title}>Search</Text>
      <SearchBar value={query} onChangeText={setQuery} />

      {query.trim().length <= 1 ? (
        <>
          <Text style={styles.sectionTitle}>Browse all</Text>
          <View style={styles.categoryGrid}>
            {browseCategories.map((category) => (
              <Pressable key={category.id} accessibilityRole="button" accessibilityLabel={`Browse ${category.title}`} style={styles.categoryWrap}>
                <LinearGradient colors={category.colors} style={styles.category}>
                  <Text style={styles.categoryText}>{category.title}</Text>
                </LinearGradient>
              </Pressable>
            ))}
          </View>
        </>
      ) : (
        <>
          <View style={styles.resultsHeader}>
            <Text style={styles.sectionTitle}>Results</Text>
            {search.isFetching ? <ActivityIndicator color={colors.accent} /> : null}
          </View>
          <View style={styles.results}>
            {results.length > 0 ? (
              results.map((track) => <TrackListItem key={track.videoId} track={track} queue={results} />)
            ) : search.isFetching ? (
              mockTracks.slice(0, 3).map((track) => <View key={track.videoId} style={styles.skeleton} />)
            ) : (
              <Text style={styles.empty}>No results for "{query}". Try another song, artist, or album.</Text>
            )}
          </View>
        </>
      )}
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
    paddingBottom: 180,
    gap: spacing.md
  },
  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: "900"
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "800",
    marginTop: spacing.md
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md
  },
  categoryWrap: {
    width: "47%",
    minHeight: 96
  },
  category: {
    flex: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
    justifyContent: "flex-end"
  },
  categoryText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  resultsHeader: {
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  results: {
    gap: spacing.xs
  },
  skeleton: {
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surface
  },
  empty: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    paddingVertical: spacing.lg
  }
});
