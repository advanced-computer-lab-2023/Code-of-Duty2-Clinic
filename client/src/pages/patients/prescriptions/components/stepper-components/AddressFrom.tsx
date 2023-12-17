// AddressForm.tsx
import React, { useContext, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { PrescriptionCheckoutContext } from "../context";
import { Box } from "@mui/material";

const AddressForm: React.FC = () => {
   const {updateOrder, setStep, step,order } = useContext(PrescriptionCheckoutContext);
   const address = useRef<HTMLInputElement>(null)
   const handleBack = () => {
      setStep(prev => prev - 1);
   };

   const handleSubmit = () => {
      // Your form handling logic here
      updateOrder({patientAddress:address.current?.value as string})
      console.log(order)
      setStep(prev => prev + 1);
   };

   return (
      <React.Fragment>
         <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
               <TextField defaultValue={"2"} inputRef={address} fullWidth id="address" label="Address Line 1" variant="outlined" />
            </Grid>
            <Grid item md={6}     xs={12}>
               <TextField fullWidth id="address" label="Address Line 2" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
               <TextField fullWidth id="city" label="City" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
               <TextField fullWidth id="region" label="Region" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
               <TextField
                  type="number"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  variant="outlined"
               />
            </Grid>
         </Grid>
         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {step !== 0 && (
               <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
               </Button>
            )}
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
               Next
            </Button>
         </Box>
      </React.Fragment>
   );
};

export default AddressForm;
