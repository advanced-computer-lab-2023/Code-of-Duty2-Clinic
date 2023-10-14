
import registerAdmin from "../../controllers/admins/addAdminController"

const express = require('express');

const router = express.Router();

router.post('/admin', registerAdmin);

export default router;











