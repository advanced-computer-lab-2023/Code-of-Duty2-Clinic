import { Router } from "express";
import {
  createFollowUpRequestForDependentHandler,
  getFollowUpRequestsForDependentHandler,
} from "../../controllers/appointments/follow-ups/for-dependent-patients";
import {
  getFollowUpRequestsForRegisteredHandler,
  createFollowUpRequestForRegisteredHandler,
} from "../../controllers/appointments/follow-ups/for-registered-patients";

const router = Router();

router
  .get(
    "/follow-up-requests-for-dependent",
    getFollowUpRequestsForDependentHandler
  )
  .post(
    "/follow-up-requests-for-dependent",
    createFollowUpRequestForDependentHandler
  )

  .get(
    "/follow-up-requests-for-registered",
    getFollowUpRequestsForRegisteredHandler
  )
  .post(
    "/follow-up-requests-for-registered",
    createFollowUpRequestForRegisteredHandler
  );

export default router;
