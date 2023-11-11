import { Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import { IFormOneData } from '../DoctorRegistrationRequestForm';


interface IStepOneProps {
    passFormDataToParent:(data:IFormOneData)=>void
}
const StepOneForm : React.FC<IStepOneProps> = ({passFormDataToParent}) =>{
    const methods = useForm<IFormOneData>({
        defaultValues: {
          username: '',
          password: '',
          email: '',
          name: '',
          gender: 'choose your gender',
          dateOfBirth: '',
          mobileNumber: '',
        },
      });
    const { handleSubmit, control, reset, watch } = methods;

    return (
       
        <form onSubmit={methods.handleSubmit(data=>passFormDataToParent(data))}>
         <Grid container  
        direction="row"
       justifyContent={'space-between'}
        alignItems={'center'}
        minHeight={400}
        rowSpacing={1}
        padding={5}
        >
      <Grid item sm={12} xs={12}>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
            fullWidth
            {...field}
            variant="standard"
            label="Username"
            placeholder="Enter Your Username"
          />
          </div>
          )}
        />
      </Grid>
      <Grid item sm={12} xs={12}>
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
          fullWidth
          {...field}
          variant="standard"
          type='password'
          label="Password"
          placeholder="Enter Your Password"
          
        />
        </div>
          // <input type="password" {...field} placeholder="Enter Your Password"  />
        )}
      />
      </Grid>
      <Grid item sm={12} xs={12}>
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          // <input type="email" {...field} placeholder="Enter Your Email"  />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
          fullWidth
          {...field}
          variant="standard"
          type='email'
          label="Email"
          placeholder="Enter Your Email"
          
        />
        </div>
        )}
        
      />
      </Grid>
      <Grid item sm={12} xs={12}>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          // <input type="text" {...field} placeholder="Enter Your Full Name"  />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <TextField
            fullWidth
            {...field}
            variant="standard"
            type='text'
            label="Name"
            placeholder="Enter Your Full Name"
            
            />
          </div>
        )}
      />
      </Grid>
      <Grid item sm={12} xs={12}>
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Select
          fullWidth
          variant="standard"
          {...field} 
          defaultValue='choose your gender'
          label='Gender'
        >
          <MenuItem value="choose your gender">choose your gender</MenuItem>
          <MenuItem value="male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </Select>
          
        </div>
        
        )}
      />
      </Grid>
      <Grid item sm={3} xs={12}>
      <Controller
        name="mobileNumber"
        control={control}
        render={({ field }) => (
           // <input type="number" {...field} min="0" placeholder="Enter Your Mobile Number"  />
          <div style={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>     
          <TextField
          {...field}
          variant="standard"
          type='number'
          label="Mobile Number"
          placeholder="Enter Your Mobile Number"
        />
        </div>
        )}
      />
      </Grid>
      <Grid item sm={3} xs={12}>
      <Controller
        name="dateOfBirth"
        control={control}
        render={({ field }) => 
        // <input type="date" {...field}  />
        <div style={{ display: 'flex', justifyContent: 'center' }}>

        <TextField
        {...field}
        variant="standard"
        focused
        placeholder='s'
        type='date'
        label="Date of Birth"
      />
      </div>
      }/>
      
      </Grid>
      {/* Add more fields for step 1 */}
      
      </Grid>
      <Button type='submit'>Save</Button>
      </form>
   
    );
}
    

export default StepOneForm