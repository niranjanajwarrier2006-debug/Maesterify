import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
// Note: If you have a password hashing function in lib/auth (like hashPassword), import it here!

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    // 1. Validation check
    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
    }

    // 2. Check if the user already exists in your PostgreSQL database
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 400 });
    }

    // 3. Save the brand new user dynamically into the database
    const newUser = await prisma.user.create({
      data: {
        email,
        password, // Ideally hashed, but using plain text if matching your current login system
        name: name || 'New Archmaester',
      },
    });

    return NextResponse.json({ message: 'Account created successfully!', userId: newUser.id }, { status: 201 });

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal gateway error during registration' }, { status: 500 });
  }
}