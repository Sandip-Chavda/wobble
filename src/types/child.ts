export interface Child {
  id: string;
  parentId: string;
  name: string;
  age: number;
  avatar: string;
  xp: number;
  level: number;
  streak: number;
  lastActive: string;
  completedQuestIds: string[];
  unlockedMonsterIds: string[];
  strategiesLearned: string[];
}
