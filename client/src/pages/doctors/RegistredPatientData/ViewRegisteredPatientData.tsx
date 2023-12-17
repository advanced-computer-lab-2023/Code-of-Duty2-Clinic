import * as React from "react";
import SwipeableViews from "react-swipeable-views";
import { SxProps, useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import { PermIdentitySharp } from "@mui/icons-material";
import PatientGeneralDetails from "./components/PatientInfo/PatientInfo";
import HealthRecords from "./components/healthRecords/HealthRecords";
import Prescriptions from "./components/Prescriptions/Prescriptions";
const styleApp: SxProps = {
   backgroundColor: "white",
   fontWeight: "bold",
   color: "#103939",
};
interface TabPanelProps {
   children?: React.ReactNode;
   dir?: string;
   index: number;
   value: number;
}

function TabPanel(props: TabPanelProps) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`full-width-tabpanel-${index}`}
         aria-labelledby={`full-width-tab-${index}`}
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
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
   };
}

const ViewRegisteredPatientData: React.FC = () => {
   const theme = useTheme();
   const [value, setValue] = React.useState(0);

   const handleChange = (_: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
   };

   const handleChangeIndex = (index: number) => {
      setValue(index);
   };

   return (
      <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
         <AppBar sx={styleApp} position="static">
            <Tabs
               value={value}
               onChange={handleChange}
               indicatorColor="secondary"
               textColor="inherit"
               variant="fullWidth"
               aria-label="full width tabs example"
            >
               <Tab
                  icon={<PermIdentitySharp />}
                  iconPosition="start"
                  label="General Info"
                  {...a11yProps(0)}
               />
               <Tab
                  icon={<FolderSharedIcon />}
                  iconPosition="start"
                  label="Health Records"
                  {...a11yProps(1)}
               />
               <Tab
                  icon={<ReceiptLongIcon />}
                  iconPosition="start"
                  label="Prescriptions"
                  {...a11yProps(2)}
               />
            </Tabs>
         </AppBar>
         <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={value}
            onChangeIndex={handleChangeIndex}
         >
            <TabPanel value={value} index={0} dir={theme.direction}>
               <PatientGeneralDetails />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
               <HealthRecords />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
               <Prescriptions />
            </TabPanel>
         </SwipeableViews>
      </Box>
   );
};

export default ViewRegisteredPatientData;
