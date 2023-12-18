import express, { Application, Request, Response, NextFunction } from "express";
import { AppError, errorHandler } from "./utils/appError";
import userRoute from "./routes/userRoute";
import todoRoute from "./routes/todoRoute";

const app: Application = express();

app.use(express.json());

app.use("/auth", userRoute);
app.use("/todo", todoRoute);

app.use("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`The endpoint ${req.baseUrl} isn't correct`, 404));
});

app.use(errorHandler);

export default app;
