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
exports.createGoogleUser = exports.googleLogin = exports.logOut = exports.myProfile = exports.login = exports.register = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hash_1 = require("../Utils/hash");
const compare_1 = require("../Utils/compare");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Enter valid credentials" });
            return;
        }
        if (password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters" });
            return;
        }
        const isExist = yield authModel_1.default.findOne({ email });
        if (isExist) {
            res.status(400).json({ message: "Email already exist" });
            return;
        }
        const hashedPassword = yield (0, hash_1.hashPassword)(password);
        const user = yield authModel_1.default.create({ email, password: hashedPassword, isOnboarded: true });
        res.cookie("token", jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }), {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7 * 1000
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log("Signup error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Enter valid credentials" });
            return;
        }
        const user = yield authModel_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Email does not exist" });
            return;
        }
        const isMatch = yield (0, compare_1.comparePassword)(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        res.cookie("token", jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" }), {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7 * 1000
        });
        res.status(201).json({ message: "Login successful" });
    }
    catch (error) {
        console.log("Login error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.login = login;
const myProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(201).json({ user: req.user });
    }
    catch (error) {
        console.log("Get profile error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.myProfile = myProfile;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "none" });
        res.status(201).json({ message: "Logout successful" });
    }
    catch (error) {
        console.log("Logout error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.logOut = logOut;
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "Enter valid credentials" });
            return;
        }
        const userExist = yield authModel_1.default.findOne({ email });
        if (userExist) {
            const token = jsonwebtoken_1.default.sign({ id: userExist._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 60 * 60 * 24 * 7 * 1000
            });
            res.status(201).json({ message: "Login successful" });
            return;
        }
        const user = yield authModel_1.default.create({ email, password: "Pass", isOnboarded: false });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 60 * 60 * 24 * 7 * 1000
        });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log("Google login error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.googleLogin = googleLogin;
const createGoogleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password } = req.body;
        if (!password) {
            res.status(400).json({ message: "Enter valid credentials" });
            return;
        }
        const userdata = req.user;
        const user = yield authModel_1.default.findOne({ email: userdata.email });
        if (!user)
            return;
        const hashedPassword = yield (0, hash_1.hashPassword)(password);
        yield authModel_1.default.updateOne({ email: user === null || user === void 0 ? void 0 : user.email }, { $set: { password: hashedPassword, isOnboarded: true } });
        res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log("Create google user error", error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
exports.createGoogleUser = createGoogleUser;
//# sourceMappingURL=auth.controllers.js.map