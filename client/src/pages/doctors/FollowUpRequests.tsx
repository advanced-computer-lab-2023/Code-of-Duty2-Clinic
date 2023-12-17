import { useState, useEffect, FC } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { config } from "../../configuration";
import { getFormattedDate, getFormattedTime } from "../../utils/formatter";

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
  isForDependent?: boolean;
  reason?: string;
};

const FollowUpRequestsPage: FC = () => {
  const [requests, setRequests] = useState<FollowUpRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<FollowUpRequest[]>([]);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    axios
      .get<FollowUpRequest[]>(`${config.serverUri}/doctors/follow-up-requests`)
      .then((response) => {
        setRequests(response.data);
        setFilteredRequests(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAccept = (requestId: string, isFromDependent?: boolean) => {
    axios
      .post(
        `${config.serverUri}/doctors/accept-follow-up-request-for-${
          isFromDependent ? "dependent" : "registered"
        }/${requestId}`
      )
      .then(() => {
        setRequests(requests.filter((request) => request.id !== requestId));
        setFilteredRequests(filteredRequests.filter((request) => request.id !== requestId));
      });
  };

  const handleReject = (requestId: string, isFromDependent?: boolean) => {
    axios
      .patch(
        `${config.serverUri}/doctors/reject-follow-up-request-for-${
          isFromDependent ? "dependent" : "registered"
        }/${requestId}`
      )
      .then(() => {
        setRequests(requests.filter((request) => request.id !== requestId));
        setFilteredRequests(filteredRequests.filter((request) => request.id !== requestId));
      });
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setFilter(name);
    setFilteredRequests(
      requests.filter((request) => request.user.name.toLowerCase().startsWith(name.toLowerCase()))
    );
  };

  return (
    <div style={{ padding: "2.0rem" }}>
      <Typography variant="h4" gutterBottom component="div" color="primary">
        Follow up Appointment Requests
      </Typography>

      <TextField
        margin="normal"
        label="Filter by requestId"
        value={filter}
        fullWidth
        onChange={handleFilterChange}
      />

      <Box>
        {filteredRequests.map((request) => (
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
              <strong>Patient name: </strong> {request.user.name}
            </Typography>
            {request.timePeriod && (
              <>
                <Typography>
                  <strong>Appointment day: </strong>{" "}
                  {getFormattedDate(request.timePeriod.startTime)}
                </Typography>
                <Typography>
                  <strong>from: </strong> {getFormattedTime(request.timePeriod.startTime)}
                  <strong>to: </strong> {getFormattedTime(request.timePeriod.endTime)}
                </Typography>
              </>
            )}
            <Box sx={{ float: "right" }}>
              <Button
                variant="text"
                color="error"
                onClick={() => handleReject(request.id, request.isForDependent)}
              >
                Reject
              </Button>

              <Button
                variant="text"
                color="success"
                onClick={() => handleAccept(request.id, request.isForDependent)}
              >
                Accept Request
              </Button>
            </Box>
            <Typography>
              <strong>Status:</strong> {request.status}
            </Typography>
          </Paper>
        ))}
      </Box>
    </div>
  );
};

export default FollowUpRequestsPage;
