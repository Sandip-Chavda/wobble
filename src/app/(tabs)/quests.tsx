import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import QuestCard from "../../components/quests/QuestCard";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { questService } from "../../services/questService";

export default function QuestsScreen() {
  // Fetch quests using TanStack Query
  const { data: quests, isLoading } = useQuery({
    queryKey: ["quests"],
    queryFn: questService.getQuests,
  });

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-[#0D1117] justify-center items-center">
        <ActivityIndicator size="large" color="#6B9BFF" />
        <Text className="text-gray-400 mt-4">Loading quests...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <FlatList
        data={quests}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="px-4 pt-4 pb-28"
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-white text-3xl font-bold">Quests</Text>
          </View>
        }
        renderItem={({ item, index }) => {
          const delay = index * 50;
          return (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(delay).springify()}
              className="w-[48%]"
            >
              <QuestCard
                quest={item}
                onPress={() => router.push(`/quest/${item.id}`)}
              />
            </Animated.View>
          );
        }}
      />
    </SafeAreaView>
  );
}
