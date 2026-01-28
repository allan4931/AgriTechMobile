import { useState } from "react";
import { Alert } from "react-native";

export const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  // Update this with your HP Laptop IP
  const BACKEND_URL = "http://192.168.1.90:8000/sync-records";

  const uploadToHQ = async (records: any[]) => {
    if (records.length === 0) return false;

    setIsSyncing(true);
    try {
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(records),
      });

      if (response.ok) {
        Alert.alert("Success", "Data sent to Headquarters.");
        return true;
      }
      throw new Error("Server error");
    } catch (err) {
      Alert.alert("Sync Failed", "Check if the Python server is running.");
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  return { uploadToHQ, isSyncing };
};
