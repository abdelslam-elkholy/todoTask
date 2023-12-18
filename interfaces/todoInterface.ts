import { Document } from "mongoose";

interface ITodo extends Document {
  owner: String;
  header: String;
  body: String;
  completed: boolean;
}

export default ITodo;
