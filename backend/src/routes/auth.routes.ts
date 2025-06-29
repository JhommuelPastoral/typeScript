import express from "express";
import { register, login, myProfile, logOut, googleLogin, createGoogleUser} from "../controllers/auth.controllers";
import authProtected from "../middleware/auth.middleware";
const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.post('/logout', logOut);
router.post('/createGoogleUser',authProtected ,createGoogleUser);

router.get('/user', authProtected, myProfile);

export default router;