import { Stack } from "expo-router";

export default function AdminLayout() {
  return (
    <Stack
      screenOptions={{
        // This is the "Magic" line that removes the ugly top word
        headerShown: false,
        contentStyle: { backgroundColor: "#143022" },
      }}
    />
  );
}
