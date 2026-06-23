import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import ChoiceCard from "../../../components/quests/ChoiceCard";
import { monsterImages, sceneImages } from "../../../constants/images";
import { mockQuests, mockStoryTree } from "../../../constants/mockData";
import { useQuestStore } from "../../../store/useQuestStore";

export default function PlayQuest() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const quest = mockQuests.find((q) => q.id === id);

  const { currentNodeId, startQuest, advanceNode, makeChoice, resetQuest } =
    useQuestStore();

  // Initialize the quest when the screen loads
  useEffect(() => {
    if (quest) {
      startQuest(quest, quest.startNodeId);
    }
    return () => resetQuest(); // Clean up when leaving
  }, []);

  if (!quest || !currentNodeId) {
    return (
      <SafeAreaView className="flex-1 bg-[#0D1117] justify-center items-center">
        <Text className="text-white">Loading story...</Text>
      </SafeAreaView>
    );
  }

  const currentNode = mockStoryTree[currentNodeId];
  const monsterImg = monsterImages[quest.monsterId];
  const sceneImg = sceneImages[quest.id];

  const handleChoice = (choiceId: string, quality: any, nextNodeId: string) => {
    makeChoice(choiceId, quality, nextNodeId);
  };

  const handleAdvance = () => {
    if (currentNode.type === "ending") {
      router.replace(`/quest/${quest.id}/result`);
    } else if (currentNode.nextNodeId) {
      advanceNode(currentNode.nextNodeId);
    }
  };

  return (
    <View className="flex-1 bg-[#0D1117]">
      <Image
        source={sceneImg}
        className="absolute inset-0 w-full h-full opacity-20"
        resizeMode="cover"
      />

      <SafeAreaView className="flex-1 justify-end">
        {/* Top Bar */}
        <View className="flex-row items-center justify-between px-6 py-4 absolute top-0 left-0 right-0">
          <Pressable
            onPress={() => router.back()}
            className="bg-black/40 p-2 rounded-full"
          >
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
          <View className="bg-black/40 px-4 py-2 rounded-full">
            <Text className="text-white font-bold">{quest.title}</Text>
          </View>
        </View>

        {/* Monster Area */}
        <View className="items-center mb-4">
          <Image
            source={monsterImg}
            className="w-48 h-48"
            resizeMode="contain"
          />
        </View>

        {/* Dialogue Box */}
        <View className="bg-[#1C1C1E]/95 border-t border-white/10 rounded-t-3xl p-6 min-h-[40%]">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-4"
          >
            {/* Narration Text */}
            <Text className="text-gray-300 text-base mb-4">
              {currentNode.text}
            </Text>

            {/* Monster Speech Bubble */}
            {currentNode.monsterDialogue && (
              <View className="bg-[#6B9BFF]/20 border border-[#6B9BFF]/30 rounded-2xl p-4 mb-4">
                <Text className="text-white font-bold text-lg">
                  {currentNode.monsterDialogue}
                </Text>
              </View>
            )}

            {/* Choices or Next Button */}
            {currentNode.type === "choice" && currentNode.choices ? (
              <View className="mt-2">
                {currentNode.choices.map((choice) => (
                  <ChoiceCard
                    key={choice.id}
                    choice={choice}
                    onPress={() =>
                      handleChoice(choice.id, choice.quality, choice.nextNodeId)
                    }
                  />
                ))}
              </View>
            ) : (
              <Pressable
                onPress={handleAdvance}
                className="bg-[#6B9BFF] py-4 rounded-2xl items-center mt-4 flex-row justify-center"
              >
                <Text className="text-white font-bold text-lg mr-2">
                  {currentNode.type === "ending" ? "See Results" : "Continue"}
                </Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </Pressable>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}
