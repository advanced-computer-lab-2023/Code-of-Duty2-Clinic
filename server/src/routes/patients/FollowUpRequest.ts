import { Router } from "express";
import {
  createFollowUpRequestForDependentHandler,
  deleteFollowUpRequestForDependentHandler,
  getFollowUpRequestsForDependentHandler
} from "../../controllers/appointments/follow-ups/for-dependent-patients";
import {
  getFollowUpRequestsForRegisteredHandler,
  createFollowUpRequestForRegisteredHandler,
  deleteFollowUpRequestForRegisteredHandler
} from "../../controllers/appointments/follow-ups/for-registered-patients";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

router
  .get("/follow-up-requests-for-dependent", getFollowUpRequestsForDependentHandler)
  .post("/follow-up-requests-for-dependent", createFollowUpRequestForDependentHandler)
  .delete(
    "/follow-up-requests-for-dependent/:followUpRequestId",
    deleteFollowUpRequestForRegisteredHandler
  )

  .get("/follow-up-requests-for-registered", getFollowUpRequestsForRegisteredHandler)
  .post("/follow-up-requests-for-registered", createFollowUpRequestForRegisteredHandler)
  .delete(
    "/follow-up-requests-for-registered/:followUpRequestId",
    deleteFollowUpRequestForDependentHandler
  );

export default router;
