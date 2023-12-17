import mongoose, { Error, Schema, Types } from "mongoose";
import Prescription, {
   IPrescriptionModel,
   PrescriptionSchema,
} from "../../models/prescriptions/Prescription";
import Medicine from "../../models/medicines/Medicine";
import { IPrescription } from "../../models/prescriptions/interfaces/IPrescription";
import Patient from "../../models/patients/Patient";
import { findHealhPackagePharmacyDiscountAndName } from "../health-packages";

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
   updatedData: { medicineId?: string; dosage?: string; quantity?: number }
) => {
   try {
      const { medicineId: updatedMedicineId, dosage, quantity } = updatedData;

      const updateFields: { $set?: any } = { $set: {} };
      if (updatedMedicineId) {
         updateFields.$set = { "medicines.$.medicineId": updatedMedicineId };
      }
      if (dosage) {
         updateFields.$set = {
            ...updateFields.$set,
            "medicines.$.dosage": dosage,
         };
      }
      if (quantity) {
         updateFields.$set = {
            ...updateFields.$set,
            "medicines.$.quantity": quantity,
         };
      }
      console.log(updateFields);
      const updatedPrescription = await Prescription.findOneAndUpdate(
         {
            _id: prescriptionId,
            status: "unfilled",
            "medicines.medicineId": medicineId,
         },
         updateFields,
         { new: true, runValidators: true }
      );
      updatedPrescription?.save();

      if (!updatedPrescription)
         throw new Error("Prescription not found or medicine not present in the prescription");

      return updatedPrescription;
   } catch (error: any) {
      console.error("Error updating medicine and dosage:", error.message);
      throw new Error("Error updating medicine and dosage");
   }
};
export const updatePrescriptionToPaid = async (prescriptionId: string) => {
   try {
      await Prescription.updateOne({ _id: prescriptionId }, { $set: { isPaid: true } });
   } catch (err) {
      throw new Error("Cannot update Prescription to Paid ");
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

      return updatedPrescription;
   } catch (error: any) {
      console.error("Error adding medicine:", error.message);
      throw new Error("Error adding medicine");
   }
};
export const getPatientPrescriptionsByDoctor = async (
   doctorId: string,
   patientId: string,
   lastCreatedAt: Date | null = null,
   pageSize: number = 5
) => {
   try {
      console.log("HERE");
      const matchCriteria: any = {
         doctorId: new mongoose.Types.ObjectId(doctorId),
         patientId: new mongoose.Types.ObjectId(patientId),
      };

      if (lastCreatedAt) {
         matchCriteria.createdAt = { $lt: lastCreatedAt };
      }

      const patientPrescriptions = await Prescription.aggregate([
         {
            $match: matchCriteria,
         },
         {
            $lookup: {
               from: "doctors",
               localField: "doctorId",
               foreignField: "_id",
               as: "doctor",
               pipeline: [
                  {
                     $project: {
                        _id: 1,
                        name: 1,
                        speciality: 1,
                        // Add other fields you want to include
                     },
                  },
               ],
            },
         },
         {
            $lookup: {
               from: "patients",
               localField: "patientId",
               foreignField: "_id",
               as: "patient",
               pipeline: [
                  {
                     $project: {
                        _id: 1,
                        name: 1,
                        // Add other fields you want to include
                     },
                  },
               ],
            },
         },
         {
            $addFields: {
               doctor: { $arrayElemAt: ["$doctor", 0] },
               patient: { $arrayElemAt: ["$patient", 0] },
            },
         },
         {
            $sort: { createdAt: -1 },
         },
         {
            $limit: pageSize + 1,
         },
      ]);

      console.log("BEFORE " + patientPrescriptions);

      if (!patientPrescriptions || patientPrescriptions.length === 0) {
         return { data: [], hasNextPage: false };
      }
      console.log("lenght" + patientPrescriptions.length);
      console.log("------------------");
      const hasNextPage = patientPrescriptions.length > pageSize;
      const data = hasNextPage ? patientPrescriptions.slice(0, -1) : patientPrescriptions;
      console.log(data);
      console.log("------------------");
      return { data, hasNextPage };
   } catch (error) {
      console.error("Error fetching patient prescriptions:", error);
      throw error;
   }
};

export const submitPrescription = async (prescriptionId: string) => {
   try {
      await Prescription.updateOne({ _id: prescriptionId }, { $set: { isSubmitted: "true" } });
   } catch (error) {
      // Handle errors
      console.error("Error submitting prescription:", error);
      throw error; // Rethrow the error or handle as needed
   }
};

// export const getPatientPrescriptionService = async (patientId: string, prescriptionId: string) => {
//    const prescription = await Prescription.findOne({ patientId, _id: prescriptionId });

//    return prescription;
// };

export const getPatientPrescriptionService = async (patientId: string, prescriptionId: string) => {
   try {
      const patient = await Patient.findById(patientId).select({ subscribedPackage: 1 });

      var healthPackageInfo = { name: "normal", discount: 1 };
      const healthPackage = patient?.subscribedPackage;
      if (healthPackage) {
         const healthPackageExpireyDate = new Date(healthPackage.endDate);
         const currentTime = new Date();

         const isStillValidPackage =
            healthPackage?.status == "subscribed" && healthPackageExpireyDate >= currentTime;

         if (isStillValidPackage) {
            healthPackageInfo = await findHealhPackagePharmacyDiscountAndName(
               healthPackage.packageId!
            );
         }
      }

      const prescriptions = await Prescription.aggregate([
         {
            $match: {
               patientId: new mongoose.Types.ObjectId(patientId),
               _id: new mongoose.Types.ObjectId(prescriptionId),
            },
         },
         { $unwind: "$medicines" },
         {
            $lookup: {
               from: "medicines", // replace with your actual Medicine collection name
               localField: "medicines.medicineId",
               foreignField: "_id",
               as: "medicines.medicineData",
            },
         },
         {
            $addFields: {
               "medicines.medicineData": {
                  $arrayElemAt: ["$medicines.medicineData", 0],
               },
            },
         },
         {
            $addFields: {
               "medicines.name": "$medicines.medicineData.name",
               "medicines.pictureUrl": "$medicines.medicineData.pictureUrl",
               "medicines.priceBefore": "$medicines.medicineData.price",
               "medicines.quantity": "$medicines.quantity",
               "medicines.priceAfter": {
                  $round: [
                     { $multiply: ["$medicines.medicineData.price", healthPackageInfo.discount] },
                     2, // Number of decimal places
                  ],
               },
            },
         },
         {
            $project: {
               "medicines._id": 0,
               "medicines.medicineData": 0,
            },
         },
         {
            $group: {
               _id: "$_id",
               doctorId: { $first: "$doctorId" },
               patientId: { $first: "$patientId" },
               status: { $first: "$status" },
               isSubmitted: { $first: "$isSubmitted" },
               medicines: { $push: "$medicines" },
               packageName: { $first: healthPackageInfo.name },
            },
         },
      ]);
      if (prescriptions.length >= 1) return prescriptions[0] || null;
      else return null;
   } catch (err) {
      console.log(err);
   }
};
