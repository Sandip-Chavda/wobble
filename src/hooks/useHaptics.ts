import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export const useHaptics = () => {
  const buttonPress = () => {
    if (Platform.OS === "ios")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const choiceSelect = () => {
    if (Platform.OS === "ios")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const optimalChoice = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const poorChoice = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  };

  const starEarned = () => {
    if (Platform.OS === "ios")
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const questComplete = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return {
    buttonPress,
    choiceSelect,
    optimalChoice,
    poorChoice,
    starEarned,
    questComplete,
  };
};
