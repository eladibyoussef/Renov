import { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { catchError } from '../Util/errorCatch';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const handlePayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'mad',
      payment_method_types: ['card'],
      payment_method: token,
      confirm: true,
    });

    res.status(200).json({ message: 'Payment successful', paymentIntent });
  } catch (error) {
    let message: string;
    message = catchError(error);
    res.status(500).json({ msg: message });
  }
};
