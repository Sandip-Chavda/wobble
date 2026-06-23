import { Redirect } from "expo-router";

export default function Index() {
  // Temporary redirect to tabs until we add Clerk Auth
  return <Redirect href="/(tabs)/home" />;
}
