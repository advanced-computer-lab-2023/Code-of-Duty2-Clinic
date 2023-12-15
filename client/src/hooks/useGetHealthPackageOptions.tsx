import { useQuery } from 'react-query';
import axios from 'axios';
import { HealthPackage } from '../types';
import { config } from '../configuration';


const getPatientHealthPackages = async () => {
    const {data} = await axios.get(`${config.serverUri}/patients/health-packages`);
    return data;
}

const useGetPatientHealthPackages = () => {
    return useQuery<HealthPackage[]>('patient-health-packages', getPatientHealthPackages);
}

export default useGetPatientHealthPackages;
