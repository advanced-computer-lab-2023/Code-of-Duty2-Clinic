import * as React from "react";
import { TextField, Button, Grid, Snackbar, AlertColor, Popover } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Alert } from "@mui/material";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { config } from "../../configuration";
import { MenuItem, Select } from "@mui/material";
import { FormControl, InputLabel } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { useRef } from "react";



const schema = z.object({
  email: z.string().optional().nullable().refine(value => value === '' || z.string().email().safeParse(value).success, "Please enter a valid email address"),
  mobile: z.string().optional().nullable().refine(value => value === '' || value!.length >= 10, "Please enter a valid mobile number"),
  relation: z.string().min(1, { message: "Please choose a relation" })
}).refine(data => data.email || data.mobile, {
  message: "At least one field should be filled",
  path: [] // this is needed to ensure that the formState's `errors` object will have the error message
});



export default function AddRegisteredFamilyMember() {

  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<AlertColor>('info');
  const submitButtonRef = useRef(null);


  const { register, handleSubmit, control, formState: { errors }, getValues } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: any) => {
    const { email, mobile, relation } = data;
    await axios.post(`${config.serverUri}/patients/family-members/add-registered`, { email, mobile, relation }, { withCredentials: true })
  .then((response) => {
    setSnackbarMessage(response.data.message);
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
  })
  .catch( (error) => {
    setSnackbarMessage(error.response.data.message);
    setSnackbarSeverity('error');
    setOpenSnackbar(true);
    }
  );


  }
 
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" component="h1" gutterBottom>
          Add Registered Family Member
        </Typography>

        <Typography variant="h6">
          Here you can add a patient that is already registered on the
          platform as a family member.
        </Typography>
        <Typography
          variant="h6"
          gutterBottom 
          sx={{ marginBottom: "2vh" }}
        >
          Enter the email and/or phone number of the family member you would like
          to add.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
          <Box mb={2} sx={{ display: 'flex', flexDirection: 'column' }}>
                <TextField 
        {...register('email')}
        label="Email"
        error={Boolean(errors.email)}
        helperText={errors.email ? errors.email.message : ''}
        sx={{ marginBottom: '1rem' }}
      />

      <TextField
        {...register('mobile')}
        label="Mobile Number"
        error={Boolean(errors.mobile)}
        helperText={errors.mobile ? errors.mobile.message : ''}
        sx={{ marginBottom: '1rem' }}
      />

        <FormControl variant="filled">
          <InputLabel id="relation-label">Relation</InputLabel>
                  <Controller
          name="relation"
          control={control}
          defaultValue=""
          rules={{ required: 'This field is required' }}
            render={({ field }) => (
            <Select {...field} labelId="relation-label" error={Boolean(errors.relation)}>
              <MenuItem value="wife">Wife</MenuItem>
              <MenuItem value="husband">Husband</MenuItem>
              <MenuItem value="children">Child</MenuItem>
            </Select>
          )}
        />
        </FormControl>

        {errors[''] && !(getValues('email') || getValues('mobile')) && 
          <Alert severity="error" sx={{ marginTop: '2vh' }}>{errors['']?.message}</Alert>
        }
              </Box>
             </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>

              <Box sx={{ position: 'relative' }}>

                <Button type="submit" variant="contained" sx={{ marginBottom: '2vh' }} ref={submitButtonRef}>
                  Submit
                </Button>
                
                <Popover
            open={openSnackbar}
            anchorEl={submitButtonRef.current}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            sx = {{
              transform: 'translateY(2rem)'
            }}
          >
            <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
              {snackbarMessage}
            </Alert>
          </Popover>
               </Box>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

