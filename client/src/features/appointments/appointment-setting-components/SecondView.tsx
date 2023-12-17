import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FC, useContext } from "react";
import { useQuery } from "react-query";
import { getViewsTitles } from "../AvailableViewOptions";

import {
  getAllAvailableDoctors,
  getRegisteredPatientDoctors,
  getDependentPatientDoctors,
  getRegisteredFamilyMembers,
  getDependentFamilyMembers
} from "./APIs";
import { Autocomplete, TextField } from "@mui/material";
import { AppointmentSettingContext } from "../AppointmentSettingContext";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import UserRole from "../../../types/enums/UserRole";
import { UserContext } from "../../../contexts/UserContext";

type Patient = {
  id: string;
  name: string;
  isDependent?: boolean;
  nationalId?: string;
};

type Doctor = {
  id: string;
  name: string;
  speciality: string;
};

type ViewProps = {
  viewOptionIndex: number;
  option: "follow-up" | "follow-up-request" | "set-up-appointment";
};

const BoxStyle = {
  display: "flex",
  justifyContent: "space-between",
  justifyItems: "center"
};

const SecondView: FC<ViewProps> = ({ viewOptionIndex, option }) => {
  const context = useContext(AppointmentSettingContext);

  const getAllAvailableDoctorsQuery = useQuery(["doctors"], getAllAvailableDoctors, {
    enabled:
      option === "set-up-appointment" &&
      (viewOptionIndex === 4 || viewOptionIndex === 5) &&
      context.doctorId === null
  });

  const getPatientDoctorsQuery = useQuery(
    ["patientDoctors"],
    () => getRegisteredPatientDoctors(context.registeredMemberId!),
    {
      enabled: option === "follow-up-request" && viewOptionIndex === 4
    }
  );

  const getDependentPatientDoctorsQuery = useQuery(
    ["dependentPatientDoctors"],
    () => getDependentPatientDoctors(context.dependentMemberId!),
    {
      enabled: option === "follow-up-request" && viewOptionIndex === 5
    }
  );

  const getAllRegisteredFamilyMembersQuery = useQuery(
    ["registeredFamilyMembers"],
    getRegisteredFamilyMembers,
    {
      enabled:
        (option === "set-up-appointment" || option === "follow-up-request") && viewOptionIndex === 4
    }
  );
  const getAllDependentFamilyMembersQuery = useQuery(
    ["dependentFamilyMembers"],
    getDependentFamilyMembers,
    {
      enabled:
        (option === "set-up-appointment" || option === "follow-up-request") && viewOptionIndex === 5
    }
  );

  const titles = getViewsTitles(viewOptionIndex, option).secondViewTitle;

  const navigate = useNavigate();
  const userRole = useContext(AuthContext).authState.role;
  const userId = useContext(UserContext).user?.id!;

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

  return (
    <Box>
      {viewOptionIndex === 4 ? (
        option === "follow-up-request" ? (
          <Box sx={BoxStyle}>
            <div>
              <h5>{titles?.leftPart}</h5>
              <Autocomplete
                options={getAllRegisteredFamilyMembersQuery.data || []}
                getOptionLabel={(option: Patient) => option.name}
                onChange={(_event, value) => context.setRegisteredMemberId(value?.id || null)}
                renderInput={(params) => <TextField {...params} label="Family member" />}
              />
            </div>
            <div>
              <h5>{titles?.rightPart}</h5>
              <Autocomplete
                options={getPatientDoctorsQuery.data || []}
                getOptionLabel={(option: Doctor) => option.name}
                onChange={(_event, value) => context.setDoctorId(value?.id || null)}
                renderInput={(params) => <TextField {...params} label="Doctor" />}
              />
            </div>
          </Box>
        ) : (
          <Box sx={BoxStyle}>
            {" "}
            <div>
              <h5>{titles?.leftPart}</h5>
              <Autocomplete
                options={getAllRegisteredFamilyMembersQuery.data || []}
                getOptionLabel={(option: Patient) => option.name}
                onChange={(_event, value) => context.setRegisteredMemberId(value?.id || null)}
                renderInput={(params) => <TextField {...params} label="Family member" />}
              />
            </div>
            <div>
              <h5>{titles?.rightPart}</h5>
              <Autocomplete
                options={getAllAvailableDoctorsQuery.data || []}
                getOptionLabel={(option: Doctor) => option.name}
                onChange={(_event, value) => context.setDoctorId(value?.id || null)}
                renderInput={(params) => <TextField {...params} label="Doctor" />}
              />
            </div>
          </Box>
        )
      ) : option === "follow-up-request" ? (
        <Box sx={BoxStyle}>
          {" "}
          <div>
            <h5>{titles?.leftPart}</h5>
            <Autocomplete
              options={getAllDependentFamilyMembersQuery.data || []}
              getOptionLabel={(option: Patient) => option.name}
              onChange={(_event, value) => context.setDependentMemberId(value?.nationalId || null)}
              renderInput={(params) => <TextField {...params} label="Family member" />}
            />
          </div>
          <div>
            <h5>{titles?.rightPart}</h5>
            <Autocomplete
              options={getDependentPatientDoctorsQuery.data || []}
              getOptionLabel={(option: Doctor) => option.name}
              onChange={(_event, value) => context.setDoctorId(value?.id || null)}
              renderInput={(params) => <TextField {...params} label="Doctor" />}
            />
          </div>
        </Box>
      ) : (
        <Box sx={BoxStyle}>
          {" "}
          <div>
            <h5>{titles?.leftPart}</h5>
            <Autocomplete
              options={getAllDependentFamilyMembersQuery.data || []}
              getOptionLabel={(option: Patient) => option.name}
              onChange={(_event, value) => context.setDependentMemberId(value?.nationalId || null)}
              renderInput={(params) => <TextField {...params} label="Family member" />}
            />
          </div>
          <div>
            <h5>{titles?.rightPart}</h5>
            <Autocomplete
              options={getAllAvailableDoctorsQuery.data || []}
              getOptionLabel={(option: Doctor) => option.name}
              onChange={(_event, value) => context.setDoctorId(value?.id || null)}
              renderInput={(params) => <TextField {...params} label="Doctor" />}
            />
          </div>
        </Box>
      )}
      <Button onClick={handleRedirectToCalendarPage}>Schedule appointment for this</Button>
    </Box>
  );
};

export default SecondView;
