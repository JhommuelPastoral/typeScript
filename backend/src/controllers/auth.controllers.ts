import { Request, Response } from "express"
import User from "../models/authModel"
export const register = async(req: Request, res: Response):Promise<Response>=> {

  try {
    const {email, password}:{email: string, password: string} = req.body;
    const isExist = await User.findOne({email});
    if(isExist) {
      return res.status(400).json({message: "User already exist"});
    }
    const user = await User.create({email, password});
    return res.status(201).json({message: "User created successfully"});

  } catch (error) {
    console.log("Signup error", error);
    return res.status(500).json({message: "Something went wrong"});
  }
}