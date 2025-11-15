import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-10-29.clover',
    });

    const { packageType, title, description, price, userId, userEmail, userName } = await request.json();

    // Validate input
    if (!packageType || !price) {
      return NextResponse.json(
        { error: 'Package type and price are required' },
        { status: 400 }
      );
    }

    let finalUserId = userId;
    
    // If no userId provided, create account flow during checkout
    if (!finalUserId && userEmail && userName) {
      // This will be handled after payment success
      // For now, we'll pass the info in metadata
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title || `${packageType} Website Package`,
              description: description || `Professional ${packageType} website development`,
            },
            unit_amount: Math.round(price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        packageType,
        userId: finalUserId || '',
        userEmail: userEmail || '',
        userName: userName || '',
        title: title || '',
        description: description || '',
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
