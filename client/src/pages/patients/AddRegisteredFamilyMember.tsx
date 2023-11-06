import { TextField, Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";


const schema = z.object({
  email: z.string().optional().nullable().refine(value => value === '' || z.string().email().safeParse(value).success, "Please enter a valid email address"),
  phoneNumber: z.string().optional().nullable().refine(value => value === '' || value!.length >= 10, "Please enter a valid mobile number"),
}).refine(data => data.email || data.phoneNumber, {
  message: "At least one field should be filled",
  path: [] // this is needed to ensure that the formState's `errors` object will have the error message
});

export default function AddRegisteredFamilyMember() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });
  const onSubmit = async (data: any) => {
    console.log(data);
  };
 

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
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>


        <TextField
          {...register('email')}
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email ? errors.email.message : ''}
        />

        <TextField
          {...register('phoneNumber')}
          label="Phone Number"
          error={Boolean(errors.phoneNumber)}
          helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
        />


{errors[''] && <Alert severity="error">{errors['']?.message}</Alert>}
          </Box>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button type="submit" variant="contained" sx={{ marginBottom: '2vh' }}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
