import React from 'react';
import HealthPackageList from '../../components/healthPackageList';

const HealthPackagePage: React.FC = () => {
  return (
    <div>
      <h1>Health Packages</h1>
      <HealthPackageList />
    </div>
  );
};

export default HealthPackagePage;