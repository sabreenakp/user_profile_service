import { Router } from "express";
import * as userController from "./user.controller";

const userRoutes = Router();

userRoutes.post("/", userController.addUser);

export default userRoutes;