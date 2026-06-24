import { router } from "expo-router";
import { Image, Text, View } from "react-native";
import AnimatedButton from "../../components/ui/AnimatedButton";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { monsterImages } from "../../constants/images";

export default function OnboardingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <View className="flex-1 items-center justify-center p-6">
        {/* Hero Monster */}
        <Image
          source={monsterImages["m1"]}
          className="w-60 h-60 mb-8"
          resizeMode="contain"
        />

        {/* Title & Description */}
        <Text className="text-white text-4xl font-extrabold text-center mb-4">
          Help your Monster Friend
        </Text>
        <Text className="text-gray-400 text-lg text-center mb-12 px-4">
          Join Bloop and friends on exciting quests. Help them solve problems,
          learn big feelings, and earn stars!
        </Text>

        {/* Buttons */}
        <View className="w-full gap-4">
          <AnimatedButton
            label="Get Started 🚀"
            onPress={() => router.push("/(auth)/sign-in")}
            variant="primary"
          />
          <AnimatedButton
            label="I already have an account"
            onPress={() => router.push("/(auth)/sign-in")}
            variant="secondary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
