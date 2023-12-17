import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Container, Modal, Typography } from "@mui/material";
import axios from "axios";
import { config } from "../../../../../configuration";
import { useQueryParams } from "../../../../../hooks/useQueryParams";
import Grid from "@mui/material/Grid";
import { OverviewTotalCustomers } from "./components/file2";
import { OverviewTasksProgress } from "./components/file3";
import { OverviewTotalProfit } from "./components/file1";
import PatientContactDetails from "./components/patientContactDetails";
import { OverviewTraffic } from "./components/traffic";
import { Slots } from "../../../../../types/Slots";
import { useMutation } from "react-query";
import SlotsRangeModal from "../../../../../components/SlotsRangeModal";
import { getErrorMessage } from "../../../../../utils/displayError";
interface FollowUpAppointment extends Slots {
  patientId: string;
}
const addFollowUpAppointment = async ({ startTime, endTime, patientId }: FollowUpAppointment) => {
  const response = await axios.post(
    `${config.serverUri}/doctors/appointments/${patientId}/follow-up`,
    {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString()
    }
  );
  return response.data;
};
const PatientGeneralDetails: React.FC = () => {
  const [patientData, setPatientData] = useState<any>(null);
  const patientId = useParams().patientId!;

  const supervisingPatientId = useQueryParams().get("spId");
  //-----follow up
  const [openSlotsModal, setOpenSlotsModal] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);
  const addFollowUpAppointmentMutation = useMutation(addFollowUpAppointment, {
    onSuccess: closeModal
  });





  //-----
  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        `${config.serverUri}/doctors/patients/${patientId}${
          supervisingPatientId ? `?supervisingPatientId=${supervisingPatientId}` : ""
        }`
      );
      setPatientData(response.data.patientInfo);
      //  setTableFiles(response.data.patientInfo.healthRecords);
      //  setTableLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, []);

  if (!patientData) return <div>Loading...</div>;
  return (
    //  <Box marginTop={5}>
    <>
      <Box
         
        component="main"
        sx={{
         mt:10,mr:'auto',p:0
        }}
      >
        <Container sx={{marginLeft:'auto'}} maxWidth="xl">
          <Grid columnSpacing={2} container spacing={3}>
            {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="$24k"
            />
          </Grid> */}
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value="3"
              />
            </Grid>
           
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Grid container>
        <Grid item md={8} xs={12}>
          <PatientContactDetails patientData={patientData} />
        </Grid>
        <Grid item md={4} xs={12}>
          <OverviewTraffic
            chartSeries={[65,35]}
            labels={["Submitted", "Unsubmitted"]}
            sx={{ height: "100%" }}
          />
        </Grid>
      </Grid>
      <Box>
        <Button onClick={() => setOpenSlotsModal((prev) => !prev)}>
          Schedule a follow up appointment with this patient
        </Button>
        <SlotsRangeModal
          handleClose={closeModal}
          open={openSlotsModal}
          selectedStartTime={selectedStartTime}
          setSelectedStartTime={setSelectedStartTime}
          selectedEndTime={selectedEndTime}
          setSelectedEndTime={setSelectedEndTime}
          handleSaveTimeSlot={handleSaveTimeSlot}
          errorMessage={
            addFollowUpAppointmentMutation.error
              ? getErrorMessage(addFollowUpAppointmentMutation.error)
              : ""
          }
        />
      </Box>
    </>
  );
  function handleSaveTimeSlot() {
    const startTime: Date = new Date(selectedStartTime!);
    const endTime: Date = new Date(selectedEndTime!);
    addFollowUpAppointmentMutation.mutate({
      startTime,
      endTime,
      patientId
    });
  }

  function closeModal() {
    setOpenSlotsModal(false);
  }
};

export default PatientGeneralDetails;
