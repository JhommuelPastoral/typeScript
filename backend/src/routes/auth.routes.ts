import express from "express";
import { register, login, myProfile, logOut} from "../controllers/auth.controllers";
import authProtected from "../middleware/auth.middleware";
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.get('/user', authProtected, myProfile);
router.get('/logout', logOut);

export default router;