import User from "../models/authModel";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
  id: string;
}
interface CustomRequest extends Request {
  user?: any;
}

export default async function  authProtected(req: Request, res: Response, next: NextFunction) : Promise<any> {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const id = (decoded as DecodedToken).id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    (req as CustomRequest).user = user;
    
    next();
  } catch (error) {
    console.log("Auth error", error);
    return res.status(500).json({ message: "Something went wrong" });
    
  }
}