import { Response } from "express";
import { AuthorizedRequest } from "../../../types/AuthorizedRequest";
import stripe from "../../../utils/stripe";
import { StatusCodes } from "http-status-codes";
import config from "../../../configurations";

export const configureCreditCardPaymentHandler = (
  req: AuthorizedRequest,
  res: Response
) => {
  res.status(StatusCodes.OK).send({
    publishableKey:
      config.server.paymentServiceCredentials.stripePublishableKey,
  });
};

export const makeCreditCardPaymentHandler = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: amount * 100,
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
