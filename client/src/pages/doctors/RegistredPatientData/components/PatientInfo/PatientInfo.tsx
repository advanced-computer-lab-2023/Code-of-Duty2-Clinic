import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { config } from "../../../../../configuration";
import { Box } from "@mui/material";

const PatientGeneralDetails: React.FC = () => {
   const [patientData, setPatientData] = useState<any>(null);

   const patientId = useParams().patientId!;
   const fetchPatientData = async () => {
      try {
         const response = await axios.get(`${config.serverUri}/doctors/patients/${patientId}`);
         setPatientData(response.data);
      } catch (error) {
         console.error("Error:", error);
      }
   };

   useEffect(() => {
      fetchPatientData();
   }, []);

   if (!patientData) return <div>Loading...</div>;
   return (
      <Box >
         <h2>View Patient Data and Health Records</h2>

         <p>
            <strong>Username:</strong> {patientData.patientInfo.username}
         </p>
         <p>
            <strong>Email:</strong> {patientData.patientInfo.email}
         </p>
         <p>
            <strong>Name:</strong> {patientData.patientInfo.name}
         </p>
         <p>
            <strong>Gender:</strong> {patientData.patientInfo.gender}
         </p>
         <p>
            <strong>Mobile Number:</strong> {patientData.patientInfo.mobileNumber}
         </p>
         <p>
            <strong>Date of Birth:</strong>{" "}
            {new Date(patientData.patientInfo.dateOfBirth).toLocaleDateString()}
         </p>
         <p>
            <strong>Emergency Contact:</strong> {patientData.patientInfo.emergencyContact.fullname}
         </p>
         <p>
            <strong>Relation to Patient:</strong>{" "}
            {patientData.patientInfo.emergencyContact.relationToPatient}
         </p>
      </Box>
   );
};

export default PatientGeneralDetails;
