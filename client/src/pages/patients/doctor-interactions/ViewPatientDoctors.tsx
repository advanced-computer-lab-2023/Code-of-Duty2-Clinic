import { useSession } from "@talkjs/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Talk from "talkjs";
import { config } from "../../../configuration";
import { Box, Container, Typography } from "@mui/material";
import { getErrorMessage } from "../../../utils/displayError";
import InboxItem from "../../../components/InboxItem";
import { createConversation } from "../../../utils/createConversation";

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

type DoctorData = {
  id: string;
  name: string;
  email: string | null;
  photoUrl?: string;
  role?: "DOCTOR";
};

const PatientDoctorsPage = () => {
  const session = useSession()!;

  const [conversationIds, setConversationIds] = useState<string[]>([]);

  const patientDoctorsQuery = useQuery(["patientDoctors"], getPatientDoctors);

  const createConversationsAndGetTheirIds = () => {
    if (patientDoctorsQuery.isLoading) return [];
    if (patientDoctorsQuery.isError) return [];

    return patientDoctorsQuery.data!.map(({ id, email, name, imageUrl }) => {
      const doctorData: DoctorData = {
        id,
        name,
        email,
        role: "DOCTOR",
        photoUrl: imageUrl,
      };

      const doctor = new Talk.User(doctorData);

      const conversationId = Talk.oneOnOneId(session.me, doctor);

      createConversation(session, conversationId, doctor);

      return conversationId;
    });
  };

  useEffect(() => {
    if (patientDoctorsQuery.isSuccess && session) {
      const userConversations = createConversationsAndGetTheirIds();
      setConversationIds(userConversations);
    }
  }, [patientDoctorsQuery.isSuccess, session]);

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
            {patientDoctorsQuery.data?.map((doctor, index) => {
              return (
                <InboxItem
                  key={doctor.id}
                  {...doctor}
                  conversationId={conversationIds[index]}
                />
              );
            })}
          </div>
        )}
      </Box>
    </Container>
  );
};

export default PatientDoctorsPage;
