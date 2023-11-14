import { useQuery } from "react-query";
import axios from "axios";
import { config } from "../configuration";
import { Patient } from "../types/Patient";

const getAllPatients = async (): Promise<Patient[]> => {
    const { data } = await axios.get(`${config.serverUri}/doctors/patients`);
    return data;
};

const useGetAllPatients = () => {
  return useQuery<Patient[]>("patients", getAllPatients);
};

export default useGetAllPatients;
