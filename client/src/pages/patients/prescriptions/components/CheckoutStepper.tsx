// Checkout.tsx
import React, { FC, useContext, useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import PaymentMethod from "./stepper-components/payment/PaymentMenu";
import Review from "./stepper-components/Review";
import PrescriptionPaymentContextProvider, { PrescriptionCheckoutContext } from "./context";
import AddressForm from "./stepper-components/AddressFrom";
import { Box, Snackbar } from "@mui/material";
import { useFetchPatientPrescription } from "./checkoutStepperService";
import { useParams } from "react-router-dom";
// import platinumLogo from "../../../../assets/platinum_Logo.png";
// import SilverLogo from "../../../../assets/silver_package.webp";
// import goldLogo from "../../../../assets/gold-package.png";

import logo from "../../../../assets/el7a2ni_logo2.png";
import { gradientTextStyle } from "./Stepper.styles";
//import Image from "mui-image";
//import { packageImage } from "./Stepper.styles";

const PrescriptionCheckout: FC = () => {
   return (
      <PrescriptionPaymentContextProvider>
         <Checkout />
      </PrescriptionPaymentContextProvider>
   );
};

export default PrescriptionCheckout;

const steps = ["Review your order", "Shipping address", "Payment details"];

const Checkout: FC = () => {
   const { step, updatePrescription, error } = useContext(PrescriptionCheckoutContext);
   const [openError,setOpenError] = useState<boolean>(false)
   // const [imgsrc ,setimgsrc] = useState<string>()
   const { prescriptionId } = useParams();
   // useEffect(()=>{
   // switch (prescription?.packageName) {
   //    case "Platinum Package":
   //       setimgsrc(platinumLogo);
   //       break;
   //    case "Gold Package":
   //       setimgsrc(goldLogo);
   //       break;
   //    case "Silver Package":
   //       setimgsrc(SilverLogo);
   // }
   // },[])

   const {
      data: prescriptionData,
      isLoading,
      isFetched,
   } = useFetchPatientPrescription(prescriptionId!);

   useEffect(() => {
      if (isFetched) updatePrescription(prescriptionData);
      setOpenError(!!error)

   }, [isLoading]);

   const getStepContent = (step: number) => {
      switch (step) {
         case 0:
            return <Review />;
         case 1:
            return <AddressForm />;
         case 2:
            return <PaymentMethod />;
         default:
            throw new Error("Unknown step");
      }
   };

   return (
      <Box>
         {" "}
         <CssBaseline />
         <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Paper
               component={Paper}
               elevation={24}
               variant="outlined"
               sx={{
                  backgroundColor: "rgba(245, 245, 245, 0.96)", // Set background color with opacity
                  backgroundImage: `linear-gradient(rgba(256, 256, 256, 0.93),rgba(256, 256, 256, 0.93)), url(${logo})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "40% 120%",
                  minHeight: 600,
                  my: { xs: 3, md: 6 },
                  p: { xs: 2, md: 3 },
                  position: "relative",
                  border: "none",
               }}
            >
               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                     color="primary"
                     sx={{ fontWeight: 500, color: "gray" }}
                     marginBottom={7}
                     component="h1"
                     variant="h4"
                  >
                     Checkout
                  </Typography>
                  <div style={gradientTextStyle}>Powered by El7a2ny Pharmacy</div>
               </Box>

               <Stepper activeStep={step} sx={{ pt: 3, pb: 5, color: "gray" }}>
                  {steps.map(label => (
                     <Step sx={{ color: "blue " }} key={label}>
                        <StepLabel>{label}</StepLabel>
                     </Step>
                  ))}
               </Stepper>
               {step === steps.length ? (
                  <React.Fragment>
                     <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                     </Typography>
                     <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order confirmation, and
                        will send you an update when your order has shipped.
                     </Typography>
                  </React.Fragment>
               ) : (
                  <React.Fragment>{getStepContent(step)}</React.Fragment>
               )}
               {/* {!!imgsrc &&
               <Image
                  src={imgsrc}
                  style={packageImage}
               />
               } */}
            </Paper>
         </Container>
         <Snackbar onClose={()=>setOpenError(false)} open={openError} autoHideDuration={3000} message={error} />
      </Box>
   );
};
