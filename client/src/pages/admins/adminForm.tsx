// src/components/AdminForm.tsx

import React, { useRef, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { config } from '../../configuration';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Popover from '@mui/material/Popover';
import Alert from '@mui/material/Alert';

interface FormData {
  username: string;
  password: string;
}


const AdminForm: React.FC = () => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [popoverMessage, setPopoverMessage] = React.useState('');
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`${config.serverUri}/admins/admin`, formData);
      setPopoverMessage('Admin added successfully');
    } catch (error) {
      console.error('Error:', error);
      setPopoverMessage('Failed to add admin');
    }
    setAnchorEl(submitButtonRef.current);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={4} md={6}>
        <Box width={'100%'} justifyContent={"center"}>
        <Typography variant="h4" gutterBottom align="center">
                Add Admin
              </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="Username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            
            <Box display="flex" justifyContent="center">
              <Button type="submit" variant="contained" color="primary" ref={submitButtonRef}>
                Submit
              </Button>

                            <Popover
                              open={Boolean(anchorEl)}
                              anchorEl={anchorEl}
                              onClose={handleClose}
                              anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                              }}
                              transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                              }}
                            >
                              <Alert severity={popoverMessage === 'Admin added successfully' ? 'success' : 'error'}>
                                {popoverMessage}
                              </Alert>
                            </Popover>

            </Box>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
  }
export default AdminForm;