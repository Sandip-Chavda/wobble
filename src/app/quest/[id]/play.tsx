import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";
import ChoiceCard from "../../../components/quests/ChoiceCard";
import TypewriterText from "../../../components/ui/TypewriterText";
import { monsterImages, sceneImages } from "../../../constants/images";
import { mockQuests, mockStoryTree } from "../../../constants/mockData";
import { useQuestStore } from "../../../store/useQuestStore";

export default function PlayQuest() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const quest = mockQuests.find((q) => q.id === id);
  const { currentNodeId, startQuest, advanceNode, makeChoice, resetQuest } =
    useQuestStore();

  useEffect(() => {
    if (quest) startQuest(quest, quest.startNodeId);
    return () => resetQuest();
  }, []);

  if (!quest || !currentNodeId) {
    return (
      <SafeAreaView className="flex-1 bg-[#0D1117] justify-center items-center" />
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
      {/* Full Screen Background Scene */}
      <Image
        source={sceneImg}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />
      {/* Stronger overlay for readability */}
      <View className="absolute inset-0 bg-black/60" />

      <SafeAreaView className="flex-1 justify-end">
        {/* Top Bar (Close Button) */}
        <View className="flex-row items-center justify-between px-6 py-4 absolute top-0 left-0 right-0 z-20">
          <Pressable
            onPress={() => router.back()}
            className="bg-black/50 p-2 rounded-full"
          >
            <Ionicons name="close" size={28} color="white" />
          </Pressable>
        </View>

        {/* Monster & Speech Bubble Container */}
        <View className="items-center mb-10 z-10">
          {/* Speech Bubble */}
          {currentNode.monsterDialogue && (
            <View className="bg-white px-5 py-3 rounded-3xl mb-[-10px] max-w-[80%] relative">
              <View className="absolute bottom-[-12px] w-6 h-6 bg-white rotate-45" />
              <Text className="text-black text-lg font-bold text-center">
                {currentNode.monsterDialogue}
              </Text>
            </View>
          )}

          {/* Monster */}
          <Image
            source={monsterImg}
            style={{ width: 200, height: 200 }}
            resizeMode="contain"
          />
        </View>

        {/* Bottom UI Area (Solid Dark for perfect readability) */}
        <View className="bg-[#0D1117]/95 border-t border-white/10 rounded-t-3xl p-6 min-h-[40%]">
          {/* Narration Text */}
          <View className="mb-6">
            <TypewriterText text={currentNode.text} />
          </View>

          {/* Interactive Elements */}
          {currentNode.type === "choice" && currentNode.choices ? (
            <Animated.View
              entering={SlideInDown.springify().delay(300)}
              className="mt-auto"
            >
              {currentNode.choices.map((choice) => (
                <ChoiceCard
                  key={choice.id}
                  choice={choice}
                  onPress={() =>
                    handleChoice(choice.id, choice.quality, choice.nextNodeId)
                  }
                />
              ))}
            </Animated.View>
          ) : (
            <Pressable
              onPress={handleAdvance}
              className="bg-[#6B9BFF] py-4 rounded-2xl items-center flex-row justify-center mt-auto"
            >
              <Text className="text-white font-bold text-lg mr-2">
                {currentNode.type === "ending" ? "See Results 🌟" : "Continue"}
              </Text>
              <Ionicons name="arrow-forward" size={20} color="white" />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}
