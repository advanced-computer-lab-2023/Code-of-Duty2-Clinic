// SubscribedPackageBenefits.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";


const SubscribedPackageBenefits: React.FC = () => {
  const [healthPackageDetails, setHealthPackageDetails] = useState<any | null>(
    null
  );

  useEffect(() => {
    const fetchHealthPackageDetails = async () => {
      try {
        const response = await axios.get<any>(
          "http://localhost:3000/api/patients/package-benefits"
        );
        setHealthPackageDetails(response.data.subscribedHealthPackage);
      } catch (error) {
        console.error("Error fetching health package details:", error);
      }
    };

    fetchHealthPackageDetails();
  }, []);

  return (
    <div className="health-package-page">
      <h2>Health Package Page</h2>
      {healthPackageDetails ? (
        <HealthPackageDetails
          name={healthPackageDetails.name}
          amountToPay={healthPackageDetails.amountToPay}
          discounts={healthPackageDetails.discounts}
          packageDurationInYears={healthPackageDetails.packageDurationInYears}
        />
      ) : (
        <p>Loading health package details...</p>
      )}
    </div>
  );
};

export default SubscribedPackageBenefits;
