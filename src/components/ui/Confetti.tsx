import { useEffect } from "react";
import { Dimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
const colors = [
  "#FFD700",
  "#6B9BFF",
  "#FF6B9D",
  "#7BC67E",
  "#FF9F43",
  "#A855F7",
];

export default function Confetti() {
  const pieces = Array.from({ length: 30 });

  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        pointerEvents: "none",
      }}
      className="overflow-hidden"
    >
      {pieces.map((_, i) => {
        const startX = Math.random() * width;
        const delay = Math.random() * 500;
        const duration = 1500 + Math.random() * 1000;
        const color = colors[i % colors.length];
        const size = 8 + Math.random() * 8;

        const translateY = useSharedValue(-50);
        const rotate = useSharedValue(0);
        const opacity = useSharedValue(1);

        useEffect(() => {
          translateY.value = withDelay(
            delay,
            withTiming(height + 50, { duration }),
          );
          rotate.value = withDelay(
            delay,
            withRepeat(withTiming(360, { duration: 1000 }), -1, false),
          );
          opacity.value = withDelay(
            delay + duration - 500,
            withTiming(0, { duration: 500 }),
          );
        }, []);

        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [
              { translateX: startX }, // Static start X
              { translateY: translateY.value },
              { rotate: `${rotate.value}deg` },
            ],
            opacity: opacity.value,
          };
        });

        return (
          <Animated.View
            key={i}
            style={[
              animatedStyle,
              {
                position: "absolute",
                width: size,
                height: size * 0.4,
                backgroundColor: color,
                borderRadius: 2,
              },
            ]}
          />
        );
      })}
    </View>
  );
}
