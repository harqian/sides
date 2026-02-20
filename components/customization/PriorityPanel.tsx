'use client';

import { useState, useEffect } from 'react';
import { useComparisonStore } from '@/lib/store';
import CategorySlider from './CategorySlider';
import { Settings, TrendingUp, Sparkles, Loader2 } from 'lucide-react';
import { loadHistory, getAveragePreferences, hasEnoughHistory, saveDisplayPreferences } from '@/lib/storage';
import { mapPreferencesWithServer } from '@/lib/ai/client';
import { simplePreferenceMapping } from '@/lib/ai/simplePreferenceMapping';

const PRESET_PROFILES = [
  {
    name: 'Balanced',
    description: 'All categories equally important',
    weights: {} as Record<string, number>
  },
  {
    name: 'Budget Conscious',
    description: 'Prioritize cost and value',
    weights: { 'price': 10, 'cost': 10, 'value': 9, 'quality': 5, 'performance': 5 }
  },
  {
    name: 'Premium Quality',
    description: 'Quality and performance over price',
    weights: { 'quality': 10, 'performance': 10, 'price': 2, 'cost': 2, 'value': 5 }
  }
];

export default function PriorityPanel() {
  const { comparison, updateCategoryWeight, updateUserPreferences } = useComparisonStore();
  const [hasHistory, setHasHistory] = useState(false);
  const [isLoadingPersonalized, setIsLoadingPersonalized] = useState(false);
  const [personalizedError, setPersonalizedError] = useState<string | null>(null);

  useEffect(() => {
    const history = loadHistory();
    setHasHistory(hasEnoughHistory(history));
  }, [comparison]);

  if (!comparison || !comparison.userPreferences) return null;

  const applyPreset = (presetName: string) => {
    const preset = PRESET_PROFILES.find(p => p.name === presetName);
    if (!preset || !comparison.userPreferences) return;

    const updatedWeights = comparison.userPreferences.categoryWeights.map(cw => {
      const presetWeight = preset.weights[cw.category.toLowerCase()];
      return {
        ...cw,
        importance: presetWeight !== undefined ? presetWeight : 5
      };
    });

    updateUserPreferences({
      ...comparison.userPreferences,
      name: presetName,
      categoryWeights: updatedWeights
    });
  };

  const applyPersonalized = async () => {
    if (!comparison.userPreferences) return;

    setIsLoadingPersonalized(true);
    setPersonalizedError(null);

    try {
      const history = loadHistory();
      const averagePrefs = getAveragePreferences(history);
      const currentCategories = comparison.userPreferences.categoryWeights.map(cw => cw.category);

      let mapped: Record<string, number>;
      try {
        mapped = await mapPreferencesWithServer(averagePrefs, currentCategories);
      } catch {
        // Fallback to local mapping when server AI is unavailable.
        mapped = simplePreferenceMapping(averagePrefs, currentCategories);
      }

      const personalizedWeights = currentCategories.map(cat => ({
        category: cat,
        importance: mapped[cat] || 5,
        visible: true
      }));

      updateUserPreferences({
        ...comparison.userPreferences,
        name: 'Personalized',
        categoryWeights: personalizedWeights
      });
    } catch (error) {
      console.error('Failed to apply personalized preset:', error);
      setPersonalizedError('Failed to load personalized preferences. Try again.');
    } finally {
      setIsLoadingPersonalized(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-gray-900">Your Priorities</h3>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-xs text-gray-600">Show Results</span>
            <button
              onClick={() => {
                const newShowScores = !comparison.userPreferences?.showScores;
                saveDisplayPreferences(newShowScores, !newShowScores);
                updateUserPreferences({
                  ...comparison.userPreferences!,
                  hideWinner: !newShowScores,
                  showScores: newShowScores
                });
              }}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                comparison.userPreferences?.showScores ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                  comparison.userPreferences?.showScores ? 'translate-x-5' : 'translate-x-1'
                }`}
              />
            </button>
          </label>
        </div>
        <p className="text-sm text-gray-600">
          Adjust how important each category is to you
        </p>
      </div>

      {/* Profile Presets */}
      <div className="p-4 border-b border-gray-200">
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Quick Presets
        </label>
        <div className="flex gap-2">
          {/* Personalized Preset */}
          {hasHistory && (
            <button
              onClick={applyPersonalized}
              disabled={isLoadingPersonalized}
              className={`flex-1 p-2 rounded-lg border transition-colors ${
                comparison.userPreferences?.name === 'Personalized'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              title="Based on your past preferences"
            >
              <div className="flex flex-col items-center gap-1">
                {isLoadingPersonalized ? (
                  <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-purple-600" />
                )}
                <div className="text-xs font-medium text-gray-900">
                  {isLoadingPersonalized ? '...' : 'Learned'}
                </div>
              </div>
            </button>
          )}
          {personalizedError && (
            <div className="text-xs text-red-600 px-3">{personalizedError}</div>
          )}

          {/* Standard Presets */}
          {PRESET_PROFILES.map((preset) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(preset.name)}
              className={`flex-1 p-2 rounded-lg border transition-colors ${
                comparison.userPreferences?.name === preset.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              title={preset.description}
            >
              <div className="text-xs font-medium text-gray-900 text-center">{preset.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Category Sliders */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4 text-gray-600" />
          <h4 className="text-sm font-medium text-gray-700">Category Importance</h4>
        </div>
        <div className="space-y-4">
          {comparison.userPreferences.categoryWeights.map((categoryWeight) => (
            <CategorySlider
              key={categoryWeight.category}
              category={categoryWeight.category}
              importance={categoryWeight.importance}
              onChange={(value) => updateCategoryWeight(categoryWeight.category, value)}
            />
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="p-4 bg-blue-50 rounded-b-lg">
        <p className="text-xs text-blue-800">
          <strong>Tip:</strong> Higher importance (10) makes that category more vibrant and impactful in your comparison.
          Lower importance (1) makes it more subtle.
        </p>
      </div>
    </div>
  );
}
