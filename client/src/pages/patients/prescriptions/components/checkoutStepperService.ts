import axios from "axios";
import { UseMutationResult, useMutation, useQuery } from "react-query";

import { config } from "../../../../configuration";
import { IOrder, createPharmacyOrderInput } from "../interfaces";

export const useFetchPatientPrescription = (prescriptionId: string) => {
   return useQuery(["patient-prescription", prescriptionId], async () => {
      const response = await axios.get(
         `${config.serverUri}/patients/prescription/${prescriptionId}`,
         { params: { prescriptionId } }
      );
      return response.data;
   });
};

const createPharmacyOrder = async (order: IOrder, prescriptionId: string) => {
   try {
      await axios.post(`${config.serverUri}/patients/prescription/${prescriptionId}/pay`, {
         ...order,
      });
   } catch (error) {
      throw new Error("Failed to save medicine"); // Handle errors as needed
   }
};

export const useCreateOrderMutation = (): UseMutationResult<
   any,
   unknown,
   createPharmacyOrderInput
> => {
   return useMutation(
      ({ order, prescriptionId }: createPharmacyOrderInput) =>
         createPharmacyOrder(order, prescriptionId),
      {
         onSuccess: () => {
            console.log("updated");
         },
         onError: () => {
            throw new Error("Cannot update Medicine");
         },
      }
   );
};
