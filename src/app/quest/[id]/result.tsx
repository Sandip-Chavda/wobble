import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import AnimatedStar from "../../../components/ui/AnimatedStar";
import Confetti from "../../../components/ui/Confetti"; // Add import
import { Colors } from "../../../constants/colors";
import { monsterImages, sceneImages } from "../../../constants/images";
import { mockMonsters, mockQuests } from "../../../constants/mockData";
import { useProgressStore } from "../../../store/useProgressStore";
import { useQuestStore } from "../../../store/useQuestStore";

export default function ResultScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const quest = mockQuests.find((q) => q.id === id);
  const monster = mockMonsters.find((m) => m.id === quest?.monsterId);

  const { starsEarned, resetQuest } = useQuestStore();
  const { addCompletion } = useProgressStore();
  const [showStars, setShowStars] = useState(false);

  // Shockwave Animation
  const shockwaveScale = useSharedValue(0);
  const shockwaveOpacity = useSharedValue(0.8);

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Trigger Shockwave
    shockwaveScale.value = withSpring(20, { damping: 20, stiffness: 120 });
    shockwaveOpacity.value = withDelay(400, withSpring(0, { duration: 500 }));

    const timer = setTimeout(() => {
      setShowStars(true);
      if (quest) addCompletion(quest.id, starsEarned);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const shockwaveStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: shockwaveScale.value }],
      opacity: shockwaveOpacity.value,
    };
  });

  if (!quest || !monster)
    return <SafeAreaView className="flex-1 bg-[#0D1117]" />;

  const accentColor = Colors[quest.category] || "#6B9BFF";
  const monsterImg = monsterImages[monster.id];
  const sceneImg = sceneImages[quest.id];

  return (
    <View className="flex-1 bg-[#0D1117]">
      {/* Background */}
      <Image
        source={sceneImg}
        className="absolute inset-0 w-full h-full opacity-20"
        resizeMode="cover"
      />
      <View className="absolute inset-0 bg-black/80" />

      {/* Shockwave */}
      <View
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          marginLeft: -50,
          marginTop: -50,
          zIndex: 10,
        }}
      >
        <Animated.View
          style={[
            shockwaveStyle,
            {
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: "white",
            },
          ]}
        />
      </View>

      {/* Confetti */}
      <Confetti />

      <SafeAreaView className="flex-1 z-20">
        <ScrollView
          contentContainerClassName="items-center justify-center p-6 flex-1"
          showsVerticalScrollIndicator={false}
        >
          {/* Monster at the top */}
          <Image
            source={monsterImg}
            className="w-32 h-32 mb-6 mt-10"
            resizeMode="contain"
          />

          {/* Title */}
          <Text className="text-white text-3xl font-extrabold mb-1">
            Quest Complete!
          </Text>
          <Text className="text-gray-300 text-base mb-8">
            You helped {monster.name}!
          </Text>

          {/* Stars */}
          <View className="flex-row justify-center mb-10 py-4">
            <AnimatedStar active={showStars && starsEarned >= 1} delay={0} />
            <AnimatedStar active={showStars && starsEarned >= 2} delay={300} />
            <AnimatedStar active={showStars && starsEarned >= 3} delay={600} />
          </View>

          {/* Strategy Badge */}
          <View
            style={{
              backgroundColor: accentColor + "20",
              borderColor: accentColor,
              borderWidth: 2,
            }}
            className="p-4 rounded-3xl w-full mb-8 items-center"
          >
            <Text
              style={{ color: accentColor }}
              className="text-xs font-bold uppercase tracking-wider mb-1"
            >
              Strategy Learned
            </Text>
            <Text className="text-white text-lg font-extrabold">
              {quest.strategy}
            </Text>
            <Text className="text-gray-300 text-center mt-1 text-sm">
              {quest.strategyDescription}
            </Text>
          </View>

          {/* Buttons */}
          <View className="w-full gap-4 pb-10">
            <Pressable
              onPress={() => {
                resetQuest();
                router.replace(`/quest/${quest.id}/play`);
              }}
              className="bg-[#1C1C1E] border border-white/10 py-4 rounded-2xl items-center flex-row justify-center"
            >
              <Ionicons
                name="refresh"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-bold text-lg">Play Again</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                resetQuest();
                router.replace("/(tabs)/quests");
              }}
              style={{ backgroundColor: accentColor }}
              className="py-4 rounded-2xl items-center flex-row justify-center"
            >
              <Ionicons
                name="map"
                size={20}
                color="white"
                style={{ marginRight: 8 }}
              />
              <Text className="text-white font-bold text-lg">More Quests</Text>
            </Pressable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
