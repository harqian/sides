import { GoogleGenerativeAI } from '@google/generative-ai';
import { ParsedInput, ComparisonItem, ComparisonPoint } from '@/types/comparison';
import { generateId } from '@/lib/utils';

export async function parseComparisonText(text: string, apiKey: string): Promise<ParsedInput> {
  if (!apiKey) {
    throw new Error('API key is required');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `You are a comparison organizer. Extract structured comparison data from the following unstructured text.

User Input:
${text}

Extract:
1. All items/options being compared
2. Pros and cons for each item
3. Rate each point's importance (1-10, where 10 is most important)
4. Identify categories (price, quality, features, performance, etc.)

Return ONLY valid JSON in this exact format (no markdown, no code blocks, just pure JSON):
{
  "items": [
    {
      "name": "Item Name",
      "description": "Brief description if mentioned",
      "points": [
        {
          "text": "Specific pro or con",
          "type": "pro" | "con" | "neutral",
          "weight": 1-10,
          "category": "category name"
        }
      ]
    }
  ],
  "categories": ["list", "of", "categories"]
}

Rules:
- Be specific with point text
- Assign realistic weights based on context
- Use neutral for ambiguous points
- Create meaningful categories
- Ensure all JSON is valid and parseable`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const responseText = response.text();

  // Clean up the response (remove markdown code blocks if present)
  let cleanedText = responseText.trim();
  if (cleanedText.startsWith('```json')) {
    cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleanedText.startsWith('```')) {
    cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  const parsed = JSON.parse(cleanedText);

  // Transform to our types with IDs
  const items: ComparisonItem[] = parsed.items.map((item: any) => ({
    id: generateId(),
    name: item.name,
    description: item.description,
    points: item.points.map((point: any) => ({
      id: generateId(),
      text: point.text,
      type: point.type,
      weight: Math.max(1, Math.min(10, point.weight)),
      category: point.category
    }))
  }));

  return {
    items,
    categories: parsed.categories || []
  };
}

// Mock parser for testing without API key
export function mockParseComparisonText(text: string): ParsedInput {
  // Simple mock that creates a basic comparison
  const items: ComparisonItem[] = [
    {
      id: generateId(),
      name: 'Option A',
      points: [
        { id: generateId(), text: 'Great quality', type: 'pro', weight: 8, category: 'quality' },
        { id: generateId(), text: 'Expensive', type: 'con', weight: 6, category: 'price' },
        { id: generateId(), text: 'Good performance', type: 'pro', weight: 7, category: 'performance' }
      ]
    },
    {
      id: generateId(),
      name: 'Option B',
      points: [
        { id: generateId(), text: 'Affordable', type: 'pro', weight: 8, category: 'price' },
        { id: generateId(), text: 'Average quality', type: 'neutral', weight: 5, category: 'quality' },
        { id: generateId(), text: 'Decent performance', type: 'pro', weight: 6, category: 'performance' }
      ]
    }
  ];

  return {
    items,
    categories: ['quality', 'price', 'performance']
  };
}
