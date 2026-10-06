import Stripe from 'stripe';
import UserModel from '../models/user.model.js';
import PaymentModel from '../models/payment.model.js';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const CREDIT_MAP = {
    100: 50,
    200: 120,
    500: 350,
};

export const createCreditsOrder = async (req, res) => {
    try {
        const userId = req.userId;
        const { amount } = req.body;

        if (!CREDIT_MAP[amount]) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            success_url: `${process.env.CLIENT_URL}/payment-success`,
            cancel_url: `${process.env.CLIENT_URL}/payment-failed`,
            line_items: [
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: `${CREDIT_MAP[amount]} Credits`,
                        },
                        unit_amount: amount * 100,
                    },
                    quantity: 1,
                },
            ],
            metadata: {
                userId,
                credits: CREDIT_MAP[amount],
            },
        });

        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Stripe order error:', error);
        res.status(500).json({ message: 'Stripe error' });
    }
};

export const StripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error('Webhook signature error:', error.message);
        return res.status(400).json({
            message: 'Stripe webhook error'
        });
    }

    try {
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            const userId = session.metadata?.userId;
            const creditsToAdd = Number(session.metadata?.credits);

            if (!userId || !creditsToAdd) {
                return res.status(400).json({
                    message: 'Invalid webhook data'
                });
            }

            // Verify that Stripe has actually marked the payment as paid
            if (session.payment_status !== 'paid') {
                console.log(
                    `Payment not completed for session: ${session.id}`
                );

                return res.json({
                    received: true,
                    message: 'Payment not completed'
                });
            }

            // Check if this Stripe event was already processed
            const existingPayment = await PaymentModel.findOne({
                stripeEventId: event.id
            });

            if (existingPayment) {
                console.log(`Duplicate webhook ignored: ${event.id}`);

                return res.json({
                    received: true,
                    message: 'Event already processed'
                });
            }

            // Create payment record
            await PaymentModel.create({
                userId,
                stripeEventId: event.id,
                stripeSessionId: session.id,
                paymentIntentId: session.payment_intent,
                amount: session.amount_total / 100,
                currency: session.currency,
                credits: creditsToAdd,
                status: 'paid'
            });

            // Add credits only after payment has been verified
            const user = await UserModel.findByIdAndUpdate(
                userId,
                {
                    $inc: { credits: creditsToAdd },
                    $set: { iscreditAvailable: true }
                },
                { new: true }
            );

            if (!user) {
                console.error(`User not found: ${userId}`);
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            console.log(
                `Added ${creditsToAdd} credits to user ${userId}`
            );
        }

        return res.json({ received: true });

    } catch (error) {
        console.error('Webhook processing error:', error);

        return res.status(500).json({
            message: 'Webhook processing failed'
        });
    }
};

export const getPurchaseHistory = async (req, res) => {
    try {
        const userId = req.userId;

        const payments = await PaymentModel.find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json(payments);
    } catch (error) {
        console.error('Purchase history error:', error);

        res.status(500).json({
            message: 'Failed to fetch purchase history'
        });
    }
};