import { GoogleGenerativeAI } from '@google/generative-ai';
import { CategoryWeight } from '@/types/comparison';
import { getGeminiApiKey } from './serverConfig';

/**
 * Use AI to map historical category preferences to new categories
 * This intelligently infers what the user cares about based on past behavior
 */
export async function mapPreferencesToCategories(
  historicalPreferences: Record<string, number>,
  newCategories: string[]
): Promise<Record<string, number>> {
  const apiKey = getGeminiApiKey();
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a preference analysis assistant. You will analyze a user's historical category preferences and intelligently map them to new categories in a comparison.

Historical Category Preferences (category: importance out of 10):
${JSON.stringify(historicalPreferences, null, 2)}

New Categories to Map:
${JSON.stringify(newCategories)}

Your task:
1. For each new category, determine what importance level (1-10) the user would likely assign based on their historical preferences
2. Look for semantic relationships between historical and new categories
3. Consider synonyms, related concepts, and broader/narrower terms

Examples of relationships:
- "price" relates to "cost", "value", "affordability", "budget"
- "battery life" relates to "power efficiency", "battery", "runtime", "endurance"
- "performance" relates to "speed", "processing power", "capability", "efficiency"
- "quality" relates to "build quality", "durability", "craftsmanship", "reliability"
- "camera" relates to "photography", "photo quality", "image sensor", "lens"
- "design" relates to "aesthetics", "appearance", "look", "style"

Instructions:
- If a new category is semantically similar to a historical category, use that historical importance
- If multiple historical categories relate to a new category, use the average
- If no clear relationship exists, use 5 (neutral importance)
- Be intelligent about relationships: "customer service" could relate to "support", "warranty", etc.

Return ONLY a valid JSON object (no markdown, no code blocks) mapping each new category to an importance value:
{
  "category1": 7,
  "category2": 5,
  "category3": 9
}

Make sure all new categories are included in the response with importance values between 1-10.`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();

  // Clean up the response
  let cleanedText = responseText.trim();
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const parsed = JSON.parse(cleanedText);

  // Ensure all values are within bounds
  const mapped: Record<string, number> = {};
  Object.entries(parsed).forEach(([category, importance]) => {
    mapped[category] = Math.max(1, Math.min(10, Number(importance)));
  });

  // Ensure all new categories have a mapping
  newCategories.forEach(cat => {
    if (!(cat in mapped)) {
      mapped[cat] = 5; // Default to neutral if AI didn't provide
    }
  });

  return mapped;
}

/**
 * Create personalized category weights based on history
 */
export async function createPersonalizedWeights(
  categories: string[],
  historicalPreferences: Record<string, number>
): Promise<CategoryWeight[]> {
  const mapped = await mapPreferencesToCategories(
    historicalPreferences,
    categories
  );

  return categories.map(category => ({
    category,
    importance: mapped[category] || 5,
    visible: true
  }));
}

/**
 * Fallback: Simple string matching for preference mapping (no AI)
 * Used when API key is not available
 */
export function simplePreferenceMapping(
  historicalPreferences: Record<string, number>,
  newCategories: string[]
): Record<string, number> {
  const mapped: Record<string, number> = {};

  newCategories.forEach(newCat => {
    const newCatLower = newCat.toLowerCase();

    // Try exact match first
    if (historicalPreferences[newCatLower] !== undefined) {
      mapped[newCat] = historicalPreferences[newCatLower];
      return;
    }

    // Try partial matching
    const matches: number[] = [];
    Object.entries(historicalPreferences).forEach(([histCat, importance]) => {
      const histCatLower = histCat.toLowerCase();

      // Check if either contains the other
      if (newCatLower.includes(histCatLower) || histCatLower.includes(newCatLower)) {
        matches.push(importance);
      }
    });

    if (matches.length > 0) {
      // Average of matches
      const avg = matches.reduce((sum, val) => sum + val, 0) / matches.length;
      mapped[newCat] = Math.round(avg);
    } else {
      // No match found, use neutral
      mapped[newCat] = 5;
    }
  });

  return mapped;
}
