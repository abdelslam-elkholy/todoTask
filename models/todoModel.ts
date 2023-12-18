import mongoose, { Schema } from "mongoose";
import ITodo from "../interfaces/todoInterface";

const todoSchema: Schema<ITodo> = new Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Users",
      required: true,
    },
    header: {
      type: String,
      required: true,
      minLength: 3,
    },
    body: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);

export default Todo;
