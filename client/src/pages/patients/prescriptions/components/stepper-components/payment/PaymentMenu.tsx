import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button} from "@mui/material";

import StripePayment from "./payment-methods/StripePayment";
import Wallet from "./payment-methods/Wallet";
import { PrescriptionCheckoutContext } from "../../context";

interface TabPanelProps {
   children?: React.ReactNode;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`vertical-tabpanel-${index}`}
         aria-labelledby={`vertical-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 3 }}>
               <Typography>{children}</Typography>
            </Box>
         )}
      </div>
   );
}

function a11yProps(index: number) {
   return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
   };
}

const PaymentMethod: React.FC = () => {
   const {
      updateOrder,
      setStep,
      step,
      payPrescription,
      stripe,
      setStripe,
      setStripeElements,
      order,
   } = React.useContext(PrescriptionCheckoutContext);

   const handleBack = () => {
      setStep(prev => prev - 1);
   };

   const handleSubmit = async () => {
      // Your form handling logic here
      // Update the order object in the context
      console.log("MEEEE")
      const response = await payPrescription();
      console.log(response)
      if (response === "success") setStep(prev => prev + 1);
   };
   const [value, setValue] = React.useState(0);

   const handleChange = (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   return (
      <Box>
         <Box sx={{ flexGrow: 1, bgcolor: "tranparent", display: "flex", gap: 10, minHeight: 300 }}>
            <Tabs
               orientation="vertical"
               variant="scrollable"
               value={value}
               onChange={handleChange}
               aria-label="Vertical tabs example"
               sx={{ borderRight: 1, borderColor: "divider" }}
            >
               <Tab
                  onClick={() => {
                     updateOrder({ paymentMethod: "card" });
                     setStripe(null);
                     setStripeElements(null);
                  }}
                  label="Credit Card"
                  {...a11yProps(0)}
               />
               <Tab
                  onClick={() => {
                     updateOrder({ paymentMethod: "wallet" });
                     setStripe(null);
                     setStripeElements(null);
                  }}
                  label="Wallet"
                  {...a11yProps(1)}
               />
            </Tabs>
            <TabPanel value={value} index={0}>
               <StripePayment />
            </TabPanel>
            <TabPanel value={value} index={1}>
               <Wallet />
            </TabPanel>
         </Box>

         <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {step !== 0 && (
               <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
               </Button>
            )}
            <Button
               variant="contained"
               disabled={order.paymentMethod === "card" && !stripe}
               onClick={handleSubmit}
               sx={{ mt: 3, ml: 1 }}
            >
               Pay
            </Button>
         </Box>
      </Box>
   );
};

export default PaymentMethod;
