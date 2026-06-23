import { Monster, Quest } from "../types";

export const mockMonsters: Monster[] = [
  {
    id: "m1",
    name: "Bloop",
    personality: "Shy but curious",
    primaryEmotion: "worried",
    color: "#6B9BFF", // Mystery Blue
    isUnlocked: true,
    questIds: ["q1"],
    lottieAnimations: {
      happy: "mock_path",
      worried: "mock_path",
      angry: "mock_path",
      sad: "mock_path",
      relieved: "mock_path",
      proud: "mock_path",
    },
  },
  {
    id: "m2",
    name: "Grumble",
    personality: "Grumpy but kind-hearted",
    primaryEmotion: "angry",
    color: "#FF9F43", // Anger Orange
    isUnlocked: false,
    questIds: ["q2"],
    lottieAnimations: {
      happy: "mock_path",
      worried: "mock_path",
      angry: "mock_path",
      sad: "mock_path",
      relieved: "mock_path",
      proud: "mock_path",
    },
  },
];

export const mockQuests: Quest[] = [
  {
    id: "q1",
    title: "The Missing Toy",
    monsterId: "m1",
    category: "mystery",
    difficulty: 1,
    isLocked: false,
    requiredXp: 0,
    strategy: "Ask for Help",
    strategyDescription:
      "When you can't find something, asking a friend for help makes it easier.",
    estimatedMinutes: 3,
    thumbnail: "mock_thumbnail",
    startNodeId: "node1",
    // Story tree omitted for grid list, fetched later
  },
  {
    id: "q2",
    title: "The Loud Noise",
    monsterId: "m2",
    category: "anger",
    difficulty: 2,
    isLocked: true,
    requiredXp: 50,
    strategy: "Pause and Breathe",
    strategyDescription:
      "Taking a deep breath helps calm our bodies when we get mad.",
    estimatedMinutes: 4,
    thumbnail: "mock_thumbnail",
    startNodeId: "node1",
  },
];
