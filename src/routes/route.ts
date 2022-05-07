import { Router, Request, Response } from "express";
import userRoutes from "../components/user/user.route";
import authMiddleware from "../middlewares/auth.middleware"
import authRoutes from "../components/auth/auth.route"

const routes = Router();
const apiVersions = ["v1", "v2"];
routes.get("/health", (req: Request, res: Response) => {
  res
    .status(200)
    .send({ message: "Service running successfully", status: true });
});
routes.use("/" + apiVersions[0] + "/auth", authRoutes);
routes.use("/" + apiVersions[0] + "/users", authMiddleware, userRoutes);

export default routes;
