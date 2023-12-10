// SubscribedPackageCard.tsx
import React from "react";
import { Card, CardContent, Typography, Button, styled } from "@mui/material";
import { getFormattedDateTime } from "../utils/formatter";

interface SubscribedPackageCardProps {
  packageId: string;
  startDate: string;
  endDate: string;
  status: string;
  onCancelSubscription: () => void;
}

const StyledCard = styled(Card)({
  minWidth: 300,
  maxWidth: 600,
  textAlign: "center",
  margin: "auto",
  marginTop: "16px",
});

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
});

const PackageIdTypography = styled(Typography)({
  fontSize: "1.2rem",
  fontWeight: "bold",
  marginTop: "16px",
});

const SubscribedPackageCard: React.FC<SubscribedPackageCardProps> = ({
  packageId,
  startDate,
  endDate,
  status,
  onCancelSubscription,
}) => {
  return (
    <StyledCard>
      <StyledCardContent>
        <Typography variant="h6" fontSize="2rem" gutterBottom>
          Subscribed Health Package
        </Typography>
        <PackageIdTypography gutterBottom>
          Package ID: {packageId}
        </PackageIdTypography>
        <Typography variant="h6" fontSize="1.2rem" fontWeight="bold" gutterBottom>
          Start Date: {getFormattedDateTime(startDate)}
        </Typography>
        <Typography variant="h6" fontSize="1.2rem" fontWeight="bold" gutterBottom>
          End Date: {getFormattedDateTime(endDate)}
        </Typography>
        <Typography variant="h6" fontSize="1.2rem" fontWeight="bold" gutterBottom>
          Status: {status}
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={onCancelSubscription}
          disabled={status === "cancelled"}
          style={{ marginTop: "16px" }}
        >
          Cancel Subscription
        </Button>
      </StyledCardContent>
    </StyledCard>
  );
};

export default SubscribedPackageCard;
