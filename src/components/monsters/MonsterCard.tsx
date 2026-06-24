import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { monsterImages } from "../../constants/images";
import { springs } from "../../constants/springs";
import { Monster } from "../../types";

export default function MonsterCard({
  monster,
  onPress,
}: {
  monster: Monster;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const monsterImg = monsterImages[monster.id];

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
      className="w-1/2 p-2"
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            backgroundColor: monster.isUnlocked
              ? monster.color + "20"
              : "#1C1C1E",
            borderColor: monster.isUnlocked ? monster.color : "#374151",
            borderWidth: 2,
            opacity: monster.isUnlocked ? 1 : 0.7,
          },
        ]}
        className="rounded-3xl p-4 items-center min-h-[200px] justify-center relative overflow-hidden"
      >
        {/* Monster Image / Locked State */}
        {monster.isUnlocked ? (
          <Image
            source={monsterImg}
            className="w-28 h-28 mb-3"
            resizeMode="contain"
          />
        ) : (
          <View className="w-28 h-28 mb-3 items-center justify-center">
            <Ionicons name="lock-closed" size={48} color="#4B5563" />
          </View>
        )}

        <Text
          style={{ color: monster.isUnlocked ? "white" : "#6B7280" }}
          className="text-lg font-extrabold mb-1"
        >
          {monster.name}
        </Text>

        {monster.isUnlocked ? (
          <Text className="text-gray-300 text-xs text-center">
            {monster.personality}
          </Text>
        ) : (
          <Text className="text-gray-500 text-xs text-center">
            Play more to unlock!
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
