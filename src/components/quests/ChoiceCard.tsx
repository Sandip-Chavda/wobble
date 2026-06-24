import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { springs } from "../../constants/springs";
import { useHaptics } from "../../hooks/useHaptics";
import { Choice } from "../../types";

export default function ChoiceCard({
  choice,
  onPress,
}: {
  choice: Choice;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);
  const haptics = useHaptics(); // Initialize hook

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.97, springs.snappy);
    haptics.buttonPress(); // Add haptic
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, springs.snappy);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      className="w-full mb-3"
      accessibilityRole="button" // A11Y: Mark as button
      accessibilityLabel={choice.label} // A11Y: Read the choice text
    >
      <Animated.View
        style={[animatedStyle]}
        className="bg-[#1C1C1E]/95 border border-white/20 rounded-2xl p-4 flex-row items-center justify-between"
      >
        <Text className="text-white font-bold text-base flex-1 mr-3">
          {choice.label}
        </Text>
        <View className="bg-[#6B9BFF] rounded-full p-2">
          <Ionicons name="chevron-forward" size={18} color="white" />
        </View>
      </Animated.View>
    </Pressable>
  );
}
