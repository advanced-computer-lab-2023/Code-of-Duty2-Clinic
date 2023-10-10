
import registerAdmin from "../../controllers/admins/addAdminController"

const express = require('express');

const router = express.Router();

router.post('/admins', registerAdmin);

export default router;











