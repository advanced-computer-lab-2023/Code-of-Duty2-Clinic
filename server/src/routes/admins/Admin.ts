import express from "express";
import registerAdmin from "../../controllers/admins/addAdminController";
import removeUserHandler from "../../controllers/admins/removeUserController";
import viewUsersByTypeHandler from "../../controllers/admins/showUsers";
import getDoctorRegistrationRequests from "../../controllers/admins/viewListOfRequests";
import getDoctorRegistrationRequest, { getDoctorRegistrationRequestbyId } from "../../controllers/admins/viewDoctorApplicationData";
import { addHealthPackage } from "../../controllers/healthPackages/createHealthPackage";
import { getHealthPackages } from "../../controllers/healthPackages/getHealthPackages";
import { getHealthPackage } from "../../controllers/healthPackages/getHealthPackage";
import { updateHealthPackage } from "../../controllers/healthPackages/updateHealthPackage";
import { deleteHealthPackageHandler } from "../../controllers/healthPackages/deleteHealthPackage";
import { authenticateUser } from "../../middlewares/authentication";
import UserRole from "../../types/UserRole";
import { authorizeUser } from "../../middlewares/authorization";
import { rejectDoctorRegistrationRequest } from "../../controllers/admins/actionOnRequest";

const router = express.Router();

router.use(authenticateUser);
router.use(authorizeUser(UserRole.ADMIN));

router.route("/health-packages").post(addHealthPackage).get(getHealthPackages);

router
  .route("/health-packages/:id")
  .get(getHealthPackage)

  .put(updateHealthPackage)

  .delete(deleteHealthPackageHandler);

router
  .post("/admin", registerAdmin)

.get('/doctor-registration-requests/:email', getDoctorRegistrationRequest)

.get('/doctor-registration/:doctorId',getDoctorRegistrationRequestbyId)
  .delete("/users", removeUserHandler)

  .get("/users/:Type", viewUsersByTypeHandler)

  .get("/doctor-registration-requests", getDoctorRegistrationRequests)

  .get("/doctor-registration-requests/:email", getDoctorRegistrationRequest)

  .put('/rejectDoctor/:doctorId', rejectDoctorRegistrationRequest);


export default router;
