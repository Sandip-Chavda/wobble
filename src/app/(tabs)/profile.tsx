import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "../../components/ui/SafeAreaView";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <View className="p-4">
        <Text className="text-gray-400 text-sm font-bold">PLAYER</Text>
        <Text className="text-white text-3xl font-extrabold mb-6">Profile</Text>

        <View className="bg-[#1C1C1E] rounded-3xl p-6 items-center mb-6 border border-white/5">
          <Text className="text-6xl mb-4">🦸‍♂️</Text>
          <Text className="text-white text-2xl font-bold">Player 1</Text>
          <Text className="text-gray-400">Level 1 Adventurer</Text>
        </View>

        <View className="flex-row justify-between gap-4">
          <View className="bg-[#1C1C1E] flex-1 p-4 rounded-2xl items-center border border-white/5">
            <Text className="text-3xl mb-1">⭐</Text>
            <Text className="text-white font-bold text-lg">0</Text>
            <Text className="text-gray-400 text-xs">Total Stars</Text>
          </View>
          <View className="bg-[#1C1C1E] flex-1 p-4 rounded-2xl items-center border border-white/5">
            <Text className="text-3xl mb-1">🔥</Text>
            <Text className="text-white font-bold text-lg">1</Text>
            <Text className="text-gray-400 text-xs">Day Streak</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push("/parent/dashboard")}
          className="bg-[#1C1C1E] border border-white/5 py-4 rounded-2xl items-center flex-row justify-center mt-6"
        >
          <Ionicons
            name="settings"
            size={20}
            color="#9CA3AF"
            style={{ marginRight: 8 }}
          />
          <Text className="text-gray-400 font-bold text-lg">
            Parent Dashboard
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
