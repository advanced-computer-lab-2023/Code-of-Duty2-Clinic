import axios from "axios";
import { config } from "../../../configuration";

export const getAllAvailableDoctors = async () => {
  const response = await axios.get(`${config.serverUri}/patients/doctors`);
  return response.data;
};

export const getAllMyDoctors = async () => {
  const res = await axios.get(`${config.serverUri}/patients/patient-doctors`);
  return res.data;
};

export const getRegisteredPatientDoctors = async (registeredPatientId: string) => {
  const res = await axios.get(
    `${config.serverUri}/patients/patient-doctors${
      registeredPatientId ? `?registeredPatientId=${registeredPatientId}` : ""
    }`
  );
  return res.data;
};

export const getDependentPatientDoctors = async (dependentNationalId: string) => {
  const res = await axios.get(
    `${config.serverUri}/patients/dependent-patient-doctors?dependentNationalId=${dependentNationalId}`
  );
  return res.data;
};

export const getDoctorPatients = async () => {
  const res = await axios.get(`${config.serverUri}/doctors/patients`);
  return res.data;
};

export const getRegisteredFamilyMembers = async () => {
  const response = await axios.get(`${config.serverUri}/patients/family-members`);
  return response.data.members;
};

export const getDependentFamilyMembers = async () => {
  const response = await axios.get(`${config.serverUri}/patients/dependent-family-members`);
  return response.data;
};
