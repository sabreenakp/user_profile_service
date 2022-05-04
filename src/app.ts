import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
const app: Application = express();
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hello");
});
app.listen(process.env.PORT, () => console.log("server running"));
