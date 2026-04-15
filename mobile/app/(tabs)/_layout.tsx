import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

import { colors } from "../../src/theme/tokens";

type IconName = keyof typeof Ionicons.glyphMap;

function tabIcon(name: IconName, activeName: IconName) {
  return ({ color, focused }: { color: string; focused: boolean }) => (
    <Ionicons name={focused ? activeName : name} size={22} color={color} />
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: {
          minHeight: 64,
          borderTopWidth: 0,
          backgroundColor: "rgba(10,10,10,0.94)"
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700"
        }
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home", tabBarIcon: tabIcon("home-outline", "home") }} />
      <Tabs.Screen name="search" options={{ title: "Search", tabBarIcon: tabIcon("search-outline", "search") }} />
      <Tabs.Screen name="library" options={{ title: "Library", tabBarIcon: tabIcon("library-outline", "library") }} />
      <Tabs.Screen name="profile" options={{ title: "Profile", tabBarIcon: tabIcon("person-outline", "person") }} />
    </Tabs>
  );
}
