
import {registerAdmin} from "../controllers/addAdminController"

const express = require('express');

const router = express.Router();

router.post('/admins', registerAdmin);

module.exports = router;











