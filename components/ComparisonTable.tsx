'use client';

import { useMemo } from 'react';
import { useComparisonStore } from '@/lib/store';
import { rankItems } from '@/lib/scoring/calculator';
import { getPersonalizedColor } from '@/lib/colors/colorUtils';
import { Trophy, Download, RotateCcw } from 'lucide-react';
import ItemColumn from './ItemColumn';

export default function ComparisonTable() {
  const { comparison, reset } = useComparisonStore();

  const scores = useMemo(() => {
    if (!comparison || !comparison.userPreferences) return [];
    return rankItems(comparison.items, comparison.userPreferences);
  }, [comparison]);

  if (!comparison) return null;

  const winner = scores[0];

  const handleExportCSV = () => {
    if (!comparison) return;

    let csv = 'Category,';
    csv += comparison.items.map(item => item.name).join(',') + '\n';

    const allCategories = new Set<string>();
    comparison.items.forEach(item => {
      item.points.forEach(point => allCategories.add(point.category));
    });

    allCategories.forEach(category => {
      csv += category + ',';
      comparison.items.forEach(item => {
        const points = item.points.filter(p => p.category === category);
        const pointsText = points.map(p => `${p.type}: ${p.text}`).join('; ');
        csv += `"${pointsText}",`;
      });
      csv += '\n';
    });

    csv += 'Score,';
    csv += scores.map(s => s.totalScore.toFixed(1)).join(',');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comparison.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="bg-white rounded-lg shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-500" />
          <div>
            <h3 className="font-semibold text-gray-900">
              Winner: {comparison.items.find(i => i.id === winner?.itemId)?.name}
            </h3>
            <p className="text-sm text-gray-600">
              Score: {winner?.totalScore.toFixed(1)} based on your priorities
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            New Comparison
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <div className="inline-flex min-w-full">
            {comparison.items.map((item, index) => {
              const score = scores.find(s => s.itemId === item.id);
              return (
                <ItemColumn
                  key={item.id}
                  item={item}
                  score={score}
                  isFirst={index === 0}
                  userPreferences={comparison.userPreferences!}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Legend */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <h4 className="font-medium text-gray-900 mb-3">Color Guide</h4>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(34, 197, 94)' }} />
            <span className="text-sm text-gray-600">Pros (Green)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(239, 68, 68)' }} />
            <span className="text-sm text-gray-600">Cons (Red)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgb(234, 179, 8)' }} />
            <span className="text-sm text-gray-600">Neutral (Yellow)</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-3">
          Color intensity indicates importance: Darker = More important, Lighter = Less important.
          Adjust category priorities in the left panel to personalize your view.
        </p>
      </div>
    </div>
  );
}
