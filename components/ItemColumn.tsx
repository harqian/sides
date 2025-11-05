'use client';

import { ComparisonItem, UserPreferences, ItemScore } from '@/types/comparison';
import { getPersonalizedColor } from '@/lib/colors/colorUtils';
import { Trophy, Medal, Award } from 'lucide-react';

interface ItemColumnProps {
  item: ComparisonItem;
  score?: ItemScore;
  isFirst: boolean;
  userPreferences: UserPreferences;
}

export default function ItemColumn({ item, score, isFirst, userPreferences }: ItemColumnProps) {
  const getRankIcon = (rank?: number) => {
    if (!rank) return null;
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />;
    return null;
  };

  // Group points by category
  const pointsByCategory = item.points.reduce((acc, point) => {
    if (!acc[point.category]) {
      acc[point.category] = [];
    }
    acc[point.category].push(point);
    return acc;
  }, {} as Record<string, typeof item.points>);

  return (
    <div className={`flex-1 min-w-[300px] ${!isFirst ? 'border-l border-gray-200' : ''}`}>
      {/* Item Header */}
      <div className="bg-gray-50 p-4 border-b border-gray-200">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900">{item.name}</h3>
          {getRankIcon(score?.rank)}
        </div>
        {item.description && (
          <p className="text-sm text-gray-600 mb-3">{item.description}</p>
        )}
        {score && userPreferences.showScores && (
          <div className="bg-white rounded-lg p-3 border border-gray-200">
            <div className="text-sm font-medium text-gray-700">Personalized Score</div>
            <div className="text-2xl font-bold text-blue-600">
              {score.totalScore.toFixed(1)}
              <span className="text-sm text-gray-500 ml-1">/ 100</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Rank #{score.rank}</div>
          </div>
        )}
      </div>

      {/* Points by Category */}
      <div className="divide-y divide-gray-100">
        {Object.entries(pointsByCategory).map(([category, points]) => {
          const categoryWeight = userPreferences.categoryWeights.find(
            cw => cw.category.toLowerCase() === category.toLowerCase()
          );
          const importance = categoryWeight?.importance ?? 5;

          return (
            <div key={category} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-sm text-gray-700 uppercase tracking-wide">
                  {category}
                </h4>
                <span className="text-xs text-gray-500">
                  Priority: {importance}/10
                </span>
              </div>
              <div className="space-y-2">
                {points.map((point) => {
                  const style = getPersonalizedColor(point, userPreferences);
                  return (
                    <div
                      key={point.id}
                      className="rounded-lg p-3 border-l-4 transition-all"
                      style={{
                        backgroundColor: style.backgroundColor,
                        opacity: style.opacity,
                        borderColor: style.backgroundColor,
                        borderLeftWidth: style.borderWidth,
                        fontSize: style.fontSize,
                        fontWeight: style.fontWeight
                      }}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-medium opacity-70 mt-0.5">
                          {point.type === 'pro' ? '✓' : point.type === 'con' ? '✗' : '○'}
                        </span>
                        <p className="flex-1 text-gray-900">{point.text}</p>
                        <span className="text-xs opacity-60 font-medium">
                          {point.weight}/10
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
