import axios from 'axios';
import { config } from '../configuration';


async function findPatientByEmail(email: string) {
    const response = await axios.get(`${config.serverUri}/patients/search/email/${email}`);
    return response.data;
}

export { findPatientByEmail };

