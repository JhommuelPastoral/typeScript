"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOut = exports.myProfile = exports.login = exports.register = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("../Utils/hash");
const compare_1 = require("../Utils/compare");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter valid credentials" });
        }
        const isExist = yield authModel_1.default.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "Email already exist" });
        }
        const hashedPassword = yield (0, hash_1.hashPassword)(password);
        const user = yield authModel_1.default.create({ email, password: hashedPassword });
        res.cookie("token", jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }), {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7
        });
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log("Signup error", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Enter valid credentials" });
        }
        const user = yield authModel_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const isMatch = yield (0, compare_1.comparePassword)(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.cookie("token", jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }), {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7
        });
        return res.status(201).json({ message: "Login successful" });
    }
    catch (error) {
        console.log("Login error", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.login = login;
const myProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(201).json({ user: req.user });
    }
    catch (error) {
        console.log("Get profile error", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.myProfile = myProfile;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
        return res.status(201).json({ message: "Logout successful" });
    }
    catch (error) {
        console.log("Logout error", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.logOut = logOut;
//# sourceMappingURL=auth.controllers.js.map