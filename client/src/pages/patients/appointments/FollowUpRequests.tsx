import { useState, useEffect, FC, ChangeEvent } from "react";
import axios from "axios";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { config } from "../../../configuration";
import AppointmentSettingContextProvider from "../../../features/appointments/AppointmentSettingContext";
import AppointmentSettingModal from "../../../features/appointments/AppointmentSettingModal";

type FollowUpRequest = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  status: string;
  timePeriod?: {
    startTime: string;
    endTime: string;
  };
  reason?: string;
};

const FollowUpRequestsPage: FC = () => {
  const [myRequests, setMyRequests] = useState<FollowUpRequest[]>([]);
  const [myDependentRequests, setMyDependentRequests] = useState<FollowUpRequest[]>([]);

  const [myFilteredRequests, setMyFilteredRequests] = useState<FollowUpRequest[]>([]);
  const [myDependentFilteredRequests, setMyDependentFilteredRequests] = useState<FollowUpRequest[]>(
    []
  );

  const [filter, setFilter] = useState<string>("");

  const [showModal, setShowModal] = useState(false);

  const handleFilterNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFilter(name);
    setMyFilteredRequests(
      myRequests.filter((request) => request.user.name.toLowerCase().startsWith(name.toLowerCase()))
    );
    setMyDependentFilteredRequests(
      myDependentRequests.filter((request) =>
        request.user.name.toLowerCase().startsWith(name.toLowerCase())
      )
    );
  };

  useEffect(() => {
    axios
      .get<FollowUpRequest[]>(`${config.serverUri}/patients/follow-up-requests-for-registered`)
      .then((response) => {
        setMyRequests(response.data);
        setMyFilteredRequests(response.data);
      })
      .catch((error) => console.error(error));

    axios
      .get<FollowUpRequest[]>(`${config.serverUri}/patients/follow-up-requests-for-dependent`)
      .then((response) => {
        setMyDependentRequests(response.data);
        setMyFilteredRequests((requests) => [...requests, ...response.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDeleteMyRequest = (id: string) => {
    axios
      .delete(`${config.serverUri}/patients/follow-up-requests-for-registered/${id}`)
      .then(() => {
        setMyRequests((requests) => requests.filter((request) => request.id !== id));
        setMyFilteredRequests((requests) => requests.filter((request) => request.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteDependentRequest = (id: string) => {
    axios
      .delete(`${config.serverUri}/patients/follow-up-requests-for-dependent/${id}`)
      .then(() => {
        setMyDependentRequests((requests) => requests.filter((request) => request.id !== id));
        setMyDependentFilteredRequests((requests) =>
          requests.filter((request) => request.id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  const handleMakingARequest = () => {
    setShowModal(true);
  };

  return (
    <div style={{ padding: "2.0rem" }}>
      {showModal && (
        <AppointmentSettingContextProvider>
          <AppointmentSettingModal
            dependentNationalId={null}
            doctorId={null}
            option="follow-up-request"
            registeredPatientId={null}
            viewIndex={null}
          />
        </AppointmentSettingContextProvider>
      )}

      <Typography variant="h4" gutterBottom component="div" color="primary">
        Follow up Appointment Requests
      </Typography>

      <Box mb={2} sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleMakingARequest}>Add a follow up appointment request</Button>
        <TextField
          margin="normal"
          label="Filter by requestId"
          value={filter}
          fullWidth
          onChange={handleFilterNameChange}
        />
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom component="div" color="primary">
          My follow up appointment requests
        </Typography>
        {!myFilteredRequests.length ? (
          <div>No requests</div>
        ) : (
          myFilteredRequests.map((request) => (
            <Box sx={{ display: "flex", justifyContent: "space-between", justifyItems: "center" }}>
              <Paper
                key={request.id}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: "5px"
                }}
              >
                <Box mb={0.9} />

                <Typography>
                  <strong>Name: </strong> {request.user.name}
                </Typography>

                <Typography>
                  <strong>Status:</strong> {request.status}
                </Typography>
              </Paper>
              <Button
                sx={{ backgroundColor: "red", padding: "1%" }}
                onClick={() => handleDeleteMyRequest(request.id)}
              >
                Delete request
              </Button>
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ marginTop: "7%" }}>
        <Typography variant="h6" gutterBottom component="div" color="primary">
          My dependent family members follow up appointment requests
        </Typography>
        {!myDependentFilteredRequests.length ? (
          <div>No Requests</div>
        ) : (
          myDependentFilteredRequests.map((request) => (
            <Box sx={{ display: "flex", justifyContent: "space-between", justifyItems: "center" }}>
              <Paper
                key={request.id}
                sx={{
                  mb: 2,
                  p: 2,
                  borderRadius: "5px"
                }}
              >
                <Box mb={0.9} />

                <Typography>
                  <strong>Name: </strong> {request.user.name}
                </Typography>

                <Typography>
                  <strong>Status:</strong> {request.status}
                </Typography>
              </Paper>
              <Button
                sx={{ backgroundColor: "red", padding: "1%" }}
                onClick={() => handleDeleteDependentRequest(request.id)}
              >
                Delete request
              </Button>
            </Box>
          ))
        )}
      </Box>
    </div>
  );
};

export default FollowUpRequestsPage;
