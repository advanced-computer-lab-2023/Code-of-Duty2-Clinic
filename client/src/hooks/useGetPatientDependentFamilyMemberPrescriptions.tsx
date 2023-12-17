import axios from 'axios';
import { useQuery } from 'react-query';
import { config } from '../configuration';


const useGetPatientDependentFamilyMemberPrescriptions = (nationalId: string) => {
    return useQuery(['prescriptions', nationalId], async () => {
        const response = await axios.get(`${config.serverUri}/patients/family-members/dependent/prescriptions`, {params: {nationalId: nationalId}});
        return response.data;
    });
};

export default useGetPatientDependentFamilyMemberPrescriptions;
