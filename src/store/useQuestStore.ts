import { create } from "zustand";
import { ChoiceQuality, Quest } from "../types";

interface QuestStore {
  activeQuest: Quest | null;
  currentNodeId: string | null;
  totalChoicesMade: number;
  optimalChoicesMade: number;
  starsEarned: number;
  startQuest: (quest: Quest, startNodeId: string) => void;
  advanceNode: (nodeId: string) => void;
  makeChoice: (
    choiceId: string,
    quality: ChoiceQuality,
    nextNodeId: string,
  ) => void;
  calculateStars: () => void; // New function to calculate at the end
  resetQuest: () => void;
}

export const useQuestStore = create<QuestStore>((set, get) => ({
  activeQuest: null,
  currentNodeId: null,
  totalChoicesMade: 0,
  optimalChoicesMade: 0,
  starsEarned: 0,

  startQuest: (quest, startNodeId) =>
    set({
      activeQuest: quest,
      currentNodeId: startNodeId,
      totalChoicesMade: 0,
      optimalChoicesMade: 0,
      starsEarned: 0,
    }),

  advanceNode: (nodeId) => set({ currentNodeId: nodeId }),

  makeChoice: (choiceId, quality, nextNodeId) =>
    set((state) => {
      const isOptimal = quality === "optimal";
      return {
        totalChoicesMade: state.totalChoicesMade + 1,
        optimalChoicesMade: state.optimalChoicesMade + (isOptimal ? 1 : 0),
        currentNodeId: nextNodeId,
      };
    }),

  // Calculate stars based on blueprint rules right before showing the Result Screen
  calculateStars: () =>
    set((state) => {
      let stars = 1; // 1 star for completing
      if (state.optimalChoicesMade > 0) stars = 2; // 2 stars for at least 1 optimal
      // 3 stars if ALL choices made were optimal (and they made at least 1)
      if (
        state.optimalChoicesMade > 0 &&
        state.optimalChoicesMade === state.totalChoicesMade
      ) {
        stars = 3;
      }
      return { starsEarned: stars };
    }),

  resetQuest: () =>
    set({
      activeQuest: null,
      currentNodeId: null,
      totalChoicesMade: 0,
      optimalChoicesMade: 0,
      starsEarned: 0,
    }),
}));
