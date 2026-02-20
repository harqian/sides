import { Comparison, ParsedInput } from '@/types/comparison';

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.error || 'Request failed');
  }

  return payload as T;
}

export async function parseComparisonWithServer(text: string): Promise<ParsedInput> {
  return postJson<ParsedInput>('/api/parse', { text });
}

export async function refineComparisonWithServer(
  comparison: Comparison,
  instructions: string
): Promise<Comparison> {
  const result = await postJson<Comparison>('/api/refine', { comparison, instructions });

  return {
    ...result,
    createdAt: new Date(result.createdAt),
    updatedAt: new Date(result.updatedAt)
  };
}

export async function mapPreferencesWithServer(
  historicalPreferences: Record<string, number>,
  newCategories: string[]
): Promise<Record<string, number>> {
  const result = await postJson<{ mapped: Record<string, number> }>('/api/preferences', {
    historicalPreferences,
    newCategories
  });

  return result.mapped;
}
