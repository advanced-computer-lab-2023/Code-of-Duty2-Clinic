import React, { useState, useEffect } from "react";
import HealthPackageDetails from "./healthPackageCard";
import { Card, CardContent, Grid, Button,styled } from "@mui/material";
import axios from "axios";
import { config } from "../configuration";
import { useQueryParams } from "../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";
import useGetHealthPackageOptions from "../hooks/useGetHealthPackageOptions";


const CenteredButtonContainer = styled('div')({
  textAlign: 'center',
  marginTop: '16px', // Adjust the spacing as needed
});

const WideButton = styled(Button)({
  width: '40%', // Adjust the width as needed
  fontFamily: 'Arial, sans-serif', // Change this to your desired font for buttons
  fontSize: '1.2rem',
  textTransform: 'none',
});


const fetchHealthPackages = async () => {
  try {
    const response = await axios.get(
      `${config.serverUri}/patients/health-packages`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching health packages:", error);
    return [];
  }
};

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
              <HealthPackageDetails {...packageItem} />
              <CenteredButtonContainer>
                <WideButton
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    handleNavigateToHealthPackagePayment(packageItem._id)
                  }
                >
                  Subscribe
                </WideButton>
              </CenteredButtonContainer>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>

  );
};

export default HealthPackageList;
