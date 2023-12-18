import { Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  createdAt: Date;
  updatedAt: Date;
  validatePassword(checkedPassword: string): Promise<boolean>;
}

export default IUser;
