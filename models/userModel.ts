import mongoose, { Schema } from "mongoose";
import IUser from "../interfaces/userInterface";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema: Schema<IUser> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name must be provided"],
      minLength: 3,
      maxLength: 255,
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, "Last Name must be provided"],
      minLength: 3,
      maxLength: 255,
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email must be provided"],
      validate: [validator.isEmail, "Enter a valid email address"],
      unique: true,
    },

    password: {
      type: String,
      minLength: 8,
      required: [true, "Password must be provided"],
      select: false,
    },

    confirmPassword: {
      type: String,
      required: true,
      validate: {
        validator: function (this: IUser, el: string) {
          return el === this.password;
        },
        message: "Passwords Are Not The Same",
      },
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.validatePassword = async function (
  checkedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(checkedPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
