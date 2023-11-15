import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { config } from "../../configuration";
import DoctorAvailableTimeSlots from "./ViewAvailableTimeSlots";
import { Button } from "@mui/material";
import SlotsRangeModal from "../../components/SlotsRangeModal";
import { Slots } from "../../types/Slots";
import { getErrorMessage } from "../../utils/displayError";

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
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const queryKey = "availableTimeSlots";

  const queryClient = useQueryClient();
  const { mutate, error } = useMutation(addDoctorAvailableTimeSlot, {
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
      <SlotsRangeModal
        handleClose={handleClose}
        open={open}
        selectedStartTime={selectedStartTime}
        setSelectedStartTime={setSelectedStartTime}
        selectedEndTime={selectedEndTime}
        setSelectedEndTime={setSelectedEndTime}
        handleSaveTimeSlot={handleSaveTimeSlot}
        errorMessage={error ? getErrorMessage(error) : ""}
      />
      <DoctorAvailableTimeSlots />
    </div>
  );
}

export default DoctorTimeSlotsPage;
