import { questService } from "@/services/questService";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  StatusBar,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AnimatedButton from "../../components/ui/AnimatedButton";
import { Colors } from "../../constants/colors";
import { monsterImages, sceneImages } from "../../constants/images";
import { mockMonsters } from "../../constants/mockData";
import { springs } from "../../constants/springs";

const { width } = Dimensions.get("window");

export default function QuestDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  // Fetch quest detail using TanStack Query
  const { data, isLoading } = useQuery({
    queryKey: ["quest", id],
    queryFn: () => questService.getQuestById(id!),
    enabled: !!id, // Only run if id exists
  });

  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const handlePressIn = () => {
    scale.value = withSpring(0.9, springs.snappy);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1, springs.snappy);
  };

  if (isLoading || !data) {
    return (
      <View className="flex-1 bg-[#0D1117] justify-center items-center">
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <ActivityIndicator size="large" color="#6B9BFF" />
      </View>
    );
  }

  const { quest } = data;
  const monster = mockMonsters.find((m) => m.id === quest.monsterId);

  if (!monster) return null;

  const accentColor = Colors[quest.category] || "#6B9BFF";
  const monsterImg = monsterImages[monster.id];
  const sceneImg = sceneImages[quest.id];

  return (
    <View className="flex-1 bg-[#0D1117]">
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Hero Scene Image - Now flush to the top */}
      <View className="h-[45%] w-full relative">
        {sceneImg && (
          <Image
            source={sceneImg}
            className="absolute inset-0 w-full h-full"
            resizeMode="cover"
          />
        )}
        <View className="absolute inset-0 bg-black/40" />

        {/* Circular Back Button */}
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => router.back()}
          style={{ top: insets.top + 10, left: 16 }}
          className="absolute z-20"
        >
          <Animated.View
            style={[animatedStyle]}
            className="w-12 h-12 rounded-full bg-[#0D1117] backdrop-blur-md items-center justify-center border border-white/20"
          >
            <Ionicons name="chevron-back" size={22} color="white" />
          </Animated.View>
        </Pressable>
      </View>

      {/* Content Card */}
      <View
        style={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          marginTop: -32,
          zIndex: 10,
        }}
        className="bg-[#0D1117] flex-1 p-6"
      >
        <Text
          style={{ color: accentColor }}
          className="text-sm font-bold uppercase tracking-wider mb-2"
        >
          {quest.category} Quest
        </Text>
        <Text className="text-white text-3xl font-extrabold mb-4">
          {quest.title}
        </Text>

        <View className="flex-row items-center mb-6">
          {monsterImg && (
            <Image
              source={monsterImg}
              className="w-12 h-12 mr-3"
              resizeMode="contain"
            />
          )}
          <View>
            <Text className="text-white font-bold">{monster.name}</Text>
            <Text className="text-gray-400 text-xs">{monster.personality}</Text>
          </View>
        </View>

        <Text className="text-gray-300 text-base mb-2">Strategy to learn:</Text>
        <View
          style={{ backgroundColor: accentColor + "20" }}
          className="p-4 rounded-2xl mb-6"
        >
          <Text style={{ color: accentColor }} className="font-bold text-lg">
            {quest.strategy}
          </Text>
          <Text className="text-gray-300 mt-1">
            {quest.strategyDescription}
          </Text>
        </View>

        <View className="flex-1 justify-end pb-6">
          <AnimatedButton
            label="Start Quest 🚀"
            onPress={() => router.push(`/quest/${quest.id}/play`)}
            variant="primary"
          />
        </View>
      </View>
    </View>
  );
}
