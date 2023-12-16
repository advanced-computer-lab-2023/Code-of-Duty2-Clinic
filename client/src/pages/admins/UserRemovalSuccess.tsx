import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import Alert from '@mui/material/Alert';

const UserRemovalSuccess: React.FC = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: '10%' }}>
        <Alert severity="success" sx={{ fontSize: 30 }}>
          User has been successfully deleted
        </Alert>
        <Button variant="contained" onClick={() => navigate('/admin/dashboard')}>
          Back to Dashboard
        </Button>
      </Box>
    );
  };
export default UserRemovalSuccess;
