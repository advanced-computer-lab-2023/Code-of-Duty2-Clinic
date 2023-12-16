// import { Button, Grid, MenuItem, Select, TextField } from "@mui/material";
// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { IFormOneData } from "../DoctorRegistrationRequestForm";

// interface IStepOneProps {
//   passFormDataToParent: (data: IFormOneData) => void;
// }

// const StepOneForm: React.FC<IStepOneProps> = ({ passFormDataToParent }) => {
//   const methods = useForm<IFormOneData>({
//     defaultValues: {
//       username: "",
//       password: "",
//       email: "",
//       name: "",
//       gender: "choose your gender",
//       dateOfBirth: "",
//       mobileNumber: "",
//     },
//   });
//   const { control } = methods;

//   return (
//     <form onSubmit={methods.handleSubmit((data) => passFormDataToParent(data))}>
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Controller
//             name="username"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 {...field}
//                 variant="standard"
//                 label="Username"
//                 placeholder="Enter Your Username"
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="password"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 {...field}
//                 variant="standard"
//                 type="password"
//                 label="Password"
//                 placeholder="Enter Your Password"
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="email"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 {...field}
//                 variant="standard"
//                 type="email"
//                 label="Email"
//                 placeholder="Enter Your Email"
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="name"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 fullWidth
//                 {...field}
//                 variant="standard"
//                 type="text"
//                 label="Name"
//                 placeholder="Enter Your Full Name"
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="gender"
//             control={control}
//             render={({ field }) => (
//               <Select
//                 fullWidth
//                 variant="standard"
//                 {...field}
//                 defaultValue="choose your gender"
//                 label="Gender"
//               >
//                 <MenuItem value="choose your gender">
//                   choose your gender
//                 </MenuItem>
//                 <MenuItem value="male">Male</MenuItem>
//                 <MenuItem value="female">Female</MenuItem>
//               </Select>
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="mobileNumber"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 variant="standard"
//                 type="number"
//                 label="Mobile Number"
//                 placeholder="Enter Your Mobile Number"
//                 inputProps={{ min: 1 }}
//               />
//             )}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Controller
//             name="dateOfBirth"
//             control={control}
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 variant="standard"
//                 focused
//                 placeholder="s"
//                 type="date"
//                 label="Date of Birth"
//               />
//             )}
//           />
//         </Grid>
//       </Grid>
//       <Button type="submit">Save</Button>
//     </form>
//   );
// };

// export default StepOneForm;
