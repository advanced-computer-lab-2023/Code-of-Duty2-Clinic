import React, { useState, useEffect } from 'react';
import './userList.css'
import axios from 'axios';
import { prepareCssVars } from '@mui/system';

interface User {
  username: string;
  name: string;
  userType: string; // You can use this property to distinguish between Patients, Doctors, and Admins
}

const UserList: React.FC = () => {
  const[deletedAlert,setdeletedAlert] = useState(false);
  const [patients, setPatients] = useState<User[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch patients
    fetchUsersByType('Patient').then((data) => setPatients(data));

    // Fetch doctors
    fetchUsersByType('Doctor').then((data) => setDoctors(data));

    // Fetch admins
    fetchUsersByType('Admin').then((data) => setAdmins(data));
  }, []);

  const fetchUsersByType = async (userType: string): Promise<User[]> => {
    try {
      const response = await fetch(`http://localhost:4000/api/admins/users/${userType}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }});

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Error fetching ${userType}s`);
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  };

  const handleRemoveUser = async (username: string, Type: string) => {
    const data = {
      username: username,
      Type: Type,
    };
    try {
     await axios.delete(`http://localhost:4000/api/admins/users`,{data})   
      switch(Type){
        case 'Admin':setAdmins(previous => previous.filter(user=> user.username != username));break;
        case 'Doctor':setDoctors(previous => previous.filter(user=> user.username != username));break;
        case 'Patient':setPatients(previous => previous.filter(user=> user.username != username));break;
        default:console.log('invalidType');
      } 
    } catch (error) {
      
    } 
  };
  

  return (
    <div className="user-container">
    <h2 className="user-heading">User List</h2>

    <h3 className="user-subheading">Patients</h3>
    <ul className="user-list">
      {patients.map((patient) => (
        <li key={patient.username} className="user-item">
          {patient.name} (Patient){' '}
          <button className="user-button" onClick={() => setSelectedUser(patient)}>View</button>
          <button className="user-button" onClick={() => handleRemoveUser(patient.username, 'Patient')}>Remove</button>
        </li>
      ))}
    </ul>

    <h3 className="user-subheading">Doctors</h3>
    <ul className="user-list">
      {doctors.map((doctor) => (
        <li key={doctor.username} className="user-item">
          {doctor.name} (Doctor){' '}
          <button className="user-button" onClick={() => setSelectedUser(doctor)}>View</button>
          <button className="user-button" onClick={() => handleRemoveUser(doctor.username, 'Doctor')}>Remove</button>
        </li>
      ))}
    </ul>

    <h3 className="user-subheading">Admins</h3>
    <ul className="user-list">
      {admins.map((admin) => (
        <li key={admin.username} className="user-item">
          {admin.name} (Admin){' '}
          <button className="user-button" onClick={() => setSelectedUser(admin)}>View</button>
          <button className="user-button" onClick={() => handleRemoveUser(admin.username, 'Admin')}>Remove</button>
        </li>
      ))}
    </ul>

    {selectedUser && (
      <div className="selected-user">
        <h3 className="selected-user-heading">Selected User</h3>
        <p className="selected-user-details">Username: {selectedUser.username}</p>
        <p className="selected-user-details">User Type: {selectedUser.userType}</p>
      </div>
    )}
    {deletedAlert&& <p>Username ${selectedUser?.username} has been removed</p>}
  </div>
  );
};

export default UserList;
