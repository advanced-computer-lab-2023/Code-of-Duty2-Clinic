import { useQuery, UseQueryResult } from 'react-query'
import axios from 'axios';
import { Doctor} from '../types';
import { config } from '../configuration';

const getDoctor = async (doctorId: string) => {
    const { data } = await axios.get(`${config.serverUri}/patients/doctors/${doctorId}`);
    return data;
};

const useGetDoctor = (doctorId: string): UseQueryResult<Doctor> => {
    return useQuery<Doctor>(['doctor', doctorId], () => getDoctor(doctorId));
};

export default useGetDoctor;