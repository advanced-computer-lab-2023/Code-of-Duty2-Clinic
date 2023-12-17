// ViewDoctorRegistrationRequest.tsx
import { useEffect, useState } from "react";
import { config } from "../../../configuration";
import axios from "axios";
import FilesTable from "../../../components/filesTable";
import { useParams } from "react-router-dom";
import BasicRequestDetails from "./components/review";
import { Divider, Typography } from "@mui/material";
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
  identificationUrl: string;
  medicalLicenseUrl: string;
  medicalDegreeUrl: string;
  status:
    | "accepted"
    | "pending documents upload"
    | "pending contract acceptance"
    | "rejected";
}

function ViewDoctorRegistrationRequest() {
  const [doctorRequest, setDoctorRequest] = useState<DoctorRequest>(null!);
  const [files, setFiles] = useState<any>(null!);

  // GET FROM AUTH REQUEST STATUS

  const { doctorId } = useParams();
  useEffect(() => {
    axios
      .get(`${config.serverUri}/admins/doctor-registration/${doctorId}`)
      .then((response) => {
        setDoctorRequest(response.data);
        const resFiles = [
          { name: "identification", url: response.data.identificationUrl },
          { name: "medicalDegree", url: response.data.medicalDegreeUrl },
          { name: "medicalLicense", url: response.data.medicalLicenseUrl },
        ];
        setFiles(resFiles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [doctorId]);

  if (doctorRequest)
    return (
      <div>
        <Typography
          variant="h5"
          sx={{ margin: "auto" }}
          align="center"
          gutterBottom
        >
          View Doctor Registration Request
          {doctorRequest.status === "accepted" && (
            <Typography color="green">Accepted</Typography>
          )}
          {doctorRequest.status === "rejected" && (
            <Typography color="red">Rejected</Typography>
          )}
          {doctorRequest.status === "pending documents upload" && (
            <Typography color="gray">Incomplete</Typography>
          )}
          {doctorRequest.status === "pending contract acceptance" && (
            <Typography color="blue">Submission Completed</Typography>
          )}
        </Typography>
        <BasicRequestDetails requestStatus={doctorRequest.status} />
        <Divider />
        {doctorRequest.status !== "pending documents upload" &&
          doctorRequest.status !== "rejected" && <FilesTable files={files} />}
      </div>
    );
  else {
    return <h1>dd</h1>;
  }
}

export default ViewDoctorRegistrationRequest;
