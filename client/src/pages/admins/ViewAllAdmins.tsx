import React from 'react';
import useGetAllRegisteredUsersByType from '../../hooks/useGetAllRegisteredUsersByType';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { handleRemoveUser } from './Home';
import { useNavigate } from 'react-router-dom';

const ViewAllAdmins: React.FC = () => {
    const admins = useGetAllRegisteredUsersByType('admin').data || [];
    const navigate = useNavigate();
    return (
        <Box sx={{margin: '5%'}}>
        <Typography variant="h4" align="center" gutterBottom>
          All Admins
              </Typography>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {admins.map((admin: any) => (
                        <TableRow key={admin.id}>
                            <TableCell>{admin.username}</TableCell>
                            <TableCell>{new Date(admin.createdAt).toLocaleDateString('us-US')}</TableCell>
                            <TableCell>
                            <Button
                                variant="contained"
                                onClick={() => 
                                handleRemoveUser(admin.username, 'admin', navigate)}
                                color="error"
                            >
                                Remove User
                            </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box display="flex" justifyContent="center">
          <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/admin/dashboard")}
        sx={{ margin: 4}}
      >
        Back to Home
      </Button>
</Box>
    </Box>
    );
};

export default ViewAllAdmins;
