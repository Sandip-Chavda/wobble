import { getItem, setItem } from "@/utils/database";
import { create } from "zustand";

interface ProgressStore {
  completedQuests: Record<string, number>; // { 'q1': 3, 'q2': 2 }
  totalStars: number;
  addCompletion: (questId: string, stars: number) => void;
  loadProgress: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  completedQuests: {},
  totalStars: 0,

  loadProgress: () => {
    const savedData = getItem("progress");
    if (savedData) {
      set(JSON.parse(savedData));
    }
  },

  addCompletion: (questId, stars) => {
    const currentBest = get().completedQuests[questId] || 0;
    // Only update if the new score is higher (Replayability Rule)
    if (stars > currentBest) {
      const newCompletedQuests = { ...get().completedQuests, [questId]: stars };

      // Recalculate total stars
      const newTotalStars = Object.values(newCompletedQuests).reduce(
        (a, b) => a + b,
        0,
      );

      const newState = {
        completedQuests: newCompletedQuests,
        totalStars: newTotalStars,
      };

      set(newState);
      setItem("progress", JSON.stringify(newState)); // Save to SQLite
    }
  },
}));
