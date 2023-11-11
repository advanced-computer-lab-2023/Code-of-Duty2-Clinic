import React, {  useContext, useRef, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  useWatch,
} from 'react-hook-form';
import { Button,Container,Stack, Step, StepLabel, Stepper,Typography } from '@mui/material';
import axios from 'axios';
import { config } from '../../../configuration';
import StepOneForm from './components/stepOne';
import StepTwoForm from './components/stepTwo';
import StepThreeForm from './components/stepThree';
import { AuthContext } from '../../../contexts/AuthContext';
import { VerificationStatus } from '../../../types/enums/VerficationStatus';

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
  speciality?:string 
}

export interface IExperienceFile{
  url:string,
  DocumentType:string
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
  speciality?:string
  status:string
  // medicalLicenses: [];
  // id: { front: File | null; back: File | null };
  // activeStep:number,
  // fileName:string,
  // file:File|string,
  // files:{file:File,fileType:String}[]
   //experienceFiles:IExperienceFile[]
}

const DoctorRegistrationRequestForm: React.FC = () => {
  const [activeStep,setActiveStep] = useState<number>(0)
  const stepOneData = useRef<IFormOneData>(null!)
  const stepTwoData = useRef<IFormTwoData>(null!)
  //const stepThreeData = useRef<IExperienceFile[]>([])

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
      speciality:''
      //medicalLicenses: [],
      // id: { front: null, back: null },
      // activeStep:0,
      // files:[],
      // fileName:'',
      // file:''
    },
  });



  async function  submitRequest() {
      const {updateVerificationStatus} = useContext(AuthContext)

        const formData:FormData = {
          ...stepOneData.current,
          ...stepTwoData.current,
          status:'pending documents upload'
         // experienceFiles: stepThreeData.current,
        }
        try {
          console.log(await axios.post(`${config.serverUri}/auth/doctor-registration`, formData));
          updateVerificationStatus(VerificationStatus.pendingDocumentsUpload)
        } catch (error: any) {
            //setMessage(error?.message || 'error occured during submission');
        }
    };
  const steps = ['Personal Info', 'Experience'];
 

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
      await axios.post(`${config.serverUri}/auth/doctor-registration`, data);
    } else {
      handleNext(); // Proceed to the next step
    }
  };
  function handleStepOneData(formData:IFormOneData){
    stepOneData.current = formData
  }
  function handleStepTwoData(formData:IFormTwoData){
    stepTwoData.current = formData
  }
  // function handleStepThreeData(formData:IExperienceFile[]){
  //   stepThreeData.current = formData

  // }

  return (
    <Stack minWidth={'300px'}margin={'auto'} maxWidth={'500px'} sx={{backgroundColor:'gray'}} direction={'column'} alignItems={'center'} justifyContent={'center'} >
      <Typography  fontSize={20} fontWeight={500} textAlign={'center'}>
        Doctor Registration Request
      </Typography>
        <Container>
          <Stepper  sx={{marginTop:5,marginBottom:2}} activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                 <StepLabel></StepLabel>
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
            {/* {activeStep === 2 && (
              <StepThreeForm key={activeStep} passFormDataToParent={(data:IExperienceFile[])=>handleStepThreeData(data)}/>
            )} */}
            
            <Stack direction={'row'} justifyContent={'space-between'} marginBottom={7}>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={activeStep === steps.length - 1 ? submitRequest : handleNext}
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
