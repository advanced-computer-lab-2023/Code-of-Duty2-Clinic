import { Router } from "express";
import { cancelSubscribedForDependent } from "../../controllers/healthPackages/cancelSubForIndependent";
import { cancelSubscription } from "../../controllers/healthPackages/cancelSubscription";
import { cancelSubscriptionR } from "../../controllers/healthPackages/cancelSubscriptionForR";
import { cancelSubscriptionForRegistered } from "../../controllers/healthPackages/cancelSubscriptionForRegistered";
import { subscribeToHealthPackageR } from "../../controllers/healthPackages/subscribeForR";
import { subscribeToHealthPackage } from "../../controllers/healthPackages/subscribePackageOfPatient";
import { setSubscribedPackageForDependent } from "../../controllers/healthPackages/subscribeToPackageForDependent";
import { viewSubscribedHealthPackageBenefits } from "../../controllers/healthPackages/viewBenefitsOfPackage";
import { viewHealthPackagesOptions } from "../../controllers/healthPackages/viewHealthPackagesOptions";
import { viewHealthCarePackageStatus } from "../../controllers/healthPackages/viewPackageDetails";
import { viewSubscribedPackageDetailsForDependent } from "../../controllers/healthPackages/viewPackageDetailsForDependent";
import { viewSubscribedHealthPackage } from "../../controllers/healthPackages/viewSubscribedHealthPackage";
import { viewSubscribedHealthPackageAllDetailsD } from "../../controllers/healthPackages/viewSubscribedHealthPackageAllDetailsD";
import { viewSubscribedHealthPackageAllDetailsR } from "../../controllers/healthPackages/viewSubscribedHealthPackageAllDetailsR";
import {
  getPatientHealthRecords,
  addPatientHealthRecord,
  deletePatientHealthRecord,
} from "../../controllers/patients/healthRecords";
import { authenticateUser } from "../../middlewares/authentication";
import { authorizeUser } from "../../middlewares/authorization";
import UserRole from "../../types/UserRole";
import { getHealthPackage } from "../../controllers/healthPackages/getHealthPackage";

const router = Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.PATIENT));

router

  .get("/health-records", getPatientHealthRecords)

  .put("/health-records", addPatientHealthRecord)

  .delete("/health-records", deletePatientHealthRecord)

  .get("/health-packages", viewHealthPackagesOptions)

  .post("/subscribe/:packageId", subscribeToHealthPackage)

  .post(
    "/registered-members/:patientId/subscribe/:packageId",
    subscribeToHealthPackageR
  )

  .post(
    "/dependent-members/:dependentNid/subscribe/:packageId",
    setSubscribedPackageForDependent
  )

  .get("/patient-health-package", viewSubscribedHealthPackage)

  .get("/package-dependent", viewSubscribedPackageDetailsForDependent)

  .get("/health-care-package-status", viewHealthCarePackageStatus)

  .get(
    "/dependent-family-members/:patientNId/health-package",
    viewSubscribedHealthPackageAllDetailsD
  )

  .get(
    "/registered-family-members/:patientId/health-package",
    viewSubscribedHealthPackageAllDetailsR
  )

  .patch("/cancel-subscription", cancelSubscription)

  .patch("/cancel-subscription/:patientId", cancelSubscriptionR)

  .patch(
    "/cancel-subscription-dependent/:dependentNid",
    cancelSubscribedForDependent
  )

  .get("/package-benefits", viewSubscribedHealthPackageBenefits)

  .patch(
    "/registered-family/cancel-subscription",
    cancelSubscriptionForRegistered
  )

  .get("/health-packages/:packageId", getHealthPackage);

export default router;
