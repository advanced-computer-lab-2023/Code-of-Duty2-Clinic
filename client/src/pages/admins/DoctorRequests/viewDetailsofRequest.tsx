// ViewDoctorRegistrationRequest.tsx
import { useEffect, useState } from 'react';
import { config } from '../../../configuration';
import axios from 'axios';
import FilesTable from '../../../components/filesTable';
import { IExperienceFile } from '../../doctors/Registration/DoctorRegistrationRequestForm';
import { useParams } from 'react-router-dom';
import SendContract from './components/SendContract';
import BasicRequestDetails from './components/review';

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

function ViewDoctorRegistrationRequest() {
  const [doctorRequest , setDoctorRequest] = useState<DoctorRequest>(null!)

  // GET FROM AUTH REQUEST STATUS
  let requestStatus = 'Accepted'
  requestStatus=requestStatus

  const {doctorId} = useParams()
  useEffect(()=>{
    axios.get(`${config.serverUri}/admins/doctor-registration/${doctorId}`)
      .then((response)=>{
        console.log("s");
        
        setDoctorRequest(response.data)
      })
      .catch((err)=>{console.log(err)})
  },[doctorId])  
      if(doctorRequest) return (
        <div> 
          { (requestStatus==='pendingDocumentUploads' || requestStatus==='COMPLETED FORM') && <BasicRequestDetails/>}

          { requestStatus==='COMPLETED FORM'  && <FilesTable files={doctorRequest.experienceFiles}/>}
          
          { requestStatus==='Accepted' && <SendContract/>}
        </div>
      );else{
        return (<h1>dd</h1>)
      }
}

export default ViewDoctorRegistrationRequest;
