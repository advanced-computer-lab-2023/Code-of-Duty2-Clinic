import { Box, Button, Snackbar, Typography } from "@mui/material";
import { FormEvent, Ref, forwardRef, useContext, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { PaymentContext } from "../../PaymentConfirmationComponent";
import { getErrorMessage } from "../../../../utils/displayError";

function Alert(props: AlertProps, ref: Ref<any>) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
}

const AlertRef = forwardRef(Alert);

const Wallet = () => {
  const { handleNext, handleWalletPayment } = useContext(PaymentContext);
  const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await handleWalletPayment();
      setIsProcessing(false);
      handleNext();
    } catch (error: any) {
      setMessage(getErrorMessage(error));
      setOpenSnackbar(true);
      setIsProcessing(false);
    }
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Pay via Wallet
      </Typography>
      <p>Experience the convenience of digital wallet payments.</p>
      <p>
        No need for cash or cards. Just place your order and pay using your
        El7a2ni digital wallet. Enjoy this modern and reliable method of
        payment.
      </p>

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={handleSubmit}
          variant="outlined"
          disabled={isProcessing}
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
        <AlertRef onClose={() => setOpenSnackbar(false)} severity="error">
          Error: {message}
        </AlertRef>
      </Snackbar>
    </form>
  );
};

export default Wallet;
