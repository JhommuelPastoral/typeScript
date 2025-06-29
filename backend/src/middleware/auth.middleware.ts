import User from "../models/authModel";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}
interface CustomRequest extends Request {
  user: any;
}

export default async function  authProtected(req: Request, res: Response, next: NextFunction) : Promise<void> {
  try {
    const token = req.cookies.token;
    if (!token) {
       res.status(401).json({ message: "Unauthorized" });
       return;
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
       res.status(401).json({ message: "Unauthorized" });
       return;
    }
    const id = (decoded as DecodedToken).id;
    const user = await User.findById(id).select("-password");
    if (!user) {
       res.status(401).json({ message: "Unauthorized" });
       return;
    }
    (req as CustomRequest).user = user;
    
    next();
  } catch (error) {
    console.log("Auth error", error);
    res.status(500).json({ message: "Something went wrong" });
    return;
    
  }
}