import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import API_URL from "../../constants/Api";

const { height } = Dimensions.get("window");

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("clerk");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Required", "Please enter your work email and password.");
      return;
    }

    setLoading(true);
    try {
      const details: Record<string, string> = {
        username: email.trim(),
        password: password,
      };

      const formBody = Object.keys(details)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(details[key]),
        )
        .join("&");

      const response = await fetch(`${API_URL}/admin/token`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formBody,
      });

      const data = await response.json();

      if (response.ok) {
        const backendRole = data.role.toLowerCase().trim();
        const selectedRole = role.toLowerCase().trim();

        if (backendRole !== selectedRole) {
          Alert.alert(
            "Access Denied",
            `Account not authorized for ${role} portal.`,
          );
          setLoading(false);
          return;
        }

        await AsyncStorage.setItem("userToken", data.access_token);
        await AsyncStorage.setItem("userRole", backendRole);

        backendRole === "admin"
          ? router.replace("/(admin)/dashboard")
          : router.replace("/(clerk)/collection");
      } else {
        Alert.alert("Login Failed", data.detail || "Invalid credentials.");
      }
    } catch (error) {
      Alert.alert("Network Error", "Server connection failed.");
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
        <Ionicons
          name="leaf"
          size={32}
          color="#A5D6A7"
          style={{ marginBottom: 10 }}
        />
        <Text style={styles.title}>AgriTech</Text>
        <Text style={styles.subtitle}>OPERATIONS PORTAL</Text>
      </View>

      <View style={styles.whiteCard}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, role === "clerk" && styles.activeTab]}
            onPress={() => setRole("clerk")}
          >
            <Text
              style={[styles.tabText, role === "clerk" && styles.activeTabText]}
            >
              Clerk Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, role === "admin" && styles.activeTab]}
            onPress={() => setRole("admin")}
          >
            <Text
              style={[styles.tabText, role === "admin" && styles.activeTabText]}
            >
              Admin Login
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
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
              placeholder="Password"
              placeholderTextColor="#AAA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.loginBtnText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Need a staff account?</Text>
          <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
            <Text style={styles.signupLink}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#143022" },
  header: {
    height: height * 0.38,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
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
    paddingTop: 40,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 12,
    padding: 4,
    marginBottom: 35,
  },
  tab: {
    flex: 1,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  activeTab: { backgroundColor: "#2E7D32" },
  tabText: { fontSize: 14, fontWeight: "500", color: "#888" },
  activeTabText: { color: "#FFF", fontWeight: "600" },
  inputContainer: { marginBottom: 25 },
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
  loginBtn: {
    backgroundColor: "#2E7D32",
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    elevation: 4,
  },
  loginBtnText: { color: "white", fontWeight: "700", fontSize: 16 },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 35 },
  footerText: { color: "#999", fontSize: 14 },
  signupLink: { color: "#2E7D32", fontWeight: "bold", fontSize: 14 },
});
