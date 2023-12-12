import React from 'react';
import { List, ListItem, ListItemText, Typography, styled } from '@mui/material';
import DiscountIcon from '@mui/icons-material/Discount';

const StyledDiv = styled('div')({
  backgroundColor: '#f0f0f0',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const SubscribeButtonContainer = styled('div')({
  textAlign: 'center',
  marginTop: '16px',
});

const DiscountListItemText = styled(ListItemText)({
  display: 'flex',
  marginTop: '8px', 
  textAlign: 'center',
});

const DiscountTypography = styled(Typography)({
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: '1rem',
  marginLeft: '8px', 
});

const PackageNameTypography = styled(Typography)({
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  fontSize: '2rem',
  marginBottom: '8px',
  textAlign: 'center',
});

const ValueTypography = styled(Typography)({
  fontFamily: 'Arial, sans-serif', 
  fontWeight: 'bold',
  fontSize: '1.25rem',
  marginLeft: '8px', 
  textAlign: 'center',
});

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
  const formattedAmountToPay = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amountToPay);

  return (
    <StyledDiv>
      <List>
        <ListItem>
          <ListItemText
            primary={<PackageNameTypography>{name}</PackageNameTypography>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={<Typography  align='center' variant="h6">Amount to Pay</Typography>}
            secondary={<ValueTypography variant="body1">{formattedAmountToPay}</ValueTypography>}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={<Typography align='center' variant="h6">Package Duration</Typography>}
            secondary={
              <ValueTypography variant="body1">
                {packageDurationInYears} {packageDurationInYears === 1 ? 'Year' : 'Years'}
              </ValueTypography>
            }
          />
        </ListItem>
        <ListItem>
          <SubscribeButtonContainer>
            <ListItemText
              primary={<Typography variant="h6">Discounts</Typography>}
              secondary={
                <List>
                  <ListItem>
                    <DiscountListItemText
                      primary={
                        <DiscountTypography variant="body1">
                          <DiscountIcon />
                          Doctor Session Discount: {discounts.gainedDoctorSessionDiscount * 100}%
                        </DiscountTypography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <DiscountListItemText
                      primary={
                        <DiscountTypography variant="body1">
                          <DiscountIcon />
                          Pharmacy Medicines Discount: {discounts.gainedPharamcyMedicinesDiscount * 100}%
                        </DiscountTypography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <DiscountListItemText
                      primary={
                        <DiscountTypography variant="body1">
                          <DiscountIcon />
                          Family Members Discount: {discounts.gainedFamilyMembersDiscount * 100}%
                        </DiscountTypography>
                      }
                    />
                  </ListItem>
                </List>
              }
            />
          </SubscribeButtonContainer>
        </ListItem>
      </List>
    </StyledDiv>
  );
};

export default HealthPackageDetails;
