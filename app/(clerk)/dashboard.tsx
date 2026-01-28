import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useOffline } from "../../hooks/useOffline";

interface FarmerRecord {
  farmer_name: string;
  crop_type: string;
  phone_number: string;
  clerk_email: string;
  timestamp?: string;
}

export default function ClerkDashboard() {
  const router = useRouter();
  const { getOfflineRecords } = useOffline();
  const [records, setRecords] = useState<FarmerRecord[]>([]);

  useFocusEffect(
    useCallback(() => {
      const loadRecords = async () => {
        const data = await getOfflineRecords();
        setRecords(data);
      };
      loadRecords();
    }, []),
  );

  const renderItem = ({ item }: { item: FarmerRecord }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordInfo}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.farmer_name ? item.farmer_name.charAt(0).toUpperCase() : "F"}
          </Text>
        </View>
        <View>
          <Text style={styles.farmerName}>
            {item.farmer_name || "Unknown Farmer"}
          </Text>
          <Text style={styles.recordSub}>
            {item.crop_type} • {item.phone_number}
          </Text>
        </View>
      </View>
      <Ionicons name="cloud-offline-outline" size={20} color="#FFA000" />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>Field Clerk</Text>
            <Text style={styles.headerSub}>Data Collection Portal</Text>
          </View>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={styles.logoutBtn}
          >
            <Ionicons name="log-out-outline" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/(clerk)/collection")}
        >
          <Ionicons name="add-circle" size={26} color="white" />
          <Text style={styles.actionText}>ADD NEW FARMER</Text>
        </TouchableOpacity>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>RECENT COLLECTIONS</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{records.length}</Text>
          </View>
        </View>

        {records.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={60} color="#DDD" />
            <Text style={styles.emptyText}>
              No records found on this device.
            </Text>
          </View>
        ) : (
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#143022" },
  header: {
    height: 180,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: { color: "white", fontSize: 32, fontWeight: "bold" },
  headerSub: { color: "#A5D6A7", fontSize: 14, marginTop: 4 },
  logoutBtn: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: 15,
  },
  content: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },
  actionBtn: {
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    padding: 22,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -55,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
    letterSpacing: 1,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#666",
    letterSpacing: 1,
  },
  countBadge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  countText: { color: "#2E7D32", fontSize: 12, fontWeight: "bold" },
  recordCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  recordInfo: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: { color: "#2E7D32", fontWeight: "bold", fontSize: 18 },
  farmerName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  recordSub: { fontSize: 12, color: "#888", marginTop: 3 },
  emptyState: { alignItems: "center", marginTop: 60 },
  emptyText: { color: "#999", marginTop: 15, fontSize: 14 },
});
