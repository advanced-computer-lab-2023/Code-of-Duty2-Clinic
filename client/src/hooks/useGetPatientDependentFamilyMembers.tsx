import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';
import { DependentFamilyMember } from '../types';

const patientDependentFamilyMembers = async (): Promise<DependentFamilyMember[]> => {
    const { data } = await axios.get(`${config.serverUri}/patients/family-members/dependent`);
    return data;
};

const useGetPatientDependentFamilyMembers = () => {
    return useQuery<DependentFamilyMember[], Error>('dependentFamilyMembers', patientDependentFamilyMembers);
}

export default useGetPatientDependentFamilyMembers;
