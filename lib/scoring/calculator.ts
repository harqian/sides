import { ComparisonItem, ComparisonPoint, UserPreferences, ItemScore } from '@/types/comparison';

export function calculateFinalWeight(pointWeight: number, categoryImportance: number): number {
  const multiplier = categoryImportance / 10;
  const finalWeight = pointWeight * multiplier;
  return Math.max(0, Math.min(10, finalWeight));
}

export function calculateItemScore(item: ComparisonItem, userPreferences: UserPreferences): ItemScore {
  let totalScore = 0;
  const categoryBreakdown: Record<string, { category: string; contribution: number; points: ComparisonPoint[] }> = {};

  item.points.forEach(point => {
    if (!categoryBreakdown[point.category]) {
      categoryBreakdown[point.category] = {
        category: point.category,
        contribution: 0,
        points: []
      };
    }

    const categoryWeight = userPreferences.categoryWeights.find(
      cw => cw.category.toLowerCase() === point.category.toLowerCase()
    );
    const categoryImportance = categoryWeight?.importance ?? 5;

    const polarityMultiplier = point.type === 'pro' ? 1 : point.type === 'con' ? -1 : 0;

    const finalWeight = calculateFinalWeight(point.weight, categoryImportance);
    let contribution = finalWeight * polarityMultiplier;

    if (point.isDealBreaker && point.type === 'con') {
      contribution *= 10;
    }
    if (point.isMustHave && point.type === 'pro') {
      contribution *= 2;
    }

    totalScore += contribution;
    categoryBreakdown[point.category].contribution += contribution;
    categoryBreakdown[point.category].points.push(point);
  });

  const maxPossibleScore = item.points.length * 10;
  const normalizedScore = maxPossibleScore > 0
    ? ((totalScore / maxPossibleScore) * 50) + 50
    : 50;

  return {
    itemId: item.id,
    totalScore: Math.max(0, Math.min(100, normalizedScore)),
    categoryBreakdown: Object.values(categoryBreakdown),
    rank: 0
  };
}

export function rankItems(items: ComparisonItem[], userPreferences: UserPreferences): ItemScore[] {
  const scores = items.map(item => calculateItemScore(item, userPreferences));

  scores.sort((a, b) => b.totalScore - a.totalScore);

  let currentRank = 1;
  scores.forEach((score, index) => {
    if (index > 0 && score.totalScore < scores[index - 1].totalScore) {
      currentRank = index + 1;
    }
    score.rank = currentRank;
  });

  return scores;
}
