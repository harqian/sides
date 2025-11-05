import { Polarity, ComparisonPoint, UserPreferences } from '@/types/comparison';
import { calculateFinalWeight } from '@/lib/scoring/calculator';

export const polarityColors = {
  pro: {
    light: 'rgb(134, 239, 172)', // green-300
    base: 'rgb(34, 197, 94)',    // green-500
    dark: 'rgb(21, 128, 61)'     // green-700
  },
  con: {
    light: 'rgb(252, 165, 165)', // red-300
    base: 'rgb(239, 68, 68)',    // red-500
    dark: 'rgb(153, 27, 27)'     // red-700
  },
  neutral: {
    light: 'rgb(253, 224, 71)',  // yellow-300
    base: 'rgb(234, 179, 8)',    // yellow-500
    dark: 'rgb(161, 98, 7)'      // yellow-700
  }
};

export function getPointColor(type: Polarity, weight: number): string {
  const colors = polarityColors[type];
  if (weight <= 3) return colors.light;
  if (weight <= 7) return colors.base;
  return colors.dark;
}

export function getPersonalizedColor(point: ComparisonPoint, userPreferences: UserPreferences) {
  const categoryWeight = userPreferences.categoryWeights.find(
    cw => cw.category.toLowerCase() === point.category.toLowerCase()
  );
  const categoryImportance = categoryWeight?.importance ?? 5;

  const finalWeight = calculateFinalWeight(point.weight, categoryImportance);

  const colors = polarityColors[point.type];
  let baseColor;
  if (finalWeight <= 3) baseColor = colors.light;
  else if (finalWeight <= 7) baseColor = colors.base;
  else baseColor = colors.dark;

  const opacity = 0.3 + (categoryImportance / 10) * 0.7;

  return {
    backgroundColor: baseColor,
    opacity: opacity,
    fontSize: categoryImportance > 7 ? '1.1rem' : '1rem',
    fontWeight: categoryImportance > 7 ? '600' : '400',
    borderWidth: Math.ceil(categoryImportance / 3) + 'px'
  };
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
