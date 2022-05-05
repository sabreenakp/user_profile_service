import { Router, Request, Response } from "express";
import * as userController from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", (req: Request, res: Response) => {
  userController.addUser(req.body, res);
});

export default userRoutes;
