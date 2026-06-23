import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import AnimatedButton from "../../components/ui/AnimatedButton";
import { SafeAreaView } from "../../components/ui/SafeAreaView";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <ScrollView
        contentContainerClassName="p-4 pb-28"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mt-4 mb-8">
          <Text className="text-gray-400 text-sm font-bold">HI THERE!</Text>
          <Text className="text-white text-3xl font-extrabold">
            Let's Play & Learn
          </Text>
        </View>

        {/* Hero Monster Card */}
        <Animated.View
          entering={FadeInDown.delay(100).springify()}
          className="bg-[#6B9BFF] rounded-3xl p-6 items-center mb-8 relative overflow-hidden"
        >
          {/* Decorative circles */}
          <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
          <View className="absolute -bottom-12 -left-8 w-28 h-28 bg-black/10 rounded-full" />

          <Text className="text-6xl mb-4">👾</Text>
          <Text className="text-white text-2xl font-bold text-center">
            Help your Monster Friend
          </Text>
          <Text className="text-white/80 text-center mt-2 mb-6">
            Bloop is feeling worried. Can you help him solve a mystery?
          </Text>

          <AnimatedButton
            label="Start Adventure"
            onPress={() => router.push("/quest/q1")}
            variant="secondary"
          />
        </Animated.View>

        {/* Daily Challenge / Progress */}
        <Animated.View
          entering={FadeInDown.delay(300).springify()}
          className="bg-[#1C1C1E] rounded-3xl p-5 flex-row items-center justify-between border border-white/5"
        >
          <View>
            <Text className="text-white font-bold text-lg">Daily Streak</Text>
            <Text className="text-gray-400 text-sm">Keep it up! 🔥</Text>
          </View>
          <Text className="text-4xl">🔥</Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
