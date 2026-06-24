import { create } from "zustand";
import { ChoiceQuality, Quest } from "../types";

interface QuestStore {
  activeQuest: Quest | null;
  currentNodeId: string | null;
  totalChoicesMade: number;
  optimalChoicesMade: number;
  starsEarned: number;
  disabledChoices: string[]; // NEW: Track poor choices
  redirectDialogue: string | null; // NEW: Track monster's redirect text
  startQuest: (quest: Quest, startNodeId: string) => void;
  advanceNode: (nodeId: string) => void;
  makeChoice: (
    choiceId: string,
    quality: ChoiceQuality,
    nextNodeId: string,
    redirectText?: string,
  ) => void;
  calculateStars: () => void;
  resetQuest: () => void;
}

export const useQuestStore = create<QuestStore>((set, get) => ({
  activeQuest: null,
  currentNodeId: null,
  totalChoicesMade: 0,
  optimalChoicesMade: 0,
  starsEarned: 0,
  disabledChoices: [],
  redirectDialogue: null,

  startQuest: (quest, startNodeId) =>
    set({
      activeQuest: quest,
      currentNodeId: startNodeId,
      totalChoicesMade: 0,
      optimalChoicesMade: 0,
      starsEarned: 0,
      disabledChoices: [],
      redirectDialogue: null,
    }),

  advanceNode: (nodeId) =>
    set({ currentNodeId: nodeId, redirectDialogue: null }),

  makeChoice: (choiceId, quality, nextNodeId, redirectText) =>
    set((state) => {
      // If it's a poor choice, we DON'T advance the node. We just disable the card.
      if (quality === "poor") {
        return {
          disabledChoices: [...state.disabledChoices, choiceId],
          redirectDialogue:
            redirectText ||
            "Hmm, that might make things worse. What else could we try?",
        };
      }

      // Otherwise, advance as normal
      const isOptimal = quality === "optimal";
      return {
        totalChoicesMade: state.totalChoicesMade + 1,
        optimalChoicesMade: state.optimalChoicesMade + (isOptimal ? 1 : 0),
        currentNodeId: nextNodeId,
        redirectDialogue: null,
      };
    }),

  calculateStars: () =>
    set((state) => {
      let stars = 1;
      if (state.optimalChoicesMade > 0) stars = 2;
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
      disabledChoices: [],
      redirectDialogue: null,
    }),
}));
