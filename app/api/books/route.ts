import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma'; // 3 levels up path corrected

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const genre = searchParams.get('genre');
    const rarity = searchParams.get('rarity');

    const filterConditions: any = {};
    if (genre) filterConditions.genre = genre;
    if (rarity) filterConditions.rarity = rarity;

    const books = await prisma.book.findMany({
      where: filterConditions,
    });

    return NextResponse.json({ books });
  } catch (error: any) {
    return NextResponse.json({ error: 'Could not fetch archive rows.' }, { status: 500 });
  }
}