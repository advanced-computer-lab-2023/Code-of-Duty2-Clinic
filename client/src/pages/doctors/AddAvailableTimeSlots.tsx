import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from "react-query";
import axios, { AxiosError } from "axios";
import { config } from "../../configuration";
import DoctorAvailableTimeSlots from "./ViewAvailableTimeSlots";
import {
  Button,
  Modal,
  Backdrop,
  Box,
  Fade,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const viewDoctorsAvailableTimeSlots = async () => {
  const response = await axios.get(
    `${config.serverUri}/doctors/available-time-slots`
  );
  return response.data.availableTimeSlots;
};
type Slots = { startTime: Date; endTime: Date };
const addDoctorAvailableTimeSlot = async ({ startTime, endTime }: Slots) => {
  const response = await axios.post(
    `${config.serverUri}/doctors/appointments/add-time-slots`,
    {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
    }
  );
  return response.data;
};

function DoctorTimeSlotsPage() {
  const [open, setOpen] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const queryKey = "availableTimeSlots";

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addDoctorAvailableTimeSlot, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
      setOpen(false);
    },
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveTimeSlot = () => {
    if (selectedStartTime && selectedEndTime) {
      const startTime: Date = new Date(selectedStartTime);
      const endTime: Date = new Date(selectedEndTime);
      mutate({
        startTime,
        endTime,
      });
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Add Time Slot</Button>
      <Modal
        aria-labelledby="add-time-slot-modal"
        aria-describedby="add-time-slot-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 800, // Increase the width
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Select Time Slot
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="h6" component="h2">
                      Start Time
                    </Typography>
                    <StaticDateTimePicker
                      value={selectedStartTime}
                      onChange={(newValue) => setSelectedStartTime(newValue)}
                    />
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div>
                    <Typography variant="h6" component="h2">
                      End Time
                    </Typography>
                    <StaticDateTimePicker
                      value={selectedEndTime}
                      onChange={(newValue) => setSelectedEndTime(newValue)}
                    />
                  </div>
                </Grid>
              </Grid>
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveTimeSlot}
            >
              Save Time Slot
            </Button>
          </Box>
        </Fade>
      </Modal>
      <DoctorAvailableTimeSlots />
    </div>
  );
}

export default DoctorTimeSlotsPage;
