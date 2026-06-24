import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { mockQuests } from "../../constants/mockData";
import { useProgressStore } from "../../store/useProgressStore";

export default function DashboardScreen() {
  // Get real data from SQLite via Zustand
  const completedQuests = useProgressStore((state) => state.completedQuests);
  const totalStars = useProgressStore((state) => state.totalStars);

  // Calculate real stats
  const completedQuestIds = Object.keys(completedQuests);
  const questsCompletedCount = completedQuestIds.length;

  // Extract unique strategies from completed quests
  const strategiesLearned = completedQuestIds
    .map((id) => mockQuests.find((q) => q.id === id)?.strategy)
    .filter(
      (value, index, self) => value && self.indexOf(value) === index,
    ) as string[];

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
            <Text className="text-white font-bold text-2xl">{totalStars}</Text>
            <Text className="text-gray-400 text-xs">Total Stars</Text>
          </View>
          <View className="bg-[#1C1C1E] flex-1 p-5 rounded-3xl items-center border border-white/5">
            <Text className="text-3xl mb-1">🗺️</Text>
            <Text className="text-white font-bold text-2xl">
              {questsCompletedCount}
            </Text>
            <Text className="text-gray-400 text-xs">Quests Done</Text>
          </View>
          <View className="bg-[#1C1C1E] flex-1 p-5 rounded-3xl items-center border border-white/5">
            <Text className="text-3xl mb-1">🧠</Text>
            <Text className="text-white font-bold text-2xl">
              {strategiesLearned.length}
            </Text>
            <Text className="text-gray-400 text-xs">Strategies</Text>
          </View>
        </View>

        {/* Strategies Learned */}
        <Text className="text-white font-bold text-lg mb-3">
          Strategies Practiced
        </Text>
        {strategiesLearned.length > 0 ? (
          <View className="flex-row flex-wrap mb-8">
            {strategiesLearned.map((strategy, i) => (
              <View
                key={i}
                className="bg-[#6B9BFF]/20 border border-[#6B9BFF]/30 px-4 py-2 rounded-full mr-2 mb-2"
              >
                <Text className="text-[#6B9BFF] font-bold">{strategy}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text className="text-gray-500 mb-8">
            No strategies practiced yet.
          </Text>
        )}

        {/* Recent Activity */}
        <Text className="text-white font-bold text-lg mb-3">Quest History</Text>
        <View className="gap-3">
          {completedQuestIds.length > 0 ? (
            completedQuestIds.map((questId) => {
              const quest = mockQuests.find((q) => q.id === questId);
              if (!quest) return null;
              const stars = completedQuests[questId];

              return (
                <View
                  key={questId}
                  className="bg-[#1C1C1E] p-4 rounded-2xl flex-row items-center justify-between border border-white/5"
                >
                  <View className="flex-1 mr-4">
                    <Text className="text-white font-bold">{quest.title}</Text>
                    <Text className="text-[#6B9BFF] text-xs mt-1">
                      {quest.strategy}
                    </Text>
                  </View>
                  <View className="flex-row">
                    {[1, 2, 3].map((star) => (
                      <Ionicons
                        key={star}
                        name={stars >= star ? "star" : "star-outline"}
                        size={16}
                        color={stars >= star ? "#FFD700" : "#374151"}
                        style={{ marginLeft: 2 }}
                      />
                    ))}
                  </View>
                </View>
              );
            })
          ) : (
            <Text className="text-gray-500">No quests completed yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
