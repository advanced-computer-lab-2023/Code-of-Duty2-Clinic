import React, { useState, useEffect } from 'react';
import ViewDoctorRegistrationRequest from './viewDetailsofRequest';
import'./viewDoctorRequest.css'

interface DoctorRequest {
  _id: string;
  username: string;
  email: string;
  name:string;
  gender:string;
  mobileNumber:number;
}

function DoctorRegistrationRequests() {
  const [requests, setRequests] = useState<DoctorRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DoctorRequest | null>(null);

  // Fetch a list of doctor registration requests
  useEffect(() => {
    // Fetch the list of requests from the backend and set them in the state.
    // Replace this with your actual API endpoint.
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/admins/doctor-registration-requests');
        if (response.ok) {
          const data = await response.json() as DoctorRequest[];
          setRequests(data);
        }
      } catch (error) {
        console.error('Error fetching doctor registration requests:', error);
      }
    };

    fetchData();
  }, []);

  const handleViewRequest = (request: DoctorRequest) => {
    setSelectedRequest(request);
  };

  return (
    <div className="registration-container">
  <h2 className="registration-heading">Doctor Registration Requests</h2>
  <ul className="registration-list">
    {requests.map((request) => (
      <li key={request._id} className="registration-item">
        <span className="registration-username">{request.username}</span>
        <button className="registration-button" onClick={() => handleViewRequest(request)}>View Request</button>
      </li>
    ))}
  </ul>

  {selectedRequest && (
    <ViewDoctorRegistrationRequest
      request={selectedRequest}
      onClose={() => setSelectedRequest(null)}
    />
  )}
</div>

  );
}

export default DoctorRegistrationRequests;
