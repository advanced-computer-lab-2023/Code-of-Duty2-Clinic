// DoctorRequestView.tsx
import './ViewDoctorRegistrationRequest.css'; 
// ViewDoctorRegistrationRequest.tsx

import React, { useState, useEffect } from 'react';

const ViewDoctorRegistrationRequest: React.FC = () => {
  const [email, setEmail] = useState('');
  const [doctorRequest, setDoctorRequest] = useState<any>(null);

  const fetchDoctorRequest = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/admins/doctor-registration-requests/${email}`);
      if (response.ok) {
        const data = await response.json();
        setDoctorRequest(data);
      } else {
        console.error('Error fetching doctor registration request');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchDoctorRequest();
    }
  }, [email]);

  return (
    <div className="view-doctor-registration-request">
      <h2>View Doctor Registration Request</h2>
      <div>
        <label htmlFor="email">Enter Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchDoctorRequest}>View Request</button>
      </div>

      {doctorRequest && (
        <div>
          <p><strong>Username:</strong> {doctorRequest.username}</p>
          <p><strong>Email:</strong> {doctorRequest.email}</p>
          <p><strong>Name:</strong> {doctorRequest.name}</p>
          <p><strong>Gender:</strong> {doctorRequest.gender}</p>
          <p><strong>Mobile Number:</strong> {doctorRequest.mobileNumber}</p>
          {/* Add more fields as needed */}
        </div>
      )}
    </div>
  );
};

export default ViewDoctorRegistrationRequest;