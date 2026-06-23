export type EmotionType =
  | "happy"
  | "worried"
  | "angry"
  | "sad"
  | "relieved"
  | "proud";

export interface Monster {
  id: string;
  name: string;
  personality: string;
  primaryEmotion: EmotionType;
  color: string;
  isUnlocked: boolean;
  questIds: string[];
  // Map emotion to Lottie JSON file path (we will use placeholders for now)
  lottieAnimations: Record<EmotionType, string>;
}
