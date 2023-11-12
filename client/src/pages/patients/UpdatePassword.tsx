import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import axios, {AxiosError} from 'axios';
import { config } from '../../configuration';
import { Container, TextField, Button, Typography, Snackbar } from '@mui/material';
import { Alert, AlertColor } from '@mui/material';
// import { z } from 'zod';

// const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

// const schema = z.object({
//     currentPassword: passwordSchema,
//     newPassword: passwordSchema,
//     confirmPassword: passwordSchema,
// });


function UpdatePasswordPage() {
  const queryClient = useQueryClient();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');



  const updatePasswordMutation = useMutation(
    async () => {

      const formData = { currentPassword, newPassword, confirmPassword };

      const response = await axios.patch(`${config.serverUri}/patients/change-password`, formData);

      return response.data;
    },
    {
        onSuccess: (data) => {
            const message = (data as { message: string }).message;
            // Invalidate and refetch the patient's data after a successful update
            queryClient.invalidateQueries('patientData');
            setSnackbarSeverity('success');
            setSnackbarMessage(message);
            setSnackbarOpen(true);
        },
        onError: (error: AxiosError) => {
            setSnackbarSeverity('error');
            // setSnackbarMessage((error as Error).message);
            setSnackbarMessage((error?.response?.data as { message: string })?.message ?? 'An error occurred');
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
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
        <Alert severity={snackbarSeverity as AlertColor} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UpdatePasswordPage;
