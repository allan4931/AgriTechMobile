import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function ClerkLayout() {
  return (
    <Tabs
      screenOptions={{ tabBarActiveTintColor: "#2E7D32", headerShown: false }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: "New Entry",
          tabBarIcon: ({ color }) => (
            <Ionicons name="add-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
