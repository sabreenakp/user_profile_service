import { Router, Request, Response } from "express";
import * as userController from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", userController.addUser);
userRoutes.get("/:id", userController.fetchUser);
userRoutes.get("/verify", userController.confirmSignUp);

export default userRoutes;
