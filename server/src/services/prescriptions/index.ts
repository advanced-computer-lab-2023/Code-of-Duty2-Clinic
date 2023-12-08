import Prescription from "../../models/prescriptions/Prescription";
import { IPrescription } from "../../models/prescriptions/interfaces/IPrescription";

export const createPrescription = async (prescriptionData: any) => {
   try {
      const newprescription = new Prescription(prescriptionData);
      await newprescription.save();
      console.log(newprescription);
      return newprescription;
   } catch (error: any) {
      console.error("Error creating prescription:", error.message);
      throw new Error("Error creating prescription");
   }
};

export const updateMedicineAndDosage = async (
   prescriptionId: string,
   medicineId: string,
   updatedData: { medicineId?: string; dosage?: string }
) => {
   try {
      const { medicineId: updatedMedicineId, dosage: updatedDosage } = updatedData;

      const updateFields: { $set?: any } = {};
      if (updatedMedicineId) {
         updateFields.$set = { "medicines.$.medicineId": updatedMedicineId };
      }
      if (updatedDosage) {
         updateFields.$set = {
            ...updateFields.$set,
            "medicines.$.dosage": updatedDosage,
         };
      }

      const updatedPrescription = await Prescription.findOneAndUpdate(
         {
            _id: prescriptionId,
            status: "unfilled",
            "medicines.medicineId": medicineId,
         },
         updateFields,
         { new: true, runValidators: true }
      ).exec();
      console.log(updatedPrescription);

      if (!updatedPrescription)
         throw new Error("Prescription not found or medicine not present in the prescription");

      return updatedPrescription;
   } catch (error: any) {
      console.error("Error updating medicine and dosage:", error.message);
      throw new Error("Error updating medicine and dosage");
   }
};

export const addMedicineToPrescription = async (
   prescriptionId: string,
   medicineId: string,
   dosage: string
) => {
   try {
      const updatedPrescription = await Prescription.findByIdAndUpdate(
         prescriptionId,
         {
            $push: {
               medicines: { medicineId, dosage },
            },
         },
         { new: true, runValidators: true }
      ).exec();

      if (!updatedPrescription) {
         throw new Error("Prescription not found");
      }

      console.log(updatedPrescription);
      return updatedPrescription;
   } catch (error: any) {
      console.error("Error adding medicine:", error.message);
      throw new Error("Error adding medicine");
   }
};
