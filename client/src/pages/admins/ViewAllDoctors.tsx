import React from 'react';
import UserList from './UserList';
import useGetAllRegisteredUsersByType from '../../hooks/useGetAllRegisteredUsersByType';
import { useNavigate } from 'react-router-dom';
const ViewAllDoctors: React.FC = () => {
    const navigate = useNavigate();
    const doctors = useGetAllRegisteredUsersByType('doctor').data || [];
    return (
            <UserList 
            users={doctors} 
            title={'All Doctors'}
            onRowClick={ (user) => {
                navigate('/admin/users/doctors/info', { state: { user } });
            }}           
             />
    );
};

export default ViewAllDoctors;
