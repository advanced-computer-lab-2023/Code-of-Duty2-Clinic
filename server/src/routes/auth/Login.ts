import  express  from "express";
import { login } from "../../controllers/auth/login";
import { doctorLogin } from "../../controllers/auth/doctorLogin";

const router = express.Router();

router.post('/login', login);
router.post('/doctor-login', doctorLogin);

export default router