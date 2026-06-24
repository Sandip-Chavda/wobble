import { Stack } from "expo-router";
import { useEffect } from "react";
import "../../global.css";
import { useProgressStore } from "../store/useProgressStore";

export default function RootLayout() {
  const loadProgress = useProgressStore((state) => state.loadProgress);

  useEffect(() => {
    loadProgress(); // Load saved stars from SQLite on app start
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
