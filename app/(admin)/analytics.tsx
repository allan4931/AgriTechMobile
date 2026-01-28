import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AnalyticsScreen() {
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
          <Text style={styles.headerTitle}>Analytics</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        <View style={styles.chartPlaceholder}>
          <Ionicons name="pie-chart" size={60} color="#2E7D32" />
          <Text style={styles.chartText}>Data Visualization Active</Text>
          <Text style={styles.subText}>Summarizing Crop Distribution...</Text>
        </View>

        <View style={styles.dataRow}>
          <View style={styles.dataBox}>
            <Text style={styles.boxLabel}>Live Nodes</Text>
            <Text style={styles.boxVal}>64.23.247.60</Text>
          </View>
          <View style={styles.dataBox}>
            <Text style={styles.boxLabel}>Protocol</Text>
            <Text style={styles.boxVal}>HTTPS/SSL</Text>
          </View>
        </View>
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
  chartPlaceholder: {
    height: 250,
    backgroundColor: "#FFF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
  },
  chartText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#143022",
    marginTop: 15,
  },
  subText: { color: "#999", marginTop: 5 },
  dataRow: { flexDirection: "row", gap: 15, marginTop: 20 },
  dataBox: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    elevation: 1,
  },
  boxLabel: {
    fontSize: 10,
    color: "#999",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  boxVal: { fontSize: 13, color: "#2E7D32", fontWeight: "bold", marginTop: 5 },
});
