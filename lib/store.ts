import { create } from 'zustand';
import { Comparison, ComparisonItem, UserPreferences, CategoryWeight } from '@/types/comparison';
import { generateId } from './utils';

interface ComparisonStore {
  comparison: Comparison | null;
  setComparison: (comparison: Comparison) => void;
  updateUserPreferences: (preferences: UserPreferences) => void;
  updateCategoryWeight: (category: string, importance: number) => void;
  addItem: (item: ComparisonItem) => void;
  removeItem: (itemId: string) => void;
  reset: () => void;
}

const createDefaultPreferences = (categories: string[]): UserPreferences => ({
  id: generateId(),
  name: 'Balanced',
  categoryWeights: categories.map(cat => ({
    category: cat,
    importance: 5,
    visible: true
  })),
  viewMode: 'standard',
  scoreDisplay: 'numeric',
  showScores: true,
  sortByScore: false,
  hideCategories: [],
  colorScheme: 'default'
});

export const useComparisonStore = create<ComparisonStore>((set) => ({
  comparison: null,

  setComparison: (comparison) => set({ comparison }),

  updateUserPreferences: (preferences) => set((state) => {
    if (!state.comparison) return state;
    return {
      comparison: {
        ...state.comparison,
        userPreferences: preferences
      }
    };
  }),

  updateCategoryWeight: (category, importance) => set((state) => {
    if (!state.comparison?.userPreferences) return state;

    const updatedWeights = state.comparison.userPreferences.categoryWeights.map(cw =>
      cw.category === category ? { ...cw, importance } : cw
    );

    return {
      comparison: {
        ...state.comparison,
        userPreferences: {
          ...state.comparison.userPreferences,
          categoryWeights: updatedWeights
        }
      }
    };
  }),

  addItem: (item) => set((state) => {
    if (!state.comparison) return state;
    return {
      comparison: {
        ...state.comparison,
        items: [...state.comparison.items, item]
      }
    };
  }),

  removeItem: (itemId) => set((state) => {
    if (!state.comparison) return state;
    return {
      comparison: {
        ...state.comparison,
        items: state.comparison.items.filter(item => item.id !== itemId)
      }
    };
  }),

  reset: () => set({ comparison: null })
}));

export { createDefaultPreferences };
