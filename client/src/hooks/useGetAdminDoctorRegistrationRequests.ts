import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';

const useGetAdminDoctorRegistrationRequests = () => {
    const fetchAdminDoctorRegistrationRequests = async () => {
        const response = await axios.get(`${config.serverUri}/api/admin/registration-requests`);
        return response.data;
    };

    return useQuery('adminDoctorRegistrationRequests', fetchAdminDoctorRegistrationRequests);
};

export default useGetAdminDoctorRegistrationRequests;
