import { NextRequest, NextResponse } from 'next/server';
import { mapPreferencesToCategories } from '@/lib/ai/preferenceMapper';

export async function POST(request: NextRequest) {
  try {
    const { historicalPreferences, newCategories } = await request.json();

    if (!historicalPreferences || typeof historicalPreferences !== 'object') {
      return NextResponse.json({ error: 'Historical preferences are required' }, { status: 400 });
    }

    if (!Array.isArray(newCategories)) {
      return NextResponse.json({ error: 'New categories must be an array' }, { status: 400 });
    }

    const mapped = await mapPreferencesToCategories(historicalPreferences, newCategories);
    return NextResponse.json({ mapped });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to map preferences';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
