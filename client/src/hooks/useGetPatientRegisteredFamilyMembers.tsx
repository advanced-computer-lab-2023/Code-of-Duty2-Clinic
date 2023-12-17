import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';
import { RegisteredFamilyMember } from '../types';

const getPatientRegisteredFamilyMembers = async (): Promise<RegisteredFamilyMember[]> => {
    const { data } = await axios.get(`${config.serverUri}/patients/family-members`);
    return data.members;
};

const useGetPatientRegisteredFamilyMembers = () => {
    return useQuery<RegisteredFamilyMember[], Error>('patientFamilyMembers', getPatientRegisteredFamilyMembers);
}

export default useGetPatientRegisteredFamilyMembers;