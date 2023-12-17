import { FC } from "react";

import {
  Avatar,
  Box,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Stack,
  Tab
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getFormattedDate } from "../../../../../../utils/formatter";

const PatientContactDetails: FC<{ patientData: any }> = ({ patientData }) => {
  return (
    <Box  sx={{width:"100%",height:'100%'}}>
      <Card
        sx={{
          width: "100%",
          height:'100%',
          padding: 5,
          bgcolor: "background.paper"
        }}
      >
        <CardHeader
          avatar={<Avatar aria-label="recipe">{patientData.name.charAt(0)}</Avatar>}
          action={<IconButton aria-label="settings"></IconButton>}
          title={patientData.name}
        ></CardHeader>
        <List>
          <ListItem>
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <div>
                <Tab disabled icon={<PersonIcon />} iconPosition="start" label="Username" />{" "}
                {patientData.username}
              </div>
              <div>
                <Tab disabled icon={<EmailIcon />} iconPosition="start" label="Email" />{" "}
                {patientData.email}
              </div>
            </Stack>
          </ListItem>

          <ListItem>
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <div>
                <Tab disabled iconPosition="start" label="Gender" /> {patientData.gender}
              </div>
              <div>
                <Tab
                  disabled
                  icon={<AccessTimeIcon />}
                  iconPosition="start"
                  label="Date of Birth"
                />{" "}
                {getFormattedDate(patientData.dateOfBirth)}
              </div>
            </Stack>
          </ListItem>

          <ListItem>
            <Stack
              width={"100%"}
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              {patientData.mobileNumber &&
              <div>
              <Tab disabled icon={<PhoneIcon />} iconPosition="start" label="Mobile Number" />{" "}
              {patientData.mobileNumber}
            </div>
              }
              
            </Stack>
          </ListItem>
          <ListItem></ListItem>
        </List>
      </Card>
    </Box>
  );
};

export default PatientContactDetails