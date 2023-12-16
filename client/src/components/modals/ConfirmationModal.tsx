import { FC } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";

interface ConfirmationModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  title: string;
  description: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  open,
  handleClose,
  handleConfirm,
  title,
  description
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{description}</DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          pt: 2,
          pr: 4,
          pb: 3,
          display: "flex",
          justifyContent: "space-evenly",
          justifyItems: "center"
        }}
      >
        <Button onClick={handleClose} color="error">
          No
        </Button>
        <Button onClick={handleConfirm} color="primary" variant="outlined" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
