import express from "express";
import { register} from "../controllers/auth.controllers";
const router = express.Router();

router.post('/signup', register);

export default router;