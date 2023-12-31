import express, { Router } from "express";
import {
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

import { protectMe } from "../middlewares/protect";

const router: Router = express.Router();

router.use(protectMe);
router.route("/").post(createTodo);
router.route("/:id").get(getTodo).patch(updateTodo).delete(deleteTodo);

export default router;
