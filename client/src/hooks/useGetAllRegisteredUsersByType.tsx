import axios from 'axios';
import { useQuery } from 'react-query';
import { config } from '../configuration';

const useGetAllRegisteredUsersByType = (type: string) => {
    const getAllRegisteredUsersByType = async () => {
        const response = await axios.get(`${config.serverUri}/admins/users/${type}`);
        return response.data;
    };

    return useQuery('allRegisteredPatients', getAllRegisteredUsersByType);
};

export default useGetAllRegisteredUsersByType;
