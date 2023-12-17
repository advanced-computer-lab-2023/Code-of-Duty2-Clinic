import { useQuery } from 'react-query';
import axios from 'axios';

const useGetPatientDependentFamilyMemberInformation = (dependentFamilyMemberId: string) => {
    const fetchFamilyMemberInfo = async () => {
        const response = await axios.get("/patients/family-members/dependent/info", { params: {id: dependentFamilyMemberId } });
        return response.data;
    };

    const { data: dependentFamilyMembers, error } = useQuery(['familyMembers', dependentFamilyMemberId], fetchFamilyMemberInfo);

    if (error) {
        console.error('Error fetching family members:', error);
    }

    return dependentFamilyMembers || [];
};

export default useGetPatientDependentFamilyMemberInformation;
