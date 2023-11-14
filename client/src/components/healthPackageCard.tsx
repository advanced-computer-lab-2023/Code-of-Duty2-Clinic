// HealthPackageDetails.tsx
import React from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

interface HealthPackageDetailsProps {
  name: string;
  amountToPay: number;
  discounts: {
    gainedDoctorSessionDiscount: number;
    gainedPharamcyMedicinesDiscount: number;
    gainedFamilyMembersDiscount: number;
  };
  packageDurationInYears: number;
}

const HealthPackageDetails: React.FC<HealthPackageDetailsProps> = ({
  name,
  amountToPay,
  discounts,
  packageDurationInYears,
}) => {
  return (
    <div>
      <Typography variant="h6">Health Package Details</Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Name: ${name}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Amount to Pay: ${amountToPay}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Package Duration (Years): ${packageDurationInYears}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Discounts"
            secondary={
              <List>
                <ListItem>
                  <ListItemText primary={`Gained Doctor Session Discount: ${discounts.gainedDoctorSessionDiscount}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Gained Pharmacy Medicines Discount: ${discounts.gainedPharamcyMedicinesDiscount}`} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={`Gained Family Members Discount: ${discounts.gainedFamilyMembersDiscount}`} />
                </ListItem>
              </List>
            }
          />
        </ListItem>
      </List>
    </div>
  );
};

export default HealthPackageDetails;
