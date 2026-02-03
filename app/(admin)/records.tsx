import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API_URL from "../../constants/Api";

export default function RecordsScreen() {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchRecords = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/all-records`);
      const json = await response.json();
      setRecords(json);
      setFilteredRecords(json);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Filter records as the user types
  const handleSearch = (text: string) => {
    setSearch(text);
    if (text) {
      const filtered = records.filter(
        (item: any) =>
          item.farmer_name.toLowerCase().includes(text.toLowerCase()) ||
          item.clerk_email.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* CUSTOM HEADER  */}
      <SafeAreaView style={styles.headerSafe} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerTitle}>Farmer Registry</Text>
            <Text style={styles.headerSub}>All Synced Records</Text>
          </View>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#A5D6A7"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or clerk..."
            placeholderTextColor="#A5D6A7"
            value={search}
            onChangeText={handleSearch}
          />
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#143022"
            style={{ marginTop: 50 }}
          />
        ) : filteredRecords.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-text-outline" size={60} color="#DDD" />
            <Text style={styles.emptyText}>No records found</Text>
          </View>
        ) : (
          <FlatList
            data={filteredRecords}
            keyExtractor={(item: any) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <View style={styles.cardAccent} />
                <View style={styles.cardBody}>
                  <View style={styles.row}>
                    <Text style={styles.farmerName}>{item.farmer_name}</Text>
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{item.crop_type}</Text>
                    </View>
                  </View>

                  <Text style={styles.idText}>
                    National ID: {item.id_number}
                  </Text>

                  <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                      <Ionicons name="call-outline" size={14} color="#666" />
                      <Text style={styles.infoText}>{item.phone_number}</Text>
                    </View>
                    <View style={styles.infoItem}>
                      <Ionicons name="leaf-outline" size={14} color="#666" />
                      <Text style={styles.infoText}>
                        {item.farm_size} Hectares
                      </Text>
                    </View>
                  </View>

                  <View style={styles.divider} />

                  <View style={styles.footer}>
                    <Ionicons
                      name="person-circle-outline"
                      size={16}
                      color="#2E7D32"
                    />
                    <Text style={styles.clerkLabel}>Clerk: </Text>
                    <Text style={styles.clerkEmail}>{item.clerk_email}</Text>
                  </View>
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#143022" },
  headerSafe: { backgroundColor: "#143022", paddingBottom: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: {
    backgroundColor: "rgba(255,255,255,0.1)",
    padding: 10,
    borderRadius: 12,
    marginRight: 15,
  },
  headerTitle: { color: "#FFF", fontSize: 22, fontWeight: "bold" },
  headerSub: { color: "#A5D6A7", fontSize: 12, fontWeight: "500" },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 45, color: "#FFF", fontSize: 15 },
  content: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardAccent: { width: 6, backgroundColor: "#2E7D32" },
  cardBody: { flex: 1, padding: 15 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  farmerName: { fontSize: 17, fontWeight: "bold", color: "#143022" },
  badge: {
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: "#2E7D32", fontSize: 11, fontWeight: "700" },
  idText: { fontSize: 13, color: "#888", marginTop: 4 },
  infoRow: { flexDirection: "row", marginTop: 12, gap: 20 },
  infoItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  infoText: { fontSize: 13, color: "#555", fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 12 },
  footer: { flexDirection: "row", alignItems: "center" },
  clerkLabel: { fontSize: 11, color: "#999", marginLeft: 5 },
  clerkEmail: { fontSize: 11, color: "#2E7D32", fontWeight: "600" },
  emptyContainer: { alignItems: "center", marginTop: 100 },
  emptyText: { color: "#CCC", fontSize: 16, marginTop: 10, fontWeight: "600" },
});
