import React, {  useContext, useRef, useState } from 'react';
import { Button,Container,Grid,Input,Stack,Typography } from '@mui/material';
import axios from 'axios';
import { config } from '../../../configuration';
import { uploadImage } from '../../../services/fileUploader';
import { AuthContext } from '../../../contexts/AuthContext';
import { ApplicationContext } from './context/application';

interface IFile{
    url:string,
    type:string
    file:File
}

export interface IExperienceFile{
  url:string,
  DocumentType:string
  name:string
}

interface FormData {
    status?:string,
    identificationUrl: string ,
    medicalLicenseUrl: string,
    medicalDegreeUrl: string,
}

const DoctorRegistrationRequestFormFiles: React.FC = () => {
 const {setStep}= useContext(ApplicationContext)
    const identificationFile = useRef<HTMLInputElement>(null!)
    const medicalLicenseFile = useRef<HTMLInputElement>(null!)
    const medicalDegreeFile = useRef<HTMLInputElement>(null!)

    const SaveFile =async (_:any) => {
      let fileUrl:string =''
      try{ 
        const identificationUrl= await uploadImage(identificationFile.current.files?.[0]!,'idetification',"")
        const medicalLicenseUrl= await uploadImage(medicalLicenseFile.current.files?.[0]!,'medicalLicense',"")
        const medicalDegreeUrl= await uploadImage(medicalDegreeFile.current.files?.[0]!,'idetification',"")

        const files= {
            identificationUrl:identificationUrl,
            medicalLicenseUrl:medicalLicenseUrl,
            medicalDegreeUrl:medicalDegreeUrl,
            status:'pending contract acceptance'
        }

        await axios.put(`${config.serverUri}/doctors/users/doctor-registration`, files);
        setStep(2)

      }catch(error){}
    }

  return (
    <Stack minWidth={'300px'}margin={'auto'} maxWidth={'500px'} sx={{backgroundColor:'gray'}} direction={'column'} alignItems={'center'} justifyContent={'center'} >
        <Typography  fontSize={20} fontWeight={500} textAlign={'center'}>
          Doctor Registration Request
        </Typography>
        <Container>

          <div>
          <Stack minHeight={400}
        direction={'row'} padding={5} alignItems={'start'}>
            
        <Grid container  
          direction="row"
          justifyItems={'center'}
          alignItems={'center'}
          rowSpacing={1}>
            
            <div>
              <Grid container  
                direction="row"
                justifyItems={'start'}
                alignItems={'end'}
                marginBottom={10}> 
                <Grid item sm={12} xs={12}>
                    <Input  inputRef={identificationFile} id='identification' fullWidth type="file"/>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Input inputRef={medicalLicenseFile} id='medicalLicense' fullWidth type="file"/>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <Input inputRef={medicalDegreeFile} id='medicalDegree' fullWidth type="file"/>
                </Grid>
              </Grid>
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={SaveFile}
              >
                Submit Request
            </Button>
        </Grid>
        </Stack>     
           
          </div>
          </Container>
    </Stack>
    
  );
};

export default DoctorRegistrationRequestFormFiles;
