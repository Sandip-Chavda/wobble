import { Monster, Quest, StoryNode } from "../types";

export const mockMonsters: Monster[] = [
  {
    id: "m1",
    name: "Bloop",
    personality: "Shy but curious",
    primaryEmotion: "worried",
    color: "#6B9BFF",
    isUnlocked: true,
    questIds: ["q1", "q3"],
    lottieAnimations: {
      happy: "",
      worried: "",
      angry: "",
      sad: "",
      relieved: "",
      proud: "",
    },
  },
  {
    id: "m2",
    name: "Grumble",
    personality: "Grumpy but kind-hearted",
    primaryEmotion: "angry",
    color: "#FF9F43",
    isUnlocked: false,
    questIds: ["q2"],
    lottieAnimations: {
      happy: "",
      worried: "",
      angry: "",
      sad: "",
      relieved: "",
      proud: "",
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
      "When you can't find something, asking a friend makes it easier.",
    estimatedMinutes: 3,
    thumbnail: "🕵️‍♂️",
    startNodeId: "node1",
  },
  {
    id: "q2",
    title: "The Loud Noise",
    monsterId: "m2",
    category: "anger",
    difficulty: 2,
    isLocked: true,
    requiredXp: 50,
    strategy: "Pause & Breathe",
    strategyDescription: "Taking a deep breath helps calm our bodies.",
    estimatedMinutes: 4,
    thumbnail: "🔊",
    startNodeId: "node1",
  },
  {
    id: "q3",
    title: "Cloud Jumping",
    monsterId: "m1",
    category: "fear",
    difficulty: 1,
    isLocked: false,
    requiredXp: 0,
    strategy: "Be Brave",
    strategyDescription: "Trying new things can be scary but fun!",
    estimatedMinutes: 2,
    thumbnail: "☁️",
    startNodeId: "node1",
  },
  {
    id: "q4",
    title: "Shy at the Party",
    monsterId: "m1",
    category: "loneliness",
    difficulty: 3,
    isLocked: false,
    requiredXp: 10,
    strategy: "Say Hello",
    strategyDescription: "A simple wave can start a new friendship.",
    estimatedMinutes: 4,
    thumbnail: "🎉",
    startNodeId: "node1",
  },
];

export const monsterEmojis: Record<string, string> = {
  m1: "👾",
  m2: "😠",
};

// A simple 3-node branching story for Quest 1 (The Missing Toy)
export const mockStoryTree: Record<string, StoryNode> = {
  node1: {
    id: "node1",
    type: "scene",
    text: "Bloop is looking everywhere for his favorite toy, but he cannot find it!",
    monsterDialogue: "I lost my special toy... I feel so worried.",
    monsterEmotion: "worried",
    backgroundScene: "q1",
    nextNodeId: "node2",
  },
  node2: {
    id: "node2",
    type: "choice",
    text: "Bloop is about to give up. What should he do?",
    monsterEmotion: "sad",
    backgroundScene: "q1",
    choices: [
      {
        id: "c1",
        label: "Yell and throw things",
        nextNodeId: "node3a",
        quality: "poor",
        feedbackText: "Oh no, that made Bloop feel worse!",
        redirectDialogue:
          "Hmm, that might make things worse. What else could we try?",
      },
      {
        id: "c2",
        label: "Take a breath and ask for help",
        nextNodeId: "node3b",
        quality: "optimal",
        feedbackText: "Great idea! Asking for help is a good strategy.",
      },
    ],
  },
  node3a: {
    id: "node3a",
    type: "consequence",
    text: "Yelling didn't help. Bloop is still upset.",
    monsterDialogue: "I just want my toy...",
    monsterEmotion: "angry",
    backgroundScene: "q1",
    nextNodeId: "node2", // Loop back to the choice
  },
  node3b: {
    id: "node3b",
    type: "ending",
    text: "You helped Bloop search, and you found the toy under the bed!",
    monsterDialogue: "We did it! Thank you for helping me.",
    monsterEmotion: "happy",
    backgroundScene: "q1",
  },
};
