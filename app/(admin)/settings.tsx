import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerSafe}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>System Settings</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.settingItem}>
          <View>
            <Text style={styles.setLabel}>Cloud Synchronization</Text>
            <Text style={styles.setSub}>allan.zivo.cloud</Text>
          </View>
          <Switch
            value={true}
            trackColor={{ false: "#767577", true: "#2E7D32" }}
          />
        </View>

        <View style={styles.settingItem}>
          <View>
            <Text style={styles.setLabel}>Secure Encryption</Text>
            <Text style={styles.setSub}>TLS 1.3 Active</Text>
          </View>
          <Ionicons name="lock-closed" size={20} color="#2E7D32" />
        </View>

        <TouchableOpacity
          style={styles.dangerZone}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.dangerText}>Terminate Admin Session</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#143022" },
  headerSafe: { backgroundColor: "#143022" },
  header: { flexDirection: "row", alignItems: "center", padding: 20 },
  backBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 8,
    borderRadius: 12,
    marginRight: 15,
  },
  headerTitle: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
  content: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    padding: 25,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
  },
  setLabel: { fontSize: 16, fontWeight: "bold", color: "#333" },
  setSub: { fontSize: 12, color: "#999", marginTop: 2 },
  dangerZone: {
    marginTop: "auto",
    backgroundColor: "#FEEBEE",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  dangerText: { color: "#D32F2F", fontWeight: "bold" },
});
