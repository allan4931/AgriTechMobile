import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "offline_farmer_records";

export interface FarmerRecord {
  farmer_name: string;
  id_number: string;
  phone_number: string;
  crop_type: string;
  farm_size: string;
  clerk_email: string;
  timestamp?: string;
  synced?: boolean;
}

export const useOffline = () => {
  const saveOfflineRecord = async (record: FarmerRecord) => {
    try {
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);
      const records = existingData ? JSON.parse(existingData) : [];

      const newRecord = {
        ...record,
        timestamp: new Date().toISOString(),
        synced: false,
      };

      records.push(newRecord);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
      return true;
    } catch (error) {
      console.error("Error saving locally:", error);
      return false;
    }
  };

  const getOfflineRecords = async (): Promise<FarmerRecord[]> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      return [];
    }
  };

  const clearSyncedRecords = async () => {
    try {
      const data = await getOfflineRecords();
      const unsynced = data.filter((r) => !r.synced);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(unsynced));
    } catch (error) {
      console.error("Error clearing records:", error);
    }
  };

  return {
    saveOfflineRecord,
    getOfflineRecords,
    clearSyncedRecords,
  };
};
