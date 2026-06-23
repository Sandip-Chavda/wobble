import { ActivityIndicator, Pressable, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { springs } from "../../constants/springs";

interface AnimatedButtonProps {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  loading?: boolean;
  disabled?: boolean;
}

export default function AnimatedButton({
  label,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, springs.snappy);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, springs.snappy);
  };

  const bgColor = variant === "primary" ? "#6B9BFF" : "#1C1C1E";
  const textColor = variant === "primary" ? "#FFFFFF" : "#9CA3AF";

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
    >
      <Animated.View
        style={[
          { backgroundColor: bgColor, opacity: disabled ? 0.5 : 1 },
          animatedStyle,
        ]}
        className="px-6 py-4 rounded-2xl items-center justify-center min-w-[150px]"
      >
        {loading ? (
          <ActivityIndicator color={textColor} />
        ) : (
          <Text style={{ color: textColor }} className="text-base font-bold">
            {label}
          </Text>
        )}
      </Animated.View>
    </Pressable>
  );
}
