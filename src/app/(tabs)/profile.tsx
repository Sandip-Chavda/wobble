import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-white text-2xl font-bold">Profile</Text>
      </View>
    </SafeAreaView>
  );
}
