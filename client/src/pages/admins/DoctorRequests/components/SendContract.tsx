import { useEffect, useState,FC, useRef } from 'react';
import { config } from '../../../../configuration';
import axios from 'axios';
import { IExperienceFile } from '../../../doctors/Registration/DoctorRegistrationRequestForm';
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImage } from '../../../../services/fileUploader';
import { DoctorRequest } from './review';
import { Button } from '@mui/material';
import { buttonStyle } from '../viewDoctorRequests';


const SendContract:FC=()=> {
  const navigate = useNavigate()
  const contractFile = useRef<HTMLInputElement>(null!)
  const {doctorId} = useParams()
  async function upload(){
    
    const file = contractFile.current.files?.[0]!
    if(!file) return 
    try{ 
      const contractUrl = await uploadImage(file,'contracts',file.name||"")   
      await axios.put(`${config.serverUri}/admins/accept-doctor/${doctorId}`,{contract:contractUrl,status:"accepted"})
      navigate('')
    }catch(error){
      console.log(error)
    }
  }
  return(
    <div>
        <label >Contract </label>
        <input ref={contractFile} type='file' id='contract'></input>
        <Button sx={buttonStyle} onClick={()=>upload()}>Accept and Send to doctor</Button>
    </div>  
  );
}

export default SendContract;
