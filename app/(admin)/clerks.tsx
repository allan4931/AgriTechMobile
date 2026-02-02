import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClerksManagement() {
  const [clerks, setClerks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetches all unique clerks who have submitted records
    fetch("https://allan.zivo.cloud/admin/all-records")
      .then((res) => res.json())
      .then((data) => {
        const uniqueClerks = [
          ...new Set(data.map((item: any) => item.clerk_email)),
        ];
        setClerks(uniqueClerks as any);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
          <Text style={styles.headerTitle}>Field Clerks</Text>
        </View>
      </SafeAreaView>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator color="#143022" size="large" />
        ) : (
          <FlatList
            data={clerks}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.clerkCard}>
                <View style={styles.avatar}>
                  <Ionicons name="person" size={20} color="#2E7D32" />
                </View>
                <View>
                  <Text style={styles.clerkEmail}>{item}</Text>
                  <Text style={styles.clerkStatus}>Active Session</Text>
                </View>
                <Ionicons
                  name="radio-button-on"
                  size={14}
                  color="#4CAF50"
                  style={{ marginLeft: "auto" }}
                />
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
  clerkCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 2,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E8F5E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  clerkEmail: { fontSize: 15, fontWeight: "bold", color: "#333" },
  clerkStatus: { fontSize: 12, color: "#999" },
});
