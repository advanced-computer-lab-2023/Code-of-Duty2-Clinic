import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import WalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import React, { useState, useContext } from "react";
import { Box, Card, CardMedia, Tooltip, Typography } from "@mui/material";

import Wallet from "./payment/Wallet";
import CreditCard from "./payment/CreditCard";
import { PaymentContext } from "../PaymentConfirmationComponent";

type PaymentProps = {
  children: React.ReactNode;
};
const Payment: React.FC<PaymentProps> = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { totalPriceToPay } = useContext(PaymentContext);

  const handleTabChange = (
    _event: React.ChangeEvent<{}>,
    newTabIndex: number
  ) => {
    setTabIndex(newTabIndex);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ ml: 1, mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Pay El7a2ni LLC
            </Typography>

            <Typography variant="h4">
              EGP {totalPriceToPay.toFixed(2)}
            </Typography>
          </Box>
          <Card elevation={0}>{children}</Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="fullWidth">
            <Tab
              icon={
                <Tooltip title="Wallet">
                  <WalletIcon />
                </Tooltip>
              }
            />

            <Tab
              icon={
                <Tooltip title="Credit Card">
                  <CreditCardIcon />
                </Tooltip>
              }
            />
          </Tabs>

          <Box mt={2}>
            {tabIndex === 0 && <Wallet />}
            {tabIndex === 1 && <CreditCard />}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Payment;
