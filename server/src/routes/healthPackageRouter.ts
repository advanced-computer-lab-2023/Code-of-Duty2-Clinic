import express, { Request, Response } from 'express'
import { addHealthPackage,deleteHealthPackage, getHealthPackages, updateHealthPackage,getHealthPackage } from '../controllers/healthPackageController';
const router  = express.Router();

router 
    .route('/')
        .post(addHealthPackage)
        .get(getHealthPackages)

router.route('/:id')
        .get(getHealthPackage)

        .put(updateHealthPackage)

        .delete(deleteHealthPackage)



export default router;