import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const Stripe = (await import('stripe')).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-10-29.clover',
    });

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    const body = await request.text();
    const signature = request.headers.get('stripe-signature')!;

    let event: any;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const metadata = session.metadata!;

      let userId = metadata.userId;

      // Create user if they don't exist
      if (!userId && metadata.userEmail && metadata.userName) {
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const user = await prisma.user.create({
          data: {
            email: metadata.userEmail,
            name: metadata.userName,
            password: hashedPassword,
            role: 'client',
          },
        });

        userId = user.id;
        
        // TODO: Send email with login credentials
        console.log(`New user created: ${metadata.userEmail}, temp password: ${tempPassword}`);
      }

      if (userId) {
        // Create project
        const project = await prisma.project.create({
          data: {
            title: metadata.title || `${metadata.packageType} Website`,
            description: metadata.description || 'New project',
            packageType: metadata.packageType,
            price: session.amount_total! / 100,
            userId,
            status: 'pending',
          },
        });

        // Create payment record
        await prisma.payment.create({
          data: {
            amount: session.amount_total! / 100,
            status: 'completed',
            stripeSessionId: session.id,
            projectId: project.id,
          },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}
