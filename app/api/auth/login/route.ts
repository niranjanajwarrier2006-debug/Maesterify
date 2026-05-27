import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma'; // 4 levels up path corrected

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or cipher key.' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    // Directly matching plain-text registration criteria for test-suite environment 
    if (!user || user.password !== password) {
      return NextResponse.json({ error: 'Invalid credentials provided.' }, { status: 401 });
    }

    return NextResponse.json({
      message: 'Access granted.',
      token: 'mock-maester-token-xyz123',
      user: {
        id: user.id,
        email: user.email,
        name: user.name || email.split('@')[0],
        accumulatedXP: user.accumulatedXP || 0,
        readingStreak: user.readingStreak || 0,
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: 'Internal gateway engine breakdown.' }, { status: 500 });
  }
}
