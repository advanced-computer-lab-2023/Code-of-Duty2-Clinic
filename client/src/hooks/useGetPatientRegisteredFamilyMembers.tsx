import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';
import { RegisteredFamilyMember } from '../types';

const getPatientRegisteredFamilyMembers = async (): Promise<RegisteredFamilyMember[]> => {
    const { data } = await axios.get<RegisteredFamilyMember[]>(`${config.serverUri}/patients/family-members`);
    return data;
};


const useGetPatientRegisteredFamilyMembers = () => {
    return useQuery<RegisteredFamilyMember[]>(['patientFamilyMembers'], () => getPatientRegisteredFamilyMembers());
}

export default useGetPatientRegisteredFamilyMembers;

