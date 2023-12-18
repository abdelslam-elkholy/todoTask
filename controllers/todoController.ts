import { Request, Response, NextFunction } from "express";
import Todo from "../models/todoModel";
import { filterObj } from "../utils/helpers";
import { AppError } from "../utils/appError";
import IUser from "../interfaces/userInterface";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filteredBody = filterObj(req.body, "header", "body");
    filteredBody.owner = req.body.id;

    console.log("body is" + req.body);
    console.log("filtered body is" + filteredBody);

    const todo = await Todo.create(filteredBody);

    res.status(201).json({
      status: "Success",
      todo,
    });
  } catch (error: any) {
    console.log(error);

    next(new AppError(error.message, 400));
  }
};

export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const filteredBody = filterObj(req.body, "header", "body", "completed");

    const todoExisted = await Todo.findById(req.params.id);

    if (!todoExisted) {
      return next(new AppError("There is no todo with this id ", 404));
    }

    if (req.body.id.toString() !== todoExisted.owner.toString()) {
      return next(new AppError("You don't have permission", 403));
    }

    const todo = await Todo.findByIdAndUpdate(req.params.id, filteredBody, {
      new: true,
    });

    res.status(200).json({
      status: "Success",
      todo,
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const getTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return next(new AppError("There is no todo with this id ", 404));
    }

    if (req.body.id.toString() !== todo.owner.toString()) {
      return next(new AppError("You don't have permission", 403));
    }

    res.status(200).json({
      status: "Success",
      todo,
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const deleteTodo = async (
  req: Request & { user?: IUser },
  res: Response,
  next: NextFunction
) => {
  try {
    const todoExist = await Todo.findById(req.params.id);

    if (!todoExist) {
      return next(new AppError("There is no todo with this id ", 404));
    }

    if (req.body.id.toString() !== todoExist.owner.toString()) {
      return next(new AppError("You don't have permission", 403));
    }

    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "Success",
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await Todo.find({ owner: req.body.id });
    res.status(200).json({
      status: "success",
      todos,
    });
  } catch (error: any) {
    next(new AppError(error.message, 400));
  }
};
