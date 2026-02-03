import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API_URL from "../../constants/Api";

const { height } = Dimensions.get("window");

export default function SignupScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("clerk");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert(
        "Required",
        "All fields are mandatory for staff registration.",
      );
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          password: password,
          full_name: name,
          role: role,
        }),
      });

      if (response.ok) {
        Alert.alert("Success", "Account created. You can now log in.");
        router.back();
      } else {
        const errorData = await response.json();
        Alert.alert(
          "Registration Failed",
          errorData.detail || "Error creating account.",
        );
      }
    } catch (error) {
      Alert.alert("Server Error", "Could not reach the AgriTech backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Ionicons
          name="person-add"
          size={32}
          color="#A5D6A7"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>JOIN THE FIELD TEAM</Text>
      </View>

      <View style={styles.whiteCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <Text style={styles.sectionLabel}>ACCOUNT TYPE</Text>
          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[styles.roleBox, role === "clerk" && styles.roleActive]}
              onPress={() => setRole("clerk")}
            >
              <Ionicons
                name="briefcase-outline"
                size={18}
                color={role === "clerk" ? "#FFF" : "#2E7D32"}
              />
              <Text
                style={[
                  styles.roleText,
                  role === "clerk" && styles.roleTextActive,
                ]}
              >
                Clerk
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.roleBox, role === "admin" && styles.roleActive]}
              onPress={() => setRole("admin")}
            >
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color={role === "admin" ? "#FFF" : "#2E7D32"}
              />
              <Text
                style={[
                  styles.roleText,
                  role === "admin" && styles.roleTextActive,
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.inputGroup}>
              <Ionicons
                name="person-outline"
                size={18}
                color="#AAA"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#AAA"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons
                name="mail-outline"
                size={18}
                color="#AAA"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Work Email"
                placeholderTextColor="#AAA"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Ionicons
                name="lock-closed-outline"
                size={18}
                color="#AAA"
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder="Secure Password"
                placeholderTextColor="#AAA"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.registerBtn}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.registerBtnText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#143022" },
  header: {
    height: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  backBtn: {
    position: "absolute",
    top: 50,
    left: 25,
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 44, fontWeight: "800", color: "#FFF", letterSpacing: -1 },
  subtitle: {
    fontSize: 13,
    color: "#A5D6A7",
    fontWeight: "600",
    letterSpacing: 3,
    marginTop: 5,
  },
  whiteCard: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 35,
    paddingTop: 30,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#AAA",
    marginBottom: 12,
    letterSpacing: 1,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  roleBox: {
    flex: 0.48,
    height: 55,
    backgroundColor: "#FFF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  roleActive: { backgroundColor: "#2E7D32", borderColor: "#2E7D32" },
  roleText: {
    marginLeft: 8,
    fontWeight: "600",
    color: "#2E7D32",
    fontSize: 14,
  },
  roleTextActive: { color: "#FFF" },
  inputContainer: { marginBottom: 20 },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 60,
    borderWidth: 1,
    borderColor: "#EFEFEF",
  },
  icon: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#333" },
  registerBtn: {
    backgroundColor: "#2E7D32",
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  registerBtnText: { color: "white", fontWeight: "700", fontSize: 16 },
});
