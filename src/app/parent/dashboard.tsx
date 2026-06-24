import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { mockParentStats, mockQuests } from "../../constants/mockData";

export default function DashboardScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <ScrollView contentContainerClassName="p-6 pb-20">
        {/* Header */}
        <View className="flex-row items-center justify-between mb-8 mt-4">
          <View>
            <Text className="text-gray-400 text-sm font-bold">
              PARENT DASHBOARD
            </Text>
            <Text className="text-white text-3xl font-extrabold">Progress</Text>
          </View>
          <Pressable
            onPress={() => router.replace("/(tabs)/home")}
            className="bg-[#1C1C1E] p-3 rounded-full"
          >
            <Ionicons name="lock-closed" size={20} color="#EF4444" />
          </Pressable>
        </View>

        {/* Top Stats Cards */}
        <View className="flex-row gap-4 mb-8">
          <View className="bg-[#1C1C1E] flex-1 p-5 rounded-3xl items-center border border-white/5">
            <Text className="text-3xl mb-1">⭐</Text>
            <Text className="text-white font-bold text-2xl">
              {mockParentStats.totalStars}
            </Text>
            <Text className="text-gray-400 text-xs">Total Stars</Text>
          </View>
          <View className="bg-[#1C1C1E] flex-1 p-5 rounded-3xl items-center border border-white/5">
            <Text className="text-3xl mb-1">🗺️</Text>
            <Text className="text-white font-bold text-2xl">
              {mockParentStats.questsCompleted}
            </Text>
            <Text className="text-gray-400 text-xs">Quests Done</Text>
          </View>
          <View className="bg-[#1C1C1E] flex-1 p-5 rounded-3xl items-center border border-white/5">
            <Text className="text-3xl mb-1">🔥</Text>
            <Text className="text-white font-bold text-2xl">
              {mockParentStats.streak}
            </Text>
            <Text className="text-gray-400 text-xs">Day Streak</Text>
          </View>
        </View>

        {/* Strategies Learned */}
        <Text className="text-white font-bold text-lg mb-3">
          Strategies Learned
        </Text>
        <View className="flex-row flex-wrap mb-8">
          {mockParentStats.strategiesLearned.map((strategy, i) => (
            <View
              key={i}
              className="bg-[#6B9BFF]/20 border border-[#6B9BFF]/30 px-4 py-2 rounded-full mr-2 mb-2"
            >
              <Text className="text-[#6B9BFF] font-bold">{strategy}</Text>
            </View>
          ))}
        </View>

        {/* Recent Activity */}
        <Text className="text-white font-bold text-lg mb-3">
          Recent Activity
        </Text>
        <View className="gap-3">
          {mockParentStats.recentQuests.map((activity, i) => {
            const quest = mockQuests.find((q) => q.id === activity.id);
            return (
              <View
                key={i}
                className="bg-[#1C1C1E] p-4 rounded-2xl flex-row items-center justify-between border border-white/5"
              >
                <View>
                  <Text className="text-white font-bold">{activity.title}</Text>
                  <Text className="text-gray-400 text-xs">{activity.date}</Text>
                </View>
                <View className="flex-row">
                  {[1, 2, 3].map((star) => (
                    <Ionicons
                      key={star}
                      name={activity.stars >= star ? "star" : "star-outline"}
                      size={16}
                      color={activity.stars >= star ? "#FFD700" : "#374151"}
                      style={{ marginLeft: 2 }}
                    />
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
