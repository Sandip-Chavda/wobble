import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
} from "react-native-reanimated";
import { springs } from "../../constants/springs";

export default function AnimatedStar({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) {
  const translateY = useSharedValue(-200);
  const scale = useSharedValue(1);

  useEffect(() => {
    if (active) {
      translateY.value = withDelay(
        delay,
        withSequence(
          withSpring(0, { damping: 12, stiffness: 150 }), // Drop down fast
          withSpring(1, springs.bouncy), // Bounce up slightly
        ),
      );
    } else {
      translateY.value = -200;
    }
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }, { scale: scale.value }],
    };
  });

  return (
    <Animated.View style={[animatedStyle]} className="mx-2">
      <Ionicons
        name={active ? "star" : "star-outline"}
        size={64}
        color={active ? "#FFD700" : "#ffffff"}
      />
    </Animated.View>
  );
}
