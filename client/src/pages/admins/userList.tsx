import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  username: string;
  name: string;
  createdAt: string;
}

interface UserListProps {
  title: string;
  users: User[];
  onRowClick?: (user: User) => void;
}


const UserList: React.FC<UserListProps> = ({ title, users, onRowClick }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  const handleRowClick = (user: User) => {
    if (onRowClick) {
      onRowClick(user);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" align="center" gutterBottom>
        {title}
            </Typography>
            <Box display="flex" justifyContent="center" margin={'2%'}>
        <TextField
          label="Search by name or username"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{width: '50%'}}
        />
</Box>
    <TableContainer sx={{width: '90%', margin: '5%'}}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow
              key={user._id}
              onClick={() => handleRowClick(user)}
              onMouseEnter={() => setHoveredRow(user._id)}
              onMouseLeave={() => setHoveredRow(null)}
              style={{
                cursor: 'pointer',
                backgroundColor: hoveredRow === user._id ? 'lightgrey' : undefined,
              }}
            >
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>         
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
        sx={{ margin: 2, marginTop: -8 }}
      >
        Back to Home
      </Button>
</Box>
    </Box>
  );
};

export default UserList;