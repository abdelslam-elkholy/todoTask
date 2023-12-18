import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const DB: string | undefined = process.env.DATABASE;
const port: number = parseInt(process.env.PORT as string, 10) || 5000;

mongoose
  .connect(DB as string)
  .then(() => console.log("Connected To Database Successfully"))
  .catch((err: Error) => console.error(err));

app.listen(port, () => console.log(`App is listening on port: ${port}`));
