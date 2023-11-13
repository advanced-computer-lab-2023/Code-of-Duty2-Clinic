import { Box, Button, Typography } from "@mui/material";
import { FormEvent, useContext, useState } from "react";

import { CheckoutContext } from "../../Checkout";

const Wallet = () => {
  const { handleNext, handleCreateOrder, total } = useContext(CheckoutContext);
  // const [message, setMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await handleCreateOrder(total + 0, "wallet");
    setIsProcessing(false);
    handleNext();
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
    </form>
  );
};

export default Wallet;
