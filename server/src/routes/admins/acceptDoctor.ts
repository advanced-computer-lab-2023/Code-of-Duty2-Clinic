import express from "express";
import { sendContract } from "../../controllers/doctors/actionOnRequest";

const router = express.Router();

router.put("/accept-doctor/:doctorId", sendContract);

export default router;
