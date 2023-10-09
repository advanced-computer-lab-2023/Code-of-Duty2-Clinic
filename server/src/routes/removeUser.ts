import express from 'express';
import removeUser from '../controllers/removeUserController';

const router = express.Router();

router.delete('/users/:username', removeUser);

export default router;