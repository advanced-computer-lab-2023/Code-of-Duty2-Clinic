import axios from "axios";
import { config } from "../../../configuration";
import { useQuery } from "react-query";
import { displayError } from "../../../utils/displayError";
import { Button } from "@mui/material";
import React from "react";

type DoctorInfo = {
  username: string;
  email: string;
  specilaity: string;
  mobileNumber: string;
  imageUrl: string;
  contractStatus: string;
};
const getDoctorInfo = async (): Promise<DoctorInfo> => {
  const response = await axios.get(`${config.serverUri}/doctors/account`);
  return response.data;
};

const DoctorInfo = () => {
  const getDoctorInfoQuery = useQuery(["doctorInfo"], getDoctorInfo);

  if (getDoctorInfoQuery.isLoading) return <div>Loading...</div>;
  if (getDoctorInfoQuery.isError)
    return <div>{displayError(getDoctorInfoQuery.error)}</div>;
  return (
    <div>
      <h1>My Info</h1>
      <div>
        <img src={getDoctorInfoQuery.data?.imageUrl} />
      </div>
      <div>
        <p>
          <strong>Username:</strong> {getDoctorInfoQuery.data?.username}
        </p>
        <p>
          <strong>Email:</strong> {getDoctorInfoQuery.data?.email}
        </p>
        <p>
          <strong>Speciality:</strong> {getDoctorInfoQuery.data?.specilaity}
        </p>
        <p>
          <strong>Mobile Number:</strong>{" "}
          {getDoctorInfoQuery.data?.mobileNumber}
        </p>
        <p>
          <strong>Contract Status:</strong>{" "}
          {getDoctorInfoQuery.data?.contractStatus}
        </p>
      </div>
      <Button variant="contained" color="primary" href="/doctor/free-slots">
        Show my free slots
      </Button>
    </div>
  );
};

export default DoctorInfo;
