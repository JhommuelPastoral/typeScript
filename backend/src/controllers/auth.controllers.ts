import { Request, Response } from "express"
import User from "../models/authModel"
import jwt from "jsonwebtoken"
import { hashPassword } from "../Utils/hash"
import { comparePassword } from "../Utils/compare"
interface IAuth {
  email: string;
  password: string;
}

interface CustomRequest extends Request {
  user?: any;
}
export const register = async(req: Request, res: Response):Promise<any>=> {

  try {
    console.log(req.body);
    const {email, password}: IAuth = req.body;
    if(!email || !password) {
      return res.status(400).json({message: "Enter valid credentials"});
    }

    const isExist = await User.findOne({email});
    if(isExist) {
      return res.status(400).json({message: "Email already exist"});
    }
    const hashedPassword:string = await hashPassword(password);
    const user = await User.create({email, password:hashedPassword});
    res.cookie("token", jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "7d"}),{
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7
    });
    return res.status(201).json({message: "User created successfully"});

  } catch (error) {
    console.log("Signup error", error);
    return res.status(500).json({message: "Something went wrong"});
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const {email, password}: IAuth = req.body;
    if(!email || !password) {
      return res.status(400).json({message: "Enter valid credentials"});
    }
    const user = await User.findOne({email});
    if(!user) {
      return res.status(400).json({message: "User not found"});
    }
    const isMatch = await comparePassword(password, user.password);

    if(!isMatch) {
      return res.status(400).json({message: "Invalid credentials"});
    }
    res.cookie("token", jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "7d"}),{
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7
    });
    return res.status(201).json({message: "Login successful"});
  } catch (error) {
    console.log("Login error", error);
    return res.status(500).json({message: "Something went wrong"});
    
  }
}

export const myProfile = async (req: Request, res: Response): Promise<any> => {
  try {
    return res.status(201).json({user: (req as CustomRequest).user});
  } catch (error) {
    console.log("Get profile error", error);
    return res.status(500).json({message: "Something went wrong"});
  }
}

export const logOut = async (req: Request, res: Response): Promise<any> => {
  try {
    res.clearCookie("token", {httpOnly: true, secure: true, sameSite: "none"});
    return res.status(201).json({message: "Logout successful"});
  } catch (error) {
    console.log("Logout error", error);
    return res.status(500).json({message: "Something went wrong"});
  }
}