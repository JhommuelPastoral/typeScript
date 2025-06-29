"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isOnboarded: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
const User = mongoose_1.default.model("User", authSchema);
exports.default = User;
//# sourceMappingURL=authModel.js.map