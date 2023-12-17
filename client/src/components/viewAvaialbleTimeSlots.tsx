import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { config } from "../configuration";

interface AvailableTimeSlot {
  startTime: string;
  endTime: string;
}

const AvailableAppointmentsToday: React.FC = () => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<AvailableTimeSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAvailableTimeSlots = async () => {
        try {
          const response = await axios.get<any>(`${config.serverUri}/doctors/available-time-slots`);
          const availableSlots: AvailableTimeSlot[] = response.data?.availableTimeSlots || [];
      
          if (Array.isArray(availableSlots)) {
            const today = new Date().toISOString().split("T")[0];
      
            // Filter available slots for today
            const todaySlots = availableSlots.filter(slot => slot.startTime.includes(today));
      
            setAvailableTimeSlots(todaySlots);
            setLoading(false);
          } else {
            console.error("Invalid format for availableTimeSlots:", availableSlots);
            setLoading(false);
          }
        } catch (error) {
          console.error("Error fetching available time slots:", error);
          setLoading(false);
        }
      };

    fetchAvailableTimeSlots();
  }, []);

  return (
    <Card >
      <CardContent>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography variant="body1">Loading...</Typography>
          </div>
        ) : availableTimeSlots.length > 0 ? (
          <div>
            <Typography variant="h6" style={{ marginBottom: "8px" }}>
              Available Appointments Today
            </Typography>
            <List>
              {availableTimeSlots.map((slot, index) => (
                <ListItem key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
                  <Typography variant="body2" color="text.secondary">
                    Start Time: {slot.startTime}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    End Time: {slot.endTime}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </div>
        ) : (
          <Typography variant="body1">No available Time Slots for today.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AvailableAppointmentsToday;
