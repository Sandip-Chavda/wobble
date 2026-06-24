import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { usePreventScreenCapture } from "expo-screen-capture";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { springs } from "../../constants/springs";

const CORRECT_PIN = "1234";

export default function ParentLayout() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const scale = useSharedValue(1);

  usePreventScreenCapture();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = (num: string) => {
    setError(false);
    scale.value = withSpring(0.9, springs.snappy);
    setTimeout(() => (scale.value = withSpring(1, springs.snappy)), 100);

    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) {
        if (newPin === CORRECT_PIN) {
          setIsUnlocked(true);
        } else {
          setError(true);
          setTimeout(() => setPin(""), 500);
        }
      }
    }
  };

  const handleDelete = () => {
    setPin(pin.slice(0, -1));
  };

  if (isUnlocked) {
    return <Stack screenOptions={{ headerShown: false }} />;
  }

  return (
    <SafeAreaView className="flex-1 bg-[#0D1117] items-center justify-center p-6">
      <Pressable
        onPress={() => history.back()}
        className="absolute top-12 left-6"
      >
        <Ionicons name="chevron-back" size={32} color="white" />
      </Pressable>

      <Ionicons name="lock-closed" size={48} color="#6B9BFF" className="mb-4" />
      <Text className="text-white text-2xl font-bold mb-2">
        Parent Dashboard
      </Text>
      <Text className="text-gray-400 mb-8">Enter PIN to access</Text>

      {/* PIN Dots */}
      <View className="flex-row mb-10">
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={{
              backgroundColor: error
                ? "#EF4444"
                : pin.length > i
                  ? "#6B9BFF"
                  : "#374151",
            }}
            className="w-4 h-4 rounded-full mx-3"
          />
        ))}
      </View>

      {/* Keypad */}
      <View className="flex-row flex-wrap justify-center w-full max-w-[300px]">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
          <Pressable
            key={num}
            onPress={() => handlePress(num)}
            className="w-[33%] items-center p-3"
          >
            <Animated.View
              style={[animatedStyle]}
              className="w-16 h-16 rounded-full bg-[#1C1C1E] items-center justify-center"
            >
              <Text className="text-white text-2xl font-bold">{num}</Text>
            </Animated.View>
          </Pressable>
        ))}
        <View className="w-[33%] p-3" />
        <Pressable
          onPress={() => handlePress("0")}
          className="w-[33%] items-center p-3"
        >
          <Animated.View
            style={[animatedStyle]}
            className="w-16 h-16 rounded-full bg-[#1C1C1E] items-center justify-center"
          >
            <Text className="text-white text-2xl font-bold">0</Text>
          </Animated.View>
        </Pressable>
        <Pressable
          onPress={handleDelete}
          className="w-[33%] items-center justify-center p-3"
        >
          <Ionicons name="backspace-outline" size={28} color="#9CA3AF" />
        </Pressable>
      </View>

      <Text className="text-gray-600 text-xs mt-8">(Hint: PIN is 1234)</Text>
    </SafeAreaView>
  );
}
