import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect } from "react";
import "../../global.css";
import OfflineBanner from "../components/ui/OfflineBanner";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import { useProgressStore } from "../store/useProgressStore";

const queryClient = new QueryClient();

export default function RootLayout() {
  const loadProgress = useProgressStore((state) => state.loadProgress);
  const isOnline = useNetworkStatus();

  useEffect(() => {
    loadProgress();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <OfflineBanner isOnline={isOnline} />
      {/* Expo Router automatically discovers nested routes, so we don't need to explicitly declare them here */}
      <Stack screenOptions={{ headerShown: false }} />
    </QueryClientProvider>
  );
}
