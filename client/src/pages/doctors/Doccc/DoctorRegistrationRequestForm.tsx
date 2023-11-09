import React, { useEffect, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import { Button,Container,Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { config } from '../../../configuration';
import StepOneForm from './components/stepOne';
import StepTwoForm from './components/stepTwo';
import StepThreeForm from './components/stepThree';

export interface IFormOneData {
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  mobileNumber: string;
  dateOfBirth: string;
  
}
export interface IFormTwoData {
  hourlyRate: string;
  affiliation: string;
  educationalBackground: string;
  medicalDegree: string;
}

export interface IExperienceFile{
  url:string,
  type:string
  name:string
}

interface FormData {
  username: string;
  password: string;
  email: string;
  name: string;
  gender: string;
  mobileNumber: string;
  dateOfBirth: string;
  hourlyRate: string;
  affiliation: string;
  educationalBackground: string;
  medicalDegree: string;
  medicalLicenses: [];
  id: { front: File | null; back: File | null };
  activeStep:number,
  fileName:string,
  file:File|string,
  files:{file:File,fileType:String}[]
}

const DoctorRegistrationRequestForm: React.FC = () => {
  const [filesChanged, setFilesChanged] = useState(false);
  const [activeStep,setActiveStep] = useState<number>(0)
  const methods = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
      email: '',
      name: '',
      gender: 'choose your gender',
      mobileNumber: '',
      dateOfBirth: '',
      hourlyRate: '',
      affiliation: '',
      educationalBackground: '',
      medicalDegree: '',
      medicalLicenses: [],
      id: { front: null, back: null },
      activeStep:0,
      files:[],
      fileName:'',
      file:''
    },
  });
  const watchedFiles = useWatch({ name: 'files', control: methods.control });



  
  const { handleSubmit, control, reset, watch } = methods;

  const steps = ['Personal Info', 'Experience', 'Experince'];
 

  const handleNext = () => {
    // Update the active step without affecting form data
    setActiveStep(activeStep=> activeStep + 1);
  };

  const handleBack = () => {
    // Update the active step without affecting form data
    setActiveStep(activeStep=> activeStep - 1);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (activeStep === 2) {
      // Handle form submission when all steps are completed
      console.log(data.medicalLicenses);
      await axios.post(`${config.serverUri}/users/doctor-registration`, data);
      reset(); // Optional: Reset the form after submission
    } else {
      handleNext(); // Proceed to the next step
    }
  };
  function handleStepOneData(formData:IFormOneData){
    console.log(formData)
  }
  function handleStepTwoData(formData:IFormTwoData){
    console.log(formData)
  }
  function handleStepThreeData(formData:IExperienceFile[]){
    console.log(formData)
  }

  return (
    <Stack width={'80%'} direction={'column'} alignItems={'center'} justifyContent={'space-between'} >
      <Typography  fontSize={20} fontWeight={500} textAlign={'center'}>
        Doctor Registration Request
      </Typography>
        <Container>
          <Stepper  sx={{marginTop:3}} activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <div>
            {activeStep === 0 && (
              <StepOneForm key={activeStep} passFormDataToParent={(data:IFormOneData)=>handleStepOneData(data)} />
            )}
            {activeStep === 1 && (
              <StepTwoForm key={activeStep} passFormDataToParent={(data:IFormTwoData)=>handleStepTwoData(data)}/>   
            )}
            {activeStep === 2 && (
              <StepThreeForm key={activeStep} passFormDataToParent={(data:IExperienceFile[])=>handleStepThreeData(data)}/>
            )}
            
            <Stack direction={'row'} justifyContent={'space-between'} marginBottom={7}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Submit Request' : 'Next'}
              </Button>
            </Stack>

          </div>
          </Container>
    </Stack>
    
  );
};

export default DoctorRegistrationRequestForm;
