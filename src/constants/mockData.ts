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
    isLocked: false, // UNLOCKED!
    requiredXp: 0, // UNLOCKED!
    strategy: "Pause & Breathe",
    strategyDescription: "Taking a deep breath helps calm our bodies.",
    estimatedMinutes: 4,
    thumbnail: "🔊",
    startNodeId: "node4", // Points to Grumble's story
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
    startNodeId: "node7", // Points to Cloud Jumping story
  },
  {
    id: "q4",
    title: "Shy at the Party",
    monsterId: "m1",
    category: "loneliness",
    difficulty: 3,
    isLocked: false,
    requiredXp: 0,
    strategy: "Say Hello",
    strategyDescription: "A simple wave can start a new friendship.",
    estimatedMinutes: 4,
    thumbnail: "🎉",
    startNodeId: "node10", // Points to the new story below
  },
];

export const monsterEmojis: Record<string, string> = {
  m1: "👾",
  m2: "😠",
};

// A simple 3-node branching story for Quest 1 (The Missing Toy)
export const mockStoryTree: Record<string, StoryNode> = {
  // ==========================================
  // QUEST 1: The Missing Toy (Mystery)
  // ==========================================
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
    nextNodeId: "node2",
  },
  node3b: {
    id: "node3b",
    type: "ending",
    text: "You helped Bloop search, and you found the toy under the bed!",
    monsterDialogue: "We did it! Thank you for helping me.",
    monsterEmotion: "happy",
    backgroundScene: "q1",
  },

  // ==========================================
  // QUEST 2: The Loud Noise (Anger)
  // ==========================================
  node4: {
    id: "node4",
    type: "scene",
    text: "Grumble is trying to build a block tower, but it keeps falling over and making a loud noise!",
    monsterDialogue: "Grrr! This is making me so mad!",
    monsterEmotion: "angry",
    backgroundScene: "q2",
    nextNodeId: "node5",
  },
  node5: {
    id: "node5",
    type: "choice",
    text: "Grumble looks like he wants to smash the blocks. What should he do?",
    monsterEmotion: "angry",
    backgroundScene: "q2",
    choices: [
      {
        id: "c3",
        label: "Smash the blocks!",
        nextNodeId: "node6a",
        quality: "poor",
        feedbackText: "Uh oh, now the blocks are everywhere!",
        redirectDialogue:
          "Whoa, smashing didn't help us build the tower. What else could we try?",
      },
      {
        id: "c4",
        label: "Take a deep breath and try again",
        nextNodeId: "node6b",
        quality: "optimal",
        feedbackText: "Yes! Pausing to breathe helps calm our bodies.",
      },
    ],
  },
  node6a: {
    id: "node6a",
    type: "consequence",
    text: "The blocks are smashed. Grumble is still mad.",
    monsterDialogue: "I still feel angry!",
    monsterEmotion: "angry",
    backgroundScene: "q2",
    nextNodeId: "node5",
  },
  node6b: {
    id: "node6b",
    type: "ending",
    text: "Grumble took a deep breath, tried again, and built the tallest tower ever!",
    monsterDialogue: "We did it! Breathing helped me feel better.",
    monsterEmotion: "happy",
    backgroundScene: "q2",
  },

  // ==========================================
  // QUEST 3: Cloud Jumping (Fear)
  // ==========================================
  node7: {
    id: "node7",
    type: "scene",
    text: "Bloop wants to jump across the fluffy clouds, but they look high up!",
    monsterDialogue: "I want to play, but I'm scared of falling.",
    monsterEmotion: "worried",
    backgroundScene: "q3",
    nextNodeId: "node8",
  },
  node8: {
    id: "node8",
    type: "choice",
    text: "Bloop is shaking at the edge of the cloud. What should he do?",
    monsterEmotion: "sad",
    backgroundScene: "q3",
    choices: [
      {
        id: "c5",
        label: "Stay here and do nothing",
        nextNodeId: "node9a",
        quality: "poor",
        feedbackText: "Bloop is missing out on the fun.",
        redirectDialogue:
          "If we don't try, we might miss out on something fun. What else could we try?",
      },
      {
        id: "c6",
        label: "Be brave and take a small jump",
        nextNodeId: "node9b",
        quality: "optimal",
        feedbackText:
          "You can do it! Being brave means trying even when scared.",
      },
    ],
  },
  node9a: {
    id: "node9a",
    type: "consequence",
    text: "Bloop is just sitting on the cloud, feeling sad.",
    monsterDialogue: "I wish I could join the others...",
    monsterEmotion: "sad",
    backgroundScene: "q3",
    nextNodeId: "node8",
  },
  node9b: {
    id: "node9b",
    type: "ending",
    text: "Bloop took the jump and made it to the next cloud! He is having so much fun!",
    monsterDialogue: "I did it! Thank you for encouraging me!",
    monsterEmotion: "happy",
    backgroundScene: "q3",
  },
  node10: {
    id: "node10",
    type: "scene",
    text: "Bloop is at a fun birthday party, but he doesn't know anyone. He feels lonely.",
    monsterDialogue:
      "Everyone is playing... but I don't know how to join them.",
    monsterEmotion: "sad",
    backgroundScene: "q4",
    nextNodeId: "node11",
  },
  node11: {
    id: "node11",
    type: "choice",
    text: "Bloop is hiding in the corner. What should he do to make friends?",
    monsterEmotion: "worried",
    backgroundScene: "q4",
    choices: [
      {
        id: "c7",
        label: "Hide and wait for them to leave",
        nextNodeId: "node12a",
        quality: "poor",
        feedbackText: "Bloop is still alone.",
        redirectDialogue:
          "If we hide, we might miss out on making new friends. What else could we try?",
      },
      {
        id: "c8",
        label: "Walk up, smile, and say hello",
        nextNodeId: "node12b",
        quality: "optimal",
        feedbackText: "Yes! Saying hello is a great way to start a friendship.",
      },
    ],
  },
  node12a: {
    id: "node12a",
    type: "consequence",
    text: "The other kids are having fun, but Bloop is still alone.",
    monsterDialogue: "I wish I could play too...",
    monsterEmotion: "sad",
    backgroundScene: "q4",
    nextNodeId: "node11",
  },
  node12b: {
    id: "node12b",
    type: "ending",
    text: "Bloop said hello, and the other kids invited him to play tag! He made new friends!",
    monsterDialogue: "They want to play with me! Thank you for the advice!",
    monsterEmotion: "happy",
    backgroundScene: "q4",
  },
};

export const mockParentStats = {
  totalStars: 7,
  questsCompleted: 2,
  streak: 1,
  strategiesLearned: ["Ask for Help", "Be Brave"],
  recentQuests: [
    { id: "q1", title: "The Missing Toy", stars: 3, date: "Today" },
    { id: "q3", title: "Cloud Jumping", stars: 2, date: "Yesterday" },
  ],
};
