import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AdminDashboard() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("https//allan.zivo.cloud/admin/all-records");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.headerSafe} edges={["top"]}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>SYSTEM CONTROL</Text>
            <Text style={styles.brandText}>AgriTech Portal</Text>
          </View>
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={() => router.replace("/")}
          >
            <Ionicons name="log-out-outline" size={26} color="#FFF" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData();
            }}
            tintColor="#FFF"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{data.length}</Text>
            <Text style={styles.statLabel}>Total Farmers</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: "#2E7D32" }]}>
            <Ionicons name="sync-circle" size={24} color="#FFF" />
            <Text style={[styles.statLabel, { color: "#FFF" }]}>
              Auto-Synced
            </Text>
          </View>
        </View>

        <View style={styles.mainCard}>
          <Text style={styles.sectionTitle}>ADMINISTRATIVE MODULES</Text>

          <View style={styles.grid}>
            {[
              {
                id: "1",
                name: "Records",
                icon: "list-circle",
                color: "#143022",
                path: "/(admin)/records",
              },
              {
                id: "2",
                name: "Clerks",
                icon: "people-circle",
                color: "#143022",
                path: "/(admin)/clerks",
              },
              {
                id: "3",
                name: "Analytics",
                icon: "stats-chart",
                color: "#143022",
                path: "/(admin)/analytics",
              },
              {
                id: "4",
                name: "Settings",
                icon: "options",
                color: "#143022",
                path: "/(admin)/settings",
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.gridItem}
                onPress={() => router.push(item.path as any)}
              >
                <View
                  style={[
                    styles.iconWrapper,
                    { backgroundColor: item.color + "10" },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={30}
                    color={item.color}
                  />
                </View>
                <Text style={styles.gridLabel}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#143022" },
  headerSafe: { backgroundColor: "#143022" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingTop: 10, // Adjusted for cleaner look
    paddingBottom: 25,
  },
  welcomeText: {
    color: "#A5D6A7",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  brandText: { color: "#FFF", fontSize: 28, fontWeight: "bold", marginTop: 4 },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 12,
    borderRadius: 16,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 25,
    gap: 15,
    marginBottom: 25,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    elevation: 4,
  },
  statNum: { fontSize: 26, fontWeight: "bold", color: "#143022" },
  statLabel: { fontSize: 11, color: "#666", fontWeight: "600", marginTop: 4 },
  mainCard: {
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    minHeight: 600,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: "#999",
    letterSpacing: 1.5,
    marginBottom: 25,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "47%",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  iconWrapper: { padding: 15, borderRadius: 20, marginBottom: 12 },
  gridLabel: { fontSize: 14, fontWeight: "bold", color: "#333" },
});
