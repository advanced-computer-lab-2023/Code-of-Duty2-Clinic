import express from 'express';
import viewUsersByType from '../../controllers/admins/showUsers';

const router = express.Router();

// Define the route for viewing users by their type
router.get('/users/:Type', viewUsersByType);

export default router;
