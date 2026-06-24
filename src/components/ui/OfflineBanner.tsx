import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { springs } from "../../constants/springs";

export default function OfflineBanner({ isOnline }: { isOnline: boolean }) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(-100);

  React.useEffect(() => {
    if (isOnline) {
      translateY.value = withSpring(-100, springs.snappy);
    } else {
      translateY.value = withSpring(0, springs.snappy);
    }
  }, [isOnline]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          paddingTop: insets.top + 10,
          paddingBottom: 10,
          zIndex: 100,
        },
      ]}
      className="bg-[#FF9F43] flex-row items-center justify-center"
    >
      <Ionicons
        name="cloud-offline"
        size={20}
        color="white"
        style={{ marginRight: 8 }}
      />
      <Text className="text-white font-bold">
        You are offline. Progress will sync later.
      </Text>
    </Animated.View>
  );
}
