import * as Network from "expo-network";
import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const checkInitialConnection = async () => {
      const status = await Network.getNetworkStateAsync();
      // Wrap in Boolean() to prevent undefined errors
      setIsOnline(Boolean(status.isConnected && status.isInternetReachable));
    };

    checkInitialConnection();

    const subscription = Network.addNetworkStateListener(async (state) => {
      // Wrap in Boolean() to prevent undefined errors
      setIsOnline(Boolean(state.isConnected && state.isInternetReachable));
    });

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return isOnline;
};
