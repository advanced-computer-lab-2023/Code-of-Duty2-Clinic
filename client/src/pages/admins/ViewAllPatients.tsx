import React from 'react';
import UserList from './UserList';
import useGetAllRegisteredUsersByType from '../../hooks/useGetAllRegisteredUsersByType';
import { useNavigate } from 'react-router-dom';

const ViewAllPatients: React.FC = () => {
    const navigate = useNavigate();
    const patients = useGetAllRegisteredUsersByType('patient').data || [];
    console.log(patients);
    return (
            <UserList 
            users={patients} 
            title={'All Patients'}
            onRowClick={ (user) => {
                navigate('/admin/users/patients/info', { state: { user } });
            } }        
             />
    );
};

export default ViewAllPatients;
