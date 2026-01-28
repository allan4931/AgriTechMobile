import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";

export const initAutoSync = () => {
  NetInfo.addEventListener((state) => {
    if (state.isConnected && state.isInternetReachable) {
      triggerBackgroundSync();
    }
  });
};

const triggerBackgroundSync = async () => {
  try {
    const localData = await AsyncStorage.getItem("farmer_records");
    if (!localData) return;

    const records = JSON.parse(localData);
    const unsynced = records.filter((r: any) => !r.synced);

    if (unsynced.length > 0) {
      const response = await fetch("http://192.168.1.90:8000/sync-records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(unsynced),
      });

      if (response.ok) {
        const updatedRecords = records.map((r: any) => ({
          ...r,
          synced: true,
        }));
        await AsyncStorage.setItem(
          "farmer_records",
          JSON.stringify(updatedRecords),
        );
      }
    }
  } catch (error) {
    console.error("Auto-sync error:", error);
  }
};
