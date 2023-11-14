import React, { useState, useEffect } from "react";
import HealthPackageDetails from "./healthPackageCard";
import { Card, CardContent, Grid, Button } from "@mui/material";
import axios from "axios";
import { config } from "../configuration";
import { useQueryParams } from "../hooks/useQueryParams";
import { useNavigate } from "react-router-dom";

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
  const [healthPackages, setHealthPackages] = useState([]);
  const queryParams = useQueryParams();
  const type = queryParams.get("type");
  const id = queryParams.get("id");
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHealthPackages();
      setHealthPackages(data);
    };

    fetchData();
  }, []);

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
      {healthPackages.map((packageItem: any) => (
        <Grid item xs={12} md={6} lg={4} key={packageItem._id}>
          <Card>
            <CardContent>
              <HealthPackageDetails {...packageItem} />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  handleNavigateToHealthPackagePayment(packageItem._id)
                }
              >
                Subscribe
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HealthPackageList;
