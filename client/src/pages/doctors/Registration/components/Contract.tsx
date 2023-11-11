import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from '../context/application';
import { redirect } from 'react-router-dom';
import { config } from '../../../../configuration';
import axios from 'axios';

const Contract : React.FC = () => {
    const [contract,setContract] = useState<string>()
    useEffect(()=>{
        axios.get(`${config.serverUri}/doctors/users/contract`).then((res)=>{
            console.log(res.data)
            setContract(res.data.contractUrl)
        })
    },[])
    async function handleAccept(){

       try{
            await axios.post(`${config.serverUri}/doctors/users/accept-contract`)
       }catch(err){

       }
        //api to create a doctor and remove request 
        redirect('/login/doctor')
    }
    
const {setStep} =useContext(ApplicationContext)
    return(
        <div>{contract&& 
            <div>
                <iframe width="400px"
                    height="500px" src={contract}></iframe>
                <Button color='primary' onClick={handleAccept}>Accept Offer</Button>
            </div>}
      
       </div>
    )
}
    

export default Contract