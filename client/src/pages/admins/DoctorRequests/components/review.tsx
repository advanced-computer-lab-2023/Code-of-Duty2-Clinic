import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import SchoolIcon from "@mui/icons-material/School";
import { getFormattedDate } from "../../../../utils/formatter";
import { config } from "../../../../configuration";
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  IconButton,
  List,
  ListItem,
  Stack,
  Tab,
} from "@mui/material";
import { buttonStyle } from "../viewDoctorRequests";
import SendContract from "./SendContract";

interface ViewDoctorRegistrationRequestProps {}
export interface DoctorRequest {
  _id: string;
  username: string;
  email: string;
  name: string;
  gender: string;
  mobileNumber: number;
  dateOfBirth: string;
  hourlyRate: number;
  affiliation: string;
  educationalBackground: string;
  speciality: string;
}
interface props {
  requestStatus: string;
}
const BasicRequestDetails: FC<props> = ({ requestStatus }) => {
  const navigate = useNavigate();
  const [doctorRequest, setDoctorRequest] = useState<DoctorRequest>(null!);
  console.log(requestStatus);
  // GET FROM AUTH REQUEST STATUS
  const { doctorId } = useParams();
  useEffect(() => {
    axios
      .get(`${config.serverUri}/admins/doctor-registration/${doctorId}`)
      .then((response) => {
        setDoctorRequest(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doctorId]);

  async function rejectRequest() {
    await axios.put(
      `${config.serverUri}/admins/rejectDoctor/${doctorRequest._id}`
    );
  }

  async function acceptRequest() {
    await axios.put(
      `${config.serverUri}/admins/acceptDoctor/${doctorRequest._id}`
    );
  }

  return (
    <div>
      {doctorRequest && (
        <Card
          sx={{
            width: "70%",
            padding: 5,
            margin: "auto",
            bgcolor: "background.paper",
          }}
        >
          <CardHeader
            avatar={
              <Avatar aria-label="recipe">
                {doctorRequest.name.charAt(0)}
              </Avatar>
            }
            action={<IconButton aria-label="settings"></IconButton>}
            title={doctorRequest.name}
            subheader={doctorRequest.speciality || " Professional Doctor "}
          ></CardHeader>
          {requestStatus !== "rejected" && requestStatus !== "accepted" && (
            <div>
            <Button
              sx={{ ...buttonStyle }}
              color="primary"
              onClick={() => rejectRequest()}
            >
              Reject
            </Button>

            <Button
            sx={{ ...buttonStyle }}
            color="primary"
            onClick={() => acceptRequest()}
            >
            Accept
            </Button>
            </div>
          )}
          {requestStatus === "pending contract acceptance" && <SendContract />}
          <List>
            <ListItem>
              <Stack
                width={"100%"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <div>
                  <Tab
                    disabled
                    icon={<PersonIcon />}
                    iconPosition="start"
                    label="Username"
                  />{" "}
                  {doctorRequest.username}
                </div>
                <div>
                  <Tab
                    disabled
                    icon={<EmailIcon />}
                    iconPosition="start"
                    label="Email"
                  />{" "}
                  {doctorRequest.email}
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
                  <Tab disabled iconPosition="start" label="Gender" />{" "}
                  {doctorRequest.gender}
                </div>
                <div>
                  <Tab
                    disabled
                    icon={<SchoolIcon />}
                    iconPosition="start"
                    label="Eduaction"
                  />{" "}
                  {doctorRequest.educationalBackground}
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
                  <Tab
                    disabled
                    icon={<PhoneIcon />}
                    iconPosition="start"
                    label="Mobile Number"
                  />{" "}
                  {doctorRequest.mobileNumber}
                </div>
                <div>
                  <Tab
                    disabled
                    icon={<AccessTimeIcon />}
                    iconPosition="start"
                    label="Date of Birth"
                  />{" "}
                  {getFormattedDate(doctorRequest.dateOfBirth)}
                </div>
              </Stack>
            </ListItem>
            <ListItem></ListItem>

            <ListItem>
              <Stack
                width={"100%"}
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <div>
                  <Tab
                    disabled
                    icon={<CurrencyExchangeIcon />}
                    iconPosition="start"
                    label="Hourly Rate"
                  />{" "}
                  {doctorRequest.hourlyRate}
                </div>
                <div>
                  <Tab
                    disabled
                    icon={<LocalHospitalIcon />}
                    iconPosition="start"
                    label="Affliation"
                  />{" "}
                  {doctorRequest.affiliation}
                </div>
              </Stack>
            </ListItem>
          </List>
        </Card>
      )}
    </div>
  );
};

export default BasicRequestDetails;
