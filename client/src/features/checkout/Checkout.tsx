import { Ref, forwardRef, useEffect, useState } from "react";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AlertProps, CircularProgress, Snackbar } from "@mui/material";
import axios from "axios";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MuiAlert from "@mui/material/Alert";

import Payment from "./stages/Payment";
import { config } from "../../configuration";
import CheckoutContext from "../../contexts/CheckoutContext";
import PaymentMethod from "../../types/PaymentMethod";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}

const AlertRef = forwardRef(Alert);

const checkoutStages = ["Payment Details"];

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [stripePromise, setStripePromise] =
    useState<null | Promise<Stripe | null>>(null);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [activeStage, setActiveStage] = useState(0);
  const [price, setPrice] = useState(1000);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    (async () => {
      await setupPayment();
      setLoading(false);
    })();
  }, []);

  const setupPayment = async () => {
    // TODO: fetch item price to be bought
    if (price !== undefined) {
      await fetchStripePublishableKey();
      await fetchPaymentIntentClientSecret(price);
    }
  };

  const fetchStripePublishableKey = async () => {
    const response = await axios.get(
      `${config.serverUri}/patients/payments/configuration`
    );
    const publishableKey = response.data.publishableKey;
    setStripePromise(loadStripe(publishableKey));
  };

  const fetchPaymentIntentClientSecret = async (total: number) => {
    const response = await axios.post(
      `${config.serverUri}/patients/payments/create-payment-intent`,
      { amount: total }
    );
    const clientSecret = response.data.clientSecret;
    setClientSecret(clientSecret);
  };

  const handleNext = () => {
    setActiveStage(activeStage + 1);
  };

  const handleBack = () => {
    setActiveStage(activeStage - 1);
  };

  const handleCreateOrder = async (
    // logic for creating an payment
    paidAmount: number,
    paymentMethod: PaymentMethod
  ) => {
    try {
      const patientResponse = await axios.get(
        `${config.serverUri}/patients/me`
      );
      const patientData = patientResponse.data;

      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  function getStepContent(stage: number) {
    switch (stage) {
      case 0:
        return <Payment />;
      default:
        throw new Error("Unexpected payment stage");
    }
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <CheckoutContext.Provider
      value={{
        total: price,
        handleCreateOrder,
        handleNext,
      }}
    >
      <Container component="main" sx={{ mb: 4 }}>
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>

        <Stepper activeStep={activeStage} sx={{ pt: 3, pb: 5 }}>
          {checkoutStages.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStage === checkoutStages.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              Thank you for nothing.
            </Typography>
            <Typography variant="subtitle1">
              Your payment has been proccessed successfully. Wait for a
              confirmation email :')
            </Typography>
            <Snackbar
              open={openSnackbar}
              autoHideDuration={4500}
              onClose={() => setOpenSnackbar(false)}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <AlertRef
                onClose={() => setOpenSnackbar(false)}
                severity="success"
              >
                Payment placed successfully!
              </AlertRef>
            </Snackbar>
          </>
        ) : (
          <>
            {clientSecret && stripePromise ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                {getStepContent(activeStage)}
              </Elements>
            ) : (
              <CircularProgress />
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStage !== 0 && (
                <Button onClick={handleBack} sx={{ mt: -6, mr: "auto" }}>
                  Back
                </Button>
              )}
            </Box>
          </>
        )}
      </Container>
    </CheckoutContext.Provider>
  );
};

export { CheckoutContext };
export default Checkout;
