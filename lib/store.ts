import { create } from 'zustand';
import { Comparison, ComparisonItem, UserPreferences, CategoryWeight } from '@/types/comparison';
import { generateId } from './utils';
import { saveToHistory, saveCurrentComparison, loadCurrentComparison, loadDisplayPreferences, saveDisplayPreferences, loadUndoRedoStack, saveUndoRedoStack } from './storage';

interface ComparisonStore {
  comparison: Comparison | null;
  undoStack: Comparison[];
  redoStack: Comparison[];
  setComparison: (comparison: Comparison) => void;
  updateUserPreferences: (preferences: UserPreferences) => void;
  updateCategoryWeight: (category: string, importance: number) => void;
  addItem: (item: ComparisonItem) => void;
  removeItem: (itemId: string) => void;
  addPoint: (itemId: string, category: string, text: string, weight: number, type: 'pro' | 'con' | 'neutral') => void;
  updatePoint: (itemId: string, pointId: string, updates: { text?: string; weight?: number }) => void;
  deletePoint: (itemId: string, pointId: string) => void;
  updateTitle: (title: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  reset: () => void;
}

const createDefaultPreferences = (categories: string[]): UserPreferences => {
  const savedPrefs = loadDisplayPreferences();
  return {
    id: generateId(),
    name: 'Balanced',
    categoryWeights: categories.map(cat => ({
      category: cat,
      importance: 5,
      visible: true
    })),
    viewMode: 'standard',
    scoreDisplay: 'numeric',
    showScores: savedPrefs.showScores,
    sortByScore: false,
    hideCategories: [],
    colorScheme: 'default',
    hideWinner: savedPrefs.hideWinner
  };
};

const saveState = (state: Comparison, undoStack: Comparison[], redoStack: Comparison[]): void => {
  saveUndoRedoStack(undoStack, redoStack);
};

export const useComparisonStore = create<ComparisonStore>((set, get) => {
  const initialStack = loadUndoRedoStack();

  return {
    comparison: loadCurrentComparison(),
    undoStack: initialStack.undoStack,
    redoStack: initialStack.redoStack,

    setComparison: (comparison) => {
      saveToHistory(comparison);
      saveCurrentComparison(comparison);
      set({ comparison });
    },

  updateUserPreferences: (preferences) => set((state) => {
    if (!state.comparison) return state;
    const newUndoStack = [...state.undoStack, state.comparison];
    const updatedComparison = {
      ...state.comparison,
      userPreferences: preferences
    };
    saveToHistory(updatedComparison);
    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);
    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  updateCategoryWeight: (category, importance) => set((state) => {
    if (!state.comparison?.userPreferences) return state;

    const newUndoStack = [...state.undoStack, state.comparison];
    const updatedWeights = state.comparison.userPreferences.categoryWeights.map(cw =>
      cw.category === category ? { ...cw, importance } : cw
    );

    const updatedComparison = {
      ...state.comparison,
      userPreferences: {
        ...state.comparison.userPreferences,
        categoryWeights: updatedWeights
      }
    };

    saveToHistory(updatedComparison);
    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);

    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  addItem: (item) => set((state) => {
    if (!state.comparison) return state;
    const newUndoStack = [...state.undoStack, state.comparison];
    const updatedComparison = {
      ...state.comparison,
      items: [...state.comparison.items, item]
    };
    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);
    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  removeItem: (itemId) => set((state) => {
    if (!state.comparison) return state;
    const newUndoStack = [...state.undoStack, state.comparison];
    const updatedComparison = {
      ...state.comparison,
      items: state.comparison.items.filter(item => item.id !== itemId)
    };
    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);
    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  addPoint: (itemId, category, text, weight, type) => set((state) => {
    if (!state.comparison) return state;

    const newUndoStack = [...state.undoStack, state.comparison];
    const newPoint = {
      id: generateId(),
      text,
      type,
      weight,
      category
    };

    const updatedItems = state.comparison.items.map(item => {
      if (item.id !== itemId) return item;
      return {
        ...item,
        points: [...item.points, newPoint]
      };
    });

    const updatedComparison = {
      ...state.comparison,
      items: updatedItems
    };

    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);

    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  updatePoint: (itemId, pointId, updates) => set((state) => {
    if (!state.comparison) return state;

    const newUndoStack = [...state.undoStack, state.comparison];
    const updatedItems = state.comparison.items.map(item => {
      if (item.id !== itemId) return item;

      return {
        ...item,
        points: item.points.map(point => {
          if (point.id !== pointId) return point;
          return {
            ...point,
            ...(updates.text !== undefined && { text: updates.text }),
            ...(updates.weight !== undefined && { weight: updates.weight })
          };
        })
      };
    });

    const updatedComparison = {
      ...state.comparison,
      items: updatedItems
    };

    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);

    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  deletePoint: (itemId, pointId) => set((state) => {
    if (!state.comparison) return state;

    const newUndoStack = [...state.undoStack, state.comparison];
    const updatedItems = state.comparison.items.map(item => {
      if (item.id !== itemId) return item;

      return {
        ...item,
        points: item.points.filter(point => point.id !== pointId)
      };
    });

    const updatedComparison = {
      ...state.comparison,
      items: updatedItems
    };

    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);

    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  updateTitle: (title) => set((state) => {
    if (!state.comparison) return state;

    const newUndoStack = [...state.undoStack, state.comparison];
    const updatedComparison = {
      ...state.comparison,
      title
    };

    saveCurrentComparison(updatedComparison);
    saveState(updatedComparison, newUndoStack, []);

    return {
      comparison: updatedComparison,
      undoStack: newUndoStack,
      redoStack: []
    };
  }),

  undo: () => set((state) => {
    if (state.undoStack.length === 0 || !state.comparison) return state;

    const newUndoStack = state.undoStack.slice(0, -1);
    const newRedoStack = [...state.redoStack, state.comparison];
    const previousComparison = state.undoStack[state.undoStack.length - 1];

    saveCurrentComparison(previousComparison);
    saveState(previousComparison, newUndoStack, newRedoStack);

    return {
      comparison: previousComparison,
      undoStack: newUndoStack,
      redoStack: newRedoStack
    };
  }),

  redo: () => set((state) => {
    if (state.redoStack.length === 0 || !state.comparison) return state;

    const newRedoStack = state.redoStack.slice(0, -1);
    const newUndoStack = [...state.undoStack, state.comparison];
    const nextComparison = state.redoStack[state.redoStack.length - 1];

    saveCurrentComparison(nextComparison);
    saveState(nextComparison, newUndoStack, newRedoStack);

    return {
      comparison: nextComparison,
      undoStack: newUndoStack,
      redoStack: newRedoStack
    };
  }),

  canUndo: () => {
    const state = get();
    return state.undoStack.length > 0;
  },

  canRedo: () => {
    const state = get();
    return state.redoStack.length > 0;
  },

  reset: () => {
    saveCurrentComparison(null);
    saveUndoRedoStack([], []);
    set({ comparison: null, undoStack: [], redoStack: [] });
  }
}});

export { createDefaultPreferences };
