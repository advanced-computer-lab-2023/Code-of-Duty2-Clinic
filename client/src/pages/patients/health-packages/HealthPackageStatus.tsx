// YourPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import SubscribedPackageCard from "../../../components/healthPackageStatusCard";
import { config } from "../../../configuration";

const YourPage: React.FC = () => {
  const [subscribedHealthPackage, setSubscribedHealthPackage] = useState<
    any | null
  >(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscribedHealthPackage = async () => {
      try {
        const response = await axios.get<any>(
          `${config.serverUri}/patients/patient-health-package`
        );
        console.log("API Response:", response.data);
        setSubscribedHealthPackage(response.data.subscribedHealthPackage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscribed health package:", error);
      }
    };

    fetchSubscribedHealthPackage();
  }, []);

  const handleCancelSubscription = async () => {
    try {
      setLoading(true);
      // Make a PATCH request to cancel the subscription
      await axios.patch(`${config.serverUri}/patients/cancel-subscription`);
      const response = await axios.get<any>(
        `${config.serverUri}/patients/patient-health-package`
      );
      setSubscribedHealthPackage(response.data.subscribedHealthPackage);
      setLoading(false);
      // Assuming the cancellation was successful, you can update the local state or perform any other necessary actions
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box mt={2} display="flex" justifyContent="center">
        {loading ? (
          <CircularProgress />
        ) : subscribedHealthPackage ? (
          <Card style={{ minWidth: 300, maxWidth: 600 }}>
            <CardContent>
              <SubscribedPackageCard
                packageId={subscribedHealthPackage.packageId}
                startDate={subscribedHealthPackage.startDate}
                endDate={subscribedHealthPackage.endDate}
                status={subscribedHealthPackage.status}
                onCancelSubscription={handleCancelSubscription}
              />
              <Divider />
              {/* You can leave this part empty or remove it */}
            </CardContent>
          </Card>
        ) : (
          <Box textAlign="center">
            <Typography variant="body1" gutterBottom>
              No subscribed health package found.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default YourPage;
