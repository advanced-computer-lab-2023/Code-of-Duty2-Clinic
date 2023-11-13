import React from 'react';
import { useQuery } from 'react-query';
import axios, {AxiosError} from 'axios';
import { config } from '../../configuration';
import { CircularProgress, List, ListItem, ListItemText, Paper, Typography } from '@mui/material';


const viewDoctorsAvailableTimeSlots = async () => {
  const response = await axios.get(`${config.serverUri}/doctors/available-time-slots`); 
  return response.data.availableTimeSlots;
};

function formatTimeSlot(slot: { _id: React.Key | null | undefined; startTime: string | number | Date; endTime: string | number | Date; }) {
    const startTime = new Date(slot.startTime);
    const endTime = new Date(slot.endTime);
    // const formattedStartTime = startTime.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
    // const formattedEndTime = endTime.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
    // return `${formattedStartTime} - ${formattedEndTime}`;
    const formattedStartTime = startTime.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    
      const formattedEndTime = endTime.toLocaleString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

    return `${formattedStartTime} - ${formattedEndTime}`;
      

    //   return (
    //     <>
    //       Start Time - End Time
    //       <br />
    //       {formattedStartTime} - {formattedEndTime}
    //     </>
    //   );
    
    //   return `Start Time - ${formattedStartTime} - End Time - ${formattedEndTime}`;
    // return (
    //     <>
    //       <div>Start Time - {formattedStartTime}</div>
    //       <div>End Time - {formattedEndTime}</div>
    //     </>
    //   );
  }

function DoctorAvailableTimeSlots() {
  const { data, error, isLoading } = useQuery('availableTimeSlots', viewDoctorsAvailableTimeSlots);

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error instanceof AxiosError) {
    return <Typography variant="body1" color="error">{(error?.response?.data as { message: string })?.message ?? 'An error occurred'}</Typography>;
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
        {data.map((slot: { _id: React.Key | null | undefined; startTime: string | number | Date; endTime: string | number | Date; }) => (
          <ListItem key={slot._id}>
            <ListItemText primary={formatTimeSlot(slot)} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
    }

export default DoctorAvailableTimeSlots;
