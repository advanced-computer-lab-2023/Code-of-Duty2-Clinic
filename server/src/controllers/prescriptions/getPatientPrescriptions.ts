import { Response } from "express";
import Prescription from "../../models/prescriptions/Prescription";
import checkUpdateParams from "../../utils/attributeExistenceChecker";
import { StatusCodes } from "http-status-codes";
import { AuthorizedRequest } from "../../types/AuthorizedRequest";
import { findPatientById } from "../../services/patients";
import Medicine from "../../models/medicines/Medicine";

export const getPatientPrescriptions = async (
  req: AuthorizedRequest,
  res: Response
) => {
  try {
    const allowedUpdateParams = ["updatedAt", "doctorName", "date", "status"];
    //join patient
    const patientId = req.user?.id;
    if (!patientId)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No such patient" });

    const patient = await findPatientById(patientId);
    if (!patient) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No such patient" });
    }

    //check params
    let updateParams: any = { ...req.query };
    if (!checkUpdateParams(Object.keys(updateParams), allowedUpdateParams))
      return res.status(400).json({ error: "Invalid Params" });
    delete updateParams["doctorName"];

    //Date search range
    if (req.query.updatedAt) {
      const startDate = new Date(updateParams.updatedAt);
      const endDate = new Date(updateParams.updatedAt);
      endDate.setDate(endDate.getDate() + 1); // add one day to get the end of the day
      updateParams.updatedAt = { $gte: startDate, $lt: endDate };
    }

    //filter prescriptions
    let prescriptions = await Prescription.find({
      patientId: patientId,
      ...updateParams,
    })
      .populate({
        path: "doctorId",
        match: { name: new RegExp(req.query.doctorName as string, "i") },
        select: "name -_id",
      })
      .populate({
        path: "medicines.medicineId",
        model: Medicine,
        select: "name price",
      })
      .exec();

    var result: any = [];
    prescriptions.forEach((doc) => {
      if (doc.doctorId !== null) result.push(doc);
    });

    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};
