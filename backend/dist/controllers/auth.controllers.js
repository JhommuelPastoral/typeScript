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
exports.register = void 0;
const authModel_1 = __importDefault(require("../models/authModel"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const isExist = yield authModel_1.default.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "User already exist" });
        }
        const user = yield authModel_1.default.create({ email, password });
        return res.status(201).json({ message: "User created successfully" });
    }
    catch (error) {
        console.log("Signup error", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
});
exports.register = register;
//# sourceMappingURL=auth.controllers.js.map