import React, { useState, useEffect } from 'react';
import { config } from '../../configuration';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewRegisteredPatientData: React.FC = () => {
  const [patientData, setPatientData] = useState<any>(null);

  const { patientId } = useParams();
  const fetchPatientData = async () => {
    try {
      const response = await axios.get(`${config.serverUri}/doctors/patients/${patientId}`);
      setPatientData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
      fetchPatientData();
  }, []);

  return (
    <div className="view-patient-data">
      <h2>View Patient Data and Health Records</h2>
     
      {patientData && (
        <div className="display-patient-data">
          <p><strong>Username:</strong> {patientData.patientInfo.username}</p>
          <p><strong>Email:</strong> {patientData.patientInfo.email}</p>
          <p><strong>Name:</strong> {patientData.patientInfo.name}</p>
          <p><strong>Gender:</strong> {patientData.patientInfo.gender}</p>
          <p><strong>Mobile Number:</strong> {patientData.patientInfo.mobileNumber}</p>
          <p><strong>Date of Birth:</strong> {new Date(patientData.patientInfo.dateOfBirth).toLocaleDateString()}</p>
          <p><strong>Emergency Contact:</strong> {patientData.patientInfo.emergencyContact.fullname}</p>
          <p><strong>Relation to Patient:</strong> {patientData.patientInfo.emergencyContact.relationToPatient}</p>
          <div>
            <h3>Health Records:</h3>
            {patientData.patientInfo.healthRecords && patientData.patientInfo.healthRecords.length > 0 ? (
              <ul>
                {patientData.patientInfo.healthRecords.map((record: string, index: number) => (
                  <li key={index}>{record}</li>
                ))}
              </ul>
            ) : (
              <p>No health records found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRegisteredPatientData;
