import express, { Application, Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import config from './utils/config'
import routes from "./routes/route";
const app: Application = express();
// cors
app.use(cors());
// body parsing middleware.
app.use(json());
app.use(urlencoded({ extended: true }));
//route
app.use("/api", routes);
// 404
app.get("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "Unauthorized!", status: false });
});
app.listen(config.SERVER.PORT || 8080, () => {
  console.log("server is listening on port ", config.SERVER.PORT);
});
