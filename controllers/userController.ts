import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { filterObj } from "../utils/helpers";
import { sendToken } from "../utils/creteSendToken";
import { AppError } from "../utils/appError";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const filteredBody = filterObj(
      req.body,
      "firstName",
      "lastName",
      "email",
      "password",
      "confirmPassword"
    );

    const user = await User.create(filteredBody);

    sendToken(user, 201, res);
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 401));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.validatePassword(password))) {
      return next(new AppError("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};
