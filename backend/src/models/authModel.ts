import mongoose from "mongoose";
import { IAuth } from "../interfaces/auth.interface";

const authSchema: mongoose.Schema<IAuth> = new mongoose.Schema({
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
}, {timestamps: true});

const User = mongoose.model<IAuth>("User", authSchema);
export default User