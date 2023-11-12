import React, { useState, useEffect } from 'react';
import HealthPackageDetails from './healthPackageCard';
import { Card, CardContent, Grid, Button } from '@mui/material';
import axios from 'axios';

// Assume you have a function that fetches health packages from the server using Axios
const fetchHealthPackages = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/patients//health-packages');
    return response.data;
  } catch (error) {
    console.error('Error fetching health packages:', error);
    return [];
  }
};

const HealthPackageList: React.FC = () => {
  const [healthPackages, setHealthPackages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHealthPackages();
      setHealthPackages(data);
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      {healthPackages.map((packageItem: any) => (
        <Grid item xs={12} md={6} lg={4} key={packageItem._id}>
          <Card>
            <CardContent>
              <HealthPackageDetails {...packageItem} />
              <Button variant="contained" color="primary">
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
