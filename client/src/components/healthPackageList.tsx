import React from "react";
import { Card, CardContent, Grid, Button, Typography, ListItemText, ListItem, List, Box } from "@mui/material";
import { useQueryParams } from "../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import useGetHealthPackageOptions from "../hooks/useGetHealthPackageOptions";


const HealthPackageList: React.FC = () => {
  const queryParams = useQueryParams();
  const type = queryParams.get("type");
  const id = queryParams.get("id");
  const healthPackages = useGetHealthPackageOptions().data;
  const navigate = useNavigate();
  const handleNavigateToHealthPackagePayment = (packageId: string) => {
    switch (type) {
      case "r":
        navigate(
          `/patient/health-package/${packageId}/payment?type=r&id=${id}`
        );
        break;
      case "d":
        navigate(
          `/patient/health-package/${packageId}/payment?type=d&id=${id}`
        );
        break;
      default:
        navigate(`/patient/health-package/${packageId}/payment`);
        break;
    }
  };

  return (
    <Grid container spacing={2}>
      {healthPackages?.map((packageItem: any) => (
        <Grid item xs={12} md={6} lg={4} key={packageItem._id}>
            <Card>
      <CardContent>
        <Typography variant="h4" align="center" sx={{marginBottom: "2rem"}}>{packageItem.name}</Typography>
            <Typography variant="h6">Price: {packageItem.amountToPay}</Typography>

        
            <Typography variant="h6">Package Duration (Years): {packageItem.packageDurationInYears}</Typography>
        
            <Typography variant="h6">Discounts: </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Discount on sessions with doctors"
                  secondary={packageItem.discounts.gainedDoctorSessionDiscount > 0 ? packageItem.discounts.gainedDoctorSessionDiscount  * 100 + "%" : "None"}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Discount on medicines bought from the pharmacy"
                  secondary={packageItem.discounts.gainedPharamcyMedicinesDiscount > 0 ? packageItem.discounts.gainedPharamcyMedicinesDiscount  * 100 + "%" : "None"}	
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Discount for family members"
                  secondary={packageItem.discounts.gainedFamilyMembersDiscount * 100 + "%"}
                />
              </ListItem>
            </List>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                <Button 
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleNavigateToHealthPackagePayment(packageItem._id)
                  }
                >
                  Subscribe
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HealthPackageList;
