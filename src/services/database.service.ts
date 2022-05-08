import { model, connect } from "mongoose";
import { UserData } from "../interfaces/user.interface";
import { userSchema } from "../models/user.model";
import config from "../utils/config";

//Create a User Model.
export const User = model<UserData>("User", userSchema);
dbConnector();
export async function dbConnector() {
  try {
    // Connect to MongoDB
    await connect(config.DATABASE.HOST + config.DATABASE.NAME);
    console.log("Database connection success!")
    return {
      message: "Success",
      status: true,
      statusCode: 200,
    };
  } catch (err: any) {
    console.log("Database connection failed!", err)
    return {
      message: "Database connection failed!",
      status: false,
      statusCode: 500,
    };
  }
}
