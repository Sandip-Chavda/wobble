import { mockQuests, mockStoryTree } from "../constants/mockData";
import { Quest, StoryNode } from "../types";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const questService = {
  // GET /api/quests (metadata only)
  getQuests: async (): Promise<Quest[]> => {
    await delay(500); // Fake network latency
    return mockQuests;
  },

  // GET /api/quests/:id (full story tree)
  getQuestById: async (
    id: string,
  ): Promise<{ quest: Quest; storyTree: Record<string, StoryNode> }> => {
    await delay(500);
    const quest = mockQuests.find((q) => q.id === id);
    if (!quest) throw new Error("Quest not found");

    return { quest, storyTree: mockStoryTree };
  },
};
