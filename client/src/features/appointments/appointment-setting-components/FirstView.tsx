import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FC, useContext } from "react";
import { useQuery } from "react-query";
import { getViewsTitles } from "../AvailableViewOptions";
import {
  getAllAvailableDoctors,
  getAllMyDoctors,
  getDependentFamilyMembers,
  getDoctorPatients,
  getRegisteredFamilyMembers
} from "./APIs";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { AppointmentSettingContext } from "../AppointmentSettingContext";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { UserContext } from "../../../contexts/UserContext";
import UserRole from "../../../types/enums/UserRole";

type Patient = {
  id: string;
  name: string;
  isDependent?: boolean;
};

type Doctor = {
  id: string;
  name: string;
  speciality: string;
};

type ViewProps = {
  viewOptionIndex: number | null;
  option: "follow-up" | "follow-up-request" | "set-up-appointment";
};
const FirstView: FC<ViewProps> = ({ viewOptionIndex, option }) => {
  const getAllAvailableDoctorsQuery = useQuery(["doctors"], getAllAvailableDoctors, {
    enabled:
      option === "set-up-appointment" &&
      (viewOptionIndex === 0 || viewOptionIndex === 4 || viewOptionIndex === 5)
  });

  const getMyDoctorsQuery = useQuery(["myDoctors"], getAllMyDoctors, {
    enabled:
      (option === "set-up-appointment" || option === "follow-up-request") && viewOptionIndex === 0
  });

  const getDoctorPatientsQuery = useQuery(["doctorPatients"], getDoctorPatients, {
    enabled: viewOptionIndex === 1 && option === "follow-up"
  });

  const getAllRegisteredFamilyMembersQuery = useQuery(
    ["registeredFamilyMembers"],
    getRegisteredFamilyMembers,
    {
      enabled:
        (option === "set-up-appointment" || option === "follow-up-request") &&
        (viewOptionIndex === 2 || viewOptionIndex === 4)
    }
  );
  const getAllDependentFamilyMembersQuery = useQuery(
    ["dependentFamilyMembers"],
    getDependentFamilyMembers,
    {
      enabled:
        (option === "set-up-appointment" || option === "follow-up-request") &&
        (viewOptionIndex === 3 || viewOptionIndex === 5)
    }
  );

  const navigate = useNavigate();
  const userRole = useContext(AuthContext).authState.role;
  const userId = useContext(UserContext).user?.id!;

  const context = useContext(AppointmentSettingContext);

  const { doctorId, registeredMemberId, dependentMemberId } = context;

  const handleRedirectToCalendarPage = () => {
    const pagePathname =
      userRole === UserRole.PATIENT
        ? `/patient/schedule?doctorId=${doctorId}&${
            registeredMemberId ? `regId=${registeredMemberId}` : `depId=${dependentMemberId}`
          }`
        : `/doctor/schedule?patientId=${
            registeredMemberId ? registeredMemberId : dependentMemberId
          }${dependentMemberId ? `&spId=${userId}` : ""}`;

    navigate(pagePathname);
    context.setOpen(false);
  };

  const titles = getViewsTitles(viewOptionIndex, option);

  return (
    <Box>
      <div style={{ fontWeight: "bold", padding: "1%" }}>{titles.firstViewTitle}</div>
      {viewOptionIndex === 4 || viewOptionIndex === 5 ? (
        <div>
          <Button onClick={() => context.setCurrentView(2)}>For myself</Button>
          <Button onClick={() => context.setCurrentView(2)}>For my dependent family member</Button>
          <Button onClick={() => context.setCurrentView(2)}>For my registered family member</Button>
        </div>
      ) : viewOptionIndex === 0 ? (
        option === "follow-up-request" ? (
          <Autocomplete
            options={getMyDoctorsQuery.data || []}
            getOptionLabel={(option: Doctor) => option.name}
            onChange={(_, value: any) => context.setDoctorId(value._id || null)}
            renderInput={(params) => <TextField {...params} label="Select a Doctor" />}
          />
        ) : (
          <Autocomplete
            options={getAllAvailableDoctorsQuery.data || []}
            getOptionLabel={(option: Doctor) => option.name}
            onChange={(_, value: any) => context.setDoctorId(value._id || null)}
            renderInput={(params) => <TextField {...params} label="Select a Doctor" />}
          />
        )
      ) : viewOptionIndex === 1 ? (
        <Autocomplete
          options={getDoctorPatientsQuery.data || []}
          getOptionLabel={(option: Patient) => option.name}
          onChange={(_, value: any) => context.setRegisteredMemberId(value.id || null)}
          renderInput={(params) => <TextField {...params} label="Select a Patient" />}
        />
      ) : viewOptionIndex === 2 ? (
        option === "follow-up-request" ? (
          <Autocomplete
            options={getDoctorPatientsQuery.data || []}
            getOptionLabel={(option: Patient) => option.name}
            onChange={(_, value: any) =>
              !value.supervisingPatientId ?? context.setRegisteredMemberId(value.id || null)
            }
            renderInput={(params) => <TextField {...params} label="Select a Patient" />}
          />
        ) : (
          <Autocomplete
            options={getAllRegisteredFamilyMembersQuery.data || []}
            getOptionLabel={(option: Patient) => option.name}
            onChange={(_, value: any) => context.setRegisteredMemberId(value.id || null)}
            renderInput={(params) => <TextField {...params} label="Select a Patient" />}
          />
        )
      ) : option === "follow-up-request" ? (
        <Autocomplete
          options={getDoctorPatientsQuery.data || []}
          getOptionLabel={(option: Patient) => option.name}
          onChange={(_, value: any) =>
            value.supervisingPatientId ?? context.setDependentMemberId(value.id || null)
          }
          renderInput={(params) => <TextField {...params} label="Select a Patient" />}
        />
      ) : (
        <Autocomplete
          options={getAllDependentFamilyMembersQuery.data || []}
          getOptionLabel={(option: Patient) => option.name}
          onChange={(_, value: any) => context.setDependentMemberId(value.id || null)}
          renderInput={(params) => <TextField {...params} label="Select a Patient" />}
        />
      )}
      <Button onClick={handleRedirectToCalendarPage}>Schedule time for this</Button>
    </Box>
  );
};

export default FirstView;
