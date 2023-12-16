import axios from "axios";
import { useQuery } from "react-query";
import { config } from "../../../configuration";
import { Box, Container, Typography } from "@mui/material";
import { getErrorMessage } from "../../../utils/displayError";
import InboxItem from "../../../components/InboxItem";
import UserData from "../../../types/UserData";

type DoctorInfo = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

const getPatientDoctors = async (): Promise<DoctorInfo[]> => {
  const res = await axios.get(`${config.serverUri}/patients/patient-doctors`);
  return res.data;
};

const PatientDoctorsPage = () => {
  const patientDoctorsQuery = useQuery(["patientDoctors"], getPatientDoctors);

  return (
    <Container>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        My Doctors
      </Typography>
      <Box sx={{ marginTop: 3 }}>
        {patientDoctorsQuery.isLoading && <span>Loading...</span>}
        {patientDoctorsQuery.isError && (
          <span style={{ color: "red" }}>
            Error: {getErrorMessage(patientDoctorsQuery.error)}
          </span>
        )}
        {patientDoctorsQuery.isSuccess && (
          <div>
            {patientDoctorsQuery.data?.map((doctor) => {
              const doctorData: UserData = {
                id: doctor.id,
                name: doctor.name,
                email: doctor.email,
                role: "DOCTOR",
                photoUrl: doctor.imageUrl,
              };
              return <InboxItem key={doctor.id} otherData={doctorData} />;
            })}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default PatientDoctorsPage;
