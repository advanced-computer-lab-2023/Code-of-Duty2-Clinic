import React from "react";
import {
  Button,
  Modal,
  Backdrop,
  Box,
  Fade,
  Typography,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  handleClose: () => void;
  open: boolean;
  selectedStartTime: Date | null;
  setSelectedStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
  selectedEndTime: Date | null;
  setSelectedEndTime: React.Dispatch<React.SetStateAction<Date | null>>;
  handleSaveTimeSlot: () => void;
  errorMessage: string;
};
const SlotsRangeModal: React.FC<Props> = ({
  handleClose,
  open,
  selectedStartTime,
  setSelectedStartTime,
  selectedEndTime,
  setSelectedEndTime,
  handleSaveTimeSlot,
  errorMessage,
}) => {
  return (
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
            width: 800,
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
          <Typography variant="body1" component="h2" color="red">
            {errorMessage}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default SlotsRangeModal;
