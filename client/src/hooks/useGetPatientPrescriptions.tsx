import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';

const useGetPatientPrescriptions = () => {
    const fetchPrescriptions = async () => {
        // Make your API request here to fetch the prescriptions
        const response = await axios.get(`${config.serverUri}/patients/prescriptions/view`);
        return response.data;
    };

    return useQuery('prescriptions', fetchPrescriptions);
};

export default useGetPatientPrescriptions;
