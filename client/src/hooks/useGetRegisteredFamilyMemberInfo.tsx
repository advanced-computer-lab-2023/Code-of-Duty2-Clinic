import { useQuery } from 'react-query';
import axios from 'axios';

const useGetRegisteredFamilyMemberInfo = (registeredFamilyMemberId: string) => {
    const fetchRegisteredFamilyMemberInfo = async () => {
        const response = await axios.get('/patients/family-members/registered/info', { params: { id: registeredFamilyMemberId } });
        return response.data;
    };

    const { data: registeredFamilyMemberInfo } = useQuery('registeredFamilyMemberInfo', fetchRegisteredFamilyMemberInfo);
    return registeredFamilyMemberInfo || [];
};

export default useGetRegisteredFamilyMemberInfo;
