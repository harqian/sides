export function getGeminiApiKey(): string {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('Server is missing GEMINI_API_KEY');
  }
  return apiKey;
}
