import { useState, useEffect } from 'react';
import ViewDoctorRegistrationRequest, { DoctorRequest } from './viewDetailsofRequest';
import'./ViewDoctorRequest.css'
import { config } from '../../configuration';
import axios from 'axios';


function DoctorRegistrationRequests() {
  const [requests, setRequests] = useState<DoctorRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DoctorRequest | null>(null);

  // Fetch a list of doctor registration requests
  useEffect(() => {
    // Fetch the list of requests from the backend and set them in the state.
    // Replace this with your actual API endpoint.
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.serverUri}/admins/doctor-registration-requests`);
        setRequests(response.data);
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
    {requests.map((request, index) => (
      <li key={index} className="registration-item">
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
