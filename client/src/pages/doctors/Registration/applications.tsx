import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SyntheticEvent, useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import { Card } from "@mui/material";
import DoctorRegistrationRequestFormFiles from "./DoctorVerifyRequest";
import { AuthContext } from "../../../contexts/AuthContext";
import ApplicationContextProvider, {
  ApplicationContext,
} from "./context/application";
import Contract from "./components/Contract";
import { VerificationStatus } from "../../../types/enums/VerficationStatus";

const Applications = () => {
  return (
    <ApplicationContextProvider>
      <ApplicationsComponent />
    </ApplicationContextProvider>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ApplicationsComponent() {

  const { step,setStep } = useContext(ApplicationContext);
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const verifyStatus = useContext(AuthContext);

  switch(verifyStatus.authState.verificationStatus){
    case VerificationStatus.pendingDocumentsUpload : setStep(1);break
    case VerificationStatus.pendingContractAcceptance || VerificationStatus.accepted : setStep(2);break
  }
  console.log(verifyStatus.authState.verificationStatus+"-->"+step);
  return (
    <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
      <Card sx={{ width: 400, maxWidth: 400 }}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Active 1" {...a11yProps(0)} />
              <Tab label="InActive 1" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            {verifyStatus.authState.verificationStatus === VerificationStatus.pendingDocumentsUpload && <DoctorRegistrationRequestFormFiles />}
            {verifyStatus.authState.verificationStatus !== VerificationStatus.pendingDocumentsUpload && <Contract />}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            InActive
          </CustomTabPanel>
        </Box>
      </Card>
    </Stack>
  );
}

export default Applications;
