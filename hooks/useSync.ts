import { useState } from "react";
import API_URL from "../constants/Api";

export const useSync = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const uploadToHQ = async (records: any[]) => {
    if (records.length === 0) return false;

    setIsSyncing(true);
    try {
      const response = await fetch(`${API_URL}/sync-records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(records),
      });

      if (response.ok) {
        return true;
      }
      throw new Error("Server error");
    } catch (err) {
      console.log("Sync failed - device likely offline.");
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  return { uploadToHQ, isSyncing };
};
