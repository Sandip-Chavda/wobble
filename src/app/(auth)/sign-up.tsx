import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "../../components/ui/SafeAreaView";
import { useAuthStore } from "../../store/useAuthStore";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useAuthStore((state) => state.signIn);

  const handleSignUp = () => {
    // In the future, this will call Clerk's signUp method.
    signIn();
    router.replace("/(tabs)/home");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0D1117]">
      <View className="flex-1 p-6">
        <Pressable onPress={() => router.back()} className="mb-8">
          <Ionicons name="chevron-back" size={32} color="white" />
        </Pressable>

        <Text className="text-white text-3xl font-extrabold mb-2">
          Create Account
        </Text>
        <Text className="text-gray-400 text-base mb-8">
          Start helping monsters today!
        </Text>

        <View className="mb-4">
          <Text className="text-gray-400 text-sm font-bold mb-2">EMAIL</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="kid@parent.com"
            placeholderTextColor="#6B7280"
            className="bg-[#1C1C1E] border border-white/10 rounded-2xl px-4 py-4 text-white"
            autoCapitalize="none"
          />
        </View>

        <View className="mb-8">
          <Text className="text-gray-400 text-sm font-bold mb-2">PASSWORD</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor="#6B7280"
            secureTextEntry
            className="bg-[#1C1C1E] border border-white/10 rounded-2xl px-4 py-4 text-white"
          />
        </View>

        <Pressable
          onPress={handleSignUp}
          className="bg-[#6B9BFF] py-4 rounded-2xl items-center"
        >
          <Text className="text-white font-bold text-lg">Sign Up</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
