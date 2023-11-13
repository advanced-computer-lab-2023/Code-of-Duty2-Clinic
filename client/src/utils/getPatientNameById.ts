
import axios from "axios";
import { config } from "../configuration";


export async function getPatientNameById(id: string)  {
  const patient = await axios.get(`${config.serverUri}/patients/${id}`);
  return patient.data.name;
}
