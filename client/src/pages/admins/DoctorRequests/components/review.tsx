// ViewDoctorRegistrationRequest.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IExperienceFile } from '../../../doctors/Registration/DoctorRegistrationRequestForm';
import { getFormattedDate } from '../../../../utils/formatter';
import { config } from '../../../../configuration';
import FilesTable from '../../../../components/filesTable';


interface ViewDoctorRegistrationRequestProps {
  
}
export interface DoctorRequest {
  _id:string
  username: string;
  email: string;
  name:string;
  gender:string;
  mobileNumber:number;
  dateOfBirth:string;
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  experienceFiles:IExperienceFile[]
}

function BasicRequestDetails() {
  const [doctorRequest , setDoctorRequest] = useState<DoctorRequest>(null!)

  // GET FROM AUTH REQUEST STATUS
  const {doctorId} = useParams()
  useEffect(()=>{
    axios.get(`${config.serverUri}/admins/doctor-registration/${doctorId}`)
      .then((response)=>{
        console.log("s");
        
        setDoctorRequest(response.data)
      })
      .catch((err)=>{console.log(err)})
  },[doctorId])
  return (
    <div>
      <h2>View Doctor Registration Request</h2>
      
      {doctorRequest && <div><p><strong>Username:</strong> {doctorRequest.username}</p>
      <p><strong>Email:</strong> {doctorRequest.email}</p>
      <p><strong>Name:</strong> {doctorRequest.name}</p>
      <p><strong>Gender:</strong> {doctorRequest.gender}</p>
      <p><strong>Mobile Number:</strong> {doctorRequest.mobileNumber}</p>
      <p><strong>Date of birth:</strong> {getFormattedDate(doctorRequest.dateOfBirth)}</p>
      <p><strong>Hourly Rate:</strong> {doctorRequest.hourlyRate}</p>
       <p><strong>Affiliation:</strong> {doctorRequest.affiliation}</p>
       <p><strong>Educational Background:</strong> {doctorRequest.educationalBackground}</p>
       
       </div>}
      
    </div>
  );
}

export default BasicRequestDetails;
