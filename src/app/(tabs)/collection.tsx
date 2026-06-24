import { router } from "expo-router";
import { FlatList, Text, View } from "react-native";
import MonsterCard from "../../components/monsters/MonsterCard";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { mockMonsters } from "../../constants/mockData";

export default function CollectionScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <FlatList
        data={mockMonsters}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerClassName="px-4 pt-4 pb-28"
        columnWrapperStyle={{ justifyContent: "space-between" }}
        ListHeaderComponent={
          <View className="mb-6">
            <Text className="text-gray-400 text-sm font-bold">
              YOUR FRIENDS
            </Text>
            <Text className="text-white text-3xl font-extrabold">
              Monster Collection
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <MonsterCard
            monster={item}
            onPress={() => {
              if (item.isUnlocked && item.questIds.length > 0) {
                router.push(`/quest/${item.questIds[0]}`);
              }
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}
