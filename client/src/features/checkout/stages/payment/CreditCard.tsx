import { FC, FormEvent, useContext, useState, forwardRef, Ref } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { StripeElements } from "@stripe/stripe-js";
import { Box, Button, Typography, Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { CheckoutContext } from "../../Checkout";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}

const AlertRef = forwardRef(Alert);

const CreditCard: FC = () => {
  const stripe = useStripe();
  const elements = useElements();

  const { handleNext, handleCreateOrder, total } = useContext(CheckoutContext);
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements: elements as StripeElements,
      confirmParams: {
        return_url: `${window.location.origin}/`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An error occurred with your card.");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsProcessing(false);
      setOpenSnackbar(true);
    } else {
      setMessage("Payment Success!");
      // await handleCreateOrder(total + 0, "card");   // replace with required data (appointments or health packages)
      setIsProcessing(false);
      handleNext();
      setOpenSnackbar(true);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Pay via Credit Card
      </Typography>

      <Box sx={{ mb: 2 }} />

      <PaymentElement
        id="payment-element"
        onChange={(e) => setCardComplete(e.complete)}
      />

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ opacity: 0.5, mt: 2 }}
      >
        Powered by <span style={{ fontWeight: "bold" }}>Stripe</span>
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          disabled={!cardComplete || isProcessing || !stripe || !elements}
          id="submit"
          sx={{ mt: 3, ml: 1 }}
        >
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Pay now"}
          </span>
        </Button>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <AlertRef
          onClose={() => setOpenSnackbar(false)}
          severity={message === "Payment Success!" ? "success" : "error"}
        >
          {message}
        </AlertRef>
      </Snackbar>
    </form>
  );
};

export default CreditCard;
