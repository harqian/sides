import { NextRequest, NextResponse } from 'next/server';
import { parseComparisonText } from '@/lib/ai/parser';

export async function POST(request: NextRequest) {
  try {
    const { text } = await request.json();

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const parsed = await parseComparisonText(text);
    return NextResponse.json(parsed);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to parse comparison';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
