// SubscribedPackageCard.tsx
import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';

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
  // Function to format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Subscribed Health Package</Typography>
        <Typography>Package ID: {packageId}</Typography>
        <Typography>Start Date: {formatDate(startDate)}</Typography>
        <Typography>End Date: {formatDate(endDate)}</Typography>
        <Typography>Status: {status}</Typography>
        <Button variant="outlined" color="error" onClick={onCancelSubscription} disabled={status=='cancelled'}>
          Cancel Subscription
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscribedPackageCard;
