import express from 'express'
import {addHealthPackage} from '../../controllers/healthPackages/createHealthPackage'
import {deleteHealthPackage} from '../../controllers/healthPackages/deleteHealthPackage'
import {getHealthPackages} from '../../controllers/healthPackages/getHealthPackages'
import {updateHealthPackage} from '../../controllers/healthPackages/updateHealthPackage'
import {getHealthPackage} from '../../controllers/healthPackages/getHealthPackage'
const router  = express.Router();

router.route('/')
        .post(addHealthPackage)
        .get(getHealthPackages)

router.route('/:id')
        .get(getHealthPackage)

        .put(updateHealthPackage)

        .delete(deleteHealthPackage)



export default router;