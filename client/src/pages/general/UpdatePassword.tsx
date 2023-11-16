import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import { config } from "../../configuration";
import {
  Container,
  TextField,
  Button,
  Typography,
  Snackbar,
} from "@mui/material";
import { Alert, AlertColor } from "@mui/material";
import { useQueryParams } from "../../hooks/useQueryParams";
import { getErrorMessage } from "../../utils/displayError";

function UpdatePasswordPage() {
  const queryClient = useQueryClient();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const type = useQueryParams().get("type");

  const updatePasswordMutation = useMutation(
    async () => {
      const formData = { currentPassword, newPassword, confirmPassword };

      if (type === "admin") {
        const response = await axios.patch(
          `${config.serverUri}/admins/change-password`,
          formData
        );
        return response.data;
      } else if (type === "doctor") {
        const response = await axios.patch(
          `${config.serverUri}/doctors/change-password`,
          formData
        );
        return response.data;
      } else if (type === "patient") {
        const response = await axios.patch(
          `${config.serverUri}/patients/change-password`,
          formData
        );
        return response.data;
      }
    },
    {
      onSuccess: (data) => {
        const message = (data as { message: string }).message;
        queryClient.invalidateQueries("patientData");
        setSnackbarSeverity("success");
        setSnackbarMessage(message);
        setSnackbarOpen(true);
      },
      onError: (error: AxiosError) => {
        setSnackbarSeverity("error");
        setSnackbarMessage(getErrorMessage(error));
        setSnackbarOpen(true);
      },
    }
  );

  const handleUpdatePassword = () => {
    updatePasswordMutation.mutate();
  };

  return (
    <Container>
      <Typography variant="h5">Update Password</Typography>
      <form>
        <TextField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" onClick={handleUpdatePassword}>
          Update Password
        </Button>
      </form>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity as AlertColor} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UpdatePasswordPage;
