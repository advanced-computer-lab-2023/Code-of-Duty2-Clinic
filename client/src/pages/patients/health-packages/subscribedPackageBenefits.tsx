// SubscribedPackageBenefits.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import HealthPackageDetails from "../../../components/healthPackageCard";
import { config } from "../../../configuration";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

const SubscribedPackageBenefits: React.FC = () => {
  const [healthPackageDetails, setHealthPackageDetails] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHealthPackageDetails = async () => {
      try {
        const response = await axios.get<any>(
          `${config.serverUri}/patients/package-benefits`
        );
        setHealthPackageDetails(response.data.subscribedHealthPackage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching health package details:", error);
        setLoading(false);
      }
    };

    fetchHealthPackageDetails();
  }, []);

  return (
    <div className="health-package-page" style={{ padding: "16px", maxWidth: "600px", margin: "0 auto" }}>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </div>
      ) : healthPackageDetails ? (
        <div>
          <HealthPackageDetails
            name={healthPackageDetails.name}
            amountToPay={healthPackageDetails.amountToPay}
            discounts={healthPackageDetails.discounts}
            packageDurationInYears={healthPackageDetails.packageDurationInYears}
          />
        </div>
      ) : (
        <Typography variant="body1">
          No health package details available.
        </Typography>
      )}
    </div>
  );
};

export default SubscribedPackageBenefits;
