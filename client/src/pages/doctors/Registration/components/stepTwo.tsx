import { Button, Grid ,TextField } from '@mui/material';
import React, {  useContext, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import { IFormTwoData } from '../DoctorRegistrationRequestForm';
import { AuthContext } from '../../../../contexts/AuthContext';
import { VerificationStatus } from '../../../../types/enums/VerficationStatus';

interface IStepTwoFormProps {
    passFormDataToParent:(data:IFormTwoData)=>void;
}

const StepTwoForm : React.FC<IStepTwoFormProps> = ({passFormDataToParent}) =>{
    const methods = useForm<IFormTwoData>({
        defaultValues: {
          hourlyRate: '',
          affiliation: '',
          educationalBackground: '',
          speciality:''
        },
    });

    const { handleSubmit, control, reset, watch } = methods;
    return (
        <form onSubmit={methods.handleSubmit((data,event)=>{passFormDataToParent(data);event?.preventDefault()})}>
        <Grid container  
        direction="row"
        justifyItems={'end'}
        alignItems={'center'}
        minHeight={400}
        rowSpacing={1}
        >   
        
        <Grid item sm={12} xs={12}>
        <Controller
            name="hourlyRate"
            control={control}
            render={({ field }) => (
            // <input type="number" {...field} min="0" placeholder="Enter Your Hourly Rate"  />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                fullWidth
                {...field}
                variant="standard"
                type='number'
                label="Hourly Rate(EGP)"
                />
            </div>
            )}
        />
        </Grid>
        <Grid item sm={12} xs={12}>
        <Controller
            name="affiliation"
            control={control}
            render={({ field }) => (
            // <input type="text" {...field} placeholder="Enter Your Affiliation"  />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                fullWidth
                {...field}
                variant="standard"
                type='text'
                label="Your Affiliation"
                
                />
            </div>
            )}
        />
        </Grid>
        <Grid item sm={12} xs={12}>
        <Controller
            name="educationalBackground"
            control={control}
            render={({ field }) => (
            // <input type="text" {...field} placeholder="Enter Your Affiliation"  />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                fullWidth
                {...field}
                variant="standard"
                type='text'
                label="Educational Background"
                />
            </div>
            )}
        />
        </Grid>
        <Grid item sm={12} xs={12}>
        <Controller
            name="speciality"
            control={control}
            render={({ field }) => (
            // <input type="text" {...field} placeholder="Enter Your Affiliation"  />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <TextField
                fullWidth
                {...field}
                variant="standard"
                type='number'
                label="Speciality"
                />
            </div>
            )}
        />
        </Grid>
        <Button type='submit'>Save</Button>
    </Grid>
    </form>
    );
}
    

export default StepTwoForm