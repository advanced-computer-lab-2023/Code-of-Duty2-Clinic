// ViewDoctorRegistrationRequest.tsx
import { getFormattedDate } from '../../utils/formatter';

interface ViewDoctorRegistrationRequestProps {
  request: DoctorRequest;
  onClose: () => void;
}
export interface DoctorRequest {
  username: string;
  email: string;
  name:string;
  gender:string;
  mobileNumber:number;
  dateOfBirth:string;
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
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
      <p><strong>Date of birth:</strong> {getFormattedDate(request.dateOfBirth)}</p>
      <p><strong>Hourly Rate:</strong> {request.hourlyRate}</p>
       <p><strong>Affiliation:</strong> {request.affiliation}</p>
       <p><strong>Educational Background:</strong> {request.educationalBackground}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ViewDoctorRegistrationRequest;
