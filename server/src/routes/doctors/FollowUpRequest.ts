import { Router } from "express";
import {
  acceptFollowUpRequestForRegisteredHandler,
  rejectFollowUpRequestForRegisteredHandler
} from "../../controllers/appointments/follow-ups/for-registered-patients";
import {
  acceptFollowUpRequestForDependentHandler,
  rejectFollowUpRequestForDependentHandler
} from "../../controllers/appointments/follow-ups/for-dependent-patients";
import { getAllFollowUpRequestsForDoctorHandler } from "../../controllers/appointments/follow-ups";

const router = Router();

router

  .get("/follow-up-requests", getAllFollowUpRequestsForDoctorHandler)
  .patch("/reject-follow-up-request-for-registered", rejectFollowUpRequestForRegisteredHandler)
  .post("/accept-follow-up-request-for-registered", acceptFollowUpRequestForRegisteredHandler)

  .patch("/reject-follow-up-request-for-dependent", rejectFollowUpRequestForDependentHandler)
  .post("/accept-follow-up-request-for-dependent", acceptFollowUpRequestForDependentHandler);

export default router;
