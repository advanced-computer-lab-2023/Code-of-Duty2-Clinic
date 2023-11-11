import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "";

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 8080;

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const PASSWORD_RESET_SECRET = process.env.PASSWORD_RESET_TOKEN_SECRET || "";
const WALLET_TOKEN = process.env.WALLET_TOKEN_SECRET || "";
const ACCESS_TOKEN_EXPIRATION_TIME =
  process.env.ACCESS_TOKEN_EXPIRATION_TIME || "30s";
const REFRESH_TOKEN_EXPIRATION_TIME =
  process.env.REFRESH_TOKEN_EXPIRATION_TIME || "40s";
const PASSWORD_RESET_TOKEN_EXPIRATION_TIME =
  process.env.PASSWORD_RESET_TOKEN_EXPIRATION_TIME || "10m";
const WALLET_TOKEN_EXPIRATION_TIME =
  process.env.WALLET_TOKEN_EXPIRATION_TIME || "10m";

const FRONT_END_URL = process.env.FRONT_END_URL || "http://localhost:5173";

const corsOptions: cors.CorsOptions = {
  origin: FRONT_END_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const config = {
  mongo: {
    uri: MONGO_URI,
  },
  server: {
    port: SERVER_PORT,
    corsOptions,
    auth: {
      accessTokenSecret: ACCESS_TOKEN_SECRET,
      accessTokenExpirationTime: ACCESS_TOKEN_EXPIRATION_TIME,
      refreshTokenSecret: REFRESH_TOKEN_SECRET,
      refreshTokenExpirationTime: REFRESH_TOKEN_EXPIRATION_TIME,

      passwordResetSecret: PASSWORD_RESET_SECRET,
      passwordResetTokenExpirationTime: PASSWORD_RESET_TOKEN_EXPIRATION_TIME,

      walletTokenSecret: WALLET_TOKEN,
      walletTokenExpirationTime: WALLET_TOKEN_EXPIRATION_TIME,
    },
    emailServiceCredentials: {
      user: process.env.GOOGLE_EMAIL_API_USER || "",
      clientId: process.env.GOOGLE_EMAIL_API_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_EMAIL_API_CLIENT_SECRET || "",
      redirectUri: process.env.GOOGLE_EMAIL_API_REDIRECT_URI || "",
      refreshToken: process.env.GOOGLE_EMAIL_API_REFRESH_TOKEN || "",
    },
    paymentServiceCredentials: {
      stripePublishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
    },
  },
  frontEndUri: FRONT_END_URL,
};

export default config;
