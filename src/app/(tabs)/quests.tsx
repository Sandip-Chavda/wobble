import { router } from "expo-router";
import { FlatList, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import QuestCard from "../../components/quests/QuestCard";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { mockQuests } from "../../constants/mockData";

export default function QuestsScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <FlatList
        data={mockQuests}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="px-4 pt-4 pb-28"
        columnWrapperStyle={{
          justifyContent: "space-between",
          marginBottom: 16,
        }}
        ListHeaderComponent={
          <Text className="text-white text-3xl font-bold mb-6">Quests</Text>
        }
        renderItem={({ item, index }) => {
          const delay = index * 50;
          return (
            <Animated.View
              entering={FadeInDown.delay(delay).springify()}
              className="w-[48%]" // 48% width + space-between creates a perfect 2-column grid
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
