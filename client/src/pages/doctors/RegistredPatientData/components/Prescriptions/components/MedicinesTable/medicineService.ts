import { useMutation, UseMutationResult } from "react-query";
import PrescribedMedicine from "../../../../../../../types/PrescribedMedicine";
import axios from "axios";
import { config } from "../../../../../../../configuration";

const saveMedicine = async (
  prescriptionId: string,
  updatedMedicine: PrescribedMedicine,
  dependent:boolean
) => {
  const { dosage, quantity, medicineId } = updatedMedicine;
  console.log("quantity", quantity);
  try {
    const response = await axios.put(
      `${config.serverUri}/doctors/prescriptions/${prescriptionId}/medicine/${medicineId}`,
      { dosage, quantity, dependent }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to save medicine"); // Handle errors as needed
  }
};

interface updateMedicineInput {
  prescriptionId: string;
  updatedMedicine: PrescribedMedicine;
  dependent:boolean;
}

export const useSaveMedicineMutation = (): UseMutationResult<any, unknown, updateMedicineInput> => {
  return useMutation(
    ({ prescriptionId, updatedMedicine, dependent }: updateMedicineInput) =>
      saveMedicine(prescriptionId, updatedMedicine, dependent), // Replace 'saveMedicine' with your actual API function
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
