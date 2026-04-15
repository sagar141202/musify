import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "../../src/theme/tokens";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}>
      <View style={styles.avatar}>
        <Ionicons name="musical-notes" size={34} color={colors.bg} />
      </View>
      <Text style={styles.title}>Sagar's SoundFree</Text>
      <Text style={styles.subtitle}>Android-first personal streaming setup.</Text>

      <View style={styles.panel}>
        <Setting label="Backend" value="localhost:8000" />
        <Setting label="Audio" value="Expo preview engine" />
        <Setting label="Offline" value="Queued for next phase" />
        <Setting label="Theme" value="Dark glass" />
      </View>
    </ScrollView>
  );
}

function Setting({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.setting}>
      <Text style={styles.settingLabel}>{label}</Text>
      <Text style={styles.settingValue}>{value}</Text>
    </View>
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
    alignItems: "center"
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.accent,
    marginTop: spacing.lg
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "900",
    marginTop: spacing.lg,
    textAlign: "center"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    marginTop: spacing.sm,
    textAlign: "center"
  },
  panel: {
    alignSelf: "stretch",
    gap: spacing.sm,
    marginTop: spacing.xl,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.md
  },
  setting: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  settingLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "800"
  },
  settingValue: {
    flex: 1,
    color: colors.muted,
    fontSize: 14,
    textAlign: "right"
  }
});
