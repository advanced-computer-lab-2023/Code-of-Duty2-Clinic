import express from 'express';
import { refreshAccessToken } from '../../controllers/auth/refreshToken';

const router = express.Router();

router.post('/refresh-token', refreshAccessToken);

export default router;