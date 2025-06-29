"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controllers_1 = require("../controllers/auth.controllers");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
router.post('/signup', auth_controllers_1.register);
router.post('/login', auth_controllers_1.login);
router.post('/google', auth_controllers_1.googleLogin);
router.post('/logout', auth_controllers_1.logOut);
router.post('/createGoogleUser', auth_middleware_1.default, auth_controllers_1.createGoogleUser);
router.get('/user', auth_middleware_1.default, auth_controllers_1.myProfile);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map