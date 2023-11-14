// ViewDoctorRegistrationRequest.tsx
import { useContext, useEffect, useState } from 'react';
import { config } from '../../../configuration';
import axios from 'axios';
import FilesTable from '../../../components/filesTable';
import { IExperienceFile } from '../../doctors/Registration/DoctorRegistrationRequestForm';
import { useParams } from 'react-router-dom';
import SendContract from './components/SendContract';
import BasicRequestDetails from './components/review';
import { AuthContext } from '../../../contexts/AuthContext';
import { VerificationStatus } from '../../../types/enums/VerficationStatus';
import { Button, Divider, Typography } from '@mui/material';
import { Margin } from '@mui/icons-material';
import { buttonStyle } from './viewDoctorRequests';
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
  identificationUrl:string,
  medicalLicenseUrl:string,
  medicalDegreeUrl:string,
  status:"accepted"|"pending documents upload"|"pending contract acceptance"|"rejected"
}
async function rejectRequest(){
  //axios reject 
}
function ViewDoctorRegistrationRequest() {
  const [doctorRequest , setDoctorRequest] = useState<DoctorRequest>(null!)
  const [files , setFiles] = useState<any>(null!)

  // GET FROM AUTH REQUEST STATUS


  const {doctorId} = useParams()
  useEffect(()=>{
    axios.get(`${config.serverUri}/admins/doctor-registration/${doctorId}`)
      .then((response)=>{
        setDoctorRequest(response.data)
        console.log(response.data.identificationUrl)
        const resFiles = [
          {name:'identification', url:response.data.identificationUrl},
          {name:'medicalDegree', url:response.data.medicalDegreeUrl},
          {name:'medicalLicense', url:response.data.medicalLicenseUrl}
        ]
        setFiles(resFiles)
      })
      .catch((err)=>{console.log(err)})
  },[doctorId])  

 
      if(doctorRequest) return (
        
        <div> 
          <Typography variant="h5" sx={{margin:'auto'}} align='center' gutterBottom  >
            View Doctor Registration Request 
            {doctorRequest.status==='accepted'&&  <Typography color='green'>Accepted</Typography>} 
            {doctorRequest.status==='rejected'&& <Typography color='red'>Rejected</Typography>}
            {doctorRequest.status==='pending documents upload'&& <Typography color='gray'>InComplete</Typography>}
            {doctorRequest.status==='pending contract acceptance'&& <Typography color='blue'>Submission Completed</Typography>}
          </Typography>
          <BasicRequestDetails requestStatus={doctorRequest.status}/>
          <Divider />
          {doctorRequest.status!=='pending documents upload'&&doctorRequest.status!=='rejected' && <FilesTable files={files}/>}

        </div>
      );else{
        return (<h1>dd</h1>)
      }
}

export default ViewDoctorRegistrationRequest;
