import axios from 'axios';
import { config } from './config';

async function findPatientByMobile(mobile: string) {
    const response = await axios.get(`${config.serverUri}/patients/search/mobile/${mobile}`);
    return response.data;
}

export { findPatientByMobile };
