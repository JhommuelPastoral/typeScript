import mongoose from "mongoose";

export default async function dbConnect() {
  try {
    const conn =await mongoose.connect(process.env.MONGO_URL || "");
    console.log("Database connection successful", conn.connection.host);
  } catch (error) {
    console.log("Database connection failed:" ,error);
  }
}