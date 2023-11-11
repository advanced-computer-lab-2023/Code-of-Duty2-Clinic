import * as React from "react";
import { styled } from "@mui/system";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";

interface WalletProps {
  balance: number;
  currency: string;
}

const StyledCard = styled(Card)({
  backgroundColor: "#f5f5f5",
  padding: "20px",
  borderRadius: "15px",
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  transition: "0.3s",
  width: "300px",
  "&:hover": {
    boxShadow: "0 12px 20px 0 rgba(0,0,0,0.2)",
  },
});

const BalanceTypography = styled(Typography)({
  color: "#4caf50",
  fontWeight: "bold",
});

const Wallet: React.FC<WalletProps> = ({ balance, currency }) => (
  <Box display="flex" justifyContent="center" m={1} p={1}>
    <StyledCard>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", fontSize: "2rem" }}
        >
          Wallet
        </Typography>
        <BalanceTypography variant="h4">
          Balance: {balance.toFixed(2)} {currency}
        </BalanceTypography>
      </CardContent>
    </StyledCard>
  </Box>
);

export default Wallet;
