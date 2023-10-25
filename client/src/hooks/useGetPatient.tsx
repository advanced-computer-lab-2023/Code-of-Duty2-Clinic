import { useQuery, UseQueryResult } from 'react-query';
import axios from 'axios';
import { Patient } from '../types';
import { config } from '../utils/config';


const getPatient = async (patientId: string) => {
    const { data } = await axios.get(`${config.serverUri}/patients/${patientId}`);
    return data;
};

const useGetPatient = (patientId: string): UseQueryResult<Patient> => {
    return useQuery<Patient>(['patient', patientId], () => getPatient(patientId));
};

export default useGetPatient;
