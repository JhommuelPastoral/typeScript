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
exports.default = authProtected;
const authModel_1 = __importDefault(require("../models/authModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authProtected(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            if (!token) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            if (!decoded) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            const id = decoded.id;
            const user = yield authModel_1.default.findById(id).select("-password");
            if (!user) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            req.user = user;
            next();
        }
        catch (error) {
            console.log("Auth error", error);
            res.status(500).json({ message: "Something went wrong" });
            return;
        }
    });
}
//# sourceMappingURL=auth.middleware.js.map