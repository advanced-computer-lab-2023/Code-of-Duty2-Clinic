import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';

const useGetAdminUsersByType = (userType: string) => {
    const fetchAdminUsersByType = async () => {
        const response = await axios.get(`${config.serverUri}/admins/users/${userType}`);
        return response.data;
    };

    return useQuery(['adminUsers', userType], fetchAdminUsersByType);
};

export default useGetAdminUsersByType;
