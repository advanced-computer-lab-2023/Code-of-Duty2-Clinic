import React, { useState, useEffect } from 'react';
import HealthPackageDetails from './healthPackageCard';
import { Card, CardContent, Grid, Button } from '@mui/material';
import axios from 'axios';
import { config } from '../configuration';
import { useQueryParams } from '../hooks/useQueryParams';
// Assume you have a function that fetches health packages from the server using Axios
const fetchHealthPackages = async () => {  
  try {
    const response = await axios.get(`${config.serverUri}/patients/health-packages`);
    return response.data;
  } catch (error) {
    console.error('Error fetching health packages:', error);
    return [];
  }
};

const HealthPackageList: React.FC = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const queryParams = useQueryParams();
  const type = queryParams.get('type');
  const id = queryParams.get('id');
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHealthPackages();
      setHealthPackages(data);
    };

    fetchData();
  }, []);

  const handleSubscribe = async (packageId: string) => {
    
    try {
      // Adjust the subscription endpoint based on the type
      if (type === 'r') {
        await axios.post<any>(
          `${config.serverUri}/patients/registered-member/subscribe/${id}/${packageId}`
        );
      } else if (type === 'd') {
        await axios.post<any>(
          `${config.serverUri}/patients/dependent-member/subscribe/${id}/${packageId}`
        );
      }
      else{
          await axios.post<any>(
            `${config.serverUri}/patients/subscribe/${packageId}`
          );
      }
      

      console.log('Subscription successful.');
    } catch (error) {
      console.error('Error subscribing to health package:', error);
    }
  }

  

  return (
    <Grid container spacing={2}>
      {healthPackages.map((packageItem: any) => (
        <Grid item xs={12} md={6} lg={4} key={packageItem._id}>
          <Card>
            <CardContent>
              <HealthPackageDetails {...packageItem} />
              <Button variant="contained" color="primary" onClick={() => handleSubscribe(packageItem._id)}>
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
