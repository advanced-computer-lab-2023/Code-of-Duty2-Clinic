import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete,
  TextField,
  Button,
  Container,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { config } from "../../../configuration";
import { useQuery } from "react-query";
import { getErrorMessage } from "../../../utils/displayError";
import { Doctor } from "../../../types";
import SlotsRangeModal from "../../../components/SlotsRangeModal";
import { useNavigate } from "react-router-dom";

const enum AppointmentBookingOption {
  SELF = "SELF",
  REGISTERED_FAMILY_MEMBER = "REGISTERED_FAMILY_MEMBER",
  DEPENDENT_FAMILY_MEMBER = "DEPENDENT_FAMILY_MEMBER",
}

const getAllAvailableDoctors = async () => {
  const response = await axios.get(`${config.serverUri}/patients/doctors`);
  return response.data;
};

const getRegisteredFamilyMembers = async () => {
  const response = await axios.get(
    `${config.serverUri}/patients/family-members`
  );
  return response.data.members;
};

const getDependentFamilyMembers = async () => {
  const response = await axios.get(
    `${config.serverUri}/patients/dependent-family-members`
  );
  return response.data;
};

type BookingAppointmentParams = {
  bookingOption: AppointmentBookingOption;
  doctorId: string;
  patientId?: string;
  startTime: Date;
  endTime: Date;
};

const AppointmentBooking = () => {
  const [appointmentOption, setAppointmentOption] = useState(
    AppointmentBookingOption.SELF
  );
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState<string | undefined>();

  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(null);
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(null);

  const [slotsModalOpen, setSlotsModalOpen] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppointmentOption(
      (event.target as HTMLInputElement).value as AppointmentBookingOption
    );
  };

  const navigate = useNavigate();
  const handleNavigateToPayment = ({
    bookingOption,
    doctorId,
    patientId,
    startTime,
    endTime,
  }: BookingAppointmentParams) => {
    switch (bookingOption) {
      case AppointmentBookingOption.SELF:
        navigate(
          `/patient/appointments/${doctorId}/payment?st=${startTime.toISOString()}&et=${endTime.toISOString()}`
        );
        break;
      case AppointmentBookingOption.REGISTERED_FAMILY_MEMBER:
        navigate(
          `/patient/appointments/${doctorId}/payment?id=${patientId}&type=r&st=${startTime.toISOString()}&et=${endTime.toISOString()}`
        );
        break;
      case AppointmentBookingOption.DEPENDENT_FAMILY_MEMBER:
        navigate(
          `/patient/appointments/${doctorId}/payment?id=${patientId}&type=d&st=${startTime.toISOString()}&et=${endTime.toISOString()}`
        );
        break;
      default:
        break;
    }
  };

  const getAllAvailableDoctorsQuery = useQuery(
    ["doctors"],
    getAllAvailableDoctors
  );

  const getAllRegisteredFamilyMembersQuery = useQuery(
    ["registeredFamilyMembers"],
    getRegisteredFamilyMembers
  );

  const getAllDependentFamilyMembersQuery = useQuery(
    ["dependentFamilyMembers"],
    getDependentFamilyMembers
  );

  return (
    <Container>
      <h1>Appointment Booking</h1>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          Choose your appointment booking option
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={AppointmentBookingOption.SELF}
          name="radio-buttons-group"
          value={appointmentOption}
          onChange={handleChange}
        >
          <FormControlLabel
            value={AppointmentBookingOption.SELF}
            control={<Radio />}
            label="Book for you"
          />
          <FormControlLabel
            value={AppointmentBookingOption.REGISTERED_FAMILY_MEMBER}
            control={<Radio />}
            label="Book for a registered family member"
          />
          <FormControlLabel
            value={AppointmentBookingOption.DEPENDENT_FAMILY_MEMBER}
            control={<Radio />}
            label="Book for a dependent family member"
          />
        </RadioGroup>
      </FormControl>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        {getAllAvailableDoctorsQuery.isLoading ? (
          <div>Loading...</div>
        ) : getAllAvailableDoctorsQuery.isError ? (
          <div>{getErrorMessage(getAllAvailableDoctorsQuery.error)}</div>
        ) : (
          <div>
            <h4>Available Doctors: </h4>
            <Autocomplete
              options={getAllAvailableDoctorsQuery.data || []}
              getOptionLabel={(option: Doctor) => option.name}
              onChange={(_, value: any) => setDoctorId(value._id || "")}
              renderInput={(params) => (
                <TextField {...params} label="Select a Doctor" />
              )}
            />
          </div>
        )}

        <div>
          {appointmentOption ===
            AppointmentBookingOption.REGISTERED_FAMILY_MEMBER && (
            <div>
              <h4>Registered Family Members: </h4>
              {getAllRegisteredFamilyMembersQuery.isLoading ? (
                <div>Loading...</div>
              ) : getAllRegisteredFamilyMembersQuery.isError ? (
                <div>
                  {getErrorMessage(getAllRegisteredFamilyMembersQuery.error)}
                </div>
              ) : (
                <Autocomplete
                  options={getAllRegisteredFamilyMembersQuery.data || []}
                  getOptionLabel={(option: any) => option.name}
                  onChange={(_, member: any) => setPatientId(member.id || "")}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a Patient" />
                  )}
                />
              )}
            </div>
          )}
          {appointmentOption ===
            AppointmentBookingOption.DEPENDENT_FAMILY_MEMBER && (
            <div>
              <h4>Dependent Family Members: </h4>
              {getAllDependentFamilyMembersQuery.isLoading ? (
                <div>Loading...</div>
              ) : getAllDependentFamilyMembersQuery.isError ? (
                <div>
                  {getErrorMessage(getAllDependentFamilyMembersQuery.error)}
                </div>
              ) : (
                <Autocomplete
                  options={getAllDependentFamilyMembersQuery.data || []}
                  getOptionLabel={(option: any) => option.name}
                  onChange={(_, member: any) =>
                    setPatientId(member.nationalId || "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Select a Patient" />
                  )}
                />
              )}
            </div>
          )}
        </div>
      </div>
      <Button
        color="primary"
        onClick={() => {
          setSlotsModalOpen(true);
        }}
      >
        Book Appointment
      </Button>
      <SlotsRangeModal
        handleClose={() => setSlotsModalOpen(false)}
        open={slotsModalOpen}
        selectedStartTime={selectedStartTime}
        setSelectedStartTime={setSelectedStartTime}
        selectedEndTime={selectedEndTime}
        setSelectedEndTime={setSelectedEndTime}
        handleSaveTimeSlot={() => {
          handleNavigateToPayment({
            doctorId,
            patientId,
            startTime: selectedStartTime!,
            endTime: selectedEndTime!,
            bookingOption: appointmentOption,
          });
          setSlotsModalOpen(false);
        }}
        errorMessage={
          !selectedStartTime
            ? "Start time must be selected"
            : !selectedEndTime
            ? "End time must be selected"
            : selectedStartTime > selectedEndTime
            ? "Start time cannot be greater than end time"
            : ""
        }
      />
    </Container>
  );
};

export default AppointmentBooking;
