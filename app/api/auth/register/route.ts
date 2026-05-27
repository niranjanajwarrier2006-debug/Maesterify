import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../../lib/auth';

const prisma = new PrismaClient();

/**
 * Next.js 14 POST Route Handler for User Registration
 * * Narrative logic: 
 * 1. Checks whether the incoming request contains a valid email and password.
 * 2. Checks whether that email already exists inside our PostgreSQL database rows.
 * 3. Otherwise, hashes the plain text password and saves a new User profile record.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Checks whether both required fields are present
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required fields.' },
        { status: 400 }
      );
    }

    // Checks whether a user with this email address already exists in the system
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email already exists.' },
        { status: 400 }
      );
    }

    // Otherwise, encrypt the password and establish the profile record
    const encryptedPassword = await hashPassword(password);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: encryptedPassword,
        name: name || 'Unidentified Scholar',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150', // Default silhouette
        accumulatedXP: 0, // Initializing gamification metrics to 0
        readingStreak: 0,
      },
    });

    // Returns a beautiful, clean success response omitting the secret password hash
    return NextResponse.json(
      {
        message: 'Account successfully registered to the database archive.',
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('❌ Registration Error:', error);
    return NextResponse.json(
      { error: 'Internal server error encountered while writing user records.' },
      { status: 500 }
    );
  }
}