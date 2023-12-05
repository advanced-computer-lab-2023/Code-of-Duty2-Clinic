import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { config } from "../../configuration";
import axios from "axios";
import PatientComponent from "../../features/patients/PatientComponent";
import IPatientInfo from "../../interfaces/PatientInfo";
import Talk from "talkjs";
import { useSession } from "@talkjs/react";
import { createConversation } from "../../utils/createConversation";

const ViewDoctorPatients = () => {
  const [filteredPatients, setFilteredPatients] = useState<
    IPatientInfo[] | undefined
  >();

  const [patientName, setPatientName] = useState("");
  const [error, setError] = useState("");

  const [conversationIds, setConversationIds] = useState<string[]>([]);
  const session = useSession()!;

  const createConversationsAndGetTheirIds = () => {
    if (!filteredPatients) return [];
    return filteredPatients.map(({ id, name, imageUrl }) => {
      const patientData = {
        id,
        name,
        role: "PATIENT",
        photoUrl: imageUrl,
      };

      const patient = new Talk.User(patientData);

      const conversationId = Talk.oneOnOneId(session.me, patient);

      createConversation(session, conversationId, patient);

      return conversationId;
    });
  };

  const handleChangePatientName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPatientName(event.target.value);
  };

  const getAllPatients = async () => {
    try {
      const response = await axios.get(`${config.serverUri}/doctors/patients`);
      setFilteredPatients(response.data);
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPatients();
  }, []);

  useEffect(() => {
    if (filteredPatients && session) {
      const userConversations = createConversationsAndGetTheirIds();
      setConversationIds(userConversations);
    }
  }, [filteredPatients, session]);

  const handleFilterChange = async () => {
    try {
      setFilteredPatients(undefined);
      const response = await axios.get(`${config.serverUri}/doctors/patients`, {
        params: {
          patientName,
        },
      });
      setFilteredPatients(response.data);
    } catch (error: any) {
      setError(error.message);
      console.error(error);
    }
  };
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 2 }}>
        View My Patients
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
        <TextField
          label="Patient Name"
          value={patientName}
          name="name"
          onChange={handleChangePatientName}
          sx={{ marginRight: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleFilterChange}
          sx={{ marginLeft: "30px" }}
        >
          Search
        </Button>
      </Box>

      <Grid container spacing={2}>
        {filteredPatients
          ? filteredPatients.length === 0
            ? "No Patients Found"
            : filteredPatients.map((patient, index) => (
                <PatientComponent
                  patient={patient}
                  conversationId={conversationIds[index]}
                />
              ))
          : "Loading ...."}
      </Grid>
      <p style={{ color: "red" }}>{error}</p>
    </Box>
  );
};

export default ViewDoctorPatients;
