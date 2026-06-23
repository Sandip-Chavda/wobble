import { create } from "zustand";
import { ChoiceQuality, Quest } from "../types";

interface QuestStore {
  activeQuest: Quest | null;
  currentNodeId: string | null;
  choiceHistory: string[];
  starsEarned: number;
  startQuest: (quest: Quest, startNodeId: string) => void;
  advanceNode: (nodeId: string) => void;
  makeChoice: (
    choiceId: string,
    quality: ChoiceQuality,
    nextNodeId: string,
  ) => void;
  resetQuest: () => void;
}

export const useQuestStore = create<QuestStore>((set) => ({
  activeQuest: null,
  currentNodeId: null,
  choiceHistory: [],
  starsEarned: 0,

  startQuest: (quest, startNodeId) =>
    set({
      activeQuest: quest,
      currentNodeId: startNodeId,
      choiceHistory: [],
      starsEarned: 0,
    }),

  advanceNode: (nodeId) =>
    set((state) => ({
      currentNodeId: nodeId,
      choiceHistory: [...state.choiceHistory, nodeId],
    })),

  makeChoice: (choiceId, quality, nextNodeId) =>
    set((state) => {
      let stars = state.starsEarned;
      if (quality === "optimal" && stars < 3) stars = Math.min(3, stars + 1);
      if (quality === "neutral" && stars < 1) stars = 1;
      return {
        choiceHistory: [...state.choiceHistory, choiceId],
        starsEarned: stars,
        currentNodeId: nextNodeId,
      };
    }),

  resetQuest: () =>
    set({
      activeQuest: null,
      currentNodeId: null,
      choiceHistory: [],
      starsEarned: 0,
    }),
}));
