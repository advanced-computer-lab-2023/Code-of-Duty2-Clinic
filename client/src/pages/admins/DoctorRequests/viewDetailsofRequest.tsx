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
  status:"accepted"|"pending documents upload"|"pending contract acceptance"|"rejected"
}

function ViewDoctorRegistrationRequest() {
  const [doctorRequest , setDoctorRequest] = useState<DoctorRequest>(null!)

  // GET FROM AUTH REQUEST STATUS
  const context = useContext(AuthContext)
  let requestStatus = context.authState.verificationStatus

  const {doctorId} = useParams()
  useEffect(()=>{
    axios.get(`${config.serverUri}/admins/doctor-registration/${doctorId}`)
      .then((response)=>{
        setDoctorRequest(response.data)
      })
      .catch((err)=>{console.log(err)})
  },[doctorId])  
      if(doctorRequest) return (
        <div> 
          { (requestStatus===VerificationStatus.pendingContractAcceptance ) && <BasicRequestDetails/>}

          { doctorRequest.experienceFiles && <FilesTable files={doctorRequest.experienceFiles}/>}

          { doctorRequest.status==='pending contract acceptance' && <SendContract/>}
        </div>
      );else{
        return (<h1>dd</h1>)
      }
}

export default ViewDoctorRegistrationRequest;
