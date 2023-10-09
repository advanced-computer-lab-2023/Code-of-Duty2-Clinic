import { getDoctor } from '../controllers/doctorController'
import express from 'express' 

const router  = express.Router()

router.get('/:id',getDoctor)


export default router 