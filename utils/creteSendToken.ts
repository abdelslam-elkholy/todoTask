import { Response } from "express";
import IUser from "../interfaces/userInterface";
import jwt from "jsonwebtoken";

const createToken = (id: string): string => {
  const token = jwt.sign({ id }, process.env.JWT_STRING || "", {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

export const sendToken = (
  user: IUser,
  statusCode: number,
  res: Response
): void => {
  const token = createToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
  });
};
