// import React, { useState, ChangeEvent, FormEvent } from 'react';

// import '../../css/DoctorRegistrationRequestFormStyle.css';
// import { config } from '../../configuration';
// import axios from 'axios';

// interface FormData {
//   username: string;
//   password: string;
//   email: string;
//   name: string;
//   gender: string;
//   mobileNumber: string;
//   dateOfBirth: string;
//   hourlyRate: string;
//   affiliation: string;
//   educationalBackground: string;
//   medicalDegree: string;
//   medicalLicenses:File[];
//   id:{front:File|null,back:null};
// }

// const DoctorRegistrationRequestForm: React.FC = () => {
//   const [formData, setFormData] = useState<FormData>({
//     username: '',
//     password: '',
//     email: '',
//     name: '',
//     gender: '',
//     mobileNumber: '',
//     dateOfBirth: '',
//     hourlyRate: '',
//     affiliation: '',
//     educationalBackground: '',
//     medicalDegree: '',
//     medicalLicenses:[],
//     id:{front:null,back:null}
//   });

//   const [message, setMessage] = useState<string>(''); // Initialize the message state

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       await axios.post(`${config.serverUri}/users/doctor-registration`, formData);
//     } catch (error: any) {
//         setMessage(error?.message || 'error occured during submission');
//     }
//   };

//   return (
//     <div>
//       <h2>Doctor Registration Request</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Username: </label>
//           <input
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleInputChange}
//             placeholder="Enter Your Username"
//             required
//           />
//         </div>

//         <div>
//           <label>Password: </label>
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleInputChange}
//             placeholder="Enter Your Password"
//             required
//           />
//         </div>

//         <div>
//           <label>Email: </label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             placeholder="Enter Your Email"
//             required
//           />
//         </div>

//         <div>
//           <label>Name: </label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             placeholder="Enter Your Full Name"
//             required
//           />
//         </div>

//         <div>
//           <label>Gender: </label>
//           <select
//             name="gender"
//             value={formData.gender}
//             onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => handleInputChange(e)}
//             required
//             >
//             <option value="choose your gender">choose your gender</option>  
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             </select>
//         </div>

//         <div>
//           <label>Mobile Number: </label>
//           <input
//             type="number"
//             name="mobileNumber"
//             min = "0"
//             value={formData.mobileNumber}
//             onChange={handleInputChange}
//             placeholder="Enter Your Mobile Number"
//             required
//           />
//         </div>

//         <div>
//           <label>Date of Birth: </label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div>
//           <label>Hourly Rate: </label>
//           <input
//             type="number"
//             name="hourlyRate"
//             min = "0"
//             value={formData.hourlyRate}
//             onChange={handleInputChange}
//             placeholder="Enter Your Hourly Rate"
//             required
//           />
//         </div>

//         <div>
//           <label>Affiliation: </label>
//           <input
//             type="text"
//             name="affiliation"
//             value={formData.affiliation}
//             onChange={handleInputChange}
//             placeholder="Enter Your Affiliation"
//             required
//           />
//         </div>

//         <div>
          // <label>Educational Background: </label>
          // <input
          //   type="text"
          //   name="educationalBackground"
          //   value={formData.educationalBackground}
          //   onChange={handleInputChange}
          //   placeholder="Enter Your Educational Background"
          //   required
          // />
//         </div>

//         <div>
//           <label>ID front: </label>
//           <input
//             type="file"
//             name="idFront"
//             onChange={handleInputChange}
//             placeholder="Enter Your Educational Background"
//             required
//           />
//         </div>

//         <div>
//           <label>ID back: </label>
//           <input
//             type="file"
//             name="idBack"
//             onChange={handleInputChange}
//             placeholder="Enter Your Educational Background"
//             required
//           />
//         </div>

//         <div>
//           <label>ID back: </label>
//           <input
//             type="file"
//             name="idBack"
//             onChange={handleInputChange}
//             placeholder="Enter Your Educational Background"
//             required
//           />
//         </div>

//         <div>
//           <label>Medical Degree</label>
//           <input
//             type="file"
//             name="idBack"
//             onChange={handleInputChange}
//             placeholder="Enter Your Educational Background"
//             required
//           />
//         </div>

//         <div>
//           <button type="submit">Submit Request</button>
//         </div>
//         {message && <p>{message}</p>}
//       </form>
//     </div>
//   );
// };

// export default DoctorRegistrationRequestForm;


import React from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FormProvider,
  useWatch,
} from 'react-hook-form';
import { Button, Grid, MenuItem, Select, Stack, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { config } from '../../configuration';
import PersonIcon from '@mui/icons-material/Person';

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
  medicalLicenses: File[];
  id: { front: File | null; back: File | null };
  activeStep:number
}

const DoctorRegistrationRequestForm: React.FC = () => {
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
      activeStep:0
    },
  });

  const { handleSubmit, control, reset, watch } = methods;

  const steps = ['Personal Info', 'Experience', 'Experince'];
  const activeStep = useWatch({
    control,
    name: 'activeStep',
    defaultValue: 0,
  });

  const handleNext = () => {
    // Update the active step without affecting form data
    methods.setValue('activeStep', activeStep + 1);
  };

  const handleBack = () => {
    // Update the active step without affecting form data
    methods.setValue('activeStep', activeStep - 1);
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

  return (
    <Stack width={'100%'} direction={'column'} alignItems={'center'} justifyContent={'space-between'} >
      <Typography marginBottom={4} fontSize={20} fontWeight={500} textAlign={'center'}>
      Doctor Registration Request
      </Typography>
      <FormProvider {...methods}>
        <form style={{'minWidth':'80%',padding:20,height:'100%'}} onSubmit={handleSubmit(onSubmit)}>
        <Stepper  sx={{marginTop:6}} activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
         
            <div>
              {activeStep === 0 && (
               <Grid container  
                    direction="row"
                    justifyItems={'end'}
                    alignItems={'center'}
                    minHeight={300}
                    rowSpacing={1}
               >
                  <Grid item sm={4} xs={12}>
                    <Controller
                      name="username"
                      control={control}
                      render={({ field }) => (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                        {...field}
                        variant="standard"
                        label="Username"
                        placeholder="Enter Your Username"
                        style={{ margin: 'auto' }}
                        required
                      />
                      </div>
                      )}
                    />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <TextField
                      {...field}
                      variant="standard"
                      type='password'
                      label="Password"
                      placeholder="Enter Your Password"
                      required
                    />
                    </div>
                      // <input type="password" {...field} placeholder="Enter Your Password" required />
                    )}
                  />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      // <input type="email" {...field} placeholder="Enter Your Email" required />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <TextField
                      {...field}
                      variant="standard"
                      type='email'
                      label="Email"
                      placeholder="Enter Your Email"
                      required
                    />
                    </div>
                    )}
                    
                  />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      // <input type="text" {...field} placeholder="Enter Your Full Name" required />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <TextField
                        {...field}
                        variant="standard"
                        type='text'
                        label="Name"
                        placeholder="Enter Your Full Name"
                        required
                        />
                      </div>
                    )}
                  />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Select
                      variant="standard"
                      {...field} 
                      defaultValue='choose your gender'
                      label='Gender'
                      required
                    >
                      <MenuItem value="choose your gender">choose your gender</MenuItem>
                      <MenuItem value="male">Twenty</MenuItem>
                      <MenuItem value="female">Thirty</MenuItem>
                    </Select>
                      
                    </div>
                    // <select {...field} required>
                      //   <option value="choose your gender">choose your gender</option>
                      //   <option value="male">Male</option>
                      //   <option value="female">Female</option>
                      // </select>
                    )}
                  />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="mobileNumber"
                    control={control}
                    render={({ field }) => (
                       // <input type="number" {...field} min="0" placeholder="Enter Your Mobile Number" required />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                     
                      <TextField
                      {...field}
                      variant="standard"
                      type='number'
                      label="Mobile Number"
                      placeholder="Enter Your Mobile Number"
                      required
                    />
                    </div>
                    )}
                  />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => 
                    // <input type="date" {...field} required />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <TextField
                    {...field}
                    variant="standard"
                    focused
                    placeholder='s'
                    type='date'
                    label="Date of Birth"
                    required
                  />
                  </div>
                  }/>
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="hourlyRate"
                    control={control}
                    render={({ field }) => (
                      // <input type="number" {...field} min="0" placeholder="Enter Your Hourly Rate" required />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>

                          <TextField
                          {...field}
                          variant="standard"
                          type='number'
                          label="Hourly Rate"
                          required
                        />
                      </div>
                    )}
                  />
                  </Grid>
                  <Grid item sm={4} xs={12}>
                  <Controller
                    name="affiliation"
                    control={control}
                    render={({ field }) => (
                      // <input type="text" {...field} placeholder="Enter Your Affiliation" required />
                      <div style={{ display: 'flex', justifyContent: 'center' }}>

                          <TextField
                          {...field}
                          variant="standard"
                          type='number'
                          label="Your Affiliation"
                          required
                        />
                      </div>
                    )}
                  />
                  </Grid>
                  {/* Add more fields for step 1 */}
                </Grid>
              )}
              {activeStep === 1 && (
              <Stack direction={'column'}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      // <input type="text" {...field} placeholder="Enter Your Full Name" required />
                      <TextField
                      {...field}
                      variant="standard"
                      type='text'
                      label="Name"
                      placeholder="Enter Your Full Name"
                      required
                    />
                    )}
                  />
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <select {...field} required>
                        <option value="choose your gender">choose your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  />
                  <Controller
                    name="mobileNumber"
                    control={control}
                    render={({ field }) => (
                      // <input type="number" {...field} min="0" placeholder="Enter Your Mobile Number" required />
                      <TextField
                      {...field}
                      variant="standard"
                      type='number'
                      label="Mobile Number"
                      placeholder="Enter Your Mobile Number"
                      required
                    />
                    )}
                  />
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    render={({ field }) => 
                    // <input type="date" {...field} required />
                    <TextField
                    {...field}
                    variant="standard"
                    type='date'
                    label="Date of Birth"
                    placeholder="Enter Your birth date"
                    required
                  />
                  }

                    
                  />
                  <Controller
                    name="hourlyRate"
                    control={control}
                    render={({ field }) => (
                      <input type="number" {...field} min="0" placeholder="Enter Your Hourly Rate" required />
                    )}
                  />
                  <Controller
                    name="affiliation"
                    control={control}
                    render={({ field }) => (
                      <input type="text" {...field} placeholder="Enter Your Affiliation" required />
                    )}
                  />
                  {/* Add more fields for step 2 */}
                </Stack>
              )}
              {activeStep === 2 && (
                <Stack direction={'column'}>
                  <Controller
                    name="educationalBackground"
                    control={control}
                    render={({ field }) => (
                      <input type="text" {...field} placeholder="Enter Your Educational Background" required />
                    )}
                  />
                  <Controller
                    name="medicalDegree"
                    control={control}
                    render={({ field }) => (
                      <input type="file" {...field} required />
                    )}
                  />
                  {/* <Controller
                    name="medicalLicenses"
                    control={control}
                    render={({ field }) => (
                      <input type="file" {...field} multiple required />
                    )}
                  /> */}
                  {/* <Controller
                    name="id.front"
                    control={control}
                    render={({ field }) => (
                      <input type="file" {...field} required />
                    )}
                  /> */}
                  {/* <Controller
                    name="id.back"
                    control={control}
                    render={({ field }) => (
                      <input type="file" {...field} required />
                    )}
                  /> */}
                </Stack>
              )}
             <Stack direction={'row'} justifyContent={'space-between'} marginBottom={7}>
          
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!methods.formState.isValid || methods.formState.isSubmitting}
          >
            {activeStep === steps.length - 1 ? 'Submit Request' : 'Next'}
          </Button>
        
        </Stack>
              
            </div>
          
           
        </form>
      </FormProvider>
    </Stack>
  );
};

export default DoctorRegistrationRequestForm;
