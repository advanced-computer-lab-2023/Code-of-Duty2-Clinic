import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscribedPackageCard from '../../components/healthPackageStatusCard';
import HealthPackageDetails from '../../components/healthPackageCard';
import { config } from '../../configuration';

interface FamilyMember {
  _id: string;
  // Add other relevant properties here
}

interface FamilyMemberPageProps {
  selectedFamilyMember: string | null;
  type: string; // 'r' for registered, 'd' for dependent
}

const FamilyMemberPage: React.FC<FamilyMemberPageProps> = ({ selectedFamilyMember, type }) => {
  const [subscribedHealthPackage, setSubscribedHealthPackage] = useState<any | null>(null);
  const [subscribedPackageCardData, setSubscribedPackageCardData] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedFamilyMember) {
          let apiEndpoint = '';
          if (type === 'r') {
            apiEndpoint = `${config.serverUri}/patients/registered-family-members/${selectedFamilyMember}`;
          } else if (type === 'd') {
            apiEndpoint = `${config.serverUri}/patients/dependent-family-members/${selectedFamilyMember}`;
          }

          if (apiEndpoint) {
            const response = await axios.get<any>(apiEndpoint);
            console.log('API Response:', response.data);
            setSubscribedHealthPackage(response.data.subscribedHealthPackage);

            // Make a separate API call to fetch data for SubscribedPackageCard
            const cardDataResponse = await axios.get<any>(
              `${config.serverUri}/patients/health-package-card-data/${response.data.subscribedHealthPackage.packageId}`
            );
            console.log('Card Data Response:', cardDataResponse.data);
            setSubscribedPackageCardData(cardDataResponse.data);
          }
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedFamilyMember, type]);

  const handleCancelSubscription = async () => {
    try {
      if (selectedFamilyMember) {
        // Make a PATCH request to cancel the subscription
        await axios.patch(`${config.serverUri}/patients/cancel-subscription/${selectedFamilyMember}`);
        
        // Assuming the cancellation was successful, you can update the local state or perform any other necessary actions
        console.log('Subscription cancelled successfully.');
        setSubscribedHealthPackage(null); // Set to null or update the state based on your application logic
      }
    } catch (error) {
      console.error('Error cancelling subscription:', error);
    }
  };

  return (
    <div className="family-member-page">
      <h2>{type === 'r' ? 'Registered' : 'Dependent'} Family Member Health Package Page</h2>
      {subscribedHealthPackage ? (
        <>
          <SubscribedPackageCard
            packageId={subscribedHealthPackage.packageId}
            startDate={subscribedHealthPackage.startDate}
            endDate={subscribedHealthPackage.endDate}
            status={subscribedHealthPackage.status}
            onCancelSubscription={handleCancelSubscription}
          />
          <HealthPackageDetails
            name={subscribedHealthPackage.name}
            amountToPay={subscribedHealthPackage.amountToPay}
            discounts={subscribedHealthPackage.discounts}
            packageDurationInYears={subscribedHealthPackage.packageDurationInYears}
          />
        </>
      ) : (
        <p>Loading subscribed health package details...</p>
      )}
    </div>
  );
};

export default FamilyMemberPage;
