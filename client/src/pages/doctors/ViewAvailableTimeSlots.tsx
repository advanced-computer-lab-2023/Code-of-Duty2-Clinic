import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { config } from "../../configuration";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
  Button,
} from "@mui/material";

const viewDoctorsAvailableTimeSlots = async () => {
  const response = await axios.get(
    `${config.serverUri}/doctors/available-time-slots`
  );
  return response.data.availableTimeSlots;
};

const deleteTimeSlot = async (timeSlotId: String) => {
  const response = await axios.delete(
    `${config.serverUri}/doctors/available-time-slots/${timeSlotId}`
  );
  viewDoctorsAvailableTimeSlots();
  return response.data;
};

function formatTimeSlot(slot: {
  _id: React.Key | null | undefined;
  startTime: string | number | Date;
  endTime: string | number | Date;
}) {
  const startTime = new Date(slot.startTime);
  const endTime = new Date(slot.endTime);

  const formattedStartTime = startTime.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedEndTime = endTime.toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formattedStartTime} - ${formattedEndTime}`;
}

function DoctorAvailableTimeSlots() {
  const { data, error, isLoading } = useQuery(
    "availableTimeSlots",
    viewDoctorsAvailableTimeSlots
  );

  const queryClient = useQueryClient();
  const [deleteSlotId, setDeleteSlotId] = useState<String | null>(null);

  const deleteSlotMutation = useMutation(deleteTimeSlot, {
    onMutate: (deletedId) => {
      setDeleteSlotId(deletedId);
    },
    onError: (error) => {
      // Handle error
    },
    onSettled: () => {
      setDeleteSlotId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("availableTimeSlots");
    },
  });

  const handleDeleteSlot = (
    slot: string | number | Date | null | undefined
  ) => {
    if (slot) {
      deleteSlotMutation.mutate(String(slot));
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error instanceof AxiosError) {
    return (
      <Typography variant="body1" color="error">
        {(error?.response?.data as { message: string })?.message ??
          "An error occurred"}
      </Typography>
    );
  }

  return (
    <Paper elevation={3}>
      <Typography variant="h6" component="div" align="center">
        Available Time Slots
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="    Start Time      -     End Time" />
        </ListItem>
        {data.map(
          (slot: {
            _id: React.Key | null | undefined;
            startTime: string | number | Date;
            endTime: string | number | Date;
          }) => (
            <ListItem key={slot._id}>
              <ListItemText primary={formatTimeSlot(slot)} />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteSlot(String(slot.startTime))}
                disabled={deleteSlotId === slot._id}
              >
                Delete
              </Button>
            </ListItem>
          )
        )}
      </List>
    </Paper>
  );
}

export default DoctorAvailableTimeSlots;
