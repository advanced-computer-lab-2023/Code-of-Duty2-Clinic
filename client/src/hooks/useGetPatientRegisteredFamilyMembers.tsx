import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';
import { Patient } from '../types';

const getPatientRegisteredFamilyMembers = async (patientId: string): Promise<Patient[]> => {
    const { data } = await axios.get<never[]>(`${config.serverUri}/patients/${patientId}/family-members`);
    return data;
};


const useGetPatientRegisteredFamilyMembers = (patientId: string) => {
    return useQuery<Patient[]>(['patientFamilyMembers', patientId], () => getPatientRegisteredFamilyMembers(patientId));
}

export default useGetPatientRegisteredFamilyMembers;

