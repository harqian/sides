export function simplePreferenceMapping(
  historicalPreferences: Record<string, number>,
  newCategories: string[]
): Record<string, number> {
  const mapped: Record<string, number> = {};

  newCategories.forEach(newCat => {
    const newCatLower = newCat.toLowerCase();

    if (historicalPreferences[newCatLower] !== undefined) {
      mapped[newCat] = historicalPreferences[newCatLower];
      return;
    }

    const matches: number[] = [];
    Object.entries(historicalPreferences).forEach(([histCat, importance]) => {
      const histCatLower = histCat.toLowerCase();
      if (newCatLower.includes(histCatLower) || histCatLower.includes(newCatLower)) {
        matches.push(importance);
      }
    });

    if (matches.length > 0) {
      const avg = matches.reduce((sum, val) => sum + val, 0) / matches.length;
      mapped[newCat] = Math.round(avg);
    } else {
      mapped[newCat] = 5;
    }
  });

  return mapped;
}
