import { NextResponse } from 'next/server';

/**
 * Next.js 14 POST Route Handler for Coupon Verification
 * * Narrative logic: 
 * 1. Checks whether the incoming request contains a non-empty coupon code string.
 * 2. Checks whether that code string perfectly matches the master phrase "ARCANUM10".
 * 3. Otherwise, drops an error notification stating that the scroll code is invalid.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { couponCode } = body;

    // Checks whether a coupon string was actually provided
    if (!couponCode) {
      return NextResponse.json(
        { error: 'No coupon code string was detected.' },
        { status: 400 }
      );
    }

    // Checks whether the coupon matches our ancient archive discount code
    if (couponCode.toUpperCase() === 'ARCANUM10') {
      return NextResponse.json(
        {
          message: 'The ancient scroll code is authentic! 10% discount applied.',
          discountPercentage: 10,
          isValid: true
        },
        { status: 200 }
      );
    }

    // Otherwise, the code is treated as completely invalid or expired
    return NextResponse.json(
      {
        error: 'The entered parchment code has crumbled to dust or is invalid.',
        isValid: false,
        discountPercentage: 0
      },
      { status: 400 }
    );

  } catch (error) {
    console.error('❌ Coupon Validation Error:', error);
    return NextResponse.json(
      { error: 'Internal server error encountered while decrypting coupon logs.' },
      { status: 500 }
    );
  }
}
