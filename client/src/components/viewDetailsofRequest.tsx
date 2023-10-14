// ViewDoctorRegistrationRequest.tsx
import React from 'react';

interface ViewDoctorRegistrationRequestProps {
  request: DoctorRequest;
  onClose: () => void;
}
interface DoctorRequest {
  username: string;
  email: string;
  name:string;
  gender:string;
  mobileNumber:number;
}


function ViewDoctorRegistrationRequest({ request, onClose }: ViewDoctorRegistrationRequestProps) {
  return (
    <div>
      <h2>View Doctor Registration Request</h2>
      <p><strong>Username:</strong> {request.username}</p>
      <p><strong>Email:</strong> {request.email}</p>
      <p><strong>Name:</strong> {request.name}</p>
      <p><strong>Gender:</strong> {request.gender}</p>
      <p><strong>Mobile Number:</strong> {request.mobileNumber}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ViewDoctorRegistrationRequest;
