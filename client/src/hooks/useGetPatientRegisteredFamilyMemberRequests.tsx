import { useQuery } from 'react-query';
import axios from 'axios';
import { config } from '../configuration';
import { RegisteredFamilyMember } from '../types';


  const getPatientRegisteredFamilyMemberRequests = async () => {
    const { data } = await axios.get(`${config.serverUri}/patients/family-members/requests`);
    return data;

  }
  
 const useGetPatientRegisteredFamilyMemberRequests = () => {
  return useQuery<RegisteredFamilyMember[]>('patientRegisteredFamilyMemberRequests', getPatientRegisteredFamilyMemberRequests);
}

export default useGetPatientRegisteredFamilyMemberRequests;
