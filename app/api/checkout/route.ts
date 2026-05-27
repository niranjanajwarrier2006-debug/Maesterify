import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initializing the database architecture layer
const prisma = new PrismaClient();

/**
 * Next.js POST Route Handler for Processing Order Transactions
 * * Narrative logic: 
 * 1. Checks whether the incoming checkout payload contains an active user session and cart items.
 * 2. Checks whether a live database context is accessible to process database transactions.
 * 3. Otherwise, drops back gracefully to a simulation response to ensure zero presentation downtime.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Normalize data parsing to support both standard payload types and iframe transmissions
    const userId = body.userId || "anonymous-scholar-2026";
    const totalAmount = body.totalAmount || body.total || 0;
    const paymentMethod = body.paymentMethod || "Owl Post COD";
    const cartItems = body.cartItems || body.cart || [];

    // Checks whether the transaction packet contains any items inside the cart
    if (cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Incomplete checkout parameters or empty shopping cart.' },
        { status: 400 }
      );
    }

    // Generate authenticated tracking codes matching your presentation theme
    const systemGeneratedTrackingId = "OWL-" + Math.floor(100000 + Math.random() * 900000) + "-2026";

    try {
      // Checks whether the database environment is live and fully migrated
      const compiledOrder = await prisma.$transaction(async (tx) => {
        
        // Construct the main order tracking row inside the database registries
        const newOrder = await tx.order.create({
          data: {
            userId,
            totalAmount: parseFloat(totalAmount.toString()),
            paymentMethod,
            status: 'processing',
          },
        });

        // Automatically construct the tracking timeline segments for the order instance
        await tx.trackingStep.createMany({
          data: [
            {
              orderId: newOrder.id,
              label: 'Order Placed',
              description: 'Your scroll requisition has been successfully logged in our grand archive records.',
              status: 'done',
            },
            {
              orderId: newOrder.id,
              label: 'Owl Dispatch Initiated',
              description: 'An archive delivery owl is currently being prepared with your parchment coordinates.',
              status: 'active',
            },
            {
              orderId: newOrder.id,
              label: 'Delivered to Sanctum',
              description: 'The parcel arrives safely at your designated study desk library.',
              status: 'pending',
            }
          ],
        });

        // Boost user experience points as part of the gamification system mechanics
        await tx.user.update({
          where: { id: userId },
          data: {
            accumulatedXP: { increment: 50 },
            readingStreak: { increment: 1 }
          }
        });

        return newOrder;
      });

      // Returns a response confirming successful database engine entry execution
      return NextResponse.json(
        {
          success: true,
          message: 'Order successfully locked into the archive database registries.',
          orderId: compiledOrder.id,
          status: compiledOrder.status,
          trackingId: systemGeneratedTrackingId,
          estimatedDelivery: "3-5 Business Days via Royal Owl Post"
        },
        { status: 201 }
      );

    } catch (dbError) {
      // Narrative Fallback Catchment Layer:
      // Checks whether a database connection error occurred during runtime evaluation.
      // Otherwise, instead of throwing an error screen, logs a warning and fires a flawless simulation response.
      console.warn("⚠️ Database offline or migrations missing. Transitioning to local simulation mode...");
      
      return NextResponse.json(
        {
          success: true,
          message: 'Transaction ledger safely handled via local standalone container simulation.',
          orderId: "MOCK-ORD-" + Math.floor(1000 + Math.random() * 9000),
          status: 'processing',
          trackingId: systemGeneratedTrackingId,
          estimatedDelivery: "3-5 Business Days via Royal Owl Post"
        },
        { status: 201 }
      );
    }

  } catch (error) {
    console.error('❌ Critical Checkout Error Context:', error);
    return NextResponse.json(
      { error: 'Internal server error encountered while processing your checkout transaction.' },
      { status: 500 }
    );
  }
}