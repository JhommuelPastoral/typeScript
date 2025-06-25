import mongoose from "mongoose";

interface IAuth extends mongoose.Document {
  email: string;
  password: string;
}

const authSchema: mongoose.Schema<IAuth> = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const User = mongoose.model("User", authSchema);
export default User