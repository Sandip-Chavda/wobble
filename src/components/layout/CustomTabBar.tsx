import React from "react";
import { Pressable, Text, useWindowDimensions, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { springs } from "../../constants/springs";

const tabs = [
  { name: "home", label: "Home", icon: "🏠" },
  { name: "quests", label: "Quests", icon: "🗺️" },
  { name: "collection", label: "Friends", icon: "👾" },
  { name: "profile", label: "Profile", icon: "👤" },
];

export default function CustomTabBar({ state, descriptors, navigation }: any) {
  const { width } = useWindowDimensions();

  // mx-4 on the container means 16px padding on left and right (32px total)
  const tabWidth = (width - 32) / 4;

  const translateX = useSharedValue(0);

  React.useEffect(() => {
    translateX.value = withSpring(state.index * tabWidth, springs.natural);
  }, [state.index, tabWidth]);

  const blobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View className="absolute bottom-0 left-0 right-0 pb-6 pt-2 bg-[#0D1117]/80 backdrop-blur-lg border-t border-white/5">
      <View className="flex-row mx-4 h-16 rounded-3xl bg-[#1C1C1E] relative overflow-hidden">
        {/* Animated Blob */}
        <Animated.View
          style={[
            blobStyle,
            {
              width: tabWidth,
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "rgba(107, 155, 255, 0.2)", // 6B9BFF at 20% opacity
              borderRadius: 16,
            },
          ]}
        />

        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              className="flex-1 items-center justify-center z-10"
            >
              <Text
                className={`text-2xl mb-1 ${isFocused ? "opacity-100" : "opacity-40"}`}
              >
                {tabs[index].icon}
              </Text>
              <Text
                className={`text-[10px] font-bold ${isFocused ? "text-[#6B9BFF]" : "text-gray-500"}`}
              >
                {tabs[index].label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
