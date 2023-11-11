import Stripe from "stripe";
import config from "../configurations";

const stripe = new Stripe(
  config.server.paymentServiceCredentials.stripeSecretKey,
  {
    apiVersion: "2023-10-16",
    typescript: true,
  }
);

export default stripe;
