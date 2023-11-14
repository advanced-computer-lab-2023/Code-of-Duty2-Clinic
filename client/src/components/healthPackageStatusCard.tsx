// SubscribedPackageCard.tsx
import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import { getFormattedDateTime } from "../utils/formatter";

interface SubscribedPackageCardProps {
  packageId: string;
  startDate: string;
  endDate: string;
  status: string;
  onCancelSubscription: () => void;
}

const SubscribedPackageCard: React.FC<SubscribedPackageCardProps> = ({
  packageId,
  startDate,
  endDate,
  status,
  onCancelSubscription,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Subscribed Health Package</Typography>
        <Typography>Package ID: {packageId}</Typography>
        <Typography>Start Date: {getFormattedDateTime(startDate)}</Typography>
        <Typography>End Date: {getFormattedDateTime(endDate)}</Typography>
        <Typography>Status: {status}</Typography>
        <Button
          variant="outlined"
          color="error"
          onClick={onCancelSubscription}
          disabled={status == "cancelled"}
        >
          Cancel Subscription
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscribedPackageCard;
