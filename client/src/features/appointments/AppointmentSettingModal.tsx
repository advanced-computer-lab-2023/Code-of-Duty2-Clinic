import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Dispatch, FC, SetStateAction, useState } from "react";

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

const availableViewOptions = [
  {
    leftView: null,
    rightView: "doctors"
  },
  {
    leftView: null,
    rightView: "patients"
  },
  {
    leftView: "registered",
    rightView: null
  },
  {
    leftView: "dependent",
    rightView: null
  },
  {
    leftView: "registered",
    rightView: "doctors"
  },
  {
    leftView: "dependent",
    rightView: "doctors"
  }
];

const getViewsTitles = (
  view: number,
  option: "follow-up" | "follow-up-request" | "set-up-appointment"
) => {
  switch (view) {
    case 0:
      return {
        firstViewTitle:
          option === "follow-up-request"
            ? "Choose the doctor whom you want to request a follow up appointment"
            : "Choose the doctor whom you want to set up an appointment with"
      };
    case 1:
      return {
        firstViewTitle: "Choose a patient with whom you want to conduct a follow up appointment"
      };
    case 2:
      return {
        firstViewTitle:
          option === "follow-up-request"
            ? "Choose the registered patient whom you want to request a follow up appointment with this doctor"
            : "Choose the registered patient whom you want to conduct an appointment with this doctor"
      };
    case 3:
      return {
        firstViewTitle:
          option === "follow-up-request"
            ? "Choose the dependent patient whom you want to request a follow up appointment with this doctor"
            : "Choose the dependent patient whom you want to conduct an appointment with this doctor"
      };
    case 4:
      return {
        firstViewTitle: ["For Myself", "For my dependent patient", "For a registered patient"],
        secondViewTitle: {
          leftPart: "Choose the registered patient",
          rightPart: "Choose the doctor"
        }
      };
    case 5:
      return {
        firstViewTitle: ["For Myself", "For my dependent patient", "For a registered patient"],
        secondViewTitle: {
          leftPart: "Choose the dependent patient",
          rightPart: "Choose the doctor"
        }
      };
    default:
      return {
        firstViewTitle: "",
        secondViewTitle: ""
      };
  }
};

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  viewIndex: number;
  option: "follow-up" | "follow-up-request" | "set-up-appointment";
};

export default function AppointmentSettingModal({ open, setOpen, viewIndex, option }: Props) {
  const [currentView, setCurrentView] = useState(1);
  const navigate = useNavigate();

  const handleOpen = (view: number) => {
    setCurrentView(view);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/newPage");
  };

  return (
    <div>
      <Button onClick={() => handleOpen(1)}>Request a follow up appointment for myself</Button>
      <Button onClick={() => handleOpen(2)}>
        Request a follow up appointment for a dependent member
      </Button>
      <Button onClick={() => handleOpen(3)}>
        Request a follow up appointment for a registered member
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {currentView === 1 && <div>View for Option 1</div>}
          {currentView === 2 && (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ overflowY: "scroll" }}>
                <Button id="button1" onClick={() => {}}>
                  Button 1
                </Button>
                <Button id="button2" onClick={() => {}}>
                  Button 2
                </Button>
                {/* Add more buttons as needed */}
              </div>
              <div style={{ overflowY: "scroll" }}>
                <Button id="button3" onClick={() => {}}>
                  Button 3
                </Button>
                <Button id="button4" onClick={() => {}}>
                  Button 4
                </Button>
                {/* Add more buttons as needed */}
              </div>
            </div>
          )}
          {currentView === 3 && <div>View for Option 3</div>}
          <Button onClick={handleClose}>Start</Button>
        </Box>
      </Modal>
    </div>
  );
}
