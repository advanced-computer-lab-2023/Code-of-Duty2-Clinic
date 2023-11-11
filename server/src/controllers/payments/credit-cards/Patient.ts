import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import stripe from "../../../utils/stripe";
import { StatusCodes } from "http-status-codes";

export const configureCreditCardPaymentHandler = (
  req: AuthorizedRequest,
  res: Response
) => {
  res
    .status(StatusCodes.OK)
    .send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
};

export const makeCreditCardPaymentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { amount, currency } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      currency: currency || "EGP",
      amount,
    });

    res
      .status(StatusCodes.OK)
      .send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: (err as Error).message });
  }
};
