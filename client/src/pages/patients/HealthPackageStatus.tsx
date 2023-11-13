// YourPage.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import SubscribedPackageCard from "../../components/healthPackageStatusCard";
import { config } from "../../configuration";

const YourPage: React.FC = () => {
  const [subscribedHealthPackage, setSubscribedHealthPackage] = useState<
    any | null
  >(null);

  useEffect(() => {
    const fetchSubscribedHealthPackage = async () => {
      try {
        const response = await axios.get<any>(
          `${config.serverUri}/patients/patient-health-package`
        );
        console.log("API Response:", response.data);
        setSubscribedHealthPackage(response.data.subscribedHealthPackage);
      } catch (error) {
        console.error("Error fetching subscribed health package:", error);
      }
    };

    fetchSubscribedHealthPackage();
  }, []);

  const handleCancelSubscription = async () => {
    try {
      // Make a PATCH request to cancel the subscription
      await axios.patch(`${config.serverUri}/patients/cancel-subscription`);
      const response = await axios.get<any>(
        `${config.serverUri}/patients/patient-health-package`
      );
      setSubscribedHealthPackage(response.data.subscribedHealthPackage);
      // Assuming the cancellation was successful, you can update the local state or perform any other necessary actions
    } catch (error) {
      console.error("Error cancelling subscription:", error);
    }
  };

  return (
    <div className="your-page">
      <h2>Subscribed Health Package Page</h2>
      {subscribedHealthPackage ? (
        <SubscribedPackageCard
          packageId={subscribedHealthPackage.packageId}
          startDate={subscribedHealthPackage.startDate}
          endDate={subscribedHealthPackage.endDate}
          status={subscribedHealthPackage.status}
          onCancelSubscription={handleCancelSubscription}
        />
      ) : (
        <p>Loading subscribed health package details...</p>
      )}
    </div>
  );
};

export default YourPage;
