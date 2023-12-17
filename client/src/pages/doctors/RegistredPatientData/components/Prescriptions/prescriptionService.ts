import axios from "axios";
import { UseMutationResult, useMutation, useQuery } from "react-query";

import { config } from "../../../../../configuration";
import PerscribedMedicine from "../../../../../types/PrescribedMedicine";

export interface submitPrescriptionInput {
  prescriptionId: string;
  patientId: string;
  dependent: boolean;
}

export const useFetchPatientPrescriptions = (prescriptionId: string, dependent: boolean) => {
  return useQuery(["patient-prescription", prescriptionId], async () => {
    const response = await axios.get(
      `${config.serverUri}/patients/prescription/${prescriptionId}`,
      { params: { dependent } }
    );
    return response.data;
  });
};
export interface ServerResponse {
  data: Prescription[];
  hasNextPage: boolean;
}
export interface FetchTodosParams {
  pageParam?: string;
  patientId: string;
  pageSize?: number;
  supervisingPatientId?: string;
}

export interface Prescription {
  _id: string;
  doctorId: string;
  patientId: string;
  status: string;
  medicines: Array<PerscribedMedicine>;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isSubmitted: boolean;
  doctor: {
    _id: string;
    name: string;
    speciality: string;
  };
  patient: {
    _id: string;
    name: string;
  };
}

export const fetchPrescriptions = ({
  pageParam,
  patientId,
  pageSize = 2,
  supervisingPatientId
}: FetchTodosParams) =>
  axios
    .get<ServerResponse>(`${config.serverUri}/doctors/patient/${patientId}/prescription`, {
      params: { pageSize, lastCreatedAt: pageParam, supervisingPatientId }
    })
    .then((res) => res.data);

const submitPrescriptionToPharamcy = async (
  prescriptionId: string,
  patientId: string, 
  dependent: boolean
) => {
  try {
    await axios.put(
      `${config.serverUri}/doctors/prescriptions/${prescriptionId}/submit`,
      {
        patientId,
        dependent
      },
    );
  } catch (error) {
    throw new Error("Failed to save medicine"); // Handle errors as needed
  }
};

export const useSubmitPrescriptionMutation = (): UseMutationResult<
  any,
  unknown,
  submitPrescriptionInput
> => {
  return useMutation(
    ({ prescriptionId, patientId, dependent }: submitPrescriptionInput) =>
      submitPrescriptionToPharamcy(prescriptionId, patientId, dependent),
    {
      onSuccess: () => {
        console.log("updated");
      },
      onError: () => {
        throw new Error("Cannot update Medicine");
      }
    }
  );
};

const createPrescription = async (patientId: string, supervisingPatientId?: string) => {
  try {
    await axios.post(
      `${config.serverUri}/doctors/patient/${patientId}/prescription/`,
      {
        patientId,
        supervisingPatientId
      },
    );
  } catch (error) {
    throw new Error("Failed to save medicine"); // Handle errors as needed
  }
};
export interface createPrescriptionInput {
  patientId: string;
  supervisingPatientId?: string;
}

export const useCreatePrescriptionMutation = (): UseMutationResult<
  any,
  unknown,
  createPrescriptionInput
> => {
  return useMutation(
    ({ patientId, supervisingPatientId }: createPrescriptionInput) =>
      createPrescription(patientId, supervisingPatientId),
    {
      onSuccess: () => {
        console.log("updated");
      },
      onError: () => {
        throw new Error("Cannot update Medicine");
      }
    }
  );
};
