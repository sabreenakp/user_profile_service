import { Router } from "express";
import * as authController from "./auth.controller";

const userRoutes = Router();

userRoutes.post("/signup", authController.addUser);
userRoutes.post("/verify", authController.confirmSignUp);
userRoutes.post("/signin", authController.signin);

export default userRoutes;
