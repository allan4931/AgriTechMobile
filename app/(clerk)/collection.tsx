import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import API_URL from "../../constants/Api";
import { useOffline } from "../../hooks/useOffline";

export default function CollectionScreen() {
  const router = useRouter();
  const { saveOfflineRecord, markAsSynced } = useOffline();
  const [loggedEmail, setLoggedEmail] = useState("");

  const [formData, setFormData] = useState({
    farmer_name: "",
    id_number: "",
    phone_number: "",
    crop_type: "",
    farm_size: "",
    clerk_email: "",
  });

  useEffect(() => {
    const fetchEmail = async () => {
      const val = await AsyncStorage.getItem("userEmail");
      if (val) {
        setLoggedEmail(val);
        setFormData((prev) => ({ ...prev, clerk_email: val }));
      }
    };
    fetchEmail();
  }, []);

  const handleSave = async () => {
    if (!formData.farmer_name || !formData.crop_type) {
      Alert.alert("Error", "Farmer Name and Crop Type are required.");
      return;
    }

    try {
      const recordToSave = {
        ...formData,
        clerk_email: loggedEmail,
      };

      const localId = await saveOfflineRecord(recordToSave);

      if (localId) {
        Alert.alert(
          "Record Saved",
          "Data is stored on this gadget. It will upload to the server automatically when you have signal.",
          [{ text: "OK", onPress: () => router.back() }],
        );

        fetch(`${API_URL}/sync-records`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify([{ ...recordToSave, localId }]),
        })
          .then((response) => {
            if (response.ok) {
              markAsSynced(localId);
            }
          })
          .catch(() => {
            console.log("Device is offline");
          });
      }
    } catch (error) {
      Alert.alert("Error", "Failed to save data.");
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.headerSafe} edges={["top"]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Collection</Text>
          <View style={{ width: 24 }} />
        </View>
      </SafeAreaView>

      <ScrollView style={styles.form}>
        <Text style={styles.label}>FARMER FULL NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Allan"
          placeholderTextColor="#999"
          value={formData.farmer_name}
          onChangeText={(val) => setFormData({ ...formData, farmer_name: val })}
        />

        <Text style={styles.label}>ID NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="National ID"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={formData.id_number}
          onChangeText={(val) => setFormData({ ...formData, id_number: val })}
        />

        <Text style={styles.label}>PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="07..."
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={formData.phone_number}
          onChangeText={(val) =>
            setFormData({ ...formData, phone_number: val })
          }
        />

        <Text style={styles.label}>CROP TYPE</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Cotton or Beans"
          placeholderTextColor="#999"
          value={formData.crop_type}
          onChangeText={(val) => setFormData({ ...formData, crop_type: val })}
        />

        <Text style={styles.label}>FARM SIZE (HECTARES)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 5"
          placeholderTextColor="#999"
          keyboardType="decimal-pad"
          value={formData.farm_size}
          onChangeText={(val) => setFormData({ ...formData, farm_size: val })}
        />

        <TouchableOpacity style={styles.submitBtn} onPress={handleSave}>
          <Text style={styles.submitText}>SUBMIT RECORD</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  headerSafe: { backgroundColor: "#143022" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#143022",
  },
  headerTitle: { color: "white", fontSize: 18, fontWeight: "bold" },
  form: { padding: 25 },
  label: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#143022",
    marginBottom: 8,
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    color: "#333",
  },
  submitBtn: {
    backgroundColor: "#2E7D32",
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,
    elevation: 4,
  },
  submitText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 1,
  },
});
