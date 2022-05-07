import { Router } from "express";
import * as userController from "./user.controller";

const userRoutes = Router();

userRoutes.get("/:id", userController.fetchUser);

export default userRoutes;
