import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { monsterImages } from "../../constants/images";
import { springs } from "../../constants/springs";
import { useProgressStore } from "../../store/useProgressStore";

export default function HomeScreen() {
  const totalStars = useProgressStore((state) => state.totalStars);

  // XP Bar Animation (1 star = 10 XP. Cap at 100 for the visual bar)
  const xpWidth = useSharedValue(0);
  const currentXp = (totalStars * 10) % 100;

  // Monster Floating Animation
  const monsterY = useSharedValue(0);

  useEffect(() => {
    // Animate XP bar filling up on screen load
    xpWidth.value = withTiming(currentXp, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    // Start infinite floating loop
    monsterY.value = withRepeat(
      withSequence(
        withSpring(-15, springs.gentle),
        withSpring(0, springs.gentle),
      ),
      -1, // Infinite repeats
      true, // Reverse on each iteration
    );
  }, []);

  const xpBarStyle = useAnimatedStyle(() => {
    return {
      width: `${xpWidth.value}%`,
    };
  });

  const monsterStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: monsterY.value }],
    };
  });

  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <View className="flex-1 p-6">
        {/* Header */}
        <View className="mt-4 mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-gray-400 text-sm font-bold">HI THERE!</Text>
            <Text className="text-white text-3xl font-extrabold">
              Let's Play
            </Text>
          </View>
          <View className="bg-[#1C1C1E] px-4 py-2 rounded-full flex-row items-center border border-white/5">
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text className="text-white font-bold ml-1">{totalStars}</Text>
          </View>
        </View>

        {/* XP Bar */}
        <View className="mb-8">
          <View className="flex-row justify-between mb-1">
            <Text className="text-gray-400 text-xs font-bold">
              LEVEL {Math.floor(totalStars / 10) + 1}
            </Text>
            <Text className="text-gray-400 text-xs">{currentXp}/100 XP</Text>
          </View>
          <View className="h-3 bg-[#1C1C1E] rounded-full overflow-hidden border border-white/5">
            <Animated.View
              style={[
                xpBarStyle,
                {
                  height: "100%",
                  backgroundColor: "#6B9BFF",
                  borderRadius: 10,
                },
              ]}
            />
          </View>
        </View>

        {/* Hero Monster Card */}
        <View className="bg-[#6B9BFF] rounded-3xl p-6 items-center mb-6 relative overflow-hidden">
          <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
          <View className="absolute -bottom-12 -left-8 w-28 h-28 bg-black/10 rounded-full" />

          {/* Floating Monster */}
          <Animated.View style={monsterStyle} className="mb-4">
            <Image
              source={monsterImages["m1"]}
              className="w-40 h-40"
              resizeMode="contain"
            />
          </Animated.View>

          <Text className="text-white text-2xl font-bold text-center">
            Help Bloop!
          </Text>
          <Text className="text-white/80 text-center mt-2 mb-6">
            Bloop is feeling worried. Can you help him solve a mystery?
          </Text>

          <Pressable
            onPress={() => router.push("/quest/q1")}
            className="bg-white px-8 py-3 rounded-2xl flex-row items-center"
          >
            <Text className="text-[#6B9BFF] font-bold text-lg mr-2">
              Start Adventure
            </Text>
            <Ionicons name="arrow-forward" size={20} color="#6B9BFF" />
          </Pressable>
        </View>

        {/* Daily Challenge / Streak */}
        <Pressable
          onPress={() => router.push("/(tabs)/quests")}
          className="bg-[#1C1C1E] rounded-3xl p-5 flex-row items-center justify-between border border-white/5 active:opacity-80"
        >
          <View className="flex-row items-center">
            <View className="bg-[#FF9F43]/20 p-3 rounded-2xl mr-4">
              <Text className="text-3xl">🔥</Text>
            </View>
            <View>
              <Text className="text-white font-bold text-lg">Daily Quest</Text>
              <Text className="text-gray-400 text-sm">
                Keep your streak going!
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
