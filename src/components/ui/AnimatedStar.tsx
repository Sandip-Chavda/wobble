import { useHaptics } from "@/hooks/useHaptics";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

export default function AnimatedStar({
  active,
  delay,
}: {
  active: boolean;
  delay: number;
}) {
  const haptics = useHaptics();

  useEffect(() => {
    if (active) {
      haptics.starEarned();
    }
  }, [active]);

  // If not active yet, just render the empty outline star
  if (!active) {
    return (
      <View
        style={{
          width: 72,
          height: 72,
          marginHorizontal: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="star-outline" size={64} color="#374151" />
      </View>
    );
  }

  // If active, mount the gold star with a spring zoom-in animation
  return (
    <Animated.View
      entering={ZoomIn.delay(delay).springify()}
      style={{
        width: 72,
        height: 72,
        marginHorizontal: 4,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Ionicons name="star" size={64} color="#FFD700" />
    </Animated.View>
  );
}
