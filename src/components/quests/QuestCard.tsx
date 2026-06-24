import { Colors } from "@/constants/colors";
import { monsterImages, sceneImages } from "@/constants/images";
import { springs } from "@/constants/springs";
import { useProgressStore } from "@/store/useProgressStore";
import { Quest } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const categoryColors: Record<string, string> = {
  mystery: Colors.mystery,
  fear: Colors.fear,
  bullying: Colors.bullying,
  loneliness: Colors.loneliness,
  anger: Colors.anger,
  anxiety: Colors.anxiety,
};

export default function QuestCard({
  quest,
  onPress,
}: {
  quest: Quest;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const accentColor = categoryColors[quest.category] || "#FFFFFF";
  const monsterImg = monsterImages[quest.monsterId];
  const sceneImg = sceneImages[quest.id];

  const bestStars = useProgressStore(
    (state) => state.completedQuests[quest.id] || 0,
  );

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, springs.snappy);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, springs.snappy);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={{ width: "100%" }}
    >
      <Animated.View
        style={[animatedStyle, { backgroundColor: accentColor }]}
        className="rounded-3xl overflow-hidden h-44 shadow-lg shadow-black/40"
      >
        {/* Top Visual Area (Scene + Monster) */}
        <View className="flex-1 relative">
          {/* Background Scene */}
          {sceneImg && (
            <Image
              source={sceneImg}
              className="absolute inset-0 w-full h-full"
              resizeMode="cover"
            />
          )}
          {/* Overlay to tint the scene with the category color slightly */}
          <View
            className="absolute inset-0"
            style={{ backgroundColor: accentColor, opacity: 0.2 }}
          />

          {/* Monster Image */}
          {monsterImg && (
            <Image
              source={monsterImg}
              className="absolute bottom-0 right-0 w-24 h-24"
              resizeMode="contain"
            />
          )}
        </View>

        {/* Bottom Text Area */}
        <View className="bg-[#1C1C1E] p-3 h-20 justify-center">
          <Text className="text-white font-bold text-base" numberOfLines={2}>
            {quest.title || "Untitled Quest"}
          </Text>
          <View className="flex-row items-center justify-between mt-2">
            <Text style={{ color: accentColor }} className="text-xs font-bold">
              {quest.strategy}
            </Text>
            {quest.isLocked ? (
              <Text className="text-gray-600 text-lg">🔒</Text>
            ) : bestStars > 0 ? (
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text className="text-yellow-400 font-bold ml-1">
                  {bestStars}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
}
