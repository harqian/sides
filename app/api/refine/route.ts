import { NextRequest, NextResponse } from 'next/server';
import { refineComparison } from '@/lib/ai/refiner';
import { Comparison } from '@/types/comparison';

export async function POST(request: NextRequest) {
  try {
    const { comparison, instructions } = await request.json();

    if (!comparison || typeof comparison !== 'object') {
      return NextResponse.json({ error: 'Comparison is required' }, { status: 400 });
    }

    if (!instructions || typeof instructions !== 'string' || !instructions.trim()) {
      return NextResponse.json({ error: 'Instructions are required' }, { status: 400 });
    }

    const updated = await refineComparison(comparison as Comparison, instructions.trim());
    return NextResponse.json(updated);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to refine comparison';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
