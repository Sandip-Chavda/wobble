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

interface ChoiceCardProps {
  choice: Choice;
  onPress: () => void;
  isDisabled?: boolean;
}

export default function ChoiceCard({
  choice,
  onPress,
  isDisabled = false,
}: ChoiceCardProps) {
  const scale = useSharedValue(1);
  const haptics = useHaptics();

  const animatedStyle = useAnimatedStyle(() => {
    return { transform: [{ scale: scale.value }] };
  });

  const handlePressIn = () => {
    if (isDisabled) return;
    scale.value = withSpring(0.97, springs.snappy);
    haptics.buttonPress();
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, springs.snappy);
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={isDisabled}
      className="w-full mb-3"
      accessibilityRole="button"
      accessibilityLabel={
        isDisabled ? `Choice disabled: ${choice.label}` : choice.label
      }
    >
      <Animated.View
        style={[
          animatedStyle,
          {
            backgroundColor: isDisabled ? "#151515" : "#1C1C1E",
            borderColor: isDisabled ? "#2A2A2E" : "rgba(255,255,255,0.2)",
            opacity: isDisabled ? 0.5 : 1,
          },
        ]}
        className="border rounded-2xl p-4 flex-row items-center justify-between"
      >
        <Text
          className="font-bold text-base flex-1 mr-3"
          style={{
            color: isDisabled ? "#6B7280" : "white",
            textDecorationLine: isDisabled ? "line-through" : "none",
          }}
        >
          {choice.label}
        </Text>
        <View
          style={{ backgroundColor: isDisabled ? "#374151" : "#6B9BFF" }}
          className="rounded-full p-2"
        >
          <Ionicons
            name={isDisabled ? "close" : "chevron-forward"}
            size={18}
            color={isDisabled ? "#9CA3AF" : "white"}
          />
        </View>
      </Animated.View>
    </Pressable>
  );
}
