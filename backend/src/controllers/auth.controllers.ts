import { Request, Response } from "express"
import User from "../models/authModel"
import jwt from "jsonwebtoken"
import { hashPassword } from "../Utils/hash"
import { comparePassword } from "../Utils/compare"

interface IAuth{
  email: string,
  password: string
}

interface CustomRequest extends Request {
  user: any;
}

export const register = async(req: Request, res: Response):Promise<void>=> {

  try {
    const {email, password}: IAuth = req.body;
    if(!email || !password) {
       res.status(400).json({message: "Enter valid credentials"});
       return;
    }
    if(password.length < 6) {
       res.status(400).json({message: "Password must be at least 6 characters"});
       return;
    }

    const isExist = await User.findOne({email});
    if(isExist) {
       res.status(400).json({message: "Email already exist"});
       return;
    }
    const hashedPassword:string = await hashPassword(password);
    const user = await User.create({email, password:hashedPassword, isOnboarded: true});
    res.cookie("token", jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "7d"}),{
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7
    });
     res.status(201).json({message: "User created successfully"});

  } catch (error) {
    console.log("Signup error", error);
     res.status(500).json({message: "Something went wrong"});
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, password}: IAuth = req.body;
    if(!email || !password) {
       res.status(400).json({message: "Enter valid credentials"});
       return;
    }
    const user = await User.findOne({email});
    if(!user) {
       res.status(400).json({message: "Email does not exist"});
       return;
    }
    const isMatch = await comparePassword(password, user.password);

    if(!isMatch) {
       res.status(400).json({message: "Invalid credentials"});
       return;
    }
    res.cookie("token", jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "7d"}),{
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 60 * 24 * 7
    });
    res.status(201).json({message: "Login successful"});
  } catch (error) {
    console.log("Login error", error);
    res.status(500).json({message: "Something went wrong"});
    
  }
}

export const myProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(201).json({user: (req as CustomRequest).user});
  } catch (error) {
    console.log("Get profile error", error);
    res.status(500).json({message: "Something went wrong"});
  }
}

export const logOut = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token", {httpOnly: true, secure: true, sameSite: "none"});
    res.status(201).json({message: "Logout successful"});
  } catch (error) {
    console.log("Logout error", error);
    res.status(500).json({message: "Something went wrong"});
  }
}

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email}: IAuth = req.body;
    if(!email) {
       res.status(400).json({message: "Enter valid credentials"});
       return;
    }
    const userExist = await User.findOne({email});
    if(userExist) {
      const token = jwt.sign({id: userExist._id}, process.env.JWT_SECRET as string, {expiresIn: "7d"});
       res.cookie("token", token,{
         httpOnly: true,
         secure: true,
         sameSite: "none",
         maxAge: 60 * 60 * 24 * 7
       })
       res.status(201).json({message: "Login successful"});
       return;
    }
    const user = await User.create({email, password: "Pass", isOnboarded: false});
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: "7d"});
      res.cookie("token", token,{
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 60 * 60 * 24 * 7
      })
    res.status(201).json({message: "User created successfully"});
  } catch (error) {
    console.log("Google login error", error);
    res.status(500).json({message: "Something went wrong"});
    
  }

}

export const createGoogleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const{password}:{password: string} = req.body;
    if(!password) {
       res.status(400).json({message: "Enter valid credentials"});
       return;
    }
    const userdata = (req as CustomRequest).user;
    const user = await User.findOne({email: userdata.email});
    if(!user) return;
    const hashedPassword:string = await hashPassword(password);
    await User.updateOne({email: user?.email}, {$set: {password: hashedPassword, isOnboarded: true}});
    res.status(201).json({message: "User created successfully"});
  } catch (error) {
    console.log("Create google user error", error);
    res.status(500).json({message: "Something went wrong"});
    
  }
}