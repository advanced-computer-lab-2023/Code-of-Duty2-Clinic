import express from "express";
import { getDoctorById } from "../../controllers/patients/getDoctorById";

const getDoctorDetailsRouter = express.Router();

getDoctorDetailsRouter.get('/:doctorId', getDoctorById);

export default getDoctorDetailsRouter;