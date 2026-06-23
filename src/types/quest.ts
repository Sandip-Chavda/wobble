import { EmotionType } from "./monster";

export type NodeType =
  | "scene"
  | "choice"
  | "consequence"
  | "reflection"
  | "ending";
export type ChoiceQuality = "optimal" | "neutral" | "poor";
export type QuestCategory =
  | "mystery"
  | "fear"
  | "bullying"
  | "loneliness"
  | "anger"
  | "anxiety";

export interface Choice {
  id: string;
  label: string;
  icon?: string;
  nextNodeId: string;
  quality: ChoiceQuality;
  feedbackText: string; // brief reaction shown after choice
  redirectDialogue?: string; // only for 'poor' quality
}

export interface StoryNode {
  id: string;
  type: NodeType;
  text: string; // narration text
  monsterDialogue?: string; // speech bubble text
  monsterEmotion: EmotionType;
  backgroundScene: string; // bg illustration key
  choices?: Choice[]; // present on type === 'choice'
  nextNodeId?: string; // present on auto-advance nodes
  autoAdvanceMs?: number; // auto-advance timing
  narrationAudio?: string; // audio file key
}

export interface Quest {
  id: string;
  title: string;
  monsterId: string;
  category: QuestCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  isLocked: boolean;
  requiredXp: number;
  strategy: string;
  strategyDescription: string;
  estimatedMinutes: number;
  // Fetched ONLY when starting quest, but we include it in the type
  storyTree?: Record<string, StoryNode>;
  startNodeId: string;
  thumbnail: string;
}
