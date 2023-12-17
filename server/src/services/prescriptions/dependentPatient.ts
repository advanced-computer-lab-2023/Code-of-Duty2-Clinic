import mongoose from "mongoose";
import DependentPrescription from "../../models/prescriptions/DependentPrescription";

export const createDependentPrescription = async (prescriptionData: any) => {
  try {
    const newprescription = new DependentPrescription(prescriptionData);
    await newprescription.save();
    console.log(newprescription);
    return newprescription;
  } catch (error: any) {
    console.error("Error creating prescription:", error.message);
    throw new Error("Error creating prescription");
  }
};

export const getDependentPatientPrescriptionsByDoctor = async (
  doctorId: string,
  patientId: string,
  lastCreatedAt: Date | null = null,
  pageSize: number = 5
) => {
  try {
    const matchCriteria: any = {
      doctorId: new mongoose.Types.ObjectId(doctorId),
      patientNationalId: patientId
    };

    if (lastCreatedAt) {
      matchCriteria.createdAt = { $lt: lastCreatedAt };
    }

    const patientPrescriptions = await DependentPrescription.aggregate([
      {
        $match: matchCriteria
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
                speciality: 1
                // Add other fields you want to include
              }
            }
          ]
        }
      },
      //   {
      //      $lookup: {
      //         from: "patients",
      //         localField: "patientId",
      //         foreignField: "_id",
      //         as: "patient",
      //         pipeline: [
      //            {
      //               $project: {
      //                  _id: 1,
      //                  name: 1,
      //                  // Add other fields you want to include
      //               },
      //            },
      //         ],
      //      },
      //   },
      {
        $addFields: {
          doctor: { $arrayElemAt: ["$doctor", 0] }
          // patient: { $arrayElemAt: ["$patient", 0] },
        }
      },
      {
        $sort: { createdAt: -1 }
      },
      {
        $limit: pageSize + 1
      }
    ]);

   // console.log("BEFORE " + patientPrescriptions);

    if (!patientPrescriptions || patientPrescriptions.length === 0) {
      return { data: [], hasNextPage: false };
    }
    // console.log("lenght" + patientPrescriptions.length);
    // console.log("------------------");
    const hasNextPage = patientPrescriptions.length > pageSize;
    const data = hasNextPage ? patientPrescriptions.slice(0, -1) : patientPrescriptions;
    // console.log(data);
    // console.log("------------------");
    return { data, hasNextPage };
  } catch (error) {
    console.error("Error fetching patient prescriptions:", error);
    throw error;
  }
};

export const updateDependentMedicineAndDosage = async (
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
        "medicines.$.dosage": dosage
      };
    }
    if (quantity) {
      updateFields.$set = {
        ...updateFields.$set,
        "medicines.$.quantity": quantity
      };
    }
    console.log(updateFields);
    const updatedPrescription = await DependentPrescription.findOneAndUpdate(
      {
        _id: prescriptionId,
        status: "unfilled",
        "medicines.medicineId": medicineId
      },
      updateFields,
      { new: true, runValidators: true }
    );
    console.log()
    updatedPrescription?.save();

    if (!updatedPrescription)
      throw new Error("Prescription not found or medicine not present in the prescription");

    return updatedPrescription;
  } catch (error: any) {
    console.error("Error updating medicine and dosage:", error.message);
    throw new Error("Error updating medicine and dosage");
  }
};

export const submitDependentPrescription = async (prescriptionId: string) => {
  try {
    await DependentPrescription.updateOne(
      { _id: prescriptionId },
      { $set: { isSubmitted: "true" } }
    );
  } catch (error) {
    // Handle errors
    console.error("Error submitting prescription:", error);
    throw error; // Rethrow the error or handle as needed
  }
};
