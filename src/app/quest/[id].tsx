import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function QuestDetail() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-white text-2xl font-bold mb-4">Quest Detail</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-blue-500 px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
