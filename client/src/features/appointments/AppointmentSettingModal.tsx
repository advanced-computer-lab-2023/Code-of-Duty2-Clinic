import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import FirstView from "./appointment-setting-components/FirstView";
import SecondView from "./appointment-setting-components/SecondView";
import { AppointmentSettingContext } from "./AppointmentSettingContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

type Props = {
  viewIndex: number | null;
  option: "follow-up" | "follow-up-request" | "set-up-appointment";
  registeredPatientId: string | null;
  dependentNationalId: string | null;
  doctorId: string | null;
};
export default function AppointmentSettingModal({
  viewIndex,
  option,
  registeredPatientId,
  dependentNationalId,
  doctorId
}: Props) {
  const context = useContext(AppointmentSettingContext);

  context.setOpen(true);
  context.setViewIndex(viewIndex);
  context.setOption(option);
  context.setRegisteredMemberId(registeredPatientId);
  context.setDependentMemberId(dependentNationalId);
  context.setDoctorId(doctorId);

  const navigate = useNavigate();

  const handleClose = () => {
    context.setOpen(false);
    navigate("/newPage");
  };

  return (
    <Modal
      open={context.open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {context.currentView === 1 ? (
          <FirstView viewOptionIndex={context.viewIndex} option={context.option} />
        ) : (
          <SecondView viewOptionIndex={context.viewIndex!} option={context.option} />
        )}
      </Box>
    </Modal>
  );
}
