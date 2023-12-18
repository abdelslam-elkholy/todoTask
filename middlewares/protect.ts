import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { AppError } from "../utils/appError";
import IUser from "../interfaces/userInterface";
import { promisify } from "util";

export const protectMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token =
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ") &&
      req.headers.authorization.split(" ")[1];

    if (!token) {
      console.log("no token provided");
      return next(new AppError("You Are Not LoggedIn", 401));
    }

    const encrypted: IUser = await promisify<string, string, any>(jwt.verify)(
      token,
      process.env.JWT_STRING!
    );

    const user = await User.findById(encrypted.id);

    if (!user) {
      console.log("token is invalid");
      return next(
        new AppError("There Is No User or Doesn't Exist Anymore", 401)
      );
    }

    req.body.id = user._id;

    next();
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};
